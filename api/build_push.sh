#!/bin/bash

image=registry.swarm/dfs/reporter-api:latest

docker build -t $image .
docker push $image
