import { Team, CostModel } from './types';
export declare class CostCalculator {
    private static readonly DEFAULT_COST_PER_DEV_PER_SPRINT;
    /**
     * Calculate total cost for a team over multiple sprints
     * cost = dev_count * sprint_count * cost_per_dev_per_sprint
     */
    static calculateTotalCost(team: Team, sprintCount: number, customModel?: CostModel): number;
    /**
     * Calculate cost per sprint
     */
    static calculateCostPerSprint(team: Team, customModel?: CostModel): number;
    /**
     * Calculate cost per story point
     */
    static calculateCostPerStoryPoint(team: Team, sprintCount: number, totalStoryPoints: number, customModel?: CostModel): number;
    /**
     * Check if scenario is within budget
     */
    static isWithinBudget(team: Team, sprintCount: number, budget: number, customModel?: CostModel): boolean;
    /**
     * Get default cost model
     */
    static getDefaultModel(): CostModel;
}
