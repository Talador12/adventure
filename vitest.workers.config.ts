// Worker tests — multiplayer (Lobby DO) + AI endpoints via Miniflare
import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
  test: {
    globals: true,
    include: ['tests/multiplayer/**/*.test.ts', 'tests/ai/**/*.test.ts'],
    poolOptions: {
      workers: {
        wrangler: { configPath: './wrangler.test.toml' },
        miniflare: {
          compatibilityDate: '2024-01-01',
          compatibilityFlags: ['nodejs_compat'],
        },
      },
    },
  },
  define: {
    __TEST_AI_MODE__: JSON.stringify(process.env.AI_TESTS ?? 'mock'),
  },
});
