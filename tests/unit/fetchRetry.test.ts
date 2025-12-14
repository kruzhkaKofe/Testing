import { expect, describe, test, vi } from "vitest";
import { fetchWithRetry } from "./fetchRetry";

describe("fetchWithRetry", () => {
    let callback: any;

    test("Если функция проходит с первого раза, она вызывается только 1 раз", async () => {
        callback = vi.fn(async () => Promise.resolve("success"));

        const result = await fetchWithRetry(callback);

        expect(callback).toBeCalledTimes(1);
        expect(result).toBe("success");
    });

    test("Если функция падает 2 раза, а на 3-й проходит — общий результат успешен, а внутренняя функция вызвалась 3 раза", async () => {
        let counter = 0;

        callback = vi.fn(async () => {
            counter++;

            return counter === 3
                ? Promise.resolve("success")
                : Promise.reject();
        });

        // ИЛИ

        // callback = vi.fn()
        //   .mockRejectedValueOnce(new Error('Fail 1'))
        //   .mockRejectedValueOnce(new Error('Fail 2'))
        //   .mockResolvedValueOnce('success');

        const result = await fetchWithRetry(callback, 3);
        expect(callback).toBeCalledTimes(3);
        expect(result).toBe("success");
    });

    test("Если функция падает все разы (исчерпан лимит ретраев), fetchWithRetry выбрасывает последнюю ошибку", async () => {
        callback = vi.fn(async () => Promise.reject("Some Error"));

        await expect(() => fetchWithRetry(callback, 3)).rejects.toThrowError(
            "Some Error",
        );
        expect(callback).toBeCalledTimes(4);
    });
});
