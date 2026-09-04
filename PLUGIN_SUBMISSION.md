# Omarchy Marketplace Submission

Maintainer checklist for `io.github.virajshoor.story-keys`.

- [x] The repository is public and contains installation and removal instructions.
- [x] The plugin license and external dependencies are documented in [README.md](README.md).
- [x] The maintainer confirms ownership of, or permission to submit, this plugin and its preview assets.
- [x] The plugin does not overwrite user configuration without explicit consent.
- [x] The maintainer understands that marketplace approval is for listing and is not a security review.

## Scope and safety notes

Story Keys is a user-level `bar-widget` plugin. Its QML entry point launches the repository-local `launch.sh` through `uwsm-app`; the launcher starts a loopback-only local HTTP server and opens the existing Chromium/Google Chrome installation in app-window mode. It does not request sudo, install packages, edit `/usr/share/omarchy/`, modify Hyprland configuration, collect telemetry, or contact a remote service at runtime.

The included preview is an original storybook illustration generated for this project. The repository is public under the MIT license.
