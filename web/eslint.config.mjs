import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  { rules: { '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }] } },
  {
    files: ['components/language-provider.tsx','features/auth/auth-provider.tsx','features/fields/active-field.ts','features/market/use-market-prices.ts','features/onboarding/onboarding-flow.tsx','features/planning/crop-planner.tsx','features/pwa/use-service-worker.ts','lib/api/query.ts'],
    // These existing effects synchronize auth-scoped caches, persisted state or
    // browser APIs. Preserve their tested reset ordering during the upgrade;
    // keep the new optimization diagnostic visible without a broad store rewrite.
    rules: { 'react-hooks/set-state-in-effect': 'warn' },
  },
  globalIgnores(['.next/**','out/**','next-env.d.ts','test-results/**','playwright-report/**']),
]);
