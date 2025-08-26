"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostCalculator = void 0;
class CostCalculator {
    /**
     * Calculate total cost for a team over multiple sprints
     * cost = dev_count * sprint_count * cost_per_dev_per_sprint
     */
    static calculateTotalCost(team, sprintCount, customModel) {
        const costPerDevPerSprint = customModel?.costPerDevPerSprint ?? this.DEFAULT_COST_PER_DEV_PER_SPRINT;
        return team.size * sprintCount * costPerDevPerSprint;
    }
    /**
     * Calculate cost per sprint
     */
    static calculateCostPerSprint(team, customModel) {
        const costPerDevPerSprint = customModel?.costPerDevPerSprint ?? this.DEFAULT_COST_PER_DEV_PER_SPRINT;
        return team.size * costPerDevPerSprint;
    }
    /**
     * Calculate cost per story point
     */
    static calculateCostPerStoryPoint(team, sprintCount, totalStoryPoints, customModel) {
        if (totalStoryPoints === 0)
            return 0;
        const totalCost = this.calculateTotalCost(team, sprintCount, customModel);
        return totalCost / totalStoryPoints;
    }
    /**
     * Check if scenario is within budget
     */
    static isWithinBudget(team, sprintCount, budget, customModel) {
        const totalCost = this.calculateTotalCost(team, sprintCount, customModel);
        return totalCost <= budget;
    }
    /**
     * Get default cost model
     */
    static getDefaultModel() {
        return {
            costPerDevPerSprint: this.DEFAULT_COST_PER_DEV_PER_SPRINT
        };
    }
}
exports.CostCalculator = CostCalculator;
CostCalculator.DEFAULT_COST_PER_DEV_PER_SPRINT = 8000; // $8k per dev per sprint
