import { Issue, Proposal, ScenarioParams, ScenarioResult } from './types';
export declare class ScenarioEngine {
    /**
     * Plan a scenario based on proposal and parameters
     */
    static planScenario(backlog: Issue[], proposal: Proposal, params: ScenarioParams): ScenarioResult;
    /**
     * Schedule issues respecting dependencies and capacity constraints
     */
    private static scheduleIssues;
    /**
     * Prioritize issues using WSJF-like heuristic
     */
    private static prioritizeIssues;
    /**
     * Check if all dependencies are satisfied
     */
    private static areDependenciesSatisfied;
    /**
     * Determine which sprint to assign an issue to
     */
    private static determineSprint;
    /**
     * Run Monte Carlo simulation for variability
     */
    private static runMonteCarlo;
}
