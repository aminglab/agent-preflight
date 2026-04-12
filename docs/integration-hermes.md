# Hermes integration

Hermes is the second planned upstream runtime for Agent Preflight.

## Intended flow

1. Hermes receives a task that involves a risky browser workflow.
2. Hermes delegates a preflight request to Agent Preflight.
3. Agent Preflight explores candidate paths and returns a recommendation.
4. Hermes can then continue with a safer execution plan.

## Why support Hermes

Agent Preflight should not be locked to a single upstream runtime.
Supporting Hermes early helps keep the public repository runtime-agnostic.

## Early boundary

This repository only covers the public sidecar edge.
It does not expose the full private control-plane core.
