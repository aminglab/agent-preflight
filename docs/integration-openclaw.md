# OpenClaw integration

OpenClaw is the first planned upstream runtime for Agent Preflight.

## Intended flow

1. OpenClaw receives a user request.
2. The runtime detects that the requested browser action is high-risk.
3. OpenClaw sends a preflight request to Agent Preflight.
4. Agent Preflight explores candidate browser paths and produces a recommendation.
5. OpenClaw decides whether to execute the recommended path.

## Early scope

The first integration target is intentionally narrow:

- browser-first
- risky form submission
- admin/config changes
- recommendation-first, not full autonomous commit

## Why OpenClaw first

OpenClaw already provides a strong host surface for:

- message entry points
- sessions
- browser tooling
- plugin and MCP-style extension points

That makes it a practical first integration target for a public repository.
