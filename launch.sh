#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PORT="${STORY_KEYS_PORT:-8765}"

if [[ -n "${XDG_RUNTIME_DIR:-}" ]]; then
  RUNTIME_BASE="$XDG_RUNTIME_DIR"
  if [[ ! -d "$RUNTIME_BASE" || ! -w "$RUNTIME_BASE" || ! -O "$RUNTIME_BASE" ]]; then
    echo "Story Keys needs XDG_RUNTIME_DIR to be a writable, user-owned directory." >&2
    exit 1
  fi
  RUNTIME_MODE="$(stat -Lc '%a' -- "$RUNTIME_BASE")"
  if (( (8#$RUNTIME_MODE & 077) != 0 )); then
    echo "Story Keys needs XDG_RUNTIME_DIR to be accessible only by its owner." >&2
    exit 1
  fi
else
  RUNTIME_BASE="/tmp"
  if [[ ! -d "$RUNTIME_BASE" || ! -w "$RUNTIME_BASE" || ! -k "$RUNTIME_BASE" ]]; then
    echo "Story Keys needs a writable runtime directory with sticky-bit protection." >&2
    exit 1
  fi
fi

# mktemp creates this directory atomically. Keeping the predictable log name
# inside a mode-0700 directory prevents other users from redirecting it with a
# pre-created symlink.
umask 077
RUNTIME_DIR="$(mktemp -d -- "$RUNTIME_BASE/story-keys.XXXXXX")"
LOG_FILE="$RUNTIME_DIR/http.log"
SERVER_PID=""

cleanup() {
  if [[ -n "$SERVER_PID" ]]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  rm -f -- "$LOG_FILE"
  rmdir -- "$RUNTIME_DIR" 2>/dev/null || true
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

if command -v chromium >/dev/null 2>&1; then
  BROWSER="chromium"
elif command -v google-chrome >/dev/null 2>&1; then
  BROWSER="google-chrome"
else
  echo "Story Keys needs Chromium or Google Chrome for app-window mode." >&2
  echo "You can still run ./run.sh and open http://localhost:8000 manually." >&2
  exit 1
fi

python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$APP_DIR" >"$LOG_FILE" 2>&1 &
SERVER_PID=$!

sleep 0.35
"$BROWSER" --app="http://127.0.0.1:${PORT}/" --class=StoryKeys
