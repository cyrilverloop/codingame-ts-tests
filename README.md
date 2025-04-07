# CodinGame TypeScript tests

A project to test your [CodinGame](https://www.codingame.com/) TypeScript code. It is not intended to have solutions.
It only contains tests to let you code in your favorite IDE, outside of the CodinGame web site.

[![License](https://img.shields.io/github/license/cyrilverloop/codingame-ts-tests)](https://github.com/cyrilverloop/codingame-ts-tests/blob/trunk/LICENSE)

**This project uses Node 23 and TypeScript 5.8.0. CodinGame uses Node 20.9.0 and TypeScript 5.6.2.**


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


## Time limit

The maximum time allowed may differ from CodinGame.
