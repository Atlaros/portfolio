import type { Project } from "@/domain/project";
import {
  CAPABILITY_EVIDENCE_SLUGS,
  type CapabilityId,
} from "@/lib/capabilities/config";

function resolveCapabilityEvidence(
  capabilityId: CapabilityId,
  projects: readonly Project[],
): Project[] {
  const slugs = CAPABILITY_EVIDENCE_SLUGS[capabilityId];

  return slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => project !== undefined);
}

function collectProjectTechnologies(projects: readonly Project[]): string[] {
  const seen = new Set<string>();
  const technologies: string[] = [];

  for (const project of projects) {
    for (const item of project.technologies ?? []) {
      if (seen.has(item)) {
        continue;
      }

      seen.add(item);
      technologies.push(item);
    }
  }

  return technologies;
}

export { collectProjectTechnologies, resolveCapabilityEvidence };
