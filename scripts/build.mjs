// Compiles every page's TypeScript entry point as its own isolated
// global-scope program (see tsconfig/*.json). This keeps things like
// each page's own `const PLACES = [...]` from colliding with another
// page's `const PLACES` of a different shape, while still emitting
// plain global-scope .js so existing onclick="..." HTML attributes work.
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';

const configs = readdirSync('tsconfig').filter(f => f.endsWith('.json')).sort();

let failed = false;
for (const file of configs) {
  const path = `tsconfig/${file}`;
  console.log(`\n> tsc -p ${path}`);
  const result = spawnSync('npx', ['tsc', '-p', path], { stdio: 'inherit', shell: true });
  if (result.status !== 0) failed = true;
}

process.exit(failed ? 1 : 0);
