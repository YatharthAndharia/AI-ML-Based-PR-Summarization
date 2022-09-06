#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE USER demo;
ALTER USER demo WITH PASSWORD 'demo';
CREATE DATABASE demoapi;
GRANT ALL PRIVILEGES ON DATABASE demoapi TO demo;
EOSQL
