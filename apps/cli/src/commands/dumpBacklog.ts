import { Command } from 'commander';
import { BacklogSeeder } from '@jira-gamification/data';

export function createDumpBacklogCommand(): Command {
  const command = new Command('dump-backlog')
    .description('Display the current synthetic backlog')
    .option('-f, --format <format>', 'Output format (json, markdown)', 'markdown')
    .action(async (options) => {
      try {
        const { epics, issues } = BacklogSeeder.seedBacklog();
        
        if (options.format === 'json') {
          console.log(JSON.stringify({ epics, issues }, null, 2));
        } else {
          console.log(generateMarkdownBacklog(epics, issues));
        }
      } catch (error) {
        console.error('Error dumping backlog:', error instanceof Error ? error.message : String(error));
        process.exit(1);
      }
    });

  return command;
}

function generateMarkdownBacklog(epics: any[], issues: any[]): string {
  let output = `# Synthetic Jira Backlog\n\n`;
  output += `Generated ${issues.length} issues across ${epics.length} epics\n\n`;

  // Group issues by epic
  for (const epic of epics) {
    output += `## ${epic.name} (${epic.id})\n`;
    output += `${epic.description}\n\n`;
    
    const epicIssues = issues.filter(issue => issue.epic === epic.id);
    epicIssues.forEach(issue => {
      const dependencyText = issue.dependencies.length > 0 
        ? ` [deps: ${issue.dependencies.join(', ')}]` 
        : '';
      
      output += `- **${issue.id}** (${issue.storyPoints} SP, ${issue.priority}): ${issue.title}${dependencyText}\n`;
      output += `  - ${issue.description}\n`;
      output += `  - Labels: ${issue.labels.join(', ')}\n`;
      output += `  - Business Value: ${issue.businessValue}\n\n`;
    });
  }

  // Summary statistics
  const totalSP = issues.reduce((sum, issue) => sum + issue.storyPoints, 0);
  const highPriority = issues.filter(issue => issue.priority === 'High').length;
  const mediumPriority = issues.filter(issue => issue.priority === 'Medium').length;
  const lowPriority = issues.filter(issue => issue.priority === 'Low').length;

  output += `## Summary\n\n`;
  output += `- **Total Issues:** ${issues.length}\n`;
  output += `- **Total Story Points:** ${totalSP}\n`;
  output += `- **High Priority:** ${highPriority}\n`;
  output += `- **Medium Priority:** ${mediumPriority}\n`;
  output += `- **Low Priority:** ${lowPriority}\n`;

  return output;
}
