// Использовать vi.spyOn(global, 'fetch') или vi.fn(), чтобы не делать реальный запрос.
// Проверить, что fetch был вызван с правильным URL (включая tokenId).
// Если API вернул успешный ответ (200), функция должна вернуть число (парсинг priceUsd).
// Если API вернул ошибку (например, 404 или 500), функция должна вернуть 0 (обработка catch).

import { describe, test, expect, vi, afterEach } from 'vitest';
import { getTokenPrice } from './second';

describe('getTokenPrice', () => {
  const successResponse = {
    data: {
      id: '123123',
      priceUsd: '456456'
    }
  }

  const createFetchResponse = (data: any) => {
    return {
      ok: true,
      json: () => Promise.resolve(data)
    }
  }

  const createFetchError = () => {
    return {
      ok: false,
    }
  }

  const mockFetch = vi.fn();
  const url = (tokenId: string) => `https://api.coincap.io/v2/assets/${tokenId}`

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('Использовать vi.spyOn(global, "fetch") или vi.fn(), чтобы не делать реальный запрос', async () => {
    const fetchMock = mockFetch.mockResolvedValue(createFetchResponse(successResponse));
    vi.stubGlobal('fetch', fetchMock);

    await getTokenPrice('12321321');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  })

  test('Проверить, что fetch был вызван с правильным URL (включая tokenId)', async () => {
    const fetchMock = mockFetch.mockResolvedValue(createFetchResponse(successResponse));
    vi.stubGlobal('fetch', fetchMock);

    await getTokenPrice('123');

    expect(fetchMock).toBeCalledWith(url('123'));
  })

  test('Если API вернул успешный ответ (200), функция должна вернуть число (парсинг priceUsd)', async () => {
    const fetchMock = mockFetch.mockResolvedValue(createFetchResponse(successResponse));
    vi.stubGlobal('fetch', fetchMock);

    const res = await getTokenPrice('123');

    expect(res).toBe(456456);
  })

  test('Если API вернул ошибку (например, 404 или 500), функция должна вернуть 0 (обработка catch)', async () => {
    const fetchMock = mockFetch.mockRejectedValue(new Error('Network error'));
    vi.stubGlobal('fetch', fetchMock);

    const res = await getTokenPrice('123');

    expect(res).toBe(0);
  })
})
