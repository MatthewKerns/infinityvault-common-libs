import { pgTable, text, integer, decimal, json, timestamp, varchar, unique, date, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import { eosUsers } from "./schema";
// ===============================
// WEEKLY PROCESS MANAGEMENT
// ===============================
// Ideas Management - Captures all business ideas throughout the week
export const weeklyIdeas = pgTable("weekly_ideas", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    title: varchar("title", { length: 300 }).notNull(),
    description: text("description").notNull(),
    submittedBy: varchar("submitted_by", { length: 100 }).notNull(),
    submittedByUserId: varchar("submitted_by_user_id").references(() => eosUsers.id),
    category: varchar("category", { length: 50 }).notNull(), // marketing, operations, product, technology, sales
    impactScore: integer("impact_score").default(5), // 1-10 scale
    urgencyScore: integer("urgency_score").default(5), // 1-10 scale
    effortEstimate: varchar("effort_estimate", { length: 20 }), // hours, days, weeks, months
    resourcesRequired: json("resources_required").$type(),
    status: varchar("status", { length: 20 }).default("new").notNull(), // new, under_review, approved, rejected, in_progress, completed, deferred
    priority: varchar("priority", { length: 20 }), // critical, high, medium, low, nice_to_have
    weekSubmitted: date("week_submitted").defaultNow().notNull(),
    targetImplementationWeek: date("target_implementation_week"),
    actualImplementationWeek: date("actual_implementation_week"),
    rejectionReason: text("rejection_reason"),
    implementationNotes: text("implementation_notes"),
    outcomes: json("outcomes").$type(),
    tags: json("tags").$type(),
    attachments: json("attachments").$type(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    statusIdx: index("weekly_ideas_status_idx").on(table.status),
    weekIdx: index("weekly_ideas_week_idx").on(table.weekSubmitted),
    priorityIdx: index("weekly_ideas_priority_idx").on(table.priority),
}));
// Team Capacity Tracking - Track who worked what days and capacity
export const teamCapacity = pgTable("team_capacity", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id").references(() => eosUsers.id).notNull(),
    userName: varchar("user_name", { length: 100 }).notNull(),
    weekStarting: date("week_starting").notNull(),
    plannedDays: json("planned_days").$type().notNull(),
    actualDays: json("actual_days").$type(),
    plannedHours: decimal("planned_hours", { precision: 4, scale: 1 }).default('40'),
    actualHours: decimal("actual_hours", { precision: 4, scale: 1 }),
    utilizationRate: decimal("utilization_rate", { precision: 5, scale: 2 }), // percentage
    focusAreas: json("focus_areas").$type(),
    completedTasks: json("completed_tasks").$type(),
    blockers: json("blockers").$type(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    userWeekUnique: unique().on(table.userId, table.weekStarting),
    weekIdx: index("team_capacity_week_idx").on(table.weekStarting),
}));
// Five Core Business Pillars Status
export const businessPillars = pgTable("business_pillars", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    pillarName: varchar("pillar_name", { length: 100 }).notNull(), // Sales, Marketing, Operations, Finance, Technology
    weekStarting: date("week_starting").notNull(),
    status: varchar("status", { length: 20 }).notNull(), // healthy, at_risk, critical, improving
    healthScore: integer("health_score").notNull(), // 1-100
    lastWeekWork: json("last_week_work").$type(),
    thisWeekPlan: json("this_week_plan").$type(),
    keyMetrics: json("key_metrics").$type(),
    challenges: json("challenges").$type(),
    opportunities: json("opportunities").$type(),
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
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    weekStarting: date("week_starting").notNull().unique(),
    weekEnding: date("week_ending").notNull(),
    weekNumber: integer("week_number").notNull(),
    year: integer("year").notNull(),
    // Overall Summary
    overallHealth: varchar("overall_health", { length: 20 }).notNull(), // excellent, good, concerning, critical
    executiveSummary: text("executive_summary").notNull(),
    // Previous Week Assessment
    previousWeekAssessment: json("previous_week_assessment").$type(),
    // Ideas Prioritization
    prioritizedIdeas: json("prioritized_ideas").$type(),
    // This Week's Plan
    weekPlan: json("week_plan").$type(),
    // Expected Capacity
    expectedCapacity: json("expected_capacity").$type(),
    // Five Pillars Status
    pillarsStatus: json("pillars_status").$type(),
    // Risks and Opportunities
    risksAndOpportunities: json("risks_and_opportunities").$type(),
    // Metrics and KPIs
    weeklyMetrics: json("weekly_metrics").$type(),
    // Notes and additional context
    additionalNotes: text("additional_notes"),
    preparedBy: varchar("prepared_by", { length: 100 }),
    preparedByUserId: varchar("prepared_by_user_id").references(() => eosUsers.id),
    reviewedBy: json("reviewed_by").$type(),
    approvalStatus: varchar("approval_status", { length: 20 }).default("draft"), // draft, under_review, approved, published
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
// Weekly Retrospectives - Capture learnings and improvements
export const weeklyRetrospectives = pgTable("weekly_retrospectives", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    weekStarting: date("week_starting").notNull().unique(),
    weekPlanId: varchar("week_plan_id").references(() => weeklyPlans.id),
    // What went well
    successes: json("successes").$type(),
    // What didn't go well
    challenges: json("challenges").$type(),
    // Learnings
    keyLearnings: json("key_learnings").$type(),
    // Process Improvements
    processImprovements: json("process_improvements").$type(),
    // Team Feedback
    teamFeedback: json("team_feedback").$type(),
    // Metrics Review
    metricsReview: json("metrics_review").$type(),
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
//# sourceMappingURL=weekly-process-schema.js.map