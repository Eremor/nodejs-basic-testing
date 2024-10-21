import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue('Test');

    expect(result).toBe('Test');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('My error');
    } catch (error) {
      expect((error as Error).message).toBe('My error');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (error) {
      expect((error as Error).message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (error) {
      expect((error as MyAwesomeError).message).toBe(
        'This is my awesome custom error!',
      );
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await expect(Promise.reject(rejectCustomError)).rejects.toBe(
        'This is my awesome custom error!',
      );
    } catch {}
  });
});
