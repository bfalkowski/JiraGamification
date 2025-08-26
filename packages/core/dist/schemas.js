"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VelocityModelSchema = exports.CostModelSchema = exports.ScenarioResultSchema = exports.ScheduledIssueSchema = exports.ScenarioParamsSchema = exports.TeamSchema = exports.ProposalSchema = exports.IssueSchema = exports.EpicSchema = void 0;
const zod_1 = require("zod");
exports.EpicSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    priority: zod_1.z.enum(['High', 'Medium', 'Low'])
});
exports.IssueSchema = zod_1.z.object({
    id: zod_1.z.string(),
    epic: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    storyPoints: zod_1.z.number().min(1).max(13),
    status: zod_1.z.enum(['Backlog', 'In Progress', 'Done']),
    priority: zod_1.z.enum(['High', 'Medium', 'Low']),
    labels: zod_1.z.array(zod_1.z.string()),
    dependencies: zod_1.z.array(zod_1.z.string()),
    businessValue: zod_1.z.number().min(1).max(100)
});
exports.ProposalSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    goals: zod_1.z.array(zod_1.z.string()),
    keywords: zod_1.z.array(zod_1.z.string()),
    epics: zod_1.z.array(zod_1.z.string()),
    budget: zod_1.z.number().optional()
});
exports.TeamSchema = zod_1.z.object({
    size: zod_1.z.number().min(1).max(20),
    productivityPerDev: zod_1.z.number().min(1).max(20)
});
exports.ScenarioParamsSchema = zod_1.z.object({
    team: exports.TeamSchema,
    sprintCount: zod_1.z.number().min(1).max(12),
    budget: zod_1.z.number().optional(),
    monteCarlo: zod_1.z.object({
        enabled: zod_1.z.boolean(),
        trials: zod_1.z.number().min(10).max(10000),
        variability: zod_1.z.number().min(0).max(1)
    }).optional()
});
exports.ScheduledIssueSchema = zod_1.z.object({
    issue: exports.IssueSchema,
    sprint: zod_1.z.number().min(1),
    startWeek: zod_1.z.number().min(1),
    endWeek: zod_1.z.number().min(1)
});
exports.ScenarioResultSchema = zod_1.z.object({
    selectedIssues: zod_1.z.array(exports.ScheduledIssueSchema),
    leftoverIssues: zod_1.z.array(exports.IssueSchema),
    capacityUsed: zod_1.z.number(),
    totalCapacity: zod_1.z.number(),
    utilizationPercentage: zod_1.z.number().min(0).max(100),
    cost: zod_1.z.number(),
    businessValueDelivered: zod_1.z.number(),
    score: zod_1.z.number(),
    badges: zod_1.z.array(zod_1.z.string()),
    risks: zod_1.z.array(zod_1.z.string()),
    monteCarloResults: zod_1.z.object({
        p50Completion: zod_1.z.number(),
        p90Completion: zod_1.z.number(),
        trials: zod_1.z.number()
    }).optional()
});
exports.CostModelSchema = zod_1.z.object({
    costPerDevPerSprint: zod_1.z.number().min(1000).max(50000)
});
exports.VelocityModelSchema = zod_1.z.object({
    focusFactor: zod_1.z.number().min(0.1).max(1.0),
    overheadPerSprint: zod_1.z.number().min(0).max(1.0)
});
