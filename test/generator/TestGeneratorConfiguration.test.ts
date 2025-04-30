import { assert, suite, test } from 'vitest';
import TestConfiguration from '../../src/configuration/TestConfiguration.js';
import TestGeneratorConfiguration from '../../src/generator/TestGeneratorConfiguration.js';

suite("TestGeneratorConfiguration", function() {

    test("Has a path", function() {
        const testConfigurations = [
            new TestConfiguration('name', 'file')
        ];

        const generatorTestConfiguration = new TestGeneratorConfiguration(
            'test-path',
            'test-name',
            testConfigurations
        );

        assert.strictEqual(generatorTestConfiguration.path, 'test-path');
    });

    test("Has a name", function() {
        const testConfigurations = [
            new TestConfiguration('name', 'file')
        ];

        const generatorTestConfiguration = new TestGeneratorConfiguration(
            'test-path',
            'test-name',
            testConfigurations
        );

        assert.strictEqual(generatorTestConfiguration.name, 'test-name');
    });

    test("Has test configurations", function() {
        const testConfigurations = [
            new TestConfiguration('name', 'file')
        ];

        const generatorTestConfiguration = new TestGeneratorConfiguration(
            'test-path',
            'test-name',
            testConfigurations
        );

        for(const testConfiguration of generatorTestConfiguration.testConfigurations) {
            assert.strictEqual(testConfiguration.name, 'name');
            assert.strictEqual(testConfiguration.file, 'file');
        }
    });
});
