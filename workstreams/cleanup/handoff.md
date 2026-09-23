# Cleanup branch handoff

Use `workstreams/cleanup/progress.md` for this maintenance pass. Earlier per-phase notes are historical evidence, not current blockers. The root cleanup workspace holds the overall queue and exact commit/check ledger.

Canonical upstream: `annam-iitrpr/TeamUnderdawgs-Agrisense`; authorized personal fork: `Muneer320/AgriSense`. Never push these changes to the organization automatically. Preserve original author metadata and scientific review flags. Use the current root documentation standard; standing user authorization permits the requested README work.

Current environment: Python 3.12 virtualenv at `backend/.venv`; Node 24. On Windows use `backend/.venv/Scripts/python.exe`. Set `AGRISENSE_ENV_FILE=NUL` for isolated local tests; on Linux use `/dev/null`. Do not read or import any external team credential file. Shared commit hook and staged-secret scan are enabled.

Before leaving this project, verify a real API/browser demo with Firebase Auth Emulator and synthetic fixtures, not only the existing contract-fixture browser profile. Live providers, reviewed agronomic records, Meta sending and old cloud access remain external. Keep data and browser auth state out of Git.

Web slice: 175 unit tests, types, build pass; lint zero errors/12 warnings. Production npm audit is clear; full development audit retains 15 moderate findings. The new toolchain requires Node >=22.12. Local Docker/browser and documentation work remain in progress; the project is not yet at its completion gate.

Compose now runs four healthy services. Two real browser journeys pass (including journal upload/rendering, account isolation and all four required viewport widths). The API needed PUT in CORS for local signed uploads; nginx needed relative redirects. CI is extended but remote results, recreation checks and public documentation review are still pending. No original author or upstream organization history changed.

Latest local verification supersedes those pending notes: graceful forced recreation preserves all record/image digests and emulator reauthentication. After the targeted Python lock refresh, 315 backend tests pass (two skips), audit is clear, and the rebuilt Docker API passes both actual browser journeys. Web remains 175 tests/clean types/build, lint zero errors/12 warnings, production audit clear, full dev audit 15 moderate findings. Local-only Firebase CLI has 16 moderate tooling findings. README/case study/guides and three synthetic captures are reviewed; root cleanup tracking records the final pushed head/remote CI/PR state. Stay within the authorized fork branch; never push to the organization automatically.
