#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"
APP_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"
echo "Story Keys is running at http://localhost:${PORT}"
python3 -m http.server "$PORT" --bind 127.0.0.1
