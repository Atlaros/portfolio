const CAPABILITY_ID = {
  aiAgentic: "ai-agentic",
  data: "data",
  fullstack: "fullstack",
  ml: "ml",
} as const;

type CapabilityId = (typeof CAPABILITY_ID)[keyof typeof CAPABILITY_ID];

const CAPABILITY_ORDER: readonly CapabilityId[] = [
  CAPABILITY_ID.aiAgentic,
  CAPABILITY_ID.data,
  CAPABILITY_ID.fullstack,
  CAPABILITY_ID.ml,
];

const CAPABILITY_EVIDENCE_SLUGS: Record<CapabilityId, readonly string[]> = {
  [CAPABILITY_ID.aiAgentic]: ["tramit-ia"],
  [CAPABILITY_ID.data]: ["academ-ia", "partner-intelligence"],
  [CAPABILITY_ID.fullstack]: ["tramit-ia", "academ-ia"],
  [CAPABILITY_ID.ml]: ["inventoryiq", "trustscore"],
};

export { CAPABILITY_EVIDENCE_SLUGS, CAPABILITY_ID, CAPABILITY_ORDER, type CapabilityId };
