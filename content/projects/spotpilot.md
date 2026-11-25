---
title: "SpotPilot"
home_summary: "Agent-first Go CLI enforcing narrow, deterministic Spotify commands, strict JSON contracts, and bounded Chrome DevTools Protocol auth recovery."
home_technologies: ["Go", "Cobra", "Chrome DevTools Protocol", "JSON CLI"]
category: "open-source"
description: "Agent-first Go CLI enforcing a narrow, deterministic execution boundary and bounded browser auth recovery for Spotify playback"
excerpt: "Agent-first Go CLI that isolates LLM natural-language intent from side effects via narrow commands, strict JSON envelopes, exit codes, and bounded Chrome DevTools Protocol auth recovery."
technologies: ["Go", "Cobra", "Chrome DevTools Protocol", "Spotify"]
github: "https://github.com/ignatij/spotpilot"
personal_project_order: 1
cv_highlights:
  - "Built an agent-first Go CLI enforcing narrow deterministic commands, strict JSON envelopes, adapter-isolated side effects, and bounded Chrome DevTools Protocol auth recovery."
---

## Context & risk

Giving an AI agent direct access to browser automation, raw cookies, or unconstrained shell scripts to perform a simple user action expands both failure modes and blast radius. SpotPilot separates intent from execution: the agent handles natural language, while SpotPilot enforces a narrow, deterministic execution boundary for local Spotify playback.

## Architecture & key tradeoffs

- **Single-binary layered Go architecture:** Separates **Cobra** command parsing, application use cases (login, search, local device resolution, playback), domain error types, and integration adapters (browser automation, session persistence, Spotify APIs) behind application-owned interfaces.
- **Strict machine-readable output boundary:** Every command returns a consistent JSON envelope with structured errors and predictable exit codes (with an optional concise plain-text mode for humans), keeping automated callers in control without scraping stdout.
- **Deterministic configuration precedence:** Resolves configuration in a fixed order—command flags, environment variables, YAML config, then defaults—and provides idempotent setup commands (`spotpilot codex setup`, `spotpilot copilot setup`) to register tool usage with OpenAI Codex and GitHub Copilot CLI.

## Security & reliability mechanics

- **Bounded browser auth recovery:** When no valid session exists, SpotPilot launches a scoped Chrome/Chromium login flow over **Chrome DevTools Protocol**, captures and persists the session within the CLI's storage boundary, and resumes the original command—avoiding exposing raw browser control to the calling agent.
- **Local-device preference & fallback:** Targets Spotify on the local machine rather than hijacking remote speakers or phones, starting the desktop client when needed and falling back cleanly to the web player.

## Usage

```bash
brew install ignatij/spotpilot/spotpilot

spotpilot login
spotpilot play "Master of Puppets"
spotpilot status
spotpilot pause
spotpilot next
```

Example structured response returned to an agent caller:

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
