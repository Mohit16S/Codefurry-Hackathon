# Codefurry Hackathon

A modern Next.js landing page and product demo for an AI trust and security platform called ModelSentinel.

This project presents an interactive marketing experience for a product that verifies AI model behavior, fingerprints models, and monitors for silent drift in production environments.

## Overview

ModelSentinel helps teams:

- Verify model behavior before deployment
- Capture cryptographic fingerprints for certified baselines
- Monitor prompt injection resistance and safety policies
- Detect behavioral drift and silent model swaps
- Investigate compliance, security, and trust signals through a command center dashboard

## Tech Stack

- Next.js
- React
- TypeScript
- Framer Motion
- Lucide React
- CSS Modules / custom styling

## Project Structure

```bash
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/
│   ├── landing/
│   ├── ui/
│   └── brand.tsx
├── lib/
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Production build

```bash
npm run build
npm run start
```

## Notes

This repository is primarily a frontend prototype and product showcase, with animated sections, interactive trust cards, and a polished enterprise AI dashboard aesthetic.

## License

This project is currently unlicensed unless otherwise specified by the repository owner.
