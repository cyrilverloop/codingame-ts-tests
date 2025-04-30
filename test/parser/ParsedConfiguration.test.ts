import { assert, suite, test } from 'vitest';
import TestConfiguration from '../../src/configuration/TestConfiguration.js';
import ParsedConfiguration from '../../src/parser/ParsedConfiguration.js';

suite("ParsedConfiguration", function() {

    test("Has a path", function() {
        const testConfigurations = [
            new TestConfiguration('Test name', '01 - test file.txt')
        ];

        const parsedConfiguration = new ParsedConfiguration(
            'easy/APuzzle',
            'A name',
            'https://a-link',
            testConfigurations
        );

        assert.strictEqual(parsedConfiguration.path, 'easy/APuzzle');
    });

    test("Has a name", function() {
        const testConfigurations = [
            new TestConfiguration('Test name', '01 - test file.txt')
        ];

        const parsedConfiguration = new ParsedConfiguration(
            'easy/APuzzle',
            'A name',
            'https://a-link',
            testConfigurations
        );

        assert.strictEqual(parsedConfiguration.name, 'A name');
    });

    test("Has a link", function() {
        const testConfigurations = [
            new TestConfiguration('Test name', '01 - test file.txt')
        ];

        const parsedConfiguration = new ParsedConfiguration(
            'easy/APuzzle',
            'A name',
            'https://a-link',
            testConfigurations
        );

        assert.strictEqual(parsedConfiguration.link, 'https://a-link');
    });

    test("Has TestConfigurations", function() {
        const testConfigurations = [
            new TestConfiguration('Test name', '01 - test file.txt')
        ];

        const parsedConfiguration = new ParsedConfiguration(
            'easy/APuzzle',
            'A name',
            'https://a-link',
            testConfigurations
        );

        for(const testConfiguration of parsedConfiguration.testConfigurations) {
            assert.strictEqual(testConfiguration.name, 'Test name');
            assert.strictEqual(testConfiguration.file, '01 - test file.txt');
        }
    });
});
