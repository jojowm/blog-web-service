A restful server-end based on node, MongoDB, docker

How to use:

1. Install docker. If you are using linux or unix, install docker-compose manually (windows and mac have already bundled docker-compose with docker)

2. Pull the code locally, then exec

```shell
docker-compose up
```

> [change registry-mirror is recommended](https://docs.docker.com/registry/recipes/mirror/#configure-the-docker-daemon)

## Describing the services

* One docker container for MongoDB
* One docker data volume to persist the data from MongoDB
* One docker container for the REST API node.js server
