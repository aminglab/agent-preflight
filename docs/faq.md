# FAQ

## What is the relationship between Agent Preflight and the full Branching Agent OS?

Agent Preflight is the public sidecar layer.

It is the open-source edge of a broader Branching Agent OS direction, but it is not the full product.

The private Branching Agent OS core is where heavier control-plane work belongs, including deeper orchestration, approval and policy hardening, audit systems, multi-runner coordination, and commercial reliability work.

A simple way to say it:

- **Agent Preflight** is the public developer-facing edge
- **Branching Agent OS** is the private control-plane core

## Why is this a sidecar first instead of the full platform?

Because a sidecar is easier to explain, easier to integrate, and easier to share in public.

The public repo is meant to prove a narrow but valuable idea:

- a runtime can send a preflight request
- Agent Preflight can compare candidate paths before commit
- the recommendation posture can change before real execution

That is a much better public starting point than trying to open the entire private control plane on day one.

## Why do the demos still use mock heuristics?

Because this public repo is trying to show interface shape, recommendation posture, and integration flow before exposing a deeper policy stack.

The current demos are intentionally small.
They help external developers see:

- what a preflight request looks like
- what a preflight response looks like
- how risk category can shift recommendation posture
- how an upstream runtime might consume the result

They are not meant to claim that the full policy problem is already solved in public.

## What is this repository good for right now?

Right now this repo is good for:

- understanding the public Agent Preflight idea quickly
- trying runnable demo flows
- exploring adapter shape for OpenClaw and Hermes
- forking a lightweight sidecar scaffold
- discussing public integration patterns

## What is this repository not trying to be right now?

Right now this repo is not trying to be:

- the full Branching Agent OS product
- an enterprise control plane
- a production policy engine
- a full audit and replay platform
- a multi-runner orchestration system

That boundary is deliberate.
The public repo should stay lightweight, understandable, and easy to adopt.
