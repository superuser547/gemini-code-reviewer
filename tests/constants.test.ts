import { SUPPORTED_LANGUAGES } from '../constants.js';
import * as assert from 'node:assert';
import test from 'node:test';

test('SUPPORTED_LANGUAGES includes JavaScript', () => {
  assert.ok(SUPPORTED_LANGUAGES.some(lang => lang.value === 'javascript'));
});
