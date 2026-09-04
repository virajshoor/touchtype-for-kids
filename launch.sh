#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PORT="${STORY_KEYS_PORT:-8765}"

if command -v chromium >/dev/null 2>&1; then
  BROWSER="chromium"
elif command -v google-chrome >/dev/null 2>&1; then
  BROWSER="google-chrome"
else
  echo "Story Keys needs Chromium or Google Chrome for app-window mode." >&2
  echo "You can still run ./run.sh and open http://localhost:8000 manually." >&2
  exit 1
fi

python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$APP_DIR" >/tmp/story-keys-http.log 2>&1 &
SERVER_PID=$!
cleanup() { kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT INT TERM

sleep 0.35
"$BROWSER" --app="http://127.0.0.1:${PORT}/" --class=StoryKeys
