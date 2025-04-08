# 🧙 Adventure

*An immersive, AI-enhanced virtual tabletop built on Cloudflare for procedurally-generated fantasy campaigns.*

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev servers (frontend & workers)
make dev

# Build project
make build
```

---

## 🎲 Key Features

### ⚔️ Gameplay
- **Human or AI Players:** Solo, multiplayer, or mixed modes.
- **Procedural Campaigns:** AI-generated storylines and one-shots.
- **Real-time Sync:** Durable Objects ensure seamless multiplayer.
- **In-Game Assistance:** Dice rolls, spell effects, condition tracking.

### 🗺️ AI-Generated Maps
- Overworld, city, biome-specific, and battle-grid maps.
- DM-controlled fog of war.
- Interactive lore pins.

### 🧙 Player Tools
- Guided character creation with attribute rolling.
- Dynamic character sheets (live updates, autosave).
- Roleplay dashboard with notes and voice-style prompts.

### 🧠 Dungeon Master Tools
- **DM God Mode:** Roll override, visibility toggles, event injection.
- **Narration & Scene Prompts:** AI-generated descriptions, NPC dialogue.
- **Dynamic Difficulty:** Real-time control over encounter challenge.

### 🎵 Immersive FX & Audio
- Particle effects for spells and combat.
- Mood music and sound effects synced to gameplay events.
- Accessibility-friendly "Low-FX" mode.

### 🌐 Multiplayer & Mod Support
- Persistent, rejoinable game sessions.
- Drop-in-drop-out guest characters.
- Optional Discord-style voice/video integrations.
- Modular engine supports homebrew rules and third-party mods.

---

## 🛠️ Tech Stack

**Cloudflare Ecosystem:**

- **Workers**: Game logic and AI integration.
- **Durable Objects**: Real-time multiplayer state.
- **Workers AI**: Procedural storytelling, NPC dialogue, visuals.
- **KV / R2**: Persistent data storage (characters, maps, campaigns).
- **Queues**: Turn-based logic, action management.
- **Pages**: Frontend hosting.

**Frontend:** React (Vite), Tailwind, Radix UI, Framer Motion

**Dev Tools:** Makefile, npm workspaces, Wrangler

---

## 🧑‍💻 Development Commands

```bash
# Install project dependencies
npm install

# Run dev environment
make dev

# Build the full project
make build

# Lint and format code
make lint
make format

# Show project structure
make tree
```

---

## 📁 Project Structure

```
adventure/
├── frontend/       # React frontend
├── workers/        # Cloudflare Workers backend
├── Makefile        # Dev automation tasks
├── package.json    # Root npm workspace
└── wrangler.toml   # Cloudflare deployment config
```

---

## 📜 License

© 2025 Keith Adler. All Rights Reserved.

This software is proprietary. Unauthorized copying, modification, distribution, or usage without explicit permission is prohibited.


