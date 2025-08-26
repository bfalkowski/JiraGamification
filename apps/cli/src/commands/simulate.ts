import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { 
  ScenarioEngine, 
  Proposal, 
  ScenarioParams, 
  Team,
  ScenarioResult 
} from '@jira-gamification/core';
import { BacklogSeeder } from '@jira-gamification/data';

export function createSimulateCommand(): Command {
  const command = new Command('simulate')
    .description('Run a Jira scenario simulation')
    .requiredOption('-p, --proposal <file>', 'Path to proposal YAML file')
    .requiredOption('-t, --team <size>', 'Team size (number of developers)', parseInt)
    .requiredOption('-s, --sprints <count>', 'Number of sprints', parseInt)
    .option('-b, --budget <amount>', 'Budget constraint (optional)', parseInt)
    .option('-m, --mc <trials>', 'Monte Carlo trials (default: disabled)', parseInt)
    .option('--seed <number>', 'Random seed for Monte Carlo', parseInt)
    .option('--variability <number>', 'Story point variability (0.0-1.0, default: 0.25)', parseFloat)
    .action(async (options) => {
      try {
        // Load proposal
        const proposal = loadProposal(options.proposal);
        
        // Create scenario parameters
        const params: ScenarioParams = {
          team: {
            size: options.team,
            productivityPerDev: 8 // Default 8 SP per sprint per dev
          },
          sprintCount: options.sprints,
          budget: options.budget
        };

        // Add Monte Carlo if enabled
        if (options.mc) {
          params.monteCarlo = {
            enabled: true,
            trials: options.mc,
            variability: options.variability || 0.25
          };
        }

        // Set random seed if provided
        if (options.seed) {
          // Note: seedrandom would need to be installed for this to work
          // For now, we'll skip seeding
          console.log(`Note: Random seed ${options.seed} specified but seedrandom not available`);
        }

        // Generate synthetic backlog
        const { issues } = BacklogSeeder.seedBacklog();

        // Run simulation
        const result = ScenarioEngine.planScenario(issues, proposal, params);

        // Output results
        outputResults(result, params);

      } catch (error) {
        console.error('Error running simulation:', error instanceof Error ? error.message : String(error));
        process.exit(1);
      }
    });

  return command;
}

function loadProposal(filePath: string): Proposal {
  try {
    const fullPath = path.resolve(filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const proposal = yaml.load(fileContent) as Proposal;
    
    // Basic validation
    if (!proposal.title || !proposal.keywords || !proposal.epics) {
      throw new Error('Invalid proposal format: missing required fields');
    }
    
    return proposal;
  } catch (error) {
    throw new Error(`Failed to load proposal file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function outputResults(result: ScenarioResult, params: ScenarioParams): void {
  // JSON output
  console.log(JSON.stringify(result, null, 2));
  
  // Markdown summary
  console.log('\n' + generateMarkdownSummary(result, params));
}

function generateMarkdownSummary(result: ScenarioResult, params: ScenarioParams): string {
  const team = params.team;
  const sprintCount = params.sprintCount;
  
  let summary = `## Scenario Results\n\n`;
  summary += `**Team:** ${team.size} developers | **Sprints:** ${sprintCount} | `;
  
  if (params.budget) {
    const budgetStatus = result.cost <= params.budget ? '✅' : '❌';
    summary += `**Budget:** $${params.budget.toLocaleString()} ${budgetStatus}\n\n`;
  } else {
    summary += `**Budget:** Not specified\n\n`;
  }

  summary += `**Capacity Used:** ${result.capacityUsed} SP (${result.utilizationPercentage.toFixed(1)}% of ${result.totalCapacity} SP available)\n`;
  summary += `**Cost:** $${result.cost.toLocaleString()}\n`;
  summary += `**Features Completed:** ${result.selectedIssues.length} issues across ${sprintCount} sprints\n\n`;

  // Group by sprint
  for (let sprint = 1; sprint <= sprintCount; sprint++) {
    const sprintIssues = result.selectedIssues.filter(si => si.sprint === sprint);
    if (sprintIssues.length > 0) {
      summary += `**Sprint ${sprint}:**\n`;
      sprintIssues.forEach(si => {
        summary += `- ${si.issue.id}: ${si.issue.title} (${si.issue.storyPoints} SP)\n`;
      });
      summary += '\n';
    }
  }

  // Leftover issues
  if (result.leftoverIssues.length > 0) {
    summary += `**Not Scheduled:** ${result.leftoverIssues.length} issues\n`;
    result.leftoverIssues.slice(0, 5).forEach(issue => {
      summary += `- ${issue.id}: ${issue.title} (${issue.storyPoints} SP)\n`;
    });
    if (result.leftoverIssues.length > 5) {
      summary += `- ... and ${result.leftoverIssues.length - 5} more\n`;
    }
    summary += '\n';
  }

  // Badges and risks
  if (result.badges.length > 0) {
    summary += `**🏆 Badges:** ${result.badges.join(', ')}\n\n`;
  }

  if (result.risks.length > 0) {
    summary += `**⚠️ Top Risks:**\n`;
    result.risks.slice(0, 3).forEach(risk => {
      summary += `- ${risk}\n`;
    });
    summary += '\n';
  }

  // Monte Carlo results
  if (result.monteCarloResults) {
    summary += `**🎲 Monte Carlo (${result.monteCarloResults.trials} trials):**\n`;
    summary += `- P50 Completion: ${result.monteCarloResults.p50Completion} SP\n`;
    summary += `- P90 Completion: ${result.monteCarloResults.p90Completion} SP\n\n`;
  }

  return summary;
}
