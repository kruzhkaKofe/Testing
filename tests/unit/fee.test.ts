import { test, describe, expect } from "vitest";
import { calculateFee } from "./fee.ts";

describe("calculateFee", () => {
    test.for([
        [0, 0.05],
        [999, 0.05],
        [1000, 0.03],
        [10000, 0.01],
        [50000, 0.005],
        [100000000, 0.005],
    ])("calculateFee($i) -> $f", ([a, expected]) => {
        expect(calculateFee(a)).toBe(expected);
    });

    test.each([
        { volume: 999, expected: 0.05, tier: "Порядок 1" },
        { volume: 1000, expected: 0.03, tier: "Порядок 2" },
        { volume: 10000, expected: 0.01, tier: "Порядок 3" },
        { volume: 50000, expected: 0.005, tier: "Порядок 4" },
    ])(
        "Возвращает $expected для $tier (количество: $volume)",
        ({ volume, expected }) => {
            expect(calculateFee(volume)).toBe(expected);
        },
    );
});
