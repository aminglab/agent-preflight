import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../..');
const defaultInputPath = path.join(repoRoot, 'examples/hermes-demo/request.json');
const defaultOutputPath = path.join(repoRoot, 'examples/hermes-demo/response.generated.json');

function parseArgs(argv) {
  const args = {
    input: defaultInputPath,
    output: defaultOutputPath,
    write: true,
    help: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === '--help' || value === '-h') {
      args.help = true;
      continue;
    }

    if (value === '--stdout-only') {
      args.write = false;
      continue;
    }

    if (value === '--input' && argv[index + 1]) {
      args.input = path.resolve(process.cwd(), argv[index + 1]);
      index += 1;
      continue;
    }

    if (value.startsWith('--input=')) {
      args.input = path.resolve(process.cwd(), value.slice('--input='.length));
      continue;
    }

    if (value === '--output' && argv[index + 1]) {
      args.output = path.resolve(process.cwd(), argv[index + 1]);
      index += 1;
      continue;
    }

    if (value.startsWith('--output=')) {
      args.output = path.resolve(process.cwd(), value.slice('--output='.length));
      continue;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Agent Preflight Hermes demo runner\n\nUsage:\n  node adapters/hermes/demo/run-demo.js\n  node adapters/hermes/demo/run-demo.js --stdout-only\n  node adapters/hermes/demo/run-demo.js --input ./examples/hermes-demo/request.json --output ./examples/hermes-demo/response.generated.json\n`);
}

function assertString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Expected non-empty string for ${fieldName}.`);
  }
}

function validateRequest(request) {
  if (!request || typeof request !== 'object') {
    throw new Error('Request payload must be an object.');
  }

  assertString(request.requestId, 'requestId');
  assertString(request.source, 'source');
  assertString(request.taskId, 'taskId');
  assertString(request.taskTitle, 'taskTitle');
  assertString(request.riskCategory, 'riskCategory');
  assertString(request.objective, 'objective');

  if (!request.target || typeof request.target !== 'object') {
    throw new Error('Expected target object.');
  }

  assertString(request.target.url, 'target.url');
}

function buildCandidatePaths(request) {
  const limit = Math.max(1, Math.min(request.maxCandidatePaths ?? 3, 3));
  const candidatePaths = [
    {
      pathId: 'path-observe-before-commit',
      summary:
        'Inspect the current page state, confirm key fields, then continue with a guarded commit path.',
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
    candidatePaths[0].notes = [
      ...(candidatePaths[0].notes ?? []),
      'human review recommended before final commit'
    ];
  }

  return candidatePaths.slice(0, limit);
}

function buildMockPreflightResponse(request) {
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

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  const raw = await fs.readFile(args.input, 'utf-8');
  const request = JSON.parse(raw);
  validateRequest(request);

  const response = buildMockPreflightResponse(request);
  const serialized = `${JSON.stringify(response, null, 2)}\n`;

  if (args.write) {
    await fs.mkdir(path.dirname(args.output), { recursive: true });
    await fs.writeFile(args.output, serialized, 'utf-8');
    console.error(
      `[agent-preflight] wrote ${path.relative(repoRoot, args.output)} from ${path.relative(repoRoot, args.input)}`
    );
  }

  process.stdout.write(serialized);
}

main().catch((error) => {
  console.error(`[agent-preflight] demo failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
