import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: '%', expected: null },
  { a: 3, b: '2', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should %s two numbers', (args) => {
    const { a, b, action, expected } = args;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
