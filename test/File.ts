import LineByLine from 'n-readlines';

export default class File {

    // Properties :

    #liner: LineByLine;


    // Constructor :

    /**
     * The constructor.
     * @param {string} filename - the file name.
     */
    constructor(filename: string) {
        this.#liner = new LineByLine(filename);
    }


    // Methods :

    /**
     * Reads a line.
     * @returns {string} - a line.
     */
    readline(): string {
        return this.#liner.next().toString("utf8");
    }
}
