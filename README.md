# Agent Preflight

**Rehearse risky browser tasks before your agent commits.**

Agent Preflight is an open-source sidecar for OpenClaw, Hermes, and other agent runtimes.
It helps agents simulate risky browser workflows before real submission, compare candidate paths, and return a safer recommended plan.

## Why this exists

Agent runtimes are getting better at planning and acting.

But many high-risk browser tasks still fail in the worst possible way: they explore by touching the real system.

Agent Preflight adds a lightweight pre-execution layer:

- capture a recoverable checkpoint
- explore multiple candidate browser paths
- compare outcomes
- return a recommended path
- optionally hand the approved plan back to the upstream runtime

In short:

> rehearse first, commit later

## What this project is

Agent Preflight is a browser workflow preflight sidecar.

It is designed to sit beside:

- OpenClaw
- Hermes
- custom MCP-compatible runtimes
- browser agents and Playwright-based systems

## What this project is not

- not a full assistant
- not a full agent runtime
- not the full Branching Agent OS product
- not an enterprise-grade control plane

This repository is the public open-source edge of a broader idea: pre-execution control for high-risk agent actions.

## First release scope

The first release focuses on:

- browser-first workflows
- risky form submission, admin changes, and config paths
- candidate path rehearsal
- lightweight replay summary
- recommendation output back to the upstream runtime

By default, it does not perform final real-world commit on its own.

## Integrations

Planned integrations:

- OpenClaw sidecar adapter
- Hermes sidecar adapter
- MCP-compatible API mode
- standalone demo mode

## Repository goals

This repo is built for:

- experimentation
- public demos
- forks and community iteration
- integration examples
- benchmark-style workflow testing

## Status

Early public preview.

## License

MIT
