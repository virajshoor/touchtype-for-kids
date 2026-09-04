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

## Omarchy plugin

Story Keys is packaged as a `bar-widget` plugin. It adds a small keyboard button to the Omarchy bar; clicking it opens the fairy-tale typing app.

Install the public plugin with:

```bash
omarchy plugin add https://github.com/virajshoor/touchtype-for-kids.git --enable
```

Then place it in the bar if Omarchy does not add it automatically:

```bash
omarchy bar move io.github.virajshoor.story-keys --section center
```

Remove it with:

```bash
omarchy plugin remove io.github.virajshoor.story-keys --yes
```

**Status: Story Keys is not integrated into Omarchy’s upstream/system installation itself.** It is a standalone public plugin and does not edit `/usr/share/omarchy/` or any system files. The plugin runs with your user permissions and launches the repository’s `launch.sh`.

### Dependencies and permissions

- The bar button uses the Omarchy Quattro shell plugin runtime.
- The typing app uses Python 3’s standard-library web server and Chromium or Google Chrome for app-window mode.
- No third-party runtime packages, root privileges, background service, telemetry, or network account are required.
- The plugin launches `launch.sh` with the current user’s permissions. It does not overwrite user configuration without an explicit install or settings action.

## Omarchy Spotlight / Walker

The repository also includes a safe, user-level desktop entry so Story Keys can be launched directly from Omarchy’s Spotlight/Walker app search:

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
manifest.json          Omarchy plugin manifest
BarWidget.qml          Omarchy bar button entry point
LICENSE                MIT license
run.sh                 browser-based local development server
launch.sh              Chromium app-window launcher
story-keys.desktop     desktop-entry template
install-omarchy.sh     user-level Spotlight/Walker installer
```

## Marketplace submission checklist

These statements document the repository’s submission requirements for the official Omarchy plugin marketplace. See [PLUGIN_SUBMISSION.md](PLUGIN_SUBMISSION.md) for the maintainer checklist and scope notes.

## License

The source is ready for personal learning projects and experimentation. Replace the included illustration with artwork you have permission to distribute before making a public fork.
