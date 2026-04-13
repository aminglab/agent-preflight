# Contributing

Thanks for taking an interest in Agent Preflight.

This repository is intentionally small, public, and developer-facing.

It is meant to stay understandable and easy to fork.
So the best contributions are the ones that make the public sidecar sharper without turning it into the full private control plane.

## Good contributions for this repo

Contributions that fit especially well here:

- runnable demo improvements
- new example payloads that clarify risk posture
- adapter-facing improvements for OpenClaw, Hermes, and similar runtimes
- lightweight docs improvements
- better quickstarts, walkthroughs, and diagrams
- small contract refinements that keep the public interface clearer

A useful rule of thumb:

> prefer changes that make the public sidecar easier to understand, easier to run, or easier to integrate

## Changes that usually do not belong here

This repository is not trying to become the full Branching Agent OS product.

That means contributions should generally avoid pushing the public repo toward:

- a full enterprise control plane
- heavy multi-service orchestration
- deep internal approval and policy systems
- production audit and replay infrastructure
- private commercial reliability layers
- large architectural expansion that makes the repo harder to explain or harder to fork

Another useful rule of thumb:

> if a change makes the repo feel like the full BAOS platform, it probably belongs somewhere else

## Style of contribution

The best contributions here are usually:

- narrow in scope
- easy to review
- easy to run locally
- easy to explain in public
- aligned with the sidecar boundary

## If you are unsure

If you are unsure whether an idea fits, prefer opening a small issue or proposal first.

Especially good discussion topics include:

- new demo scenarios
- adapter shape improvements
- docs and onboarding improvements
- safer or clearer public-facing recommendation behavior

## What this repo is trying to preserve

This public repository should stay:

- lightweight
- runtime-agnostic
- easy to demo
- easy to fork
- clearly separate from the private Branching Agent OS core

That boundary is not a limitation by accident.
It is part of the design.
