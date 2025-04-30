import { readFile } from 'node:fs/promises';
import CodeGeneratorConfiguration from '../generator/CodeGeneratorConfiguration.js';
import TestGeneratorConfiguration from '../generator/TestGeneratorConfiguration.js';
import ParsedConfiguration from '../parser/ParsedConfiguration.js';

/**
 * A configuration convertor.
 */
export default class ConfigurationConvertor {

    // Methods :

    /**
     * Returns the code configuration for the generator.
     * @param {ParsedConfiguration} parsedConfiguration - the parsed configuration.
     * @param {string} defaultCodeFile - the file with the default code.
     * @return {CodeGeneratorConfiguration} the code configuration for the generator.
     * @throws Error if the default code file is not readable.
     */
    static async getCodeGeneratorConfiguration(
        parsedConfiguration: ParsedConfiguration,
        defaultCodeFile: string
    ): Promise<CodeGeneratorConfiguration> {

        try {
            let defaultCode: string = await readFile(defaultCodeFile, { encoding: 'utf8' });
            defaultCode = defaultCode.replace(/\n/g, "\n    ").replace(/\n    \n/g, "\n\n");

            return new CodeGeneratorConfiguration(
                parsedConfiguration.name,
                parsedConfiguration.link,
                defaultCode
            );
        } catch(error) {
            throw new Error("Configuration file not readable.");
        }
    }

    /**
     * Returns the test configuration for the generator.
     * @param {ParsedConfiguration} parsedConfiguration - the parsed configuration.
     * @return {TestGeneratorConfiguration} the test configuration for the generator.
     */
    static getTestGeneratorConfiguration(
        parsedConfiguration: ParsedConfiguration
    ): TestGeneratorConfiguration {
        return new TestGeneratorConfiguration(
            parsedConfiguration.path,
            parsedConfiguration.name,
            parsedConfiguration.testConfigurations
        );
    }
}
