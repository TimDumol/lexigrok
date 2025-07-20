#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")
ENV_FILE="$SCRIPT_DIR/../.env"

if [ -f "$ENV_FILE" ]; then
    echo "$ENV_FILE already exists."
else
    echo "Creating $ENV_FILE..."
    SECRET_KEY=$(openssl rand -hex 32)
    echo "SECRET_KEY=$SECRET_KEY" > "$ENV_FILE"
    echo "Created $ENV_FILE with a new SECRET_KEY."
fi
