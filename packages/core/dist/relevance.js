"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelevanceCalculator = void 0;
class RelevanceCalculator {
    /**
     * Compute relevance score between an issue and a proposal
     * score = label_overlap + keyword_hits + epic_alignment
     */
    static computeRelevance(issue, proposal) {
        const labelScore = this.calculateLabelScore(issue.labels, proposal.keywords);
        const keywordScore = this.calculateKeywordScore(issue, proposal);
        const epicScore = this.calculateEpicScore(issue.epic, proposal.epics);
        const totalScore = labelScore * this.LABEL_WEIGHT +
            keywordScore * this.KEYWORD_WEIGHT +
            epicScore * this.EPIC_WEIGHT;
        return Math.min(1.0, Math.max(0.0, totalScore));
    }
    /**
     * Calculate score based on label overlap with proposal keywords
     */
    static calculateLabelScore(issueLabels, proposalKeywords) {
        if (proposalKeywords.length === 0)
            return 0;
        const normalizedLabels = issueLabels.map(label => label.toLowerCase());
        const normalizedKeywords = proposalKeywords.map(keyword => keyword.toLowerCase());
        const matches = normalizedKeywords.filter(keyword => normalizedLabels.some(label => label.includes(keyword) || keyword.includes(label)));
        return matches.length / proposalKeywords.length;
    }
    /**
     * Calculate score based on keyword hits in title and description
     */
    static calculateKeywordScore(issue, proposal) {
        if (proposal.keywords.length === 0)
            return 0;
        const text = `${issue.title} ${issue.description}`.toLowerCase();
        const normalizedKeywords = proposal.keywords.map(keyword => keyword.toLowerCase());
        const matches = normalizedKeywords.filter(keyword => text.includes(keyword));
        return matches.length / proposal.keywords.length;
    }
    /**
     * Calculate score based on epic alignment
     */
    static calculateEpicScore(issueEpic, proposalEpics) {
        if (proposalEpics.length === 0)
            return 0;
        const normalizedIssueEpic = issueEpic.toLowerCase();
        const normalizedProposalEpics = proposalEpics.map(epic => epic.toLowerCase());
        return normalizedProposalEpics.some(epic => epic.includes(normalizedIssueEpic) || normalizedIssueEpic.includes(epic)) ? 1.0 : 0.0;
    }
    /**
     * Sort issues by relevance score (descending)
     */
    static sortByRelevance(issues, proposal) {
        return [...issues].sort((a, b) => {
            const scoreA = this.computeRelevance(a, proposal);
            const scoreB = this.computeRelevance(b, proposal);
            return scoreB - scoreA;
        });
    }
    /**
     * Filter issues by minimum relevance threshold
     */
    static filterByRelevance(issues, proposal, threshold = 0.1) {
        return issues.filter(issue => this.computeRelevance(issue, proposal) >= threshold);
    }
}
exports.RelevanceCalculator = RelevanceCalculator;
RelevanceCalculator.LABEL_WEIGHT = 0.4;
RelevanceCalculator.KEYWORD_WEIGHT = 0.4;
RelevanceCalculator.EPIC_WEIGHT = 0.2;
