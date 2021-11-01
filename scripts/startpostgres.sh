#!/bin/sh

mkdir -p `pwd`/backend/database

docker run --rm \
  -e POSTGRES_PASSWORD=password \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -p 5432:5432 \
  -v `pwd`/backend/database:/var/lib/postgresql/data \
  postgres