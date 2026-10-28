import test from 'node:test';
import assert from 'node:assert/strict';
import { POST as productionPost } from '../api/enquiries.ts';
import { POST as localPost } from '../app/api/enquiries/route.ts';

test('both enquiry endpoints retain regional scope and safely escape email content without sending email', async (t) => {
  const oldKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 're_test_only_not_a_real_key';
  const outbound = [];
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    assert.equal(new URL(url).hostname, 'api.resend.com');
    outbound.push(JSON.parse(init.body));
    return Response.json({ id: 'test-email-id' });
  });
  try {
    for (const handler of [productionPost, localPost]) {
      const invalid = await handler(
        new Request('https://example.com/api/enquiries', {
          method: 'POST',
          body: '{}',
        }),
      );
      assert.equal(invalid.status, 422);
      const response = await handler(
        new Request('https://example.com/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submissionId: 'test-regional-brief',
            kind: 'project_enquiry',
            name: 'QA <review>',
            email: 'qa@example.com',
            projectType: 'AI solution',
            projectGoal: 'Route uncertain product questions to a person.',
            budgetRange: 'AUD To discuss',
            context:
              'Package: growth\nQuote currency: AUD\nCapabilities: Human handoff',
          }),
        }),
      );
      assert.equal(response.status, 200);
      assert.equal((await response.json()).ok, true);
    }
    assert.equal(outbound.length, 2);
    for (const email of outbound) {
      assert.match(email.text, /AUD/);
      assert.match(email.text, /Package: growth/);
      assert.match(email.text, /Human handoff/);
      assert.match(email.html, /QA &lt;review&gt;/);
      assert(!email.html.includes('QA <review>'));
    }
  } finally {
    if (oldKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = oldKey;
  }
});
