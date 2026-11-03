import { z } from "zod";

const PROJECT_CATEGORY = {
  analytics: "analytics",
  "data-science": "data-science",
  ai: "ai",
  "data-engineering": "data-engineering",
} as const;

type ProjectCategory = (typeof PROJECT_CATEGORY)[keyof typeof PROJECT_CATEGORY];

const PROJECT_STATUS = {
  published: "published",
  draft: "draft",
  archived: "archived",
} as const;

type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

const PROJECT_MATURITY = {
  prototype: "prototype",
  demo: "demo",
  production: "production",
} as const;

type ProjectMaturity = (typeof PROJECT_MATURITY)[keyof typeof PROJECT_MATURITY];

const PROJECT_PARTICIPATION = {
  personal: "personal",
  collaborative: "collaborative",
  internship: "internship",
} as const;

type ProjectParticipation =
  (typeof PROJECT_PARTICIPATION)[keyof typeof PROJECT_PARTICIPATION];

const PROJECT_MEDIA_TYPE = {
  image: "image",
  video: "video",
  diagram: "diagram",
} as const;

type ProjectMediaType = (typeof PROJECT_MEDIA_TYPE)[keyof typeof PROJECT_MEDIA_TYPE];

interface ProjectMetric {
  label: string;
  value: string;
  source?: string;
}

interface ProjectMedia {
  src: string;
  alt: string;
  caption?: string;
  type: ProjectMediaType;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  problem: string;
  whyItMatters?: string;
  solution: string;
  approach: string;
  engineeringDecisions?: string[];
  validation?: string;
  benefits: string[];
  limitations?: string;
  metrics?: ProjectMetric[];
  categories: ProjectCategory[];
  technologies?: string[];
  featured: boolean;
  order: number;
  liveUrl?: string;
  repositoryUrl?: string;
  screenshots?: ProjectMedia[];
  videos?: ProjectMedia[];
  diagrams?: ProjectMedia[];
  ogImage?: string;
  status: ProjectStatus;
  maturity: ProjectMaturity;
  participation?: ProjectParticipation;
}

const requiredText = z.string().trim().min(1);
const textList = z.array(requiredText);

function blankToUndefined(value: unknown): unknown {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
}

const optionalText = z.preprocess(blankToUndefined, requiredText.optional());

const projectMetricSchema = z
  .object({
    label: requiredText,
    value: requiredText,
    source: optionalText,
  })
  .refine(
    (metric) => !/\d/.test(metric.value) || typeof metric.source === "string",
    {
      message: "A quantitative metric requires source.",
      path: ["source"],
    },
  );

const projectMediaSchema = z.object({
  src: requiredText,
  alt: requiredText,
  caption: optionalText,
  type: z.enum(PROJECT_MEDIA_TYPE),
});

const projectSchema = z.object({
  id: requiredText,
  slug: requiredText,
  title: requiredText,
  tagline: requiredText,
  summary: requiredText,
  problem: requiredText,
  whyItMatters: optionalText,
  solution: requiredText,
  approach: requiredText,
  engineeringDecisions: textList.optional(),
  validation: optionalText,
  benefits: textList,
  limitations: optionalText,
  metrics: z.array(projectMetricSchema).optional(),
  categories: z.array(z.enum(PROJECT_CATEGORY)),
  technologies: textList.optional(),
  featured: z.boolean(),
  order: z.number().int(),
  liveUrl: optionalText,
  repositoryUrl: optionalText,
  screenshots: z.array(projectMediaSchema).optional(),
  videos: z.array(projectMediaSchema).optional(),
  diagrams: z.array(projectMediaSchema).optional(),
  ogImage: optionalText,
  status: z.enum(PROJECT_STATUS),
  maturity: z.enum(PROJECT_MATURITY),
  participation: z.enum(PROJECT_PARTICIPATION).optional(),
});

function isPublished(project: Pick<Project, "status">): boolean {
  return project.status === PROJECT_STATUS.published;
}

export {
  PROJECT_CATEGORY,
  PROJECT_MATURITY,
  PROJECT_MEDIA_TYPE,
  PROJECT_PARTICIPATION,
  PROJECT_STATUS,
  isPublished,
  projectSchema,
};
export type {
  Project,
  ProjectCategory,
  ProjectMaturity,
  ProjectMedia,
  ProjectMediaType,
  ProjectMetric,
  ProjectParticipation,
  ProjectStatus,
};
