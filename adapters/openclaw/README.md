# OpenClaw adapter

This directory contains the first public adapter skeleton for OpenClaw.

## Current files

- `src/types.ts` — request and response contracts for a preflight exchange
- `src/mock-handler.ts` — mock response builder for early demos
- `src/index.ts` — adapter exports

## Intended flow

1. OpenClaw detects a risky browser task.
2. OpenClaw sends a preflight request.
3. Agent Preflight compares candidate paths.
4. Agent Preflight returns a recommended path and replay summary.
5. OpenClaw decides whether to continue toward real execution.

## Current boundary

This is an early public skeleton.
It is not yet a production integration.
