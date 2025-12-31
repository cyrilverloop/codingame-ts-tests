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
     * @returns {(string|null)} - a line or null.
     */
    readline(): string|null {
        const line = this.#liner.next();

        if(line === null) {
            return null;
        }

        return line.toString("utf8");
    }
}
