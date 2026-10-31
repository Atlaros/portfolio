import { z } from "zod";
import {
  PROJECT_CATEGORY,
  PROJECT_MATURITY,
  type Project,
  type ProjectMaturity,
} from "@/domain/project";
import type { Locale } from "@/lib/i18n/locales";

const QUESTION_MAX_LENGTH = 280;
const MIN_TOKEN_LENGTH = 3;
const MINIMUM_PROJECT_SCORE = 5;

const SCORE_WEIGHT = {
  title: 5,
  slug: 5,
  tagline: 3,
  body: 2,
} as const;

const ANSWER_REJECTION = {
  empty: "empty",
  tooLong: "too-long",
} as const;

type AnswerRejection = (typeof ANSWER_REJECTION)[keyof typeof ANSWER_REJECTION];

const ANSWER_KIND = {
  refusal: "refusal",
  projects: "projects",
} as const;

const KEPT_SHORT_TOKENS = new Set(["ia", "ai"]);

const STOPWORD_SOURCE = [
  "que",
  "qué",
  "los",
  "las",
  "una",
  "uno",
  "para",
  "con",
  "sobre",
  "del",
  "como",
  "cómo",
  "the",
  "what",
  "which",
  "does",
  "have",
  "can",
  "about",
  "por",
  "com",
  "uma",
  "das",
  "dos",
] as const;

const TRY_TOKENS = new Set([
  "probar",
  "probarlo",
  "demo",
  "piloto",
  "pilot",
  "try",
  "testar",
]);

const AI_PHRASES = [
  "inteligencia artificial",
  "artificial intelligence",
  "inteligência artificial",
] as const;

const questionSchema = z.string().trim().min(1).max(QUESTION_MAX_LENGTH);

interface AnswerItem {
  id: string;
  title: string;
  maturity: ProjectMaturity;
  excerpt: string;
}

interface RejectedAnswer {
  ok: false;
  reason: AnswerRejection;
}

interface RefusalAnswer {
  ok: true;
  kind: typeof ANSWER_KIND.refusal;
}

interface ProjectAnswer {
  ok: true;
  kind: typeof ANSWER_KIND.projects;
  items: AnswerItem[];
}

type AnswerResult = RejectedAnswer | RefusalAnswer | ProjectAnswer;

interface BodyField {
  text: string;
  score: number;
}

interface ScoredProject {
  project: Project;
  score: number;
  excerpt: string;
}

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

const STOPWORDS = new Set(STOPWORD_SOURCE.map((word) => normalize(word)));
const NORMALIZED_AI_PHRASES = AI_PHRASES.map((phrase) => normalize(phrase));

function rejection(question: string): AnswerRejection | null {
  const parsed = questionSchema.safeParse(question);

  if (parsed.success) {
    return null;
  }

  const tooLong = parsed.error.issues.some((issue) => issue.code === "too_big");
  return tooLong ? ANSWER_REJECTION.tooLong : ANSWER_REJECTION.empty;
}

function tokensFrom(question: string): string[] {
  const normalized = normalize(question.trim());

  return normalized
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= MIN_TOKEN_LENGTH || KEPT_SHORT_TOKENS.has(token))
    .filter((token) => !STOPWORDS.has(token));
}

function refusal(): RefusalAnswer {
  return { ok: true, kind: ANSWER_KIND.refusal };
}

function toItem(project: Project, excerpt: string): AnswerItem {
  return {
    id: project.id,
    title: project.title,
    maturity: project.maturity,
    excerpt,
  };
}

function byOrder(left: Project, right: Project): number {
  return left.order - right.order;
}

function projectsAnswer(items: AnswerItem[]): AnswerResult {
  if (items.length === 0) {
    return refusal();
  }

  return { ok: true, kind: ANSWER_KIND.projects, items };
}

function tryAnswer(projects: readonly Project[]): AnswerResult {
  const items = projects
    .filter(
      (project) =>
        project.maturity === PROJECT_MATURITY.demo ||
        project.maturity === PROJECT_MATURITY.production,
    )
    .toSorted(byOrder)
    .map((project) => toItem(project, project.summary));

  return projectsAnswer(items);
}

function aiAnswer(projects: readonly Project[]): AnswerResult {
  const items = projects
    .filter((project) => project.categories.includes(PROJECT_CATEGORY.ai))
    .toSorted(byOrder)
    .map((project) => toItem(project, project.summary));

  return projectsAnswer(items);
}

function isAiQuestion(normalizedQuestion: string, tokens: readonly string[]): boolean {
  const phrase = NORMALIZED_AI_PHRASES.some((item) => normalizedQuestion.includes(item));
  const token = tokens.some((item) => KEPT_SHORT_TOKENS.has(item));

  return phrase || token;
}

function tokenHits(text: string, tokens: readonly string[]): number {
  const normalized = normalize(text);
  return tokens.filter((token) => normalized.includes(token)).length;
}

function bodyFields(project: Project, tokens: readonly string[]): BodyField[] {
  const texts = [
    project.summary,
    project.problem,
    project.solution,
    project.approach,
    ...(project.engineeringDecisions ?? []),
    ...project.benefits,
    ...(project.technologies ?? []),
  ];

  return texts.map((text) => ({
    text,
    score: tokenHits(text, tokens) * SCORE_WEIGHT.body,
  }));
}

function scoreProject(project: Project, tokens: readonly string[]): ScoredProject {
  const titleHits = tokenHits(project.title, tokens);
  const slugHits = tokenHits(project.slug, tokens);
  const taglineHits = tokenHits(project.tagline, tokens);
  const bodies = bodyFields(project, tokens);
  const bestBody = bodies.reduce((best, candidate) =>
    candidate.score > best.score ? candidate : best,
  );
  const bodyScore = bodies.reduce((total, candidate) => total + candidate.score, 0);
  const score =
    titleHits * SCORE_WEIGHT.title +
    slugHits * SCORE_WEIGHT.slug +
    taglineHits * SCORE_WEIGHT.tagline +
    bodyScore;
  const titleOrSlugOnly =
    (titleHits > 0 || slugHits > 0) && taglineHits === 0 && bestBody.score === 0;

  return {
    project,
    score,
    excerpt: titleOrSlugOnly ? project.summary : bestBody.text,
  };
}

function rankedAnswer(projects: readonly Project[], tokens: readonly string[]): AnswerResult {
  const items = projects
    .map((project) => scoreProject(project, tokens))
    .filter((scored) => scored.score >= MINIMUM_PROJECT_SCORE)
    .toSorted(
      (left, right) => right.score - left.score || left.project.order - right.project.order,
    )
    .map((scored) => toItem(scored.project, scored.excerpt));

  return projectsAnswer(items);
}

function answerQuestion(
  question: string,
  projects: readonly Project[],
  locale: Locale,
): AnswerResult {
  switch (locale) {
    case "es":
    case "en":
    case "pt":
      return answerPublished(question, projects);
  }
}

function answerPublished(question: string, projects: readonly Project[]): AnswerResult {
  const rejected = rejection(question);

  if (rejected !== null) {
    return { ok: false, reason: rejected };
  }

  const tokens = tokensFrom(question);
  const normalizedQuestion = normalize(question.trim());

  if (tokens.some((token) => TRY_TOKENS.has(token))) {
    return tryAnswer(projects);
  }

  if (isAiQuestion(normalizedQuestion, tokens)) {
    return aiAnswer(projects);
  }

  return rankedAnswer(projects, tokens);
}

export { answerQuestion };
export type { AnswerItem, AnswerResult };
