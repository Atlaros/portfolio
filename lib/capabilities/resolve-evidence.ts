import type { Project } from "@/domain/project";
import {
  CAPABILITY_EVIDENCE_SLUGS,
  type CapabilityId,
} from "@/lib/capabilities/config";

/**
 * Resolve published projects linked as evidence for a capability.
 *
 * Specialty technology lists must NOT be inferred by aggregating
 * `project.technologies`. That frontmatter describes the whole case
 * (UI, auth, deploy, etc.) and misattributes tools to a specialty —
 * e.g. Supabase Auth under Data Engineering.
 *
 * Reliable classification (choose one when a specialty needs a tech line):
 * 1. Curated allowlist per capability (`CAPABILITY_TECH_FOCUS`) intersected
 *    with linked project technologies — still human-curated.
 * 2. Optional MDX field scoped to the specialty claim only
 *    (e.g. `capabilityTech`), without duplicating the full project stack.
 *
 * Until either exists, the Capabilities section shows project name links only.
 */
function resolveCapabilityEvidence(
  capabilityId: CapabilityId,
  projects: readonly Project[],
): Project[] {
  const slugs = CAPABILITY_EVIDENCE_SLUGS[capabilityId];

  return slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => project !== undefined);
}

export { resolveCapabilityEvidence };
