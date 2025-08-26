import { Issue, Proposal } from './types';
export declare class RelevanceCalculator {
    private static readonly LABEL_WEIGHT;
    private static readonly KEYWORD_WEIGHT;
    private static readonly EPIC_WEIGHT;
    /**
     * Compute relevance score between an issue and a proposal
     * score = label_overlap + keyword_hits + epic_alignment
     */
    static computeRelevance(issue: Issue, proposal: Proposal): number;
    /**
     * Calculate score based on label overlap with proposal keywords
     */
    private static calculateLabelScore;
    /**
     * Calculate score based on keyword hits in title and description
     */
    private static calculateKeywordScore;
    /**
     * Calculate score based on epic alignment
     */
    private static calculateEpicScore;
    /**
     * Sort issues by relevance score (descending)
     */
    static sortByRelevance(issues: Issue[], proposal: Proposal): Issue[];
    /**
     * Filter issues by minimum relevance threshold
     */
    static filterByRelevance(issues: Issue[], proposal: Proposal, threshold?: number): Issue[];
}
