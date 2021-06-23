import React from 'react';
import renderer from 'react-test-renderer';
import { currencySymbol } from '../../src/lib/utils';

test("return won currency symbol", () => {
  expect(currencySymbol("krw")).toBe('₩')
});