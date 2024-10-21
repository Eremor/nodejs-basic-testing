import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  let axiosGet: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    axiosGet = jest.fn();
    (axios.create as jest.Mock).mockReturnValue({
      get: axiosGet,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    axiosGet.mockClear();
    jest.clearAllTimers();
  });

  const mockData = { id: 1, title: 'Mock post' };

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts';
    axiosGet.mockResolvedValue({ data: mockData });

    const resultPromise = throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(THROTTLE_TIME);

    await resultPromise;

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    axiosGet.mockResolvedValue({ data: mockData });

    const resultPromise = throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(THROTTLE_TIME);

    await resultPromise;

    expect(axiosGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts';
    axiosGet.mockResolvedValue({ data: mockData });

    const resultPromise = throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(THROTTLE_TIME);

    const result = await resultPromise;

    expect(result).toEqual(mockData);
  });
});
