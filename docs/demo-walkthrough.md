# Demo walkthrough

This walkthrough is the fastest way to understand what Agent Preflight does in public today.

It is intentionally short:

- pick a runnable demo
- run one command
- inspect the generated response
- compare how the posture changes across risk categories

## 1. Start with the default OpenClaw demo

From the repository root:

```bash
npm run demo:openclaw
```

What you should see:

- the script reads `examples/openclaw-demo/request.json`
- it writes `examples/openclaw-demo/response.generated.json`
- the response usually stays in an `ok` posture, but recommends the guarded review-first path

This is the easiest example to start with because it shows the basic preflight loop without the strongest guardrail escalation.

## 2. Compare it with the OpenClaw purchase scenario

```bash
npm run demo:openclaw:purchase
```

What changes:

- the scenario moves from `admin_change` to `purchase`
- the recommendation still prefers the safer path
- the notes become more guardrail-heavy because purchase-like flows are treated as more sensitive

This is useful when you want to show that a runtime can keep the same interface while shifting posture for higher-risk work.

## 3. Run the default Hermes demo

```bash
npm run demo:hermes
```

What changes here:

- the scenario is `financial_action`
- this is currently the strongest guardrail case in the mock logic
- the demo may return `needs_review` rather than plain `ok`

This is the clearest example of how the current public mock can escalate review posture before any real commit happens.

## 4. Compare it with the Hermes admin-change scenario

```bash
npm run demo:hermes:admin-change
```

What changes:

- the scenario shifts from `financial_action` to `admin_change`
- the result can move back to `ok`
- the path still stays guarded and review-first, but the status posture is less severe than the financial case

This shows that Agent Preflight is not only about blocking actions. It is about changing recommendation posture according to risk category.

## 5. What to inspect in the output

Each generated response is small on purpose. Focus on four fields:

- `status`
- `recommendedPathId`
- `candidatePaths`
- `replaySummary`

Those four fields are enough to explain the current public story:

- what was recommended
- how guarded the recommendation was
- whether review escalation happened
- how many candidate paths were compared

## 6. The point of the public demo layer

The public repo is not trying to expose the full private control plane.

What it is trying to show is simpler:

- upstream runtimes can send a preflight request
- Agent Preflight can compare candidate paths before commit
- the recommendation posture can change by risk category
- the runtime can decide what to do next

That is the current public quickstart in one page.
