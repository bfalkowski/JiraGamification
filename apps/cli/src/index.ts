#!/usr/bin/env node

import { Command } from 'commander';
import { createSimulateCommand } from './commands/simulate';
import { createDumpBacklogCommand } from './commands/dumpBacklog';

const program = new Command();

program
  .name('jira-simulator')
  .description('Jira Scenario Simulator CLI')
  .version('1.0.0');

// Add commands
program.addCommand(createSimulateCommand());
program.addCommand(createDumpBacklogCommand());

// Parse command line arguments
program.parse();
