import { reviewCode } from '../services/geminiService.js';
import * as assert from 'node:assert';
import test from 'node:test';

// Ensure environment variable is not set for this test
const oldKey = process.env.API_KEY;
delete process.env.API_KEY;

test('reviewCode throws when API_KEY is missing', async () => {
  await assert.rejects(() => reviewCode('console.log("hi")', 'javascript', 'en'));
});

if (oldKey) {
  process.env.API_KEY = oldKey;
}
