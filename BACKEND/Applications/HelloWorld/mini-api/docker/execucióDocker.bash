#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DATA_DIR="$SCRIPT_DIR/../data/sqlserver"

mkdir -p "$DATA_DIR"

sudo chown -R 10001:0 "$DATA_DIR"
sudo chmod -R 775 "$DATA_DIR"

docker compose up -d