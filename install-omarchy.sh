#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="${XDG_DATA_HOME:-$HOME/.local/share}"
APPLICATIONS_DIR="$DATA_DIR/applications"
DESKTOP_FILE="$APPLICATIONS_DIR/story-keys.desktop"
ICON_FILE="$DATA_DIR/icons/hicolor/512x512/apps/story-keys.png"

mkdir -p "$APPLICATIONS_DIR"
mkdir -p "$(dirname -- "$ICON_FILE")"
sed "s|@@APP_DIR@@|$APP_DIR|g" "$APP_DIR/story-keys.desktop" > "$DESKTOP_FILE"
cp "$APP_DIR/assets/red-hood-meadow.png" "$ICON_FILE"
chmod 644 "$DESKTOP_FILE"
chmod 644 "$ICON_FILE"

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$APPLICATIONS_DIR" >/dev/null 2>&1 || true
fi

echo "Installed Story Keys into: $DESKTOP_FILE"
echo "It is ready to search for in Omarchy Spotlight/Walker as: Story Keys"
