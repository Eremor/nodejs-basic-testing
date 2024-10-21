import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const input = [1];
    const output = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };

    expect(generateLinkedList(input)).toStrictEqual(output);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const input = [1, 2];

    expect(generateLinkedList(input)).toMatchSnapshot();
  });
});
