// Player mode tests — pure game logic, no Cloudflare Workers runtime needed
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['tests/player/**/*.test.ts'],
    define: {
      __TEST_AI_MODE__: JSON.stringify(process.env.AI_TESTS ?? 'mock'),
    },
  },
});
