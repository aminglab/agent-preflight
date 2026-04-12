# Boundary with Branching Agent OS

Agent Preflight is not the open-source version of the full Branching Agent OS product.

## Agent Preflight

This repository is the public sidecar layer.

It is designed for:

- public demos
- integration examples
- OpenClaw and Hermes adapters
- MCP-compatible entry points
- replay summary experiments
- community forks and iteration

## Branching Agent OS

The broader Branching Agent OS program remains private.

That private core is where the heavier control-plane work belongs, including:

- enterprise-grade orchestration
- policy and approval hardening
- production replay and audit systems
- multi-runner coordination
- deeper branch evaluation internals
- commercial deployment and reliability work

## Public-private relationship

The relationship between the two is simple:

- Agent Preflight is the public edge.
- Branching Agent OS is the private core.

The public repository should stay narrow, understandable, and easy to adopt.
The private repository should stay focused on the long-term product core.
