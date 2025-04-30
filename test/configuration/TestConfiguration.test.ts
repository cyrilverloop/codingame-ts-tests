import { assert, suite, test } from 'vitest';
import TestConfiguration from '../../src/configuration/TestConfiguration.js';

suite("TestConfiguration", function() {

    test("Has a name", function() {
        const testConfiguration = new TestConfiguration('Test name', '01 - test file.txt');

        assert.strictEqual(testConfiguration.name, 'Test name');
    });

    test("Has a file", function() {
        const testConfiguration = new TestConfiguration('Test name', '01 - test file.txt');

        assert.strictEqual(testConfiguration.file, '01 - test file.txt');
    });
});
