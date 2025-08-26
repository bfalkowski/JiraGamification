export interface Epic {
    id: string;
    name: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
}
export interface Issue {
    id: string;
    epic: string;
    title: string;
    description: string;
    storyPoints: number;
    status: 'Backlog' | 'In Progress' | 'Done';
    priority: 'High' | 'Medium' | 'Low';
    labels: string[];
    dependencies: string[];
    businessValue: number;
}
export interface DependencyEdge {
    from: string;
    to: string;
}
export interface Proposal {
    title: string;
    description: string;
    goals: string[];
    keywords: string[];
    epics: string[];
    budget?: number;
}
export interface Team {
    size: number;
    productivityPerDev: number;
}
export interface ScenarioParams {
    team: Team;
    sprintCount: number;
    budget?: number;
    monteCarlo?: {
        enabled: boolean;
        trials: number;
        variability: number;
    };
}
export interface ScheduledIssue {
    issue: Issue;
    sprint: number;
    startWeek: number;
    endWeek: number;
}
export interface ScenarioResult {
    selectedIssues: ScheduledIssue[];
    leftoverIssues: Issue[];
    capacityUsed: number;
    totalCapacity: number;
    utilizationPercentage: number;
    cost: number;
    businessValueDelivered: number;
    score: number;
    badges: string[];
    risks: string[];
    monteCarloResults?: {
        p50Completion: number;
        p90Completion: number;
        trials: number;
    };
}
export interface CostModel {
    costPerDevPerSprint: number;
}
export interface VelocityModel {
    focusFactor: number;
    overheadPerSprint: number;
}
