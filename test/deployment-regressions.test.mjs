import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workflow = fs.readFileSync(path.join(root, '.github/workflows/server_deploy.yml'), 'utf8');

test('deployment removes stale public files before upload', () => {
  assert.match(
    workflow,
    /uses:\s*appleboy\/scp-action@[^\n]+[\s\S]*?\n\s+rm:\s*true\b/,
    'SCP deployment must clear the static-site target before upload so deleted posts do not remain online',
  );
});
