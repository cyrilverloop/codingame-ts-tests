import FilesGenerator from "../src/generator/FilesGenerator.js";
import { dirname, sep } from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

async function generate(): Promise<void> {
    console.log('Starting generation.');

    const filesGenerator = new FilesGenerator(__dirname + '..' + sep);
    await filesGenerator.generate(
        __dirname + '../node_modules/@cyrilverloop/codingame-configuration/config/'
    );

    console.log('Generation complete.');
}

generate();
