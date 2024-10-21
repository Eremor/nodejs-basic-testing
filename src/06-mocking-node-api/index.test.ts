import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, timeout);

    expect(setTimeoutSpy).toBeCalledWith(cb, timeout);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    const interval = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, interval);

    expect(setIntervalSpy).toHaveBeenCalledWith(cb, interval);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const interval = 1000;

    doStuffByInterval(cb, interval);

    jest.advanceTimersByTime(interval);

    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval * 2);

    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockPathToFile = 'file.txt';
  const mockFullPath = '/path/mock/file.txt';

  beforeEach(() => {
    (join as jest.Mock).mockReturnValue(mockFullPath);
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockPathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, mockPathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(mockPathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockContent = 'File content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(mockContent);

    const result = await readFileAsynchronously(mockPathToFile);

    expect(result).toBe('File content');
  });
});
