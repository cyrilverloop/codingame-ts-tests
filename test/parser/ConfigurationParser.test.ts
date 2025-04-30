import { assert, suite, test } from 'vitest';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ConfigurationParser from '../../src/parser/ConfigurationParser.js';

const __dirname = dirname(fileURLToPath(import.meta.url)) + "/";

suite("ConfigurationParser", function() {

    test("Throws an Error when the configuration file is not readable", async function() {
        const file = 'non-existant-configuration.json';
        const parser = new ConfigurationParser();

        try {
            await parser.getConfigurationFromFile(file);
        }
        catch(error: any) {
            assert.strictEqual(error.message, "Configuration file not readable.");
        }
    });

    test("Can get configuration from file", async function() {
        const file = __dirname + '../generator/example/config.json';
        const parser = new ConfigurationParser();

        const configuration = await parser.getConfigurationFromFile(file);

        assert.strictEqual(configuration.path, "easy/APuzzle");
        assert.strictEqual(configuration.name, "A name");
        assert.strictEqual(configuration.link, "https://a-link");

        assert.isArray(configuration.testConfigurations);
        assert.hasAllKeys(configuration.testConfigurations, ['0', '1']);

        assert.strictEqual(configuration.testConfigurations[0].name, "Test name");
        assert.strictEqual(configuration.testConfigurations[0].file, "01 - test file.txt");

        assert.strictEqual(configuration.testConfigurations[1].name, "Test name 2");
        assert.strictEqual(configuration.testConfigurations[1].file, "02 - test file 2.txt");
    });
});
