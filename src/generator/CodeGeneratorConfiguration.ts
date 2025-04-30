/**
 * The code generator configuration.
 */
export default class CodeGeneratorConfiguration {

    // Properties :

    #name;
    #link;
    #defaultCode;


    // Constructor :

    /**
     * The constructor.
     * @param {string} name - the name.
     * @param {string} link - the link.
     * @param {string} defaultCode - the default code.
     */
    constructor(
        name: string,
        link: string,
        defaultCode: string
    ) {
        this.#name = name;
        this.#link = link;
        this.#defaultCode = defaultCode;
    }


    // Accessors :

    /**
     * Returns the name.
     * @returns {string} - the name.
     */
    get name(): string
    {
        return this.#name;
    }

    /**
     * Returns the link.
     * @returns {string} - the link.
     */
    get link(): string
    {
        return this.#link;
    }

    /**
     * Returns the default code.
     * @returns {string} - the default code.
     */
    get defaultCode(): string
    {
        return this.#defaultCode;
    }
}
