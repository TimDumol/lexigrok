#!/bin/bash
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$script_dir/.."
uv run uvicorn lexigrok:main --port 9933 --reload