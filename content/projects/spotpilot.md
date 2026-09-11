---
title: "SpotPilot"
category: "open-source"
description: "Agent-first Go CLI for deterministic, local Spotify playback control"
excerpt: "A Go CLI that lets AI agents search and control Spotify through predictable commands, JSON-first output, and local-device-aware playback"
technologies: ["Go", "Cobra", "Spotify", "Chrome DevTools Protocol"]
github: "https://github.com/ignatij/spotpilot"
personal_project_order: 2
cv_highlights:
  - "Built an agent-first Go CLI with deterministic commands, JSON-first output, local-device-aware Spotify playback, and browser-based authentication recovery."
---

SpotPilot is a local command-line tool that turns an AI agent's music requests into reliable Spotify playback actions. The agent handles natural language; SpotPilot provides the narrow, deterministic execution layer behind it.

## Overview

Built in Go for macOS and Linux, SpotPilot exposes one command per playback action and returns stable, machine-readable results. It is designed for agent workflows where predictable behavior, clear failures, and automation-friendly output matter more than an interactive interface.

## Key Features

- **Agent-First Interface**: Focused commands for playing, pausing, resuming, skipping, and inspecting playback
- **JSON-First Output**: A consistent result envelope makes every command easy for agents and scripts to interpret
- **Local Device Preference**: Targets Spotify on the current machine instead of taking over a phone, speaker, or another computer
- **Automatic Recovery**: Starts the desktop client when needed and can fall back to Spotify's web player
- **Browser-Based Login**: Captures and persists a Spotify session through Chrome or Chromium, then resumes the original action
- **Agent Setup Commands**: Installs tool preferences for OpenAI Codex and GitHub Copilot CLI with idempotent setup commands
- **Human-Friendly Mode**: Supports concise plain-text responses alongside the default structured output

## Usage

Install SpotPilot with Homebrew:

```bash
brew install ignatij/spotpilot/spotpilot
```

Then authenticate and control playback:

```bash
spotpilot login
spotpilot play "Master of Puppets"
spotpilot status
spotpilot pause
spotpilot next
```

To register SpotPilot as the preferred Spotify tool for an AI coding agent:

```bash
spotpilot codex setup
spotpilot copilot setup
```

## Technical Design

SpotPilot is a single-binary CLI with a layered architecture:

- **Command Layer**: Cobra commands parse flags, wire dependencies, and invoke use cases
- **Application Layer**: Orchestrates login, search, device resolution, and playback workflows
- **Domain Layer**: Defines playback concepts and stable application errors
- **Integration Adapters**: Isolate browser automation, session storage, and Spotify APIs behind application-owned interfaces
- **Output Boundary**: Maps every result to the same JSON envelope, with optional plain-text rendering

Configuration follows a predictable precedence order—command flags, environment variables, YAML configuration, then defaults—while structured errors and exit codes keep automated callers in control.

## Playback Flow

When an agent runs `spotpilot play`, the CLI:

1. Restores a saved session or launches a bounded browser login flow
2. Searches Spotify and selects Spotify's highest-ranked result
3. Resolves a playable Spotify device on the local machine
4. Starts playback through the desktop client or web-player fallback
5. Returns a minimal structured result to the calling agent

## Example Output

```json
{
  "ok": true,
  "command": "play",
  "state": "playing",
  "message": "Playing Master of Puppets",
  "result": {
    "match_type": "track",
    "title": "Master of Puppets",
    "artist": "Metallica"
  }
}
```

## Repository

[View SpotPilot on GitHub](https://github.com/ignatij/spotpilot)
