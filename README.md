# metabolica-ui-upload

## Installation

We strongly sugggest the use of [node version
manager](https://github.com/creationix/nvm) for handling your node versions on a
per-project basis. Quick setup:

1. [Install nvm](https://github.com/creationix/nvm#install-script) itself.
2. Install a node version: `nvm install 'lts/*'`.
3. Set the version as default for this project: `echo "lts/*" > .nvmrc`.
4. `nvm use`

After that it's as simple as providing two URLs via environment variables and
typing `make start`.

| Variable     | Default Value | Description |
|--------------|--------------:|-------------|
| `DECAF_API`  | `''`          | URL of the iloop backend, for example, `http://localhost:8080`. |
| `UPLOAD_API` | `''`          | URL of the upload service, for example, `http://localhost:7000`. |

**Workaround:** Put the following into a `.env` file:
```
DECAF_API=http://localhost:8080
UPLOAD_API=http://localhost:7000
```
and then start the process like this: `source .env && make start`.

## TODO:

* [ ] Make the `UPLOAD_API` configurable via an environment variable. Currently,
      this has to be hardcoded inside of
      `src/upload/providers/decafapi.provider.ts`.
* [ ] Provide sensible default values for the variables.
