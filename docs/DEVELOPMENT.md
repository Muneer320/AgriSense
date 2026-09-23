# Developing this fork

Work in a branch of `Muneer320/AgriSense`. The original team repository remains [annam-iitrpr/TeamUnderdawgs-Agrisense](https://github.com/annam-iitrpr/TeamUnderdawgs-Agrisense); this pass does not deploy or push there.

## Web

Use Node >=22.12 (CI uses Node 24).

```sh
cd web
npm ci
npm run typecheck
npm test
npm run lint
npm run build
npm audit --omit=dev
```

The build exports static files to `web/out`. Authentication/API URLs are public build-time configuration; backend credentials must never enter `NEXT_PUBLIC_*` variables. Next 16 uses the ESLint CLI through `npm run lint`.

At this checkpoint the production audit is clear. The full development audit retains 15 moderate ESLint/minimatch findings. Lint reports 12 warnings and zero errors, including eight existing effects synchronizing auth-scoped caches, persisted preferences or browser APIs. Scoped warnings preserve their tested reset ordering during the upgrade. Do not disable auth reset behavior to silence an optimization diagnostic.

The separate loopback-only Auth Emulator image pins Firebase CLI 15.34.2; its dependency audit reports 16 moderate findings. It is local development tooling and has no cloud credentials. A forced CLI downgrade or incompatible transitive override is not part of this pass. These findings are distinct from the clean web production and backend Python audits.

## Backend

Use Python **3.12** and [uv](https://docs.astral.sh/uv/). From the repository root, on Linux/macOS:

```sh
cd backend
uv sync --frozen --group dev
AGRISENSE_ENV_FILE=/dev/null APP_ENV=test SOILGRIDS_ENABLED=false uv run pytest -q
cd ..
backend/.venv/bin/python -m ruff check .
backend/.venv/bin/python scripts/generate_contracts.py --check
```

PowerShell uses the Windows virtualenv and a null environment file:

```powershell
cd backend
uv sync --frozen --group dev
$env:AGRISENSE_ENV_FILE='NUL'
$env:APP_ENV='test'
$env:SOILGRIDS_ENABLED='false'
.venv/Scripts/python.exe -m pytest -q
cd ..
backend/.venv/Scripts/python.exe -m ruff check .
backend/.venv/Scripts/python.exe scripts/generate_contracts.py --check
```

Do not load an old team credential file for unit tests. Two integration tests skip unless their explicitly isolated services are configured. The real Compose/browser suite verifies a separate local integration path; it does not prove live cloud providers.

Contract authority is `contracts/models.py` and `contracts/routes.py`. Generate Python/TypeScript/OpenAPI artifacts with `scripts/generate_contracts.py`; do not edit generated bindings manually. UTF-8/LF output and artifact-byte hashes are checked. Responses use `{data,meta}`; mutations use idempotency keys and optimistic versions where declared.

## Repository checks and boundaries

```sh
git config core.hooksPath scripts/hooks
python scripts/security/check_staged.py
```

The shared hook runs the staged sensitive-data check, lint and contract freshness when the virtualenv is available. CI also applies/reverses/checks PostgreSQL migrations, audits backend dependencies, tests the web export and runs the actual local browser demo. No credentials, personal farmer data or saved authentication state belongs in Git.

Preserve contributor credits and scientific review flags. Do not invent coefficients, mark terminology reviewed, enable unauthenticated legacy routes, promote untrained models or switch WhatsApp to live sending as part of a UI fix. Read `AGENTS.md`, the relevant phase handoff and [cleanup progress](../workstreams/cleanup/progress.md) before changing interfaces. Older phase notes are historical records.
