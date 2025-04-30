import TestConfiguration from '../configuration/TestConfiguration.js';

/**
 * The generator test configuration.
 */
export default class TestGeneratorConfiguration {

    // Properties :

    #path;
    #name;
    #testConfigurations;


    // Constructor :

    /**
     * The constructor.
     * @param {string} path - the path.
     * @param {string} name - the name.
     * @param {TestConfiguration[]} testConfigurations - the tests configurations.
     */
    constructor(
        path: string,
        name: string,
        testConfigurations: TestConfiguration[]
    ) {
        this.#path = path;
        this.#name = name;
        this.#testConfigurations = testConfigurations;
    }


    // Accessors :

    /**
     * Returns the path.
     * @returns {string} - the path.
     */
    get path(): string
    {
        return this.#path;
    }

    /**
     * Returns the name.
     * @returns {string} - the name.
     */
    get name(): string
    {
        return this.#name;
    }

    /**
     * Returns the tests configurations.
     * @returns {TestConfiguration[]} - the tests configurations.
     */
    get testConfigurations(): TestConfiguration[]
    {
        return this.#testConfigurations;
    }
}
