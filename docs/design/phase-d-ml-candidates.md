# Phase D — Machine Learning catalog candidates

**Status:** Prepared in Phase C. Not published as MDX cases yet.

## Source

Diego Borges Portfolio PDF lists InventoryIQ and TrustScore under applied predictive ML. Local sibling repositories exist for verification; they are not portfolio content until MDX + checks pass.

## Candidates

| Name | Local path (machine) | PDF claim to verify | Publish gate |
| --- | --- | --- | --- |
| InventoryIQ | `../InventoryIQ` | Demand forecasting pipeline (ETL, features, evaluation, API) | README vs code; no inventing RMSE/MAPE in the site; add `content/{es,en,pt}/projects/*.mdx` only with verified stack and scope |
| TrustScore | `../trust_score` | Document validation + XGBoost risk score with human escalation | Confirm authorship/contribution; no synthetic KPI copy; MDX only after review |

## Rules for Phase D

1. Verify repository ownership and current scope before any `liveUrl` or `repositoryUrl`.
2. Do not copy PDF metrics into MDX without a `source` field that points to a real measurement.
3. Wire capability evidence via `CAPABILITY_EVIDENCE_SLUGS.ml` once MDX is published; remove pending UI when catalog links exist.
4. Quipu AI remains out of this Phase C pending list until separately authorized.

## UI today

The Machine Learning panel shows these two names as **pending verification · Phase D**, without links.
