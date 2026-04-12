import type {
  CandidatePath,
  OpenClawPreflightRequest,
  OpenClawPreflightResponse
} from './types';

function buildCandidatePaths(request: OpenClawPreflightRequest): CandidatePath[] {
  const limit = Math.max(1, Math.min(request.maxCandidatePaths ?? 3, 3));

  const base: CandidatePath[] = [
    {
      pathId: 'path-safe-review-first',
      summary: 'Navigate to the target page, confirm current state, and only submit after a final review step.',
      estimatedRisk: 'low',
      estimatedSteps: 6,
      notes: ['preferred for high-risk actions', 'adds one explicit review checkpoint']
    },
    {
      pathId: 'path-direct-submit',
      summary: 'Take the most direct browser path toward the requested action.',
      estimatedRisk: 'high',
      estimatedSteps: 3,
      notes: ['faster but less guarded', 'should be avoided for sensitive flows']
    },
    {
      pathId: 'path-verify-then-submit',
      summary: 'Re-check page state, verify key fields, then continue to submission.',
      estimatedRisk: 'medium',
      estimatedSteps: 5,
      notes: ['balanced path', 'useful when page state may have drifted']
    }
  ];

  if (request.riskCategory === 'financial_action' || request.riskCategory === 'purchase') {
    base[0].notes = [...(base[0].notes ?? []), 'financial guardrails recommended'];
  }

  return base.slice(0, limit);
}

export function buildMockPreflightResponse(
  request: OpenClawPreflightRequest
): OpenClawPreflightResponse {
  const candidatePaths = buildCandidatePaths(request);
  const recommended = candidatePaths[0];

  return {
    requestId: request.requestId,
    source: 'agent-preflight',
    status: request.riskCategory === 'financial_action' ? 'needs_review' : 'ok',
    recommendedPathId: recommended.pathId,
    rationale:
      'The recommended path adds an explicit review checkpoint before real submission and is more suitable for risky browser tasks.',
    candidatePaths,
    replaySummary: {
      anchorCaptured: true,
      comparedPaths: candidatePaths.length,
      recommendedPathId: recommended.pathId
    }
  };
}
