import { z } from 'zod';

export const EpicSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  priority: z.enum(['High', 'Medium', 'Low'])
});

export const IssueSchema = z.object({
  id: z.string(),
  epic: z.string(),
  title: z.string(),
  description: z.string(),
  storyPoints: z.number().min(1).max(13),
  status: z.enum(['Backlog', 'In Progress', 'Done']),
  priority: z.enum(['High', 'Medium', 'Low']),
  labels: z.array(z.string()),
  dependencies: z.array(z.string()),
  businessValue: z.number().min(1).max(100)
});

export const ProposalSchema = z.object({
  title: z.string(),
  description: z.string(),
  goals: z.array(z.string()),
  keywords: z.array(z.string()),
  epics: z.array(z.string()),
  budget: z.number().optional()
});

export const TeamSchema = z.object({
  size: z.number().min(1).max(20),
  productivityPerDev: z.number().min(1).max(20)
});

export const ScenarioParamsSchema = z.object({
  team: TeamSchema,
  sprintCount: z.number().min(1).max(12),
  budget: z.number().optional(),
  monteCarlo: z.object({
    enabled: z.boolean(),
    trials: z.number().min(10).max(10000),
    variability: z.number().min(0).max(1)
  }).optional()
});

export const ScheduledIssueSchema = z.object({
  issue: IssueSchema,
  sprint: z.number().min(1),
  startWeek: z.number().min(1),
  endWeek: z.number().min(1)
});

export const ScenarioResultSchema = z.object({
  selectedIssues: z.array(ScheduledIssueSchema),
  leftoverIssues: z.array(IssueSchema),
  capacityUsed: z.number(),
  totalCapacity: z.number(),
  utilizationPercentage: z.number().min(0).max(100),
  cost: z.number(),
  businessValueDelivered: z.number(),
  score: z.number(),
  badges: z.array(z.string()),
  risks: z.array(z.string()),
  monteCarloResults: z.object({
    p50Completion: z.number(),
    p90Completion: z.number(),
    trials: z.number()
  }).optional()
});

export const CostModelSchema = z.object({
  costPerDevPerSprint: z.number().min(1000).max(50000)
});

export const VelocityModelSchema = z.object({
  focusFactor: z.number().min(0.1).max(1.0),
  overheadPerSprint: z.number().min(0).max(1.0)
});
