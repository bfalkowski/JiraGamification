"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioEngine = void 0;
const velocity_1 = require("./velocity");
const cost_1 = require("./cost");
const relevance_1 = require("./relevance");
const score_1 = require("./score");
class ScenarioEngine {
    /**
     * Plan a scenario based on proposal and parameters
     */
    static planScenario(backlog, proposal, params) {
        // Calculate capacity
        const totalCapacity = velocity_1.VelocityCalculator.calculateEffectiveVelocity(params.team, params.sprintCount);
        // Filter and sort issues by relevance
        const relevantIssues = relevance_1.RelevanceCalculator.filterByRelevance(backlog, proposal);
        const sortedIssues = relevance_1.RelevanceCalculator.sortByRelevance(relevantIssues, proposal);
        // Apply dependency constraints and schedule issues
        const { selectedIssues, leftoverIssues } = this.scheduleIssues(sortedIssues, params.team, params.sprintCount, totalCapacity);
        // Calculate metrics
        const capacityUsed = selectedIssues.reduce((sum, si) => sum + si.issue.storyPoints, 0);
        const utilizationPercentage = (capacityUsed / totalCapacity) * 100;
        const cost = cost_1.CostCalculator.calculateTotalCost(params.team, params.sprintCount);
        const businessValueDelivered = selectedIssues.reduce((sum, si) => sum + si.issue.businessValue, 0);
        // Generate result
        const result = {
            selectedIssues,
            leftoverIssues,
            capacityUsed,
            totalCapacity,
            utilizationPercentage,
            cost,
            businessValueDelivered,
            score: 0, // Will be calculated below
            badges: [],
            risks: []
        };
        // Calculate score and generate badges/risks
        result.score = score_1.ScoreCalculator.calculateScore(result);
        result.badges = score_1.ScoreCalculator.generateBadges(result);
        result.risks = score_1.ScoreCalculator.generateRisks(result);
        // Add Monte Carlo results if enabled
        if (params.monteCarlo?.enabled) {
            result.monteCarloResults = this.runMonteCarlo(backlog, proposal, params, params.monteCarlo.trials, params.monteCarlo.variability);
        }
        return result;
    }
    /**
     * Schedule issues respecting dependencies and capacity constraints
     */
    static scheduleIssues(issues, team, sprintCount, totalCapacity) {
        const selectedIssues = [];
        const leftoverIssues = [];
        const scheduledIds = new Set();
        let remainingCapacity = totalCapacity;
        // Sort by priority and business value per story point (WSJF-like)
        const prioritizedIssues = this.prioritizeIssues(issues);
        for (const issue of prioritizedIssues) {
            // Check if dependencies are satisfied
            if (!this.areDependenciesSatisfied(issue, scheduledIds)) {
                leftoverIssues.push(issue);
                continue;
            }
            // Check if we have capacity
            if (issue.storyPoints <= remainingCapacity) {
                const sprint = this.determineSprint(issue, selectedIssues, team, sprintCount);
                const scheduledIssue = {
                    issue,
                    sprint,
                    startWeek: (sprint - 1) * 2 + 1, // Assuming 2-week sprints
                    endWeek: sprint * 2
                };
                selectedIssues.push(scheduledIssue);
                scheduledIds.add(issue.id);
                remainingCapacity -= issue.storyPoints;
            }
            else {
                leftoverIssues.push(issue);
            }
        }
        return { selectedIssues, leftoverIssues };
    }
    /**
     * Prioritize issues using WSJF-like heuristic
     */
    static prioritizeIssues(issues) {
        return [...issues].sort((a, b) => {
            // First by priority
            const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0)
                return priorityDiff;
            // Then by business value per story point
            const aScore = a.businessValue / a.storyPoints;
            const bScore = b.businessValue / b.storyPoints;
            return bScore - aScore;
        });
    }
    /**
     * Check if all dependencies are satisfied
     */
    static areDependenciesSatisfied(issue, scheduledIds) {
        return issue.dependencies.every(depId => scheduledIds.has(depId));
    }
    /**
     * Determine which sprint to assign an issue to
     */
    static determineSprint(issue, selectedIssues, team, sprintCount) {
        // Simple strategy: find the first sprint with capacity
        for (let sprint = 1; sprint <= sprintCount; sprint++) {
            const sprintIssues = selectedIssues.filter(si => si.sprint === sprint);
            const sprintCapacity = velocity_1.VelocityCalculator.calculateVelocityPerSprint(team, 1);
            const sprintUsed = sprintIssues.reduce((sum, si) => sum + si.issue.storyPoints, 0);
            if (sprintUsed + issue.storyPoints <= sprintCapacity) {
                return sprint;
            }
        }
        // If no sprint has capacity, put it in the last sprint (will be marked as leftover)
        return sprintCount;
    }
    /**
     * Run Monte Carlo simulation for variability
     */
    static runMonteCarlo(backlog, proposal, params, trials, variability) {
        const results = [];
        for (let i = 0; i < trials; i++) {
            // Apply random variability to story points
            const modifiedBacklog = backlog.map(issue => ({
                ...issue,
                storyPoints: Math.max(1, Math.round(issue.storyPoints * (1 + (Math.random() - 0.5) * 2 * variability)))
            }));
            // Run scenario with modified backlog (without Monte Carlo to avoid recursion)
            const monteCarloParams = { ...params, monteCarlo: undefined };
            const result = this.planScenario(modifiedBacklog, proposal, monteCarloParams);
            results.push(result.capacityUsed);
        }
        // Calculate percentiles
        results.sort((a, b) => a - b);
        const p50Index = Math.floor(trials * 0.5);
        const p90Index = Math.floor(trials * 0.9);
        return {
            p50Completion: results[p50Index] || 0,
            p90Completion: results[p90Index] || 0,
            trials
        };
    }
}
exports.ScenarioEngine = ScenarioEngine;
