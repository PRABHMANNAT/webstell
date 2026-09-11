import assert from 'node:assert/strict';

// Run against the retained local preview after adding or changing error routes.
const origin = process.env.PREVIEW_URL || 'http://localhost:3000';
for (const path of ['/webstell-missing-page-check', '/missing/nested/page-check']) {
  const response = await fetch(new URL(path, origin));
  const html = await response.text();
  assert.equal(response.status, 404, `${path} must retain a real 404 status`);
  assert.ok(html.includes('A small detour. A little play.'), 'Custom recovery content renders');
  assert.ok(html.includes('THE DETOUR / ENDLESS RUNNER'), 'Playable runner renders');
  assert.ok(html.includes('Back home'), 'Home recovery link renders');
  console.log(`PASS ${path}: custom 404 and game`);
}
assert.equal((await fetch(new URL('/', origin))).status, 200, 'Homepage remains available');
console.log('PASS homepage: 200');
