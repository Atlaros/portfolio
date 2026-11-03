"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useEntranceEnabled } from "@/components/motion/use-entrance-enabled";
import type { Project } from "@/domain/project";
import {
  nodeRoles,
  productStageCopy,
  SCENE_FRAME,
  type SceneCopy,
  type SceneFrame,
} from "@/lib/i18n/product-stage";
import { projectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";

const PANEL_SECONDS = 0.24;
const PANEL_RISE_PX = 8;
const FLOW_SECONDS = 2.6;
const QUIET_FLOW_SECONDS = 5.2;

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

const CORE_NODES = new Set(["rag", "control", "normalizacion", "exploracion", "ahp", "criterios"]);
const OUTCOME_NODES = new Set(["disponible", "comparacion", "priorizacion"]);
const LIMIT_NODES = new Set(["insuficiente", "modelo"]);

interface Point {
  x: number;
  y: number;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ProductStageProps {
  locale: Locale;
  projects: readonly Project[];
}

export function ProductStage({ locale, projects }: ProductStageProps) {
  const copy = productStageCopy[locale];
  const roles: Record<string, string> = nodeRoles[locale];
  const access = projectCopy[locale];
  const play = useEntranceEnabled();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [index, setIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const labelId = `${baseId}-label`;
  const detailId = `${baseId}-detail`;
  const scene = copy.scenes[index] ?? copy.scenes[0];
  const project = projects.find((item) => item.slug === scene.slug);
  const selectedNode = scene.nodes[nodeIndex] ?? scene.nodes[0];

  function selectScene(next: number) {
    setIndex(next);
    setNodeIndex(0);
  }

  function onTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = indexFromKey(event.key, index, copy.scenes.length);

    if (next === null) {
      return;
    }

    event.preventDefault();
    selectScene(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="relative w-full min-w-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -inset-y-6 -z-10 bg-[radial-gradient(circle_at_center,rgb(24_212_216/0.14),transparent_68%)]"
      />
      <p id={labelId} className="font-mono text-xs tracking-[0.22em] text-muted uppercase">
        {copy.label}
      </p>
      <p className="mt-1.5 max-w-md text-sm leading-snug text-muted">{copy.note}</p>
      <div
        role="tablist"
        aria-labelledby={labelId}
        aria-orientation="horizontal"
        onKeyDown={onTabsKeyDown}
        className="mt-3 flex flex-wrap gap-2"
      >
        {copy.scenes.map((item, sceneIndex) => {
          const selected = sceneIndex === index;

          return (
            <button
              key={item.slug}
              ref={(node) => {
                tabRefs.current[sceneIndex] = node;
              }}
              id={`${baseId}-tab-${sceneIndex}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectScene(sceneIndex)}
              className={`${focusRing} min-h-11 cursor-pointer border px-4 text-sm font-medium ${
                selected
                  ? "border-cyan bg-cyan text-background"
                  : "border-foreground/15 bg-surface text-foreground"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <ScenePanel
        play={play}
        panelId={panelId}
        detailId={detailId}
        labelledBy={`${baseId}-tab-${index}`}
        scene={scene}
        roles={roles}
        nodesLabel={copy.nodesLabel}
        decisionLabel={copy.decisionLabel}
        boundaryLabel={copy.boundaryLabel}
        nodeIndex={nodeIndex}
        onSelectNode={setNodeIndex}
        locale={locale}
        project={project}
        viewCase={access.viewCase}
        openPilot={access.openPilot}
        invitePlatform={access.invitePlatform}
        noPublicDemo={access.noPublicDemo}
        selectedNode={selectedNode}
      />
    </div>
  );
}

function ScenePanel({
  play,
  panelId,
  detailId,
  labelledBy,
  scene,
  roles,
  nodesLabel,
  decisionLabel,
  boundaryLabel,
  nodeIndex,
  onSelectNode,
  locale,
  project,
  viewCase,
  openPilot,
  invitePlatform,
  noPublicDemo,
  selectedNode,
}: {
  play: boolean;
  panelId: string;
  detailId: string;
  labelledBy: string;
  scene: SceneCopy;
  roles: Record<string, string>;
  nodesLabel: string;
  decisionLabel: string;
  boundaryLabel: string;
  nodeIndex: number;
  onSelectNode: (index: number) => void;
  locale: Locale;
  project: Project | undefined;
  viewCase: string;
  openPilot: string;
  invitePlatform: string;
  noPublicDemo: string;
  selectedNode: SceneCopy["nodes"][number];
}) {
  const body = (
    <div className="relative">
      <div
        aria-hidden
        className="absolute top-4 right-0 -bottom-3 left-7 rounded-2xl border border-blue/30 bg-blue/10"
      />
      <div className="relative overflow-hidden rounded-2xl border border-cyan/30 bg-surface-raised shadow-[0_28px_80px_rgb(11_16_27/0.55)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(77_124_255/0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(77_124_255/0.14)_1px,transparent_1px)] bg-[size:28px_28px] opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
        />
        <div className="relative px-3 py-3 sm:px-5 sm:py-4">
          <SceneGraph
            scene={scene}
            roles={roles}
            nodesLabel={nodesLabel}
            detailId={detailId}
            boundaryLabel={boundaryLabel}
            nodeIndex={nodeIndex}
            onSelectNode={onSelectNode}
            play={play}
          />
          <NodeDetail
            play={play}
            detailId={detailId}
            decisionLabel={decisionLabel}
            node={selectedNode}
          />
          <p className="mt-2 text-sm leading-snug text-muted">{scene.caption}</p>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            <a
              href={`/${locale}/projects/${scene.slug}`}
              className={`${focusRing} inline-flex min-h-11 items-center text-sm text-cyan`}
            >
              {viewCase}
            </a>
            <SceneAccess
              slug={scene.slug}
              liveUrl={project?.liveUrl}
              openPilot={openPilot}
              invitePlatform={invitePlatform}
              noPublicDemo={noPublicDemo}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (!play) {
    return (
      <div id={panelId} role="tabpanel" aria-labelledby={labelledBy} className="mt-3">
        {body}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene.slug}
        id={panelId}
        role="tabpanel"
        aria-labelledby={labelledBy}
        className="mt-3"
        initial={{ opacity: 0, y: PANEL_RISE_PX }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: PANEL_SECONDS, ease: "easeOut" }}
      >
        {body}
      </motion.div>
    </AnimatePresence>
  );
}

function SceneGraph({
  scene,
  roles,
  nodesLabel,
  detailId,
  boundaryLabel,
  nodeIndex,
  onSelectNode,
  play,
}: {
  scene: SceneCopy;
  roles: Record<string, string>;
  nodesLabel: string;
  detailId: string;
  boundaryLabel: string;
  nodeIndex: number;
  onSelectNode: (index: number) => void;
  play: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const measured = useNodeBoxes(frameRef, nodeRefs, scene.slug);
  const boxes = measured.boxes;
  const selected = scene.nodes[nodeIndex] ?? scene.nodes[0];

  function onNodesKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = indexFromKey(event.key, nodeIndex, scene.nodes.length);

    if (next === null) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    onSelectNode(next);
    const nextNode = scene.nodes[next];

    if (nextNode !== undefined) {
      nodeRefs.current[nextNode.id]?.focus();
    }
  }

  return (
    <div
      ref={frameRef}
      role="group"
      aria-label={nodesLabel}
      onKeyDown={onNodesKeyDown}
      className={`relative grid gap-x-3 gap-y-8 sm:gap-x-8 sm:gap-y-11 ${frameGrid(scene.frame)}`}
    >
      {measured.width > 0 && measured.height > 0 ? (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${measured.width} ${measured.height}`}
        aria-hidden
      >
        <FrameMotif frame={scene.frame} />
        <Boundary
          scene={scene}
          boxes={boxes}
          boundaryLabel={boundaryLabel}
        />
        {scene.links.map((link) => {
          const from = boxes[link.from];
          const to = boxes[link.to];

          if (from === undefined || to === undefined) {
            return null;
          }

          const drawn = linkDraw(from, to);

          if (drawn === null) {
            return null;
          }

          const pertinent = selected.id === link.from || selected.id === link.to;

          return (
            <FlowLink
              key={`${link.from}-${link.to}`}
              drawn={drawn}
              pertinent={pertinent}
              play={play}
            />
          );
        })}
      </svg>
      ) : null}
      {scene.nodes.map((node, index) => {
        const active = node.id === selected.id;
        const aside = node.id === "modelo";
        const limit = LIMIT_NODES.has(node.id);
        const core = CORE_NODES.has(node.id);
        const outcome = OUTCOME_NODES.has(node.id);

        return (
          <StageNode
            key={node.id}
            node={node}
            role={roles[node.id] ?? node.label}
            active={active}
            aside={aside}
            limit={limit}
            core={core}
            outcome={outcome}
            place={placement(scene.frame, node.id)}
            showCut={scene.frame === SCENE_FRAME.criteria && node.id === "modelo"}
            boundaryLabel={boundaryLabel}
            detailId={detailId}
            buttonRef={(element) => {
              nodeRefs.current[node.id] = element;
            }}
            onSelect={() => onSelectNode(index)}
          />
        );
      })}
    </div>
  );
}

function StageNode({
  node,
  role,
  active,
  aside,
  limit,
  core,
  outcome,
  place,
  showCut,
  boundaryLabel,
  detailId,
  buttonRef,
  onSelect,
}: {
  node: SceneCopy["nodes"][number];
  role: string;
  active: boolean;
  aside: boolean;
  limit: boolean;
  core: boolean;
  outcome: boolean;
  place: string;
  showCut: boolean;
  boundaryLabel: string;
  detailId: string;
  buttonRef: (element: HTMLButtonElement | null) => void;
  onSelect: () => void;
}) {
  return (
    <>
      {showCut ? (
        <p className="z-10 col-span-full py-1 text-center">
          <span className="inline-block border border-dashed border-muted/50 bg-surface-raised px-3 py-1 font-mono text-[0.65rem] tracking-[0.16em] text-muted uppercase">
            {boundaryLabel}
          </span>
        </p>
      ) : null}
      <button
        ref={buttonRef}
        type="button"
        aria-pressed={active}
        aria-controls={detailId}
        tabIndex={active ? 0 : -1}
        onClick={onSelect}
        className={`${focusRing} ${place} relative z-10 flex h-full min-h-[4.5rem] min-w-0 cursor-pointer flex-col items-start justify-start gap-2 border px-3 py-2.5 text-left motion-safe:transition-shadow sm:min-h-24 sm:gap-2.5 sm:py-3 ${nodeSurface(active, aside, limit, core, outcome)}`}
      >
        <span className="flex min-w-0 items-start gap-3">
          <span
            className={`grid shrink-0 place-items-center rounded-lg ${outcome || active ? "size-11" : "size-10"} ${iconSurface(active, aside, outcome)}`}
          >
            <NodeGlyph id={node.id} />
          </span>
          <span className="min-w-0">
            <span className="font-mono text-[0.65rem] tracking-[0.16em] text-cyan uppercase">{role}</span>
            <span className="mt-1 block text-sm leading-snug font-medium text-balance">{node.label}</span>
          </span>
        </span>
        <NodeMotif id={node.id} />
      </button>
    </>
  );
}

function NodeMotif({ id }: { id: string }) {
  if (id === "rag" || id === "control") {
    return (
      <span aria-hidden className="relative min-h-10 w-full flex-1 sm:min-h-12">
        <span className="absolute inset-x-5 top-[8%] h-[38%] rounded-md border border-blue/30" />
        <span className="absolute inset-x-2 top-[28%] h-[38%] rounded-md border border-blue/45 bg-blue/10" />
        <span className="absolute inset-x-0 top-[48%] flex h-[42%] items-center rounded-md border border-cyan/45 bg-background px-3">
          <span className="h-px w-2/3 bg-cyan/70" />
        </span>
      </span>
    );
  }

  if (id === "comparacion") {
    return (
      <span aria-hidden className="grid w-full grid-cols-2 gap-2 pt-1">
        <span className="space-y-1.5 rounded-md border border-cyan/35 bg-background/80 p-2">
          <span className="block h-1.5 w-3/4 rounded-full bg-cyan/50" />
          <span className="block h-1 w-full rounded-full bg-blue/25" />
          <span className="block h-1 w-2/3 rounded-full bg-blue/25" />
        </span>
        <span className="space-y-1.5 rounded-md border border-blue/30 bg-background/60 p-2">
          <span className="block h-1.5 w-2/3 rounded-full bg-blue/40" />
          <span className="block h-1 w-full rounded-full bg-blue/20" />
          <span className="block h-1 w-1/2 rounded-full bg-blue/20" />
        </span>
      </span>
    );
  }

  if (id === "disponible" || id === "priorizacion") {
    return (
      <span aria-hidden className="mt-0.5 flex w-full items-center gap-2">
        <span className="h-px flex-1 bg-cyan/50" />
        <span className="size-1.5 rounded-full bg-cyan" />
      </span>
    );
  }

  if (id === "insuficiente" || id === "modelo") {
    return (
      <span aria-hidden className="mt-0.5 h-px w-full border-t border-dashed border-muted/50" />
    );
  }

  if (id === "fuentes" || id === "evidencia") {
    return (
      <span aria-hidden className="mt-1 flex gap-1.5">
        <span className="h-2 w-6 rounded-sm border border-blue/35 bg-blue/10" />
        <span className="h-2 w-8 rounded-sm border border-blue/25" />
        <span className="h-2 w-5 rounded-sm border border-cyan/30" />
      </span>
    );
  }

  return null;
}

function FrameMotif({ frame }: { frame: SceneFrame }) {
  if (frame === SCENE_FRAME.pipeline) {
    return (
      <>
        <rect x="10%" y="4%" width="80%" height="50%" rx="16" fill="rgb(77 124 255 / 0.05)" stroke="#4D7CFF" strokeOpacity="0.2" />
        <rect x="8%" y="62%" width="40%" height="28%" rx="12" fill="none" stroke="#18D4D8" strokeOpacity="0.22" />
        <rect x="52%" y="62%" width="40%" height="28%" rx="12" fill="none" stroke="#A7B3C7" strokeOpacity="0.35" strokeDasharray="5 6" />
      </>
    );
  }

  if (frame === SCENE_FRAME.catalog) {
    return (
      <>
        <ellipse cx="50%" cy="22%" rx="22%" ry="12%" fill="none" stroke="#18D4D8" strokeOpacity="0.18" />
        <rect x="12%" y="38%" width="76%" height="48%" rx="14" fill="rgb(24 212 216 / 0.04)" stroke="#4D7CFF" strokeOpacity="0.16" />
      </>
    );
  }

  return (
    <>
      <rect x="6%" y="4%" width="88%" height="62%" rx="14" fill="rgb(77 124 255 / 0.05)" stroke="#4D7CFF" strokeOpacity="0.18" />
      <rect x="10%" y="72%" width="80%" height="20%" rx="10" fill="none" stroke="#A7B3C7" strokeOpacity="0.35" strokeDasharray="5 6" />
    </>
  );
}

function Boundary({
  scene,
  boxes,
  boundaryLabel,
}: {
  scene: SceneCopy;
  boxes: Record<string, Box>;
  boundaryLabel: string;
}) {
  if (scene.frame !== SCENE_FRAME.criteria) {
    return null;
  }

  const score = boxes.priorizacion ?? boxes.ahp;
  const model = boxes.modelo;

  if (score === undefined || model === undefined) {
    return null;
  }

  const y = score.y + score.h + (model.y - (score.y + score.h)) / 2;
  const width = Math.max(score.x + score.w, model.x + model.w, 1);

  return (
    <g>
      <line
        x1={width * 0.06}
        y1={y}
        x2={width * 0.94}
        y2={y}
        stroke="#A7B3C7"
        strokeOpacity="0.55"
        strokeDasharray="4 7"
        strokeWidth="1.25"
      />
      <title>{boundaryLabel}</title>
    </g>
  );
}

function FlowLink({
  drawn,
  pertinent,
  play,
}: {
  drawn: LinkDraw;
  pertinent: boolean;
  play: boolean;
}) {
  const moving = play;
  const color = pertinent ? "#18D4D8" : "#4D7CFF";

  return (
    <g>
      <motion.path
        d={drawn.d}
        fill="none"
        stroke={color}
        strokeOpacity={pertinent ? 0.34 : 0.08}
        strokeWidth={pertinent ? 8 : 4}
        strokeLinecap="round"
      />
      <motion.path
        d={drawn.d}
        fill="none"
        stroke={color}
        strokeOpacity={pertinent ? 1 : 0.32}
        strokeWidth={pertinent ? 2.5 : 1.25}
        strokeLinecap="round"
        strokeDasharray={moving ? "7 9" : "0"}
        animate={moving ? { strokeDashoffset: [0, -32] } : { strokeDashoffset: 0 }}
        transition={
          moving
            ? { duration: pertinent ? FLOW_SECONDS : QUIET_FLOW_SECONDS, repeat: Infinity, ease: "linear" }
            : { duration: 0 }
        }
      />
      <polygon points={arrowPoints(drawn.tip, drawn.angle)} fill={color} opacity={pertinent ? 1 : 0.55} />
    </g>
  );
}

function NodeDetail({
  play,
  detailId,
  decisionLabel,
  node,
}: {
  play: boolean;
  detailId: string;
  decisionLabel: string;
  node: SceneCopy["nodes"][number];
}) {
  const body = (
    <div className="min-w-0 border-l-2 border-cyan pl-3">
      <p className="sr-only">{node.label}</p>
      <p className="text-sm leading-snug text-foreground/90">{node.detail}</p>
      <p className="mt-1.5 text-sm leading-snug text-muted">
        <span className="font-mono text-[0.65rem] tracking-[0.16em] text-cyan uppercase">{decisionLabel}</span>
        <span className="mt-0.5 block">{node.decision}</span>
      </p>
    </div>
  );

  return (
    <div id={detailId} aria-live="polite" className="relative mt-3">
      {play ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {body}
          </motion.div>
        </AnimatePresence>
      ) : (
        body
      )}
    </div>
  );
}

function SceneAccess({
  slug,
  liveUrl,
  openPilot,
  invitePlatform,
  noPublicDemo,
}: {
  slug: string;
  liveUrl: string | undefined;
  openPilot: string;
  invitePlatform: string;
  noPublicDemo: string;
}) {
  if (liveUrl === undefined) {
    return <p className="inline-flex min-h-11 items-center text-sm text-muted">{noPublicDemo}</p>;
  }

  const label = slug === "partner-intelligence" ? invitePlatform : openPilot;

  return (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${focusRing} inline-flex min-h-11 items-center text-sm text-foreground`}
    >
      {label}
    </a>
  );
}

function NodeGlyph({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      {glyph(id)}
    </svg>
  );
}

function glyph(id: string): ReactNode {
  if (id === "consulta") {
    return <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12v8H9l-3 3V7z" />;
  }

  if (id === "rag") {
    return (
      <>
        <path strokeLinecap="round" d="M8 5h8v13H8z" />
        <path strokeLinecap="round" d="M10 8h4M10 11h4M10 14h3" />
      </>
    );
  }

  if (id === "control") {
    return <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10" />;
  }

  if (id === "disponible") {
    return <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M14 7l5 5-5 5" />;
  }

  if (id === "insuficiente") {
    return <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l7 13H5zM12 10v4M12 16.5h.01" />;
  }

  if (id === "fuentes") {
    return <path strokeLinecap="round" d="M6 6h5v5H6zM13 6h5v5h-5zM6 13h5v5H6zM13 13h5v5h-5z" />;
  }

  if (id === "normalizacion") {
    return <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M7 12h10M9 16h6" />;
  }

  if (id === "exploracion") {
    return (
      <>
        <circle cx="11" cy="11" r="5" />
        <path strokeLinecap="round" d="M15 15l4 4" />
      </>
    );
  }

  if (id === "comparacion") {
    return <path strokeLinecap="round" d="M5 6h6v12H5zM13 6h6v12h-6z" />;
  }

  if (id === "evidencia") {
    return <path strokeLinecap="round" d="M7 5h10v14H7zM10 9h4M10 12h4M10 15h3" />;
  }

  if (id === "criterios") {
    return <path strokeLinecap="round" d="M8 7h10M8 12h10M8 17h10M5 7h.01M5 12h.01M5 17h.01" />;
  }

  if (id === "ahp") {
    return <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l6 12 6-12M8 12h8" />;
  }

  if (id === "priorizacion") {
    return <path strokeLinecap="round" strokeLinejoin="round" d="M6 16V9M12 16V5M18 16v-4" />;
  }

  return <path strokeLinecap="round" strokeDasharray="3 2" d="M7 6h10v12H7z" />;
}

function frameGrid(frame: SceneFrame): string {
  if (frame === SCENE_FRAME.pipeline) {
    return "grid-cols-1 sm:grid-cols-2";
  }

  if (frame === SCENE_FRAME.catalog) {
    return "grid-cols-1 sm:grid-cols-2";
  }

  if (frame === SCENE_FRAME.criteria) {
    return "grid-cols-1 sm:grid-cols-2";
  }

  return "grid-cols-1";
}

function placement(frame: SceneFrame, id: string): string {
  if (frame === SCENE_FRAME.pipeline) {
    if (id === "consulta" || id === "rag" || id === "control") {
      return "sm:col-span-2";
    }

    return "";
  }

  if (frame === SCENE_FRAME.catalog) {
    if (id === "fuentes" || id === "comparacion") {
      return "sm:col-span-2";
    }

    return "";
  }

  if (frame === SCENE_FRAME.criteria) {
    if (id === "ahp" || id === "priorizacion" || id === "modelo") {
      return "sm:col-span-2";
    }
  }

  return "";
}

function nodeSurface(
  active: boolean,
  aside: boolean,
  limit: boolean,
  core: boolean,
  outcome: boolean,
): string {
  if (active && aside) {
    return "border-dashed border-cyan bg-background text-foreground shadow-[0_0_0_1px_rgb(24_212_216/0.6),0_0_24px_rgb(24_212_216/0.16)]";
  }

  if (active && outcome) {
    return "border-cyan bg-cyan/10 text-foreground shadow-[0_0_0_1px_rgb(24_212_216/0.9),0_0_32px_rgb(24_212_216/0.28)]";
  }

  if (active) {
    return "border-cyan bg-background text-foreground shadow-[0_0_0_1px_rgb(24_212_216/0.85),0_0_28px_rgb(24_212_216/0.22)]";
  }

  if (aside || limit) {
    return "border-dashed border-muted/45 bg-background/35 text-foreground/70";
  }

  if (outcome) {
    return "border-cyan/45 bg-cyan/5 text-foreground shadow-[inset_0_0_0_1px_rgb(24_212_216/0.12)]";
  }

  if (core) {
    return "border-blue/40 bg-background/80 text-foreground/90";
  }

  return "border-blue/30 bg-background/55 text-foreground/80";
}

function iconSurface(active: boolean, aside: boolean, outcome: boolean): string {
  if (active) {
    return "bg-cyan text-background";
  }

  if (aside) {
    return "bg-transparent text-muted";
  }

  if (outcome) {
    return "bg-cyan/20 text-cyan";
  }

  return "bg-blue/15 text-blue";
}

interface LinkDraw {
  d: string;
  tip: Point;
  angle: number;
}

function linkDraw(from: Box, to: Box): LinkDraw | null {
  const start = edgePoint(from, center(to));
  const end = edgePoint(to, center(from));
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);

  if (length < 20) {
    return null;
  }

  const ux = dx / length;
  const uy = dy / length;
  const tip = { x: end.x, y: end.y };
  const lineEnd = { x: end.x - ux * 10, y: end.y - uy * 10 };

  return {
    d: `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} L ${lineEnd.x.toFixed(1)} ${lineEnd.y.toFixed(1)}`,
    tip,
    angle: Math.atan2(dy, dx),
  };
}

function center(box: Box): Point {
  return { x: box.x + box.w / 2, y: box.y + box.h / 2 };
}

function edgePoint(box: Box, toward: Point): Point {
  const origin = center(box);
  const dx = toward.x - origin.x;
  const dy = toward.y - origin.y;

  if (dx === 0 && dy === 0) {
    return origin;
  }

  const scaleX = dx === 0 ? Number.POSITIVE_INFINITY : box.w / 2 / Math.abs(dx);
  const scaleY = dy === 0 ? Number.POSITIVE_INFINITY : box.h / 2 / Math.abs(dy);
  const scale = Math.min(scaleX, scaleY);

  return { x: origin.x + dx * scale, y: origin.y + dy * scale };
}

function arrowPoints(tip: Point, angle: number): string {
  const size = 8;
  const left = angle + Math.PI * 0.82;
  const right = angle - Math.PI * 0.82;

  return `${tip.x},${tip.y} ${tip.x + Math.cos(left) * size},${tip.y + Math.sin(left) * size} ${tip.x + Math.cos(right) * size},${tip.y + Math.sin(right) * size}`;
}

function useNodeBoxes(
  frameRef: RefObject<HTMLDivElement | null>,
  nodeRefs: RefObject<Record<string, HTMLButtonElement | null>>,
  sceneId: string,
) {
  const [boxes, setBoxes] = useState<Record<string, Box>>({});
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const frame = frameRef.current;

    if (frame === null) {
      return;
    }

    const read = () => {
      const origin = frame.getBoundingClientRect();
      const next: Record<string, Box> = {};

      for (const [id, node] of Object.entries(nodeRefs.current)) {
        if (node === null) {
          continue;
        }

        const rect = node.getBoundingClientRect();
        next[id] = {
          x: rect.left - origin.left,
          y: rect.top - origin.top,
          w: rect.width,
          h: rect.height,
        };
      }

      setBoxes((current) => (sameBoxes(current, next) ? current : next));
      setSize((current) =>
        Math.abs(current.width - origin.width) < 0.5 && Math.abs(current.height - origin.height) < 0.5
          ? current
          : { width: origin.width, height: origin.height },
      );
    };

    read();
    const observer = new ResizeObserver(read);
    observer.observe(frame);

    return () => observer.disconnect();
  }, [frameRef, nodeRefs, sceneId]);

  return { boxes, width: size.width, height: size.height };
}

function sameBoxes(current: Record<string, Box>, next: Record<string, Box>): boolean {
  const keys = Object.keys(next);

  if (keys.length !== Object.keys(current).length) {
    return false;
  }

  return keys.every((key) => {
    const left = current[key];
    const right = next[key];

    if (left === undefined || right === undefined) {
      return false;
    }

    return (
      Math.abs(left.x - right.x) < 0.5 &&
      Math.abs(left.y - right.y) < 0.5 &&
      Math.abs(left.w - right.w) < 0.5 &&
      Math.abs(left.h - right.h) < 0.5
    );
  });
}

function indexFromKey(key: string, index: number, count: number): number | null {
  if (key === "ArrowRight" || key === "ArrowDown") {
    return (index + 1) % count;
  }

  if (key === "ArrowLeft" || key === "ArrowUp") {
    return (index - 1 + count) % count;
  }

  if (key === "Home") {
    return 0;
  }

  if (key === "End") {
    return count - 1;
  }

  return null;
}
