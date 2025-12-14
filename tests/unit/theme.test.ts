import { vi, test, describe, expect, beforeEach, afterEach } from "vitest";
import { SettingsService } from "./theme.ts";

const KEY = "user_settings";

const theme = {
    dark: "dark",
    light: "light",
} as const;

describe("SettingsService", () => {
    let lsMock: any;
    let service: any;

    beforeEach(() => {
        service = new SettingsService();

        lsMock = {
            _value: null,
            setItem: vi.fn((key, value) => {
                lsMock._value = {
                    [key]: JSON.stringify(value),
                };
            }),
            getItem: vi.fn((key) => {
                return lsMock._value ? JSON.parse(lsMock._value[key]) : null;
            }),
        };

        vi.stubGlobal("localStorage", lsMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('При вызове saveTheme("dark") должен быть вызван localStorage.setItem с правильным ключом и JSON-строкой', () => {
        service.saveTheme(theme.dark);
        expect(lsMock.setItem).toHaveBeenCalledWith(
            KEY,
            JSON.stringify({ theme: theme.dark }),
        );
    });

    test('getTheme() должна возвращать "light", если в хранилище пусто (null)', () => {
        let res = service.getTheme();
        expect(res).toBe(theme.light);
    });

    test("getTheme() должна парсить JSON и возвращать то, что сохранили", () => {
        service.saveTheme(theme.dark);
        expect(service.getTheme()).toBe(theme.dark);
    });
});
