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

## OpenClaw demo

A minimal runnable OpenClaw demo is now included.

From the repository root:

```bash
npm run demo:openclaw
npm run demo:openclaw:stdout
```

What it does:

- reads `examples/openclaw-demo/request.json`
- validates the minimal request shape
- generates a mock preflight recommendation
- writes `examples/openclaw-demo/response.generated.json` unless `--stdout-only` is used

You can also run the script directly:

```bash
node adapters/openclaw/demo/run-demo.js
node adapters/openclaw/demo/run-demo.js --stdout-only
```

## Repository structure

```text
adapters/
  openclaw/
    demo/
    src/
  hermes/
    src/
examples/
  openclaw-demo/
  hermes-demo/
docs/
```

## Adapter status

### OpenClaw

The OpenClaw adapter currently includes:

- minimal request and response types
- a mock decision handler
- sample request and response payloads
- a runnable demo entrypoint

### Hermes

The Hermes adapter currently includes:

- minimal request and response types
- a mock decision handler
- sample request and response payloads

The intent is to keep the public repo runtime-agnostic even while OpenClaw is the first runnable path.

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
