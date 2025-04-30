import { readFile } from 'node:fs/promises';
import TestConfiguration from '../configuration/TestConfiguration.js';
import ParsedConfiguration from './ParsedConfiguration.js';
import Config from './config.js';
import ConfigTest from './configTest.js';

/**
 * The configuration parser.
 */
export default class ConfigurationParser {

    // Methods :

    /**
     * Returns the configuration from the configuration file.
     * @param string $file the file.
     * @throws Error if the configuration file is not readable.
     * @returns {ParsedConfiguration} - the parsed configuration.
     */
    async getConfigurationFromFile(file: string): Promise<ParsedConfiguration> {

        try {
            const data: string = await readFile(file, { encoding: 'utf8' });

            const jsonConfiguration: Config = JSON.parse(data);
            const testsconfigurations = this.#getTestConfigurations(jsonConfiguration.tests);

            return new ParsedConfiguration(
                jsonConfiguration.path,
                jsonConfiguration.name,
                jsonConfiguration.link,
                testsconfigurations
            );
        } catch(error) {
            throw new Error("Configuration file not readable.");
        }
    }

    /**
     * Returns the tests configurations.
     * @param {ConfigTest[]} testConfigurations - the configurations.
     * @returns {TestConfiguration[]} - the tests configurations.
     */
    #getTestConfigurations(testConfigurations: ConfigTest[]): TestConfiguration[] {
        const testsconfigurations = [];

        for(const testConfiguration of testConfigurations) {
            const testconfiguration = new TestConfiguration(
                testConfiguration.name,
                testConfiguration.file
            );
            testsconfigurations.push(testconfiguration);
        }

        return testsconfigurations;
    }
}
