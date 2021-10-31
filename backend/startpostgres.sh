#!/bin/sh

mkdir -p `pwd`/database

docker run --rm \
  -e POSTGRES_PASSWORD=password \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -p 5432:5432 \
  -v `pwd`/database:/var/lib/postgresql/data \
  postgres