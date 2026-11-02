import { CAPABILITY_ID, type CapabilityId } from "./config";

/**
 * Phase D candidates named in the portfolio PDF. Not catalog entries.
 * No URLs until repos and MDX are verified. Do not invent metrics here.
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

const ML_PENDING_CANDIDATES: readonly PendingEvidenceCandidate[] = [
  {
    id: "inventoryiq",
    name: "InventoryIQ",
    focus: {
      es: "Forecasting de demanda sobre datos transaccionales.",
      en: "Demand forecasting on transactional data.",
      pt: "Forecasting de demanda sobre dados transacionais.",
    },
  },
  {
    id: "trustscore",
    name: "TrustScore",
    focus: {
      es: "Evaluación de riesgo con revisión humana cuando el modelo y la evidencia discrepan.",
      en: "Risk assessment with human review when the model and the evidence disagree.",
      pt: "Avaliação de risco com revisão humana quando o modelo e a evidência discordam.",
    },
  },
] as const;

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
