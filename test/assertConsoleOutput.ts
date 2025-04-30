import { assert, type MockInstance } from 'vitest';
import { readFileSync } from 'node:fs';

/**
 * Asserts the console output the answer.
 * @param consoleSpy - the console spy.
 * @param fileName - the file name.
 */
function assertConsoleOutput(
    consoleSpy: MockInstance,
    fileName: string
): void {
    let userAnswer: string = "";
    const answer: string = readFileSync(fileName, "utf-8")
    const consoleCalls: number = consoleSpy.mock.calls.length;

    for(let callIndex = 0; callIndex < consoleCalls; callIndex++) {
        userAnswer += consoleSpy.mock.calls[callIndex][0] + "\n";
    }

    assert.strictEqual(
        userAnswer,
        answer
    );
}

export { assertConsoleOutput };
