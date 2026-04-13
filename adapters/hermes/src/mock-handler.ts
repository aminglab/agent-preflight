import type {
  CandidatePath,
  HermesPreflightRequest,
  HermesPreflightResponse
} from './types';

function buildCandidatePaths(request: HermesPreflightRequest): CandidatePath[] {
  const limit = Math.max(1, Math.min(request.maxCandidatePaths ?? 3, 3));

  const base: CandidatePath[] = [
    {
      pathId: 'path-observe-before-commit',
      summary: 'Inspect the current page state, confirm key fields, then continue with a guarded commit path.',
      estimatedRisk: 'low',
      estimatedSteps: 6,
      notes: ['preferred for sensitive runtime actions', 'adds an explicit observation step']
    },
    {
      pathId: 'path-fast-commit',
      summary: 'Take the shortest path toward the requested browser action.',
      estimatedRisk: 'high',
      estimatedSteps: 3,
      notes: ['faster but less defensive', 'best avoided for risky workflows']
    },
    {
      pathId: 'path-verify-then-commit',
      summary: 'Verify the target state, re-check critical fields, then continue toward commit.',
      estimatedRisk: 'medium',
      estimatedSteps: 5,
      notes: ['balanced path', 'useful when page state may drift']
    }
  ];

  if (request.riskCategory === 'financial_action' || request.riskCategory === 'purchase') {
    base[0].notes = [...(base[0].notes ?? []), 'human review recommended before final commit'];
  }

  return base.slice(0, limit);
}

export function buildMockPreflightResponse(
  request: HermesPreflightRequest
): HermesPreflightResponse {
  const candidatePaths = buildCandidatePaths(request);
  const recommended = candidatePaths[0];

  return {
    requestId: request.requestId,
    source: 'agent-preflight',
    status:
      request.riskCategory === 'financial_action' || request.riskCategory === 'purchase'
        ? 'needs_review'
        : 'ok',
    recommendedPathId: recommended.pathId,
    rationale:
      'The recommended path observes current browser state before commit and is safer for higher-risk runtime actions.',
    candidatePaths,
    replaySummary: {
      anchorCaptured: true,
      comparedPaths: candidatePaths.length,
      recommendedPathId: recommended.pathId
    }
  };
}
