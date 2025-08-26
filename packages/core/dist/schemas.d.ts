import { z } from 'zod';
export declare const EpicSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    priority: z.ZodEnum<["High", "Medium", "Low"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    description: string;
    priority: "High" | "Medium" | "Low";
}, {
    id: string;
    name: string;
    description: string;
    priority: "High" | "Medium" | "Low";
}>;
export declare const IssueSchema: z.ZodObject<{
    id: z.ZodString;
    epic: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    storyPoints: z.ZodNumber;
    status: z.ZodEnum<["Backlog", "In Progress", "Done"]>;
    priority: z.ZodEnum<["High", "Medium", "Low"]>;
    labels: z.ZodArray<z.ZodString, "many">;
    dependencies: z.ZodArray<z.ZodString, "many">;
    businessValue: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "Backlog" | "In Progress" | "Done";
    epic: string;
    title: string;
    storyPoints: number;
    labels: string[];
    dependencies: string[];
    businessValue: number;
}, {
    id: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "Backlog" | "In Progress" | "Done";
    epic: string;
    title: string;
    storyPoints: number;
    labels: string[];
    dependencies: string[];
    businessValue: number;
}>;
export declare const ProposalSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    goals: z.ZodArray<z.ZodString, "many">;
    keywords: z.ZodArray<z.ZodString, "many">;
    epics: z.ZodArray<z.ZodString, "many">;
    budget: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    goals: string[];
    keywords: string[];
    epics: string[];
    budget?: number | undefined;
}, {
    description: string;
    title: string;
    goals: string[];
    keywords: string[];
    epics: string[];
    budget?: number | undefined;
}>;
export declare const TeamSchema: z.ZodObject<{
    size: z.ZodNumber;
    productivityPerDev: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    size: number;
    productivityPerDev: number;
}, {
    size: number;
    productivityPerDev: number;
}>;
export declare const ScenarioParamsSchema: z.ZodObject<{
    team: z.ZodObject<{
        size: z.ZodNumber;
        productivityPerDev: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        size: number;
        productivityPerDev: number;
    }, {
        size: number;
        productivityPerDev: number;
    }>;
    sprintCount: z.ZodNumber;
    budget: z.ZodOptional<z.ZodNumber>;
    monteCarlo: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        trials: z.ZodNumber;
        variability: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        trials: number;
        variability: number;
    }, {
        enabled: boolean;
        trials: number;
        variability: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    team: {
        size: number;
        productivityPerDev: number;
    };
    sprintCount: number;
    budget?: number | undefined;
    monteCarlo?: {
        enabled: boolean;
        trials: number;
        variability: number;
    } | undefined;
}, {
    team: {
        size: number;
        productivityPerDev: number;
    };
    sprintCount: number;
    budget?: number | undefined;
    monteCarlo?: {
        enabled: boolean;
        trials: number;
        variability: number;
    } | undefined;
}>;
export declare const ScheduledIssueSchema: z.ZodObject<{
    issue: z.ZodObject<{
        id: z.ZodString;
        epic: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        storyPoints: z.ZodNumber;
        status: z.ZodEnum<["Backlog", "In Progress", "Done"]>;
        priority: z.ZodEnum<["High", "Medium", "Low"]>;
        labels: z.ZodArray<z.ZodString, "many">;
        dependencies: z.ZodArray<z.ZodString, "many">;
        businessValue: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "Backlog" | "In Progress" | "Done";
        epic: string;
        title: string;
        storyPoints: number;
        labels: string[];
        dependencies: string[];
        businessValue: number;
    }, {
        id: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "Backlog" | "In Progress" | "Done";
        epic: string;
        title: string;
        storyPoints: number;
        labels: string[];
        dependencies: string[];
        businessValue: number;
    }>;
    sprint: z.ZodNumber;
    startWeek: z.ZodNumber;
    endWeek: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    issue: {
        id: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "Backlog" | "In Progress" | "Done";
        epic: string;
        title: string;
        storyPoints: number;
        labels: string[];
        dependencies: string[];
        businessValue: number;
    };
    sprint: number;
    startWeek: number;
    endWeek: number;
}, {
    issue: {
        id: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "Backlog" | "In Progress" | "Done";
        epic: string;
        title: string;
        storyPoints: number;
        labels: string[];
        dependencies: string[];
        businessValue: number;
    };
    sprint: number;
    startWeek: number;
    endWeek: number;
}>;
export declare const ScenarioResultSchema: z.ZodObject<{
    selectedIssues: z.ZodArray<z.ZodObject<{
        issue: z.ZodObject<{
            id: z.ZodString;
            epic: z.ZodString;
            title: z.ZodString;
            description: z.ZodString;
            storyPoints: z.ZodNumber;
            status: z.ZodEnum<["Backlog", "In Progress", "Done"]>;
            priority: z.ZodEnum<["High", "Medium", "Low"]>;
            labels: z.ZodArray<z.ZodString, "many">;
            dependencies: z.ZodArray<z.ZodString, "many">;
            businessValue: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            description: string;
            priority: "High" | "Medium" | "Low";
            status: "Backlog" | "In Progress" | "Done";
            epic: string;
            title: string;
            storyPoints: number;
            labels: string[];
            dependencies: string[];
            businessValue: number;
        }, {
            id: string;
            description: string;
            priority: "High" | "Medium" | "Low";
            status: "Backlog" | "In Progress" | "Done";
            epic: string;
            title: string;
            storyPoints: number;
            labels: string[];
            dependencies: string[];
            businessValue: number;
        }>;
        sprint: z.ZodNumber;
        startWeek: z.ZodNumber;
        endWeek: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        issue: {
            id: string;
            description: string;
            priority: "High" | "Medium" | "Low";
            status: "Backlog" | "In Progress" | "Done";
            epic: string;
            title: string;
            storyPoints: number;
            labels: string[];
            dependencies: string[];
            businessValue: number;
        };
        sprint: number;
        startWeek: number;
        endWeek: number;
    }, {
        issue: {
            id: string;
            description: string;
            priority: "High" | "Medium" | "Low";
            status: "Backlog" | "In Progress" | "Done";
            epic: string;
            title: string;
            storyPoints: number;
            labels: string[];
            dependencies: string[];
            businessValue: number;
        };
        sprint: number;
        startWeek: number;
        endWeek: number;
    }>, "many">;
    leftoverIssues: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        epic: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        storyPoints: z.ZodNumber;
        status: z.ZodEnum<["Backlog", "In Progress", "Done"]>;
        priority: z.ZodEnum<["High", "Medium", "Low"]>;
        labels: z.ZodArray<z.ZodString, "many">;
        dependencies: z.ZodArray<z.ZodString, "many">;
        businessValue: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "Backlog" | "In Progress" | "Done";
        epic: string;
        title: string;
        storyPoints: number;
        labels: string[];
        dependencies: string[];
        businessValue: number;
    }, {
        id: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "Backlog" | "In Progress" | "Done";
        epic: string;
        title: string;
        storyPoints: number;
        labels: string[];
        dependencies: string[];
        businessValue: number;
    }>, "many">;
    capacityUsed: z.ZodNumber;
    totalCapacity: z.ZodNumber;
    utilizationPercentage: z.ZodNumber;
    cost: z.ZodNumber;
    businessValueDelivered: z.ZodNumber;
    score: z.ZodNumber;
    badges: z.ZodArray<z.ZodString, "many">;
    risks: z.ZodArray<z.ZodString, "many">;
    monteCarloResults: z.ZodOptional<z.ZodObject<{
        p50Completion: z.ZodNumber;
        p90Completion: z.ZodNumber;
        trials: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        trials: number;
        p50Completion: number;
        p90Completion: number;
    }, {
        trials: number;
        p50Completion: number;
        p90Completion: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    selectedIssues: {
        issue: {
            id: string;
            description: string;
            priority: "High" | "Medium" | "Low";
            status: "Backlog" | "In Progress" | "Done";
            epic: string;
            title: string;
            storyPoints: number;
            labels: string[];
            dependencies: string[];
            businessValue: number;
        };
        sprint: number;
        startWeek: number;
        endWeek: number;
    }[];
    leftoverIssues: {
        id: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "Backlog" | "In Progress" | "Done";
        epic: string;
        title: string;
        storyPoints: number;
        labels: string[];
        dependencies: string[];
        businessValue: number;
    }[];
    capacityUsed: number;
    totalCapacity: number;
    utilizationPercentage: number;
    cost: number;
    businessValueDelivered: number;
    score: number;
    badges: string[];
    risks: string[];
    monteCarloResults?: {
        trials: number;
        p50Completion: number;
        p90Completion: number;
    } | undefined;
}, {
    selectedIssues: {
        issue: {
            id: string;
            description: string;
            priority: "High" | "Medium" | "Low";
            status: "Backlog" | "In Progress" | "Done";
            epic: string;
            title: string;
            storyPoints: number;
            labels: string[];
            dependencies: string[];
            businessValue: number;
        };
        sprint: number;
        startWeek: number;
        endWeek: number;
    }[];
    leftoverIssues: {
        id: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        status: "Backlog" | "In Progress" | "Done";
        epic: string;
        title: string;
        storyPoints: number;
        labels: string[];
        dependencies: string[];
        businessValue: number;
    }[];
    capacityUsed: number;
    totalCapacity: number;
    utilizationPercentage: number;
    cost: number;
    businessValueDelivered: number;
    score: number;
    badges: string[];
    risks: string[];
    monteCarloResults?: {
        trials: number;
        p50Completion: number;
        p90Completion: number;
    } | undefined;
}>;
export declare const CostModelSchema: z.ZodObject<{
    costPerDevPerSprint: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    costPerDevPerSprint: number;
}, {
    costPerDevPerSprint: number;
}>;
export declare const VelocityModelSchema: z.ZodObject<{
    focusFactor: z.ZodNumber;
    overheadPerSprint: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    focusFactor: number;
    overheadPerSprint: number;
}, {
    focusFactor: number;
    overheadPerSprint: number;
}>;
