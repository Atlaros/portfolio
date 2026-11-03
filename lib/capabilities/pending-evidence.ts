import { CAPABILITY_ID, type CapabilityId } from "./config";

/**
 * Prep list for capability evidence that is not yet published as MDX.
 * Published ML cases live in CAPABILITY_EVIDENCE_SLUGS.ml only.
 * Keep this module free of URLs and public UI wiring.
 */
interface PendingEvidenceCandidate {
  id: string;
  name: string;
  focus: {
    es: string;
    en: string;
    pt: string;
  };
}

const ML_PENDING_CANDIDATES: readonly PendingEvidenceCandidate[] = [] as const;

const PENDING_EVIDENCE_BY_CAPABILITY: Partial<
  Record<CapabilityId, readonly PendingEvidenceCandidate[]>
> = {
  [CAPABILITY_ID.ml]: ML_PENDING_CANDIDATES,
};

function pendingEvidenceFor(capabilityId: CapabilityId): readonly PendingEvidenceCandidate[] {
  return PENDING_EVIDENCE_BY_CAPABILITY[capabilityId] ?? [];
}

export {
  ML_PENDING_CANDIDATES,
  PENDING_EVIDENCE_BY_CAPABILITY,
  pendingEvidenceFor,
  type PendingEvidenceCandidate,
};
