import { Epic, Issue } from '@jira-gamification/core';
export declare class BacklogSeeder {
    /**
     * Generate a synthetic backlog with realistic issues and dependencies
     */
    static seedBacklog(): {
        epics: Epic[];
        issues: Issue[];
    };
    /**
     * Generate core epics
     */
    private static generateEpics;
    /**
     * Generate issues with realistic dependencies
     */
    private static generateIssues;
}
