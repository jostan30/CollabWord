import { defineConfig } from 'eslint-define-config';
import nextCoreVitals from 'eslint-config-next/core-web-vitals.js';
import nextTypescript from 'eslint-config-next/typescript.js';

export default defineConfig([
  nextCoreVitals,
  nextTypescript,
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      'no-unused-vars': ['error', { vars: 'all', args: 'none' }]
    }
  }
]);
