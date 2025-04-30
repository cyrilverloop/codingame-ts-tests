import ConfigurationConvertor from '../configuration/ConfigurationConvertor.js';
import CGCodeGenerator from './CGCodeGenerator.js';
import CGTestGenerator from './CGTestGenerator.js';
import ConfigurationParser from '../parser/ConfigurationParser.js';
import { access, constants, readdir } from 'node:fs/promises';
import path from 'path';


/**
 * The configuration file.
 */
const CONFIG_FILE = 'config.json';

/**
 * The default code directory.
 */
const DEFAULT_CODE_DIRECTORY = 'code' + path.sep;

/**
 * The default source directory.
 */
const DEFAULT_SOURCE_DIRECTORY = 'src' + path.sep;

/**
 * The default template directory.
 */
const DEFAULT_TEMPLATE_DIRECTORY = 'templates' + path.sep;

/**
 * The default test directory.
 */
const DEFAULT_TEST_DIRECTORY = 'test' + path.sep;

/**
 * The default code file.
 */
const DEFAULT_CODE_FILE = 'CGCode.ts';


/**
 * Generates the tests.
 */
export default class FilesGenerator {

    // Properties :

    #projectPath;
    #configurationParser;
    #codeGenerator;
    #testGenerator;


    // Constructor :

    /**
     * The constructor.
     * @param {string} projectPath - the project path.
     */
    constructor(projectPath: string) {
        this.#projectPath = projectPath;
        this.#configurationParser = new ConfigurationParser();
        const templatesPath = projectPath + DEFAULT_TEMPLATE_DIRECTORY;
        this.#codeGenerator = new CGCodeGenerator(templatesPath);
        this.#testGenerator = new CGTestGenerator(templatesPath);
    }


    // Methods :

    /**
     * Generates the test files.
     * @param {string} pathToScan - the path to scan for a configuration file.
     */
    async generate(pathToScan: string): Promise<void> {
        const difficultyDirectories = await readdir(pathToScan);

        for(const difficultyDirectory of difficultyDirectories) {
            const puzzleDirectories = await readdir(pathToScan + difficultyDirectory);

            this.#generateConfigurationsForDifficulty(
                puzzleDirectories,
                difficultyDirectory,
                pathToScan + difficultyDirectory + path.sep
            );
        }
    }

    /**
     * Generates the configurations for the difficulty.
     * @param {string[]} puzzleDirectories - the puzzle directories.
     * @param {string} difficulty - the difficulty.
     * @param {string} difficultyPathToScan - the path to scan for a configuration file.
     */
    async #generateConfigurationsForDifficulty(
        puzzleDirectories: string[],
        difficulty: string,
        difficultyPathToScan: string
    ): Promise<void> {
        for(const puzzleDirectory of puzzleDirectories) {
            const configurationPath = difficultyPathToScan + puzzleDirectory + path.sep;
            const defaultCodeFile = configurationPath + DEFAULT_CODE_DIRECTORY + DEFAULT_CODE_FILE;

            try {
                await access(defaultCodeFile, constants.F_OK);

                this.#generateFilesForConfiguration(
                    configurationPath,
                    difficulty + path.sep + puzzleDirectory + path.sep
                );
            } catch(error) {
            }
        }
    }

    /**
     * Generates the files for the configuration.
     * @param {string} configurationPath - the path of the `config` directory.
     * @param {string} namespacePath - the path where to generate the files.
     */
    async #generateFilesForConfiguration(
        configurationPath: string,
        namespacePath: string
    ): Promise<void> {
        const parsedConfiguration = await this.#configurationParser.getConfigurationFromFile(configurationPath + CONFIG_FILE);

        const codeConfiguration = await ConfigurationConvertor.getCodeGeneratorConfiguration(
            parsedConfiguration,
            configurationPath + DEFAULT_CODE_DIRECTORY + DEFAULT_CODE_FILE
        );
        this.#codeGenerator.generate(
            codeConfiguration,
            this.#projectPath + DEFAULT_SOURCE_DIRECTORY + namespacePath
        );

        const testConfiguration = ConfigurationConvertor.getTestGeneratorConfiguration(parsedConfiguration);
        this.#testGenerator.generate(
            testConfiguration,
            configurationPath,
            this.#projectPath + DEFAULT_TEST_DIRECTORY + namespacePath
        );
    }
}
