import CodeGeneratorConfiguration from './CodeGeneratorConfiguration.js';
import FileGenerator from './FileGenerator.js';
import { access, constants } from 'node:fs/promises';


/**
 * The template file name.
 */
const TEMPLATE_FILE_NAME = 'CGCode.twig';

/**
 * The js file name.
 */
const JS_FILE_NAME = 'CGCode.ts';


/**
 * The code generator.
 */
export default class CGCodeGenerator extends FileGenerator {

    // Methods :

    /**
     * Generates the code.
     * @param {CodeGeneratorConfiguration} configuration - the code configuration.
     * @param {string} toPath - the path where to put the generated code.
     */
    async generate(
        configuration: CodeGeneratorConfiguration,
        toPath: string
    ): Promise<void> {
        try {
            await access(toPath + JS_FILE_NAME, constants.F_OK);
        }
        catch(error) {
            this.generateContent(configuration, toPath, JS_FILE_NAME, TEMPLATE_FILE_NAME);
        }
    }
}
