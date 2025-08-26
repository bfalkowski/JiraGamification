import { Team, VelocityModel } from './types';

export class VelocityCalculator {
  private static readonly DEFAULT_FOCUS_FACTOR_1_SPRINT = 0.8;
  private static readonly DEFAULT_FOCUS_FACTOR_MULTI_SPRINT = 0.7;
  private static readonly DEFAULT_OVERHEAD_PER_SPRINT = 0.1;

  /**
   * Calculate effective velocity for a team over multiple sprints
   * effective_velocity = sum(dev_productivity) * focus_factor * sprint_count
   */
  static calculateEffectiveVelocity(
    team: Team,
    sprintCount: number,
    customModel?: VelocityModel
  ): number {
    const baseVelocity = team.size * team.productivityPerDev;
    
    // Apply focus factor based on sprint count
    const focusFactor = customModel?.focusFactor ?? 
      (sprintCount === 1 ? this.DEFAULT_FOCUS_FACTOR_1_SPRINT : this.DEFAULT_FOCUS_FACTOR_MULTI_SPRINT);
    
    // Apply overhead for multi-sprint scenarios
    const overhead = customModel?.overheadPerSprint ?? this.DEFAULT_OVERHEAD_PER_SPRINT;
    const totalOverhead = sprintCount > 1 ? (sprintCount - 1) * overhead : 0;
    
    const effectiveVelocity = baseVelocity * focusFactor * sprintCount * (1 - totalOverhead);
    
    return Math.max(0, Math.round(effectiveVelocity));
  }

  /**
   * Calculate velocity per sprint
   */
  static calculateVelocityPerSprint(
    team: Team,
    sprintCount: number,
    customModel?: VelocityModel
  ): number {
    const totalVelocity = this.calculateEffectiveVelocity(team, sprintCount, customModel);
    return Math.round(totalVelocity / sprintCount);
  }

  /**
   * Get default velocity model
   */
  static getDefaultModel(): VelocityModel {
    return {
      focusFactor: this.DEFAULT_FOCUS_FACTOR_1_SPRINT,
      overheadPerSprint: this.DEFAULT_OVERHEAD_PER_SPRINT
    };
  }
}
