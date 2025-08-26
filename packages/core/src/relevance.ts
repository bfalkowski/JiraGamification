import { Issue, Proposal } from './types';

export class RelevanceCalculator {
  private static readonly LABEL_WEIGHT = 0.4;
  private static readonly KEYWORD_WEIGHT = 0.4;
  private static readonly EPIC_WEIGHT = 0.2;

  /**
   * Compute relevance score between an issue and a proposal
   * score = label_overlap + keyword_hits + epic_alignment
   */
  static computeRelevance(issue: Issue, proposal: Proposal): number {
    const labelScore = this.calculateLabelScore(issue.labels, proposal.keywords);
    const keywordScore = this.calculateKeywordScore(issue, proposal);
    const epicScore = this.calculateEpicScore(issue.epic, proposal.epics);

    const totalScore = 
      labelScore * this.LABEL_WEIGHT +
      keywordScore * this.KEYWORD_WEIGHT +
      epicScore * this.EPIC_WEIGHT;

    return Math.min(1.0, Math.max(0.0, totalScore));
  }

  /**
   * Calculate score based on label overlap with proposal keywords
   */
  private static calculateLabelScore(issueLabels: string[], proposalKeywords: string[]): number {
    if (proposalKeywords.length === 0) return 0;
    
    const normalizedLabels = issueLabels.map(label => label.toLowerCase());
    const normalizedKeywords = proposalKeywords.map(keyword => keyword.toLowerCase());
    
    const matches = normalizedKeywords.filter(keyword => 
      normalizedLabels.some(label => label.includes(keyword) || keyword.includes(label))
    );
    
    return matches.length / proposalKeywords.length;
  }

  /**
   * Calculate score based on keyword hits in title and description
   */
  private static calculateKeywordScore(issue: Issue, proposal: Proposal): number {
    if (proposal.keywords.length === 0) return 0;
    
    const text = `${issue.title} ${issue.description}`.toLowerCase();
    const normalizedKeywords = proposal.keywords.map(keyword => keyword.toLowerCase());
    
    const matches = normalizedKeywords.filter(keyword => text.includes(keyword));
    
    return matches.length / proposal.keywords.length;
  }

  /**
   * Calculate score based on epic alignment
   */
  private static calculateEpicScore(issueEpic: string, proposalEpics: string[]): number {
    if (proposalEpics.length === 0) return 0;
    
    const normalizedIssueEpic = issueEpic.toLowerCase();
    const normalizedProposalEpics = proposalEpics.map(epic => epic.toLowerCase());
    
    return normalizedProposalEpics.some(epic => 
      epic.includes(normalizedIssueEpic) || normalizedIssueEpic.includes(epic)
    ) ? 1.0 : 0.0;
  }

  /**
   * Sort issues by relevance score (descending)
   */
  static sortByRelevance(issues: Issue[], proposal: Proposal): Issue[] {
    return [...issues].sort((a, b) => {
      const scoreA = this.computeRelevance(a, proposal);
      const scoreB = this.computeRelevance(b, proposal);
      return scoreB - scoreA;
    });
  }

  /**
   * Filter issues by minimum relevance threshold
   */
  static filterByRelevance(issues: Issue[], proposal: Proposal, threshold: number = 0.1): Issue[] {
    return issues.filter(issue => this.computeRelevance(issue, proposal) >= threshold);
  }
}
