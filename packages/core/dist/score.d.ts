import { ScenarioResult } from './types';
export declare class ScoreCalculator {
    private static readonly BUSINESS_VALUE_WEIGHT;
    private static readonly COST_WEIGHT;
    private static readonly BONUS_WEIGHT;
    /**
     * Calculate scenario score with bonuses
     * score = normalized(business_value) - normalized(cost) + bonus
     */
    static calculateScore(result: ScenarioResult): number;
    /**
     * Normalize business value to 0-100 scale
     * Assuming max business value is 1000 (10 issues * 100 points each)
     */
    private static normalizeBusinessValue;
    /**
     * Normalize cost to 0-100 scale
     * Assuming max cost is 200k (10 devs * 4 sprints * 5k per dev per sprint)
     */
    private static normalizeCost;
    /**
     * Calculate bonus score based on achievements
     */
    private static calculateBonusScore;
    /**
     * Generate badges based on achievements
     */
    static generateBadges(result: ScenarioResult): string[];
    /**
     * Check if goal is met in 2 or fewer sprints
     */
    private static isGoalMetInTwoSprints;
    /**
     * Generate risk assessment
     */
    static generateRisks(result: ScenarioResult): string[];
}
