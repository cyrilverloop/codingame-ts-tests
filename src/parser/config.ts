import ConfigTest from './configTest.js';

export default interface Config {
    path: string,
    name: string,
    alphanumName: string,
    link: string,
    tests: ConfigTest[]
}
