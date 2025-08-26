import { Team, CostModel } from './types';

export class CostCalculator {
  private static readonly DEFAULT_COST_PER_DEV_PER_SPRINT = 8000; // $8k per dev per sprint

  /**
   * Calculate total cost for a team over multiple sprints
   * cost = dev_count * sprint_count * cost_per_dev_per_sprint
   */
  static calculateTotalCost(
    team: Team,
    sprintCount: number,
    customModel?: CostModel
  ): number {
    const costPerDevPerSprint = customModel?.costPerDevPerSprint ?? this.DEFAULT_COST_PER_DEV_PER_SPRINT;
    
    return team.size * sprintCount * costPerDevPerSprint;
  }

  /**
   * Calculate cost per sprint
   */
  static calculateCostPerSprint(
    team: Team,
    customModel?: CostModel
  ): number {
    const costPerDevPerSprint = customModel?.costPerDevPerSprint ?? this.DEFAULT_COST_PER_DEV_PER_SPRINT;
    
    return team.size * costPerDevPerSprint;
  }

  /**
   * Calculate cost per story point
   */
  static calculateCostPerStoryPoint(
    team: Team,
    sprintCount: number,
    totalStoryPoints: number,
    customModel?: CostModel
  ): number {
    if (totalStoryPoints === 0) return 0;
    
    const totalCost = this.calculateTotalCost(team, sprintCount, customModel);
    return totalCost / totalStoryPoints;
  }

  /**
   * Check if scenario is within budget
   */
  static isWithinBudget(
    team: Team,
    sprintCount: number,
    budget: number,
    customModel?: CostModel
  ): boolean {
    const totalCost = this.calculateTotalCost(team, sprintCount, customModel);
    return totalCost <= budget;
  }

  /**
   * Get default cost model
   */
  static getDefaultModel(): CostModel {
    return {
      costPerDevPerSprint: this.DEFAULT_COST_PER_DEV_PER_SPRINT
    };
  }
}
