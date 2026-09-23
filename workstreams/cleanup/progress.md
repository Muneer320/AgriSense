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
