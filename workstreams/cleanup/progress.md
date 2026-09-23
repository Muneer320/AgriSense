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

## Slice 3 — actual local integration and journal photos

- Added loopback-only Compose services for PostgreSQL, Firebase Auth Emulator, FastAPI and the static production web export. Named volumes keep records, media and emulator exports; no team credential file is loaded. Mock runtime envelopes and a permanent UI notice explicitly identify the synthetic demo. WhatsApp remains outbox-only.
- Actual browser checks found nginx directory redirects losing the published port and browser uploads blocked by missing PUT CORS permission. Fixed both; the preflight regression also rejects an untrusted origin. First-field onboarding now shows consent, and finishing another field selects the new record.
- Journal uploads already existed. Added owner-authorized viewing through the existing expiring-link API, obtained on demand and removed from view on expiry. No link or bearer token is saved to service-worker storage.
- Two actual Chromium journeys pass against Auth Emulator, API and PostgreSQL: phone-code verification, consent/onboarding, field/season persistence, valid image upload/completion, journal save/reload/photo rendering, anonymous denial, another account's field/media denial, shell-cache privacy, public routing and viewport overflow checks at 360/768/1280/1920px. No request interception or fixture responses were used. Trace/video/auth-state exports are disabled.
- Full Windows backend suite before the new CORS test: 314 passed, two skipped integrations; focused demo/CORS tests: two pass. Web: 175 tests, types, lint (zero errors/12 warnings) and Docker production export pass. Production npm audit is clear; development audit retains 15 moderate findings.
- CI now includes full backend tests/migrations/audit, web checks and the real Compose/browser suite. Remote results and recreation verification remain to be recorded. OCR/live model, forecasts, Meta delivery and agronomic approval remain unverified external work.

## Slice 4 — dependency audit follow-up

- First remote run `41228342234`: backend tests/migrations, web checks and the actual Compose/browser job pass. The dependency audit reports 78 advisory records across eight locked packages; no findings are suppressed.
- Targeted lock refresh updates certifi, filelock, msgpack, opentelemetry-api, Pillow, pyasn1, PyJWT and urllib3. Pillow's declared major bound advances to 13 to include the fixed release. No scientific constants, provider credentials or contract semantics change.
- With the new lock, all **315 backend tests pass**, two isolated integrations skip, and two existing framework deprecation warnings remain. Refreshed dependency audit and Docker/browser results are recorded in the final checkpoint rather than assumed from version numbers.
- Graceful forced recreation of all four Compose containers preserves exact field/season/journal/media record digests and all stored image bytes. The original synthetic emulator account reauthenticates afterward; named volumes are retained.
- The browser walkthrough now creates the crop season through the real form as well as creating its field and journal entry. A source-backed case study, local/development guides and reviewed synthetic captures are being finalized. The organization repository and original history remain unchanged.

## Documentation and final local verification

- Backend lock refresh: 315 tests pass, two integrations skip, and the Python audit reports zero findings across 120 installed packages. The refreshed Docker API and both actual browser journeys pass. Web production audit remains clear; full web development audit retains 15 moderate findings. The separate local Firebase CLI dependency tree reports 16 moderate findings and is explicitly documented as development tooling.
- README now leads with the field/season workflow, actual synthetic captures and the tested Compose quickstart. Removed unsupported placement/commit-count badges and stale totals. CASE_STUDY attributes Muneer's work to specific original commits and retains every teammate's credit; no blanket team-code license is invented.
- Added current local/development guides; earlier team/cloud plans are labeled historical. Three actual application captures were viewed before publication. GitHub Markdown renders; 15 README relative links/assets/anchors and one Mermaid diagram validate; desktop/mobile previews load correctly.
- Remote run `41228342234` passes three functional jobs and exposes the original dependency findings; targeted follow-up is `952478d`. Final-head remote CI and readiness are recorded in the parent cleanup checkpoint. No public cloud/provider success is claimed.
