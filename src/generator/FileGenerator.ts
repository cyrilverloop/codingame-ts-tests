import Twig from 'twig';
import { mkdir, writeFile } from 'node:fs/promises';
import CodeGeneratorConfiguration from './CodeGeneratorConfiguration.js';
import TestGeneratorConfiguration from './TestGeneratorConfiguration.js';

/**
 * the generator base class.
 */
export default class FileGenerator {

    // Properties :

    templatePath;


    // Constructor :

    /**
     * The constructor.
     * @param {string} templatePath - the template path.
     */
    constructor(templatePath: string) {
        this.templatePath = templatePath;
    }


    // Methods :

    /**
     * Generates the file content.
     * @param {CodeGeneratorConfiguration|TestGeneratorConfiguration} configuration - the  configuration.
     * @param {string} path - the path.
     * @param {string} file - the file.
     * @param {string} templateFile - the template file.
     */
    generateContent(
        configuration: CodeGeneratorConfiguration|TestGeneratorConfiguration,
        path: string,
        file: string,
        templateFile: string
    ): void {
        Twig.renderFile(
            this.templatePath + templateFile,
            {'configuration': configuration},
            this.#writeFile.bind(this, path, file)
        );
    }

    /**
     * Write the file.
     * @param {string} path - the path.
     * @param {string} file - the file.
     * @param {Error} error - if the content could not be generated.
     * @param {string} content - the content.
     * @throws {Error} - if the content could not be generated.
     * @throws {Error} - if file could not be written.
     */
    async #writeFile(
        path: string,
        file: string,
        error: Error,
        content: string
    ): Promise<void> {
        if(error !== null) {
            throw new Error("Could not generate file content.");
        }

        try {
            await mkdir(path, { recursive: true });
            await writeFile(path + file, content);
        }
        catch(error: any) {
            throw new Error("Could not write file : " + error.message);
        }
    }
}
