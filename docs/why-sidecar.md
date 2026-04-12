# Why a sidecar first

Agent Preflight starts as a sidecar because the full Branching Agent OS vision is heavier than what a public developer-facing repository should carry on day one.

A sidecar-first approach gives this project three advantages:

1. It is easier to explain.
2. It is easier to integrate with existing runtimes.
3. It is easier to fork, try, and extend in public.

The sidecar focuses on one narrow but valuable job:

> rehearse risky browser workflows before real submission.

That means this repository prioritizes:

- browser-first task rehearsal
- candidate path comparison
- lightweight replay summaries
- recommendation output back to the upstream runtime

It does not try to expose the full private control-plane core.

## Why not open the whole BAOS stack

The full Branching Agent OS program includes broader control-plane concerns such as:

- orchestration
- approval and policy hardening
- audit export
- enterprise reliability
- multi-runner coordination
- production replay and retention

Those belong to the product core, not the public edge.

## Public goal

The public goal of Agent Preflight is to create a simple entry point for:

- demos
- adapters
- community iteration
- forks
- benchmark-style experimentation

## Private goal

The private goal of the broader BAOS program remains the same:

build a real pre-execution control plane for high-risk agent actions.
