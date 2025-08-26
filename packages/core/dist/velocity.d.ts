import { Team, VelocityModel } from './types';
export declare class VelocityCalculator {
    private static readonly DEFAULT_FOCUS_FACTOR_1_SPRINT;
    private static readonly DEFAULT_FOCUS_FACTOR_MULTI_SPRINT;
    private static readonly DEFAULT_OVERHEAD_PER_SPRINT;
    /**
     * Calculate effective velocity for a team over multiple sprints
     * effective_velocity = sum(dev_productivity) * focus_factor * sprint_count
     */
    static calculateEffectiveVelocity(team: Team, sprintCount: number, customModel?: VelocityModel): number;
    /**
     * Calculate velocity per sprint
     */
    static calculateVelocityPerSprint(team: Team, sprintCount: number, customModel?: VelocityModel): number;
    /**
     * Get default velocity model
     */
    static getDefaultModel(): VelocityModel;
}
