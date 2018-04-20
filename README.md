# Kubernetes Node.js Starter

A Node.js starter that adds ES7 async/await, serverless-offline, environment variables, and unit test support. Part of the Kubernetes CI/CD pipeline stack.

- **ES7 syntax in your handler functions**
  - Use async/await
  - And much more!
- **Support for Jest unit tests**
  - Run `npm test` to run your tests
- **Sourcemaps for proper error messages**
  - Error message show the correct line numbers
- **Add environment variables for your stages**

## Development

### Installation

* clone repo
* `npm i`

### Branches

There are two main branches, consistent with other lambda projects by RW.  Development work should be done on feature branches off `develop`, with PRs opened to merge into `develop` and PRs to `master` for releases intended to go to production.

| Branch | Build | Description |
| :--- | :---: | :--- |
| `master` | [![Master Depoly Status](https://drone-github.dynamics.net/api/badges/nchowinf/k8s_node_starter/status.svg?branch=master)](https://drone-github.dynamics.net/nchowinf/k8s_node_starter) | Deployed to production on succesful build |
| `develop` | [![Develop Depoly Status](https://drone-github.dynamics.net/api/badges/nchowinf/k8s_node_starter/status.svg?branch=develop)](https://drone-github.dynamics.net/nchowinf/k8s_node_starter) | Deployed to development on successful build |

## Using Tools

* **Node.js** - Node.js 8 LTS
* **Jest** - Node.js Unit test
* **Eslint** - Node.js Syntax lint
* **Prettier** - Node.js Code formatter
* **Drone** - CI/CD pipeline
* **Kubernetes** - Infrastructure Stack
* **Helm** - Kubernetes Package Manager

## Testing

### Drone secret commands

#### npm token

```console
$ drone secret add \
    -repository nchowinf/k8s_node_starter \
    -name NPM_TOKEN \
    -image plugins/gcr \
    -value 'XXXXXXXX'
```

#### slack webhook

```console
$ drone secret add \
    -repository nchowinf/k8s_node_starter \
    -name slack_webhook \
    -image plugins/slack \
    -value 'https://hooks.slack.com/services/XXXXXX'
```

#### google credentials

```console
$ drone registry add \
    --repository nchowinf/k8s_node_starter \
    --hostname gcr.io \
    --username _json_key \
    --password @/absolute/path/to/keyfile.json

$ drone secret add \
    -repository nchowinf/k8s_node_starter \
    -name google_credentials \
    -image plugins/gcr \
    -value @/absolute/path/to/keyfile.json
```

### Docker commands

#### image local build

```console
$ docker build \
    -t gcr.io/rw-k8s/node-starter:1.0.0 \
    --build-arg NPM_TOKEN='test_token' \
    --no-cache .
```

#### Local test

```console
$ docker run -p 3000:3000 rw-k8s/node-starter:1.0.0
```
