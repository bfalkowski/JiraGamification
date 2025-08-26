#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const simulate_1 = require("./commands/simulate");
const dumpBacklog_1 = require("./commands/dumpBacklog");
const program = new commander_1.Command();
program
    .name('jira-simulator')
    .description('Jira Scenario Simulator CLI')
    .version('1.0.0');
// Add commands
program.addCommand((0, simulate_1.createSimulateCommand)());
program.addCommand((0, dumpBacklog_1.createDumpBacklogCommand)());
// Parse command line arguments
program.parse();
