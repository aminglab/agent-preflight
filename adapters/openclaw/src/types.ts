export type RiskCategory =
  | 'form_submission'
  | 'admin_change'
  | 'purchase'
  | 'financial_action'
  | 'unknown';

export interface BrowserTarget {
  url: string;
  titleHint?: string;
}

export interface OpenClawPreflightRequest {
  requestId: string;
  source: 'openclaw';
  taskId: string;
  taskTitle: string;
  riskCategory: RiskCategory;
  target: BrowserTarget;
  objective: string;
  constraints?: string[];
  maxCandidatePaths?: number;
}

export interface CandidatePath {
  pathId: string;
  summary: string;
  estimatedRisk: 'low' | 'medium' | 'high';
  estimatedSteps: number;
  notes?: string[];
}

export interface ReplaySummary {
  anchorCaptured: boolean;
  comparedPaths: number;
  recommendedPathId: string;
}

export interface OpenClawPreflightResponse {
  requestId: string;
  source: 'agent-preflight';
  status: 'ok' | 'needs_review' | 'rejected';
  recommendedPathId: string;
  rationale: string;
  candidatePaths: CandidatePath[];
  replaySummary: ReplaySummary;
}
