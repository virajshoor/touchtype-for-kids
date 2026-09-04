# ✨ Story Keys

### A fairy-tale touch-typing adventure for little storytellers

Story Keys turns keyboard practice into a page-turning journey. Children type short, encouraging lines while a friendly story scene, a glowing target key, gentle feedback, read-aloud support, and collectible stars keep the experience warm and motivating.

![Story Keys preview](assets/red-hood-meadow.png)

## Start playing

```bash
./run.sh
```

Open **http://localhost:8000** in a browser. This is the simplest development mode and works without installing dependencies.

For an app-style window on Omarchy:

```bash
./launch.sh
```

That starts a private local server and opens Story Keys in a Chromium app window. Close the window to stop the local server.

## Omarchy Spotlight / Walker

**Status: Story Keys is not yet integrated into Omarchy itself.** It does not edit `/usr/share/omarchy/` or any system files. A safe, user-level desktop entry is included so you can make it discoverable in Omarchy’s Spotlight/Walker launcher:

```bash
./install-omarchy.sh
```

After installation, search for **Story Keys**. The entry lives at `~/.local/share/applications/story-keys.desktop` and points back to this checkout, so keep the folder in place. Run the installer again if you move the project.

## What’s inside

- Five gentle fairy-tale chapters with 25 short practice lines
- Works with a physical keyboard or clickable on-screen keys
- Current character tracking and a softly glowing next-key hint
- Mistake feedback that corrects without punishing or blocking progress
- Read the current sentence aloud with the speaker button
- Stars, chapter transitions, pause, restart, skip, and responsive layout
- No build step and no third-party runtime dependencies

## Design principles

The interface uses large targets, clear visual hierarchy, progress that moves in small steps, immediate positive feedback, and low-stakes correction. The story provides context and imagination, while the next-key glow reduces search effort for new typists.

## Project map

```text
index.html             interface and accessible controls
styles.css             responsive storybook visual system
app.js                 lesson data and typing interaction
assets/                original story illustration
run.sh                 browser-based local development server
launch.sh              Chromium app-window launcher
story-keys.desktop     desktop-entry template
install-omarchy.sh     user-level Spotlight/Walker installer
```

## License

The source is ready for personal learning projects and experimentation. Replace the included illustration with artwork you have permission to distribute before making a public fork.
