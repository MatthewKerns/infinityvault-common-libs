import { pgTable, text, serial, integer, boolean, decimal, json, timestamp, varchar, primaryKey, real, unique, date, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";
import { eosUsers } from "./schema";

// ===============================
// WEEKLY PROCESS MANAGEMENT
// ===============================

// Ideas Management - Captures all business ideas throughout the week
export const weeklyIdeas = pgTable("weekly_ideas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description").notNull(),
  submittedBy: varchar("submitted_by", { length: 100 }).notNull(),
  submittedByUserId: varchar("submitted_by_user_id").references(() => eosUsers.id),
  category: varchar("category", { length: 50 }).notNull(), // marketing, operations, product, technology, sales
  impactScore: integer("impact_score").default(5), // 1-10 scale
  urgencyScore: integer("urgency_score").default(5), // 1-10 scale
  effortEstimate: varchar("effort_estimate", { length: 20 }), // hours, days, weeks, months
  resourcesRequired: json("resources_required").$type<{
    people?: string[];
    budget?: number;
    tools?: string[];
    time?: string;
  }>(),
  status: varchar("status", { length: 20 }).default("new").notNull(), // new, under_review, approved, rejected, in_progress, completed, deferred
  priority: varchar("priority", { length: 20 }), // critical, high, medium, low, nice_to_have
  weekSubmitted: date("week_submitted").defaultNow().notNull(),
  targetImplementationWeek: date("target_implementation_week"),
  actualImplementationWeek: date("actual_implementation_week"),
  rejectionReason: text("rejection_reason"),
  implementationNotes: text("implementation_notes"),
  outcomes: json("outcomes").$type<{
    measuredImpact?: string;
    lessonsLearned?: string[];
    followUpActions?: string[];
  }>(),
  tags: json("tags").$type<string[]>(),
  attachments: json("attachments").$type<Array<{
    name: string;
    url: string;
    type: string;
  }>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  statusIdx: index("weekly_ideas_status_idx").on(table.status),
  weekIdx: index("weekly_ideas_week_idx").on(table.weekSubmitted),
  priorityIdx: index("weekly_ideas_priority_idx").on(table.priority),
}));

// Team Capacity Tracking - Track who worked what days and capacity
export const teamCapacity = pgTable("team_capacity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => eosUsers.id).notNull(),
  userName: varchar("user_name", { length: 100 }).notNull(),
  weekStarting: date("week_starting").notNull(),
  plannedDays: json("planned_days").$type<{
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  }>().notNull(),
  actualDays: json("actual_days").$type<{
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  }>(),
  plannedHours: decimal("planned_hours", { precision: 4, scale: 1 }).default('40'),
  actualHours: decimal("actual_hours", { precision: 4, scale: 1 }),
  utilizationRate: decimal("utilization_rate", { precision: 5, scale: 2 }), // percentage
  focusAreas: json("focus_areas").$type<string[]>(),
  completedTasks: json("completed_tasks").$type<Array<{
    taskId: string;
    taskName: string;
    hoursSpent: number;
    outcome: string;
  }>>(),
  blockers: json("blockers").$type<Array<{
    description: string;
    impact: string;
    resolved: boolean;
  }>>(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  userWeekUnique: unique().on(table.userId, table.weekStarting),
  weekIdx: index("team_capacity_week_idx").on(table.weekStarting),
}));

// Five Core Business Pillars Status
export const businessPillars = pgTable("business_pillars", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pillarName: varchar("pillar_name", { length: 100 }).notNull(), // Sales, Marketing, Operations, Finance, Technology
  weekStarting: date("week_starting").notNull(),
  status: varchar("status", { length: 20 }).notNull(), // healthy, at_risk, critical, improving
  healthScore: integer("health_score").notNull(), // 1-100
  lastWeekWork: json("last_week_work").$type<Array<{
    item: string;
    completed: boolean;
    impact: string;
    owner: string;
  }>>(),
  thisWeekPlan: json("this_week_plan").$type<Array<{
    item: string;
    priority: string;
    owner: string;
    targetOutcome: string;
  }>>(),
  keyMetrics: json("key_metrics").$type<Array<{
    metricName: string;
    value: number;
    target: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
  }>>(),
  challenges: json("challenges").$type<Array<{
    issue: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    mitigation: string;
  }>>(),
  opportunities: json("opportunities").$type<Array<{
    opportunity: string;
    potentialImpact: string;
    requiredResources: string;
  }>>(),
  ownerUserId: varchar("owner_user_id").references(() => eosUsers.id),
  ownerName: varchar("owner_name", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  pillarWeekUnique: unique().on(table.pillarName, table.weekStarting),
  weekIdx: index("business_pillars_week_idx").on(table.weekStarting),
}));

// Weekly Plans - The comprehensive weekly plan document
export const weeklyPlans = pgTable("weekly_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  weekStarting: date("week_starting").notNull().unique(),
  weekEnding: date("week_ending").notNull(),
  weekNumber: integer("week_number").notNull(),
  year: integer("year").notNull(),

  // Overall Summary
  overallHealth: varchar("overall_health", { length: 20 }).notNull(), // excellent, good, concerning, critical
  executiveSummary: text("executive_summary").notNull(),

  // Previous Week Assessment
  previousWeekAssessment: json("previous_week_assessment").$type<{
    completedItems: Array<{
      item: string;
      pillar: string;
      outcome: string;
      successLevel: 'exceeded' | 'met' | 'partial' | 'failed';
    }>;
    missedItems: Array<{
      item: string;
      pillar: string;
      reason: string;
      carryForward: boolean;
    }>;
    keyLearnings: string[];
    teamCapacityUtilization: number;
  }>(),

  // Ideas Prioritization
  prioritizedIdeas: json("prioritized_ideas").$type<Array<{
    ideaId: string;
    title: string;
    impactScore: number;
    urgencyScore: number;
    priorityMatrix: 'do_first' | 'schedule' | 'delegate' | 'eliminate';
    scheduledWeek?: string;
    assignedTo?: string;
    notes?: string;
  }>>(),

  // This Week's Plan
  weekPlan: json("week_plan").$type<{
    topPriorities: Array<{
      priority: string;
      pillar: string;
      owner: string;
      successCriteria: string;
    }>;
    pillarPlans: Record<string, {
      focus: string;
      plannedWork: string[];
      keyMetrics: Array<{
        metric: string;
        current: number;
        target: number;
      }>;
      risks: string[];
    }>;
    resourceAllocation: Array<{
      person: string;
      plannedDays: number;
      focusAreas: string[];
    }>;
  }>(),

  // Expected Capacity
  expectedCapacity: json("expected_capacity").$type<{
    totalManDays: number;
    byPerson: Record<string, {
      days: number;
      availability: string;
      plannedTasks: string[];
    }>;
    constraints: string[];
  }>(),

  // Five Pillars Status
  pillarsStatus: json("pillars_status").$type<Record<string, {
    currentHealth: 'healthy' | 'at_risk' | 'critical' | 'improving';
    healthScore: number;
    weeklyTrend: 'improving' | 'stable' | 'declining';
    focus: string;
    keyActions: string[];
    owner: string;
  }>>(),

  // Risks and Opportunities
  risksAndOpportunities: json("risks_and_opportunities").$type<{
    risks: Array<{
      risk: string;
      probability: 'low' | 'medium' | 'high';
      impact: 'low' | 'medium' | 'high';
      mitigation: string;
      owner: string;
    }>;
    opportunities: Array<{
      opportunity: string;
      potential: string;
      nextSteps: string;
      owner: string;
    }>;
  }>(),

  // Metrics and KPIs
  weeklyMetrics: json("weekly_metrics").$type<{
    revenue: {
      target: number;
      forecast: number;
      lastWeekActual?: number;
    };
    newCustomers: {
      target: number;
      forecast: number;
      lastWeekActual?: number;
    };
    operationalEfficiency: {
      target: number;
      forecast: number;
      lastWeekActual?: number;
    };
    customMetrics?: Record<string, {
      value: number;
      target: number;
      unit: string;
    }>;
  }>(),

  // Notes and additional context
  additionalNotes: text("additional_notes"),
  preparedBy: varchar("prepared_by", { length: 100 }),
  preparedByUserId: varchar("prepared_by_user_id").references(() => eosUsers.id),
  reviewedBy: json("reviewed_by").$type<Array<{
    name: string;
    userId?: string;
    reviewedAt: string;
  }>>(),
  approvalStatus: varchar("approval_status", { length: 20 }).default("draft"), // draft, under_review, approved, published
  publishedAt: timestamp("published_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Weekly Retrospectives - Capture learnings and improvements
export const weeklyRetrospectives = pgTable("weekly_retrospectives", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  weekStarting: date("week_starting").notNull().unique(),
  weekPlanId: varchar("week_plan_id").references(() => weeklyPlans.id),

  // What went well
  successes: json("successes").$type<Array<{
    item: string;
    pillar: string;
    impact: string;
    shouldRepeat: boolean;
  }>>(),

  // What didn't go well
  challenges: json("challenges").$type<Array<{
    item: string;
    pillar: string;
    rootCause: string;
    preventionStrategy: string;
  }>>(),

  // Learnings
  keyLearnings: json("key_learnings").$type<Array<{
    learning: string;
    actionItem: string;
    owner: string;
    dueDate?: string;
  }>>(),

  // Process Improvements
  processImprovements: json("process_improvements").$type<Array<{
    currentProcess: string;
    proposedImprovement: string;
    expectedBenefit: string;
    implementationPlan: string;
  }>>(),

  // Team Feedback
  teamFeedback: json("team_feedback").$type<Array<{
    feedbackFrom: string;
    category: string;
    feedback: string;
    actionRequired: boolean;
  }>>(),

  // Metrics Review
  metricsReview: json("metrics_review").$type<{
    targetsHit: number;
    targetsMissed: number;
    overperformance: Array<{
      metric: string;
      target: number;
      actual: number;
      percentageOver: number;
    }>;
    underperformance: Array<{
      metric: string;
      target: number;
      actual: number;
      percentageUnder: number;
      reason: string;
    }>;
  }>(),

  facilitatedBy: varchar("facilitated_by", { length: 100 }),
  participantCount: integer("participant_count"),
  overallSentiment: varchar("overall_sentiment", { length: 20 }), // positive, neutral, negative, mixed

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ===============================
// VALIDATION SCHEMAS
// ===============================

export const insertWeeklyIdeaSchema = createInsertSchema(weeklyIdeas).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTeamCapacitySchema = createInsertSchema(teamCapacity).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBusinessPillarSchema = createInsertSchema(businessPillars).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWeeklyPlanSchema = createInsertSchema(weeklyPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWeeklyRetrospectiveSchema = createInsertSchema(weeklyRetrospectives).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ===============================
// TYPE EXPORTS
// ===============================

export type WeeklyIdea = typeof weeklyIdeas.$inferSelect;
export type NewWeeklyIdea = typeof weeklyIdeas.$inferInsert;
export type InsertWeeklyIdea = z.infer<typeof insertWeeklyIdeaSchema>;

export type TeamCapacity = typeof teamCapacity.$inferSelect;
export type NewTeamCapacity = typeof teamCapacity.$inferInsert;
export type InsertTeamCapacity = z.infer<typeof insertTeamCapacitySchema>;

export type BusinessPillar = typeof businessPillars.$inferSelect;
export type NewBusinessPillar = typeof businessPillars.$inferInsert;
export type InsertBusinessPillar = z.infer<typeof insertBusinessPillarSchema>;

export type WeeklyPlan = typeof weeklyPlans.$inferSelect;
export type NewWeeklyPlan = typeof weeklyPlans.$inferInsert;
export type InsertWeeklyPlan = z.infer<typeof insertWeeklyPlanSchema>;

export type WeeklyRetrospective = typeof weeklyRetrospectives.$inferSelect;
export type NewWeeklyRetrospective = typeof weeklyRetrospectives.$inferInsert;
export type InsertWeeklyRetrospective = z.infer<typeof insertWeeklyRetrospectiveSchema>;

// ===============================
// INTERFACES & ENUMS
// ===============================

export type IdeaCategory = 'marketing' | 'operations' | 'product' | 'technology' | 'sales';
export type IdeaStatus = 'new' | 'under_review' | 'approved' | 'rejected' | 'in_progress' | 'completed' | 'deferred';
export type IdeaPriority = 'critical' | 'high' | 'medium' | 'low' | 'nice_to_have';
export type PriorityMatrix = 'do_first' | 'schedule' | 'delegate' | 'eliminate';
export type PillarName = 'Sales' | 'Marketing' | 'Operations' | 'Finance' | 'Technology';
export type PillarStatus = 'healthy' | 'at_risk' | 'critical' | 'improving';
export type HealthStatus = 'excellent' | 'good' | 'concerning' | 'critical';

export interface IdeaPrioritization {
  ideaId: string;
  title: string;
  impactScore: number;
  urgencyScore: number;
  priorityMatrix: PriorityMatrix;
  scheduledWeek?: string;
  assignedTo?: string;
  notes?: string;
}

export interface CapacityPlan {
  totalManDays: number;
  byPerson: Record<string, {
    days: number;
    availability: string;
    plannedTasks: string[];
  }>;
  constraints: string[];
}

export interface PillarPlan {
  focus: string;
  plannedWork: string[];
  keyMetrics: Array<{
    metric: string;
    current: number;
    target: number;
  }>;
  risks: string[];
}

export interface WeeklyPriority {
  priority: string;
  pillar: string;
  owner: string;
  successCriteria: string;
}