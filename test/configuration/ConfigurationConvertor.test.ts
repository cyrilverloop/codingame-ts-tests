import { assert, suite, test } from 'vitest';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import ConfigurationConvertor from '../../src/configuration/ConfigurationConvertor.js';
import TestConfiguration from '../../src/configuration/TestConfiguration.js';
import ParsedConfiguration from '../../src/parser/ParsedConfiguration.js';

const __dirname = dirname(fileURLToPath(import.meta.url)) + "/";

suite("ConfigurationConvertor", function() {

    suite("The ParsedConfiguration converted to CodeGeneratorConfiguration", function() {

        test("Throws an Error when the parsed configuration file is not readable", async function() {
            const defaultCodeFile = __dirname + '../generator/example/non-existant-CGCode.dist';

            const testConfigurations = [
                new TestConfiguration('Test name', '01 - test file.txt')
            ];

            const parsedConfiguration = new ParsedConfiguration(
                'easy/APuzzle',
                'A name',
                'https://a-link',
                testConfigurations
            );

            try {
                await ConfigurationConvertor.getCodeGeneratorConfiguration(
                    parsedConfiguration,
                    defaultCodeFile
                );
            }
            catch(error: any) {
                assert.strictEqual(error.message, "Configuration file not readable.");
            }
        });

        test("Has a name", async function() {
            const defaultCodeFile = __dirname + '../generator/example/CGCode.dist';

            const testConfigurations = [
                new TestConfiguration('Test name', '01 - test file.txt')
            ];

            const parsedConfiguration = new ParsedConfiguration(
                'easy/APuzzle',
                'A name',
                'https://a-link',
                testConfigurations
            );

            const generatorCodeConfiguration = await ConfigurationConvertor.getCodeGeneratorConfiguration(
                parsedConfiguration,
                defaultCodeFile
            );

            assert.strictEqual(generatorCodeConfiguration.name, 'A name');
        });

        test("Has a link", async function() {
            const defaultCodeFile = __dirname + '../generator/example/CGCode.dist';

            const testConfigurations = [
                new TestConfiguration('Test name', '01 - test file.txt')
            ];

            const parsedConfiguration = new ParsedConfiguration(
                'easy/APuzzle',
                'A name',
                'https://a-link',
                testConfigurations
            );

            const generatorCodeConfiguration = await ConfigurationConvertor.getCodeGeneratorConfiguration(
                parsedConfiguration,
                defaultCodeFile
            );

            assert.strictEqual(generatorCodeConfiguration.link, 'https://a-link');
        });

        test("Has a default code", async function() {
            const defaultCodeFile = __dirname + '../generator/example/CGCode.dist';

            const testConfigurations = [
                new TestConfiguration('Test name', '01 - test file.txt')
            ];

            const parsedConfiguration = new ParsedConfiguration(
                'easy/APuzzle',
                'A name',
                'https://a-link',
                testConfigurations
            );

            const generatorCodeConfiguration = await ConfigurationConvertor.getCodeGeneratorConfiguration(
                parsedConfiguration,
                defaultCodeFile
            );

            const exampleIndentedCode = await fs.readFile(__dirname + '../generator/example/CGCodeIndented.dist', { encoding: 'utf8' });

            assert.strictEqual(
                generatorCodeConfiguration.defaultCode,
                exampleIndentedCode
            );
        });
    });

    suite("The ParsedConfiguration converted to TestGeneratorConfiguration", function() {

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

            const generatorTestConfiguration = ConfigurationConvertor.getTestGeneratorConfiguration(parsedConfiguration);

            assert.strictEqual(generatorTestConfiguration.path, 'easy/APuzzle');
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

            const generatorTestConfiguration = ConfigurationConvertor.getTestGeneratorConfiguration(parsedConfiguration);

            assert.strictEqual(generatorTestConfiguration.name, 'A name');
        });

        test("Has test configurations", function() {
            const testConfigurations = [
                new TestConfiguration('Test name', '01 - test file.txt')
            ];

            const parsedConfiguration = new ParsedConfiguration(
                'easy/APuzzle',
                'A name',
                'https://a-link',
                testConfigurations
            );

            const generatorTestConfiguration = ConfigurationConvertor.getTestGeneratorConfiguration(parsedConfiguration);

            for(const testConfiguration of generatorTestConfiguration.testConfigurations) {
                assert.strictEqual(testConfiguration.name, 'Test name');
                assert.strictEqual(testConfiguration.file, '01 - test file.txt');
            }
        });
    });
});
