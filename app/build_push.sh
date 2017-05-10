#!/bin/bash

image=registry.swarm/dfs/reporter-app:latest

docker build -t $image .
docker push $image
