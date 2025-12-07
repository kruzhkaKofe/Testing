// Если вы напишете vi.spyOn(uuid, 'v4'), это часто падает с ошибкой,
// потому что ES-модули экспортируют значения только для чтения (read-only),
// и Vitest не может подменить свойство v4 в объекте экспорта "на лету".
// vi.mock обходит это ограничение, подменяя модуль целиком на уровне загрузки.

import { expect, describe, beforeEach, afterEach, test, vi } from 'vitest';
import { sendReport } from './seventh';
import axios from 'axios';

const UUID = 'test-id-123';

describe('sendReport', () => {
  beforeEach(() => {
    vi.mock('uuid', () => ({
      v4: () => UUID
    }));

    vi.spyOn(axios, 'post').mockImplementation(() => Promise.resolve());

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  test('Замокать модуль uuid, чтобы uuidv4() всегда возвращал "test-id-123"', async () => {
    const id = await sendReport('someMessage');

    expect(id).toBe(UUID);
  })

  test('Замокать axios.post, чтобы он возвращал успешный промис', async () => {
    await sendReport('someMessage');

    expect(axios.post).toBeCalledTimes(1);
  })

  test('Замокать Date.now(), чтобы время было фиксированным', async () => {
    const date = new Date(1945, 4, 9);
    vi.setSystemTime(date);

    await sendReport('someMessage');

    expect(Date.now()).toBe(date.valueOf());
    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('https://analytics.service/api/reports', {
      id: UUID,
      message: 'someMessage',
      timestamp: date.valueOf()
    })
  })
})
