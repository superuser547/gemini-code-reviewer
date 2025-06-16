import { reviewCode } from '../services/geminiService.js';
import * as assert from 'node:assert';
import test from 'node:test';

// Ensure environment variable is not set for this test
const oldKey = process.env.GEMINI_API_KEY;
delete process.env.GEMINI_API_KEY;

test('reviewCode throws when GEMINI_API_KEY is missing', async () => {
  await assert.rejects(() => reviewCode('console.log("hi")', 'javascript', 'en'));
});

if (oldKey) {
  process.env.GEMINI_API_KEY = oldKey;
}
