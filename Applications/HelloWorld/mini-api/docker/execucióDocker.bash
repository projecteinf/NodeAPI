#!/bin/bash
mkdir -p ../data/sqlserver
chown -R 10001:0 ../data/sqlserver
chmod -R 770 ../data/sqlserver
docker compose up -d
