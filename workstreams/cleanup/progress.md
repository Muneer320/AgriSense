# Public-fork cleanup progress

This pass belongs to `Muneer320/AgriSense`, branch `codex/cleanup-demo`. The upstream organization repository stays unchanged. Original source is `03f38cde3ecec397a6a075272a482e86c60c6f20`; its mirror is preserved in the parent cleanup workspace.

## Baseline and scope

- Original backend on Windows: 311 passed, one contract-manifest reproducibility failure, two skipped integration tests. Web: 169 tests pass; typecheck and lint pass. Do not treat fixture browser tests as real API coverage.
- Required result: a useful case study with verified contribution evidence; honest README; worthwhile integration/localization fixes; and a real, synthetic local demo. No real farmer accounts, live WhatsApp sending, new scientific coefficients or cloud deployment.
- Existing soil-card extraction and journal attachments are implemented; onboarding still contains a disconnected upload placeholder. Reuse those services before adding code.

## Slice 1 — reproducible contracts on Windows

- Added LF attributes and explicit UTF-8 reads / UTF-8 LF writes to the existing generator. The manifest was stale because default Windows text encoding changed the generated model text used for hashes. No schema or generated binding content was changed by hand.
- Added a regression comparing manifest digests with actual artifact bytes. Generator and seven focused contract tests pass after regenerating through the supported command. The shared hook now finds the Windows virtualenv as well as the Unix one.
- Full Windows backend regression: **313 passed, two skipped integration tests**, with two existing framework deprecation warnings. Lint passes. Web baseline remains 169 passing tests with clean typecheck/lint. Local demo, documentation and remaining UI work are not yet complete.

## Slice 2 — soil review, localization and current web dependencies

- Onboarding reuses the existing media/extraction/human-confirmation component after the field is saved. Review distinguishes a confirmed observation from a card that has not been uploaded. Journal attachments already existed; they are not newly claimed here.
- Removed the unused legacy localization module/component. Added soil review controls, demo notice and core water/money/readiness/plan labels to the five central dictionaries. Translation review flags stay pending; substantial explanatory copy remains English.
- Upgraded Next/React, MapLibre, Recharts, Zod and the test/lint toolchain together. Node >=22.12 is required. The compatible grpc-js override fixes the remaining Firebase dependency advisory; the production audit reports zero findings. Full development audit retains 15 moderate ESLint/minimatch findings. No forced downgrade or legacy-peer installation was used.
- 175 web tests, typecheck and static production build pass. ESLint has zero errors and 12 warnings. Eight existing auth/cache/persistence synchronization effects retain warning-level optimization diagnostics with scoped configuration; they were not reordered simply to satisfy a new lint rule. Stable imported Lucide icon selection has a narrowly documented false-positive suppression.
- Readiness expiry and journal future-time validation now update while a page is idle. Two deadline regressions, three soil-review regressions and local-emulator Phone Auth routing coverage pass. The local-demo flag forces emulator SMS verification for synthetic accounts; deployed auth behavior is unchanged.
- Actual API/PostgreSQL/Auth Emulator browser verification and the public-fork documentation are still in progress. No live provider or deployment is claimed.
