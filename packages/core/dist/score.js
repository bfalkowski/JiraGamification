"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreCalculator = void 0;
class ScoreCalculator {
    /**
     * Calculate scenario score with bonuses
     * score = normalized(business_value) - normalized(cost) + bonus
     */
    static calculateScore(result) {
        const businessValueScore = this.normalizeBusinessValue(result.businessValueDelivered);
        const costScore = this.normalizeCost(result.cost);
        const bonusScore = this.calculateBonusScore(result);
        const baseScore = businessValueScore * this.BUSINESS_VALUE_WEIGHT - costScore * this.COST_WEIGHT;
        const totalScore = baseScore + bonusScore * this.BONUS_WEIGHT;
        return Math.min(100, Math.max(0, Math.round(totalScore)));
    }
    /**
     * Normalize business value to 0-100 scale
     * Assuming max business value is 1000 (10 issues * 100 points each)
     */
    static normalizeBusinessValue(businessValue) {
        const maxValue = 1000;
        return Math.min(100, (businessValue / maxValue) * 100);
    }
    /**
     * Normalize cost to 0-100 scale
     * Assuming max cost is 200k (10 devs * 4 sprints * 5k per dev per sprint)
     */
    static normalizeCost(cost) {
        const maxCost = 200000;
        return Math.min(100, (cost / maxCost) * 100);
    }
    /**
     * Calculate bonus score based on achievements
     */
    static calculateBonusScore(result) {
        let bonus = 0;
        // Goal met in ≤2 sprints
        if (this.isGoalMetInTwoSprints(result)) {
            bonus += 20;
        }
        // High utilization (85-95%)
        if (result.utilizationPercentage >= 85 && result.utilizationPercentage <= 95) {
            bonus += 15;
        }
        // Perfect utilization (95-100%)
        if (result.utilizationPercentage >= 95) {
            bonus += 10;
        }
        // Budget compliance
        if (result.cost <= 50000) { // Assuming 50k is a reasonable budget
            bonus += 10;
        }
        // High business value delivery
        if (result.businessValueDelivered >= 500) {
            bonus += 15;
        }
        return Math.min(100, bonus);
    }
    /**
     * Generate badges based on achievements
     */
    static generateBadges(result) {
        const badges = [];
        if (this.isGoalMetInTwoSprints(result)) {
            badges.push('🎯 Goal in 2 Sprints');
        }
        if (result.utilizationPercentage >= 95) {
            badges.push('⚡ Perfect Utilization');
        }
        else if (result.utilizationPercentage >= 85) {
            badges.push('📈 High Utilization');
        }
        if (result.cost <= 50000) {
            badges.push('💰 Budget Conscious');
        }
        if (result.businessValueDelivered >= 500) {
            badges.push('🚀 High Value');
        }
        if (result.selectedIssues.length >= 10) {
            badges.push('📦 High Throughput');
        }
        if (result.risks.length === 0) {
            badges.push('🛡️ Risk Free');
        }
        return badges;
    }
    /**
     * Check if goal is met in 2 or fewer sprints
     */
    static isGoalMetInTwoSprints(result) {
        const maxSprint = Math.max(...result.selectedIssues.map(si => si.sprint));
        return maxSprint <= 2;
    }
    /**
     * Generate risk assessment
     */
    static generateRisks(result) {
        const risks = [];
        if (result.utilizationPercentage < 70) {
            risks.push('Low team utilization - consider reducing team size');
        }
        if (result.utilizationPercentage > 95) {
            risks.push('Very high utilization - risk of burnout and delays');
        }
        if (result.leftoverIssues.length > result.selectedIssues.length) {
            risks.push('Many issues left unscheduled - scope may be too large');
        }
        if (result.cost > 100000) {
            risks.push('High cost - consider reducing scope or team size');
        }
        if (result.businessValueDelivered < 200) {
            risks.push('Low business value delivery - reconsider priorities');
        }
        return risks;
    }
}
exports.ScoreCalculator = ScoreCalculator;
ScoreCalculator.BUSINESS_VALUE_WEIGHT = 0.6;
ScoreCalculator.COST_WEIGHT = 0.4;
ScoreCalculator.BONUS_WEIGHT = 0.2;
