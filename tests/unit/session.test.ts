import { vi, test, describe, expect, beforeEach, afterEach } from "vitest";
import { SessionManager } from "./session.ts";

describe("SessionManager", () => {
    let manager: any;
    let callback: any;

    beforeEach(() => {
        callback = vi.fn();
        manager = new SessionManager(callback);
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("Колбэк onLogout не вызывается сразу после старта", () => {
        manager.start();
        expect(callback).not.toBeCalled();
    });

    test("Колбэк вызывается ровно через 5000мс (используй фейковые таймеры, не жди реально 5 секунд)", () => {
        manager.start();
        vi.runAllTimers();
        expect(callback).toBeCalled();
    });

    test("Если вызвать reset() на 3-й секунде, таймер сбрасывается, и логаут происходит только через новые 5 секунд (суммарно 8 сек от старта)", () => {
        manager.start();

        vi.advanceTimersByTime(3000);

        manager.reset();

        expect(callback).not.toBeCalled();

        vi.advanceTimersByTime(5000);

        expect(callback).toBeCalled();
    });

    test("Метод stop() полностью отменяет таймер (логаут никогда не произойдет)", () => {
        manager.start();
        manager.stop();

        vi.advanceTimersByTime(5000);

        expect(callback).not.toBeCalled();
    });
});
