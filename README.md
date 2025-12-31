# CodinGame TypeScript tests

A project to test your [CodinGame](https://www.codingame.com/) TypeScript code. It is not intended to have solutions.
It only contains tests to let you code in your favorite IDE, outside of the CodinGame web site.

[![License](https://img.shields.io/github/license/cyrilverloop/codingame-ts-tests)](https://github.com/cyrilverloop/codingame-ts-tests/blob/trunk/LICENSE)

**This project uses Node 25 and TypeScript 5.9. CodinGame uses Node 20.9.0 and TypeScript 5.6.2.**


## Installation

Downloading the project :
```shellsession
user@host ~$ cd [PATH_WHERE_TO_PUT_THE_PROJECT] # E.g. ~/projects/
user@host projects$ git clone https://github.com/cyrilverloop/codingame-ts-tests.git
user@host projects$ cd codingame-ts-tests
```

Copy some configuration files for Docker :
```shellsession
user@host projects$ cp ./.env.dist ./.env
user@host projects$ cp ./.ashrc.dist ./.ashrc
```
Edit the `./.env` to use your user UID and GID in the container if necessary.
The `./.ashrc`, `./.env` and `./compose.override.yaml` files are ignored by git, you can modify them to your needs.
The `./.ashrc` add some aliases to your container.

Installing the dependencies :
```shellsession
user@host codingame-ts-tests$ docker compose run --rm app npm i
```

Generate the code and test files :
```shellsession
user@host codingame-ts-tests$ docker compose run --rm app npm run generate
```

**Existing code, test, input and output files will not be overwritten.
To generate a file again, you must delete it first.**


## Add your code

Every files in `./src/**/CGCode.ts` files have an `execute()` method with the default CodinGame code.
A test executes the `execute()` method. You can add your code in and arround it.

Verifying your TypeScript code :
```shellsession
user@host codingame-ts-tests$ docker compose run --rm app npm run check
```


## Test your solution

Executing tests for a specific code :
```shellsession
user@host codingame-ts-tests$ docker compose run --rm app npm test ./test/easy/ASCIIArt/
```

Executing tests and generate coverage report for a specific code :
```shellsession
user@host codingame-ts-tests$ docker compose run --rm app npm run coverage ./test/easy/ASCIIArt/
```


## Add your test (optional)

Every tests in `./test/**/CG.test.ts` files include the tests from CodinGame.
You can add your own tests in `./test/**/*.ts` files.


## Time limit

The maximum time allowed may differ from CodinGame.
