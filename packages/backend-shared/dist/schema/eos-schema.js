"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDailyTaskSchema = exports.insertWeeklyTaskSchema = exports.insertPersonalRewardSchema = exports.insertPlayerProfileSchema = exports.insertMilestoneSchema = exports.insertMissionUpdateSchema = exports.insertMissionSchema = exports.insertRockSchema = exports.insertTodoSchema = exports.insertMeetingSchema = exports.insertIssueSchema = exports.insertWeeklyScorecardSchema = exports.insertScorecardMetricSchema = exports.insertPersonalScorecardSchema = exports.insertSeatSchema = exports.insertVisionSchema = exports.eosEmails = exports.dailyTasks = exports.weeklyTasks = exports.leaderboards = exports.teamChallenges = exports.playerAchievements = exports.achievementTypes = exports.rewardRedemptions = exports.personalRewards = exports.rewardTypes = exports.missionUpdates = exports.milestones = exports.missions = exports.playerProfiles = exports.missionThemes = exports.rockUpdates = exports.rocks = exports.todos = exports.meetings = exports.issues = exports.issueCategories = exports.weeklyScorecard = exports.scorecardMetrics = exports.personalScorecards = exports.seats = exports.vision = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var drizzle_orm_1 = require("drizzle-orm");
// ===============================
// VISION COMPONENT
// ===============================
exports.vision = (0, pg_core_1.pgTable)('eos_vision', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    coreValues: (0, pg_core_1.json)('core_values').$type().default([]),
    coreCustomers: (0, pg_core_1.json)('core_customers').$type().default([]),
    niche: (0, pg_core_1.text)('niche'),
    tenYearTarget: (0, pg_core_1.text)('ten_year_target'),
    marketingStrategy: (0, pg_core_1.text)('marketing_strategy'),
    threeYearPicture: (0, pg_core_1.text)('three_year_picture'),
    oneYearPlan: (0, pg_core_1.text)('one_year_plan'),
    quarterlyTheme: (0, pg_core_1.text)('quarterly_theme'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// PEOPLE COMPONENT
// ===============================
exports.seats = (0, pg_core_1.pgTable)('eos_seats', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    accountabilityChartPosition: (0, pg_core_1.varchar)('accountability_chart_position', { length: 100 }),
    roles: (0, pg_core_1.json)('roles').$type().default([]),
    responsibilities: (0, pg_core_1.json)('responsibilities').$type().default([]),
    kpis: (0, pg_core_1.json)('kpis').$type().default([]),
    assignedTo: (0, pg_core_1.varchar)('assigned_to'),
    gwd: (0, pg_core_1.json)('gwd').$type(),
    coreValues: (0, pg_core_1.json)('core_values').$type().default([]),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.personalScorecards = (0, pg_core_1.pgTable)('eos_personal_scorecards', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    seatId: (0, pg_core_1.varchar)('seat_id').notNull(),
    weekEnding: (0, pg_core_1.date)('week_ending').notNull(),
    kpiScores: (0, pg_core_1.json)('kpi_scores').$type().notNull(),
    notes: (0, pg_core_1.text)('notes'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// DATA COMPONENT
// ===============================
exports.scorecardMetrics = (0, pg_core_1.pgTable)('eos_scorecard_metrics', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    owner: (0, pg_core_1.varchar)('owner').notNull(),
    target: (0, pg_core_1.decimal)('target', { precision: 10, scale: 2 }).notNull(),
    unit: (0, pg_core_1.varchar)('unit', { length: 20 }).notNull(),
    frequency: (0, pg_core_1.varchar)('frequency', { length: 20 }).notNull(),
    category: (0, pg_core_1.varchar)('category', { length: 50 }),
    formula: (0, pg_core_1.text)('formula'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.weeklyScorecard = (0, pg_core_1.pgTable)('eos_weekly_scorecard', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    weekEnding: (0, pg_core_1.date)('week_ending').notNull(),
    metricId: (0, pg_core_1.varchar)('metric_id').notNull(),
    actualValue: (0, pg_core_1.decimal)('actual_value', { precision: 10, scale: 2 }).notNull(),
    targetValue: (0, pg_core_1.decimal)('target_value', { precision: 10, scale: 2 }).notNull(),
    variance: (0, pg_core_1.decimal)('variance', { precision: 10, scale: 2 }),
    notes: (0, pg_core_1.text)('notes'),
    redFlag: (0, pg_core_1.boolean)('red_flag').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// ISSUES COMPONENT
// ===============================
exports.issueCategories = (0, pg_core_1.pgTable)('eos_issue_categories', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    name: (0, pg_core_1.varchar)('name', { length: 50 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    color: (0, pg_core_1.varchar)('color', { length: 7 }),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
});
exports.issues = (0, pg_core_1.pgTable)('eos_issues', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    title: (0, pg_core_1.text)('title').notNull(),
    category: (0, pg_core_1.varchar)('category', { length: 50 }).notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('identified').notNull(),
    impactLevel: (0, pg_core_1.varchar)('impact_level', { length: 10 }).notNull(),
    assignedTo: (0, pg_core_1.varchar)('assigned_to'),
    createdFrom: (0, pg_core_1.varchar)('created_from', { length: 50 }),
    resolutionNotes: (0, pg_core_1.text)('resolution_notes'),
    linksToVision: (0, pg_core_1.json)('links_to_vision').$type().default([]),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// PROCESS COMPONENT
// ===============================
exports.meetings = (0, pg_core_1.pgTable)('eos_meetings', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    type: (0, pg_core_1.varchar)('type', { length: 20 }).notNull(),
    date: (0, pg_core_1.date)('date').notNull(),
    attendees: (0, pg_core_1.json)('attendees').$type().notNull(),
    agenda: (0, pg_core_1.json)('agenda').$type(),
    issuesDiscussed: (0, pg_core_1.json)('issues_discussed').$type(),
    decisionsmade: (0, pg_core_1.json)('decisions_made').$type(),
    actionItems: (0, pg_core_1.json)('action_items').$type(),
    rockUpdates: (0, pg_core_1.json)('rock_updates').$type(),
    scorecardReview: (0, pg_core_1.json)('scorecard_review').$type(),
    meetingRating: (0, pg_core_1.integer)('meeting_rating'),
    rawTranscript: (0, pg_core_1.text)('raw_transcript'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
exports.todos = (0, pg_core_1.pgTable)('eos_todos', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    title: (0, pg_core_1.text)('title').notNull(),
    assignedTo: (0, pg_core_1.varchar)('assigned_to').notNull(),
    dueDate: (0, pg_core_1.date)('due_date').notNull(),
    priority: (0, pg_core_1.integer)('priority').default(2),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('open').notNull(),
    notes: (0, pg_core_1.text)('notes'),
    createdFrom: (0, pg_core_1.varchar)('created_from', { length: 50 }),
    completedAt: (0, pg_core_1.timestamp)('completed_at', { withTimezone: true }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// TRACTION COMPONENT (LEGACY ROCKS)
// ===============================
exports.rocks = (0, pg_core_1.pgTable)('eos_rocks', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    userId: (0, pg_core_1.varchar)('user_id').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    owner: (0, pg_core_1.varchar)('owner').notNull(),
    quarter: (0, pg_core_1.varchar)('quarter', { length: 10 }).notNull(),
    dueDate: (0, pg_core_1.date)('due_date').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('in_progress').notNull(),
    completionPercentage: (0, pg_core_1.integer)('completion_percentage').default(0).notNull(),
    milestones: (0, pg_core_1.json)('milestones').$type().default([]),
    linksToVision: (0, pg_core_1.json)('links_to_vision').$type().default([]),
    impactTags: (0, pg_core_1.json)('impact_tags').$type().default([]),
    notes: (0, pg_core_1.text)('notes'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.rockUpdates = (0, pg_core_1.pgTable)('eos_rock_updates', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    rockId: (0, pg_core_1.varchar)('rock_id').notNull(),
    updateDate: (0, pg_core_1.date)('update_date').notNull(),
    progressPercentage: (0, pg_core_1.integer)('progress_percentage').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).notNull(),
    notes: (0, pg_core_1.text)('notes').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// GAMIFIED MISSION SYSTEM
// ===============================
exports.missionThemes = (0, pg_core_1.pgTable)('eos_mission_themes', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    name: (0, pg_core_1.varchar)('name', { length: 50 }).notNull(),
    displayName: (0, pg_core_1.varchar)('display_name', { length: 100 }).notNull(),
    progressMeterName: (0, pg_core_1.varchar)('progress_meter_name', { length: 100 }).notNull(),
    completionTerm: (0, pg_core_1.varchar)('completion_term', { length: 50 }).notNull(),
    pointsName: (0, pg_core_1.varchar)('points_name', { length: 50 }).notNull(),
    iconSet: (0, pg_core_1.varchar)('icon_set', { length: 50 }).default('default'),
    colorScheme: (0, pg_core_1.json)('color_scheme').$type(),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
exports.playerProfiles = (0, pg_core_1.pgTable)('eos_player_profiles', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    userId: (0, pg_core_1.varchar)('user_id').notNull().unique(),
    playerName: (0, pg_core_1.varchar)('player_name', { length: 100 }).notNull(),
    preferredThemeId: (0, pg_core_1.varchar)('preferred_theme_id'),
    totalPoints: (0, pg_core_1.integer)('total_points').default(0),
    level: (0, pg_core_1.integer)('level').default(1),
    currentStreak: (0, pg_core_1.integer)('current_streak').default(0),
    longestStreak: (0, pg_core_1.integer)('longest_streak').default(0),
    totalMissionsCompleted: (0, pg_core_1.integer)('total_missions_completed').default(0),
    totalMilestonesCompleted: (0, pg_core_1.integer)('total_milestones_completed').default(0),
    averageCompletionTime: (0, pg_core_1.decimal)('average_completion_time', { precision: 5, scale: 2 }),
    preferredRewardTypes: (0, pg_core_1.json)('preferred_reward_types').$type().default([]),
    gamificationSettings: (0, pg_core_1.json)('gamification_settings').$type().default({
        showLeaderboard: true,
        enableNotifications: true,
        showProgressBadges: true,
        enableCompetitiveMode: false,
    }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.missions = (0, pg_core_1.pgTable)('eos_missions', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    legacyRockId: (0, pg_core_1.varchar)('legacy_rock_id'),
    ownerId: (0, pg_core_1.varchar)('owner_id').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    quarter: (0, pg_core_1.varchar)('quarter', { length: 10 }).notNull(),
    dueDate: (0, pg_core_1.date)('due_date').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('active').notNull(),
    completionPercentage: (0, pg_core_1.integer)('completion_percentage').default(0).notNull(),
    difficultyLevel: (0, pg_core_1.integer)('difficulty_level').default(3).notNull(),
    estimatedHours: (0, pg_core_1.decimal)('estimated_hours', { precision: 5, scale: 1 }),
    actualHours: (0, pg_core_1.decimal)('actual_hours', { precision: 5, scale: 1 }),
    basePoints: (0, pg_core_1.integer)('base_points').default(100).notNull(),
    bonusPointsEarned: (0, pg_core_1.integer)('bonus_points_earned').default(0),
    qualityScore: (0, pg_core_1.decimal)('quality_score', { precision: 3, scale: 2 }),
    impactScore: (0, pg_core_1.decimal)('impact_score', { precision: 3, scale: 2 }),
    linksToVision: (0, pg_core_1.json)('links_to_vision').$type().default([]),
    impactTags: (0, pg_core_1.json)('impact_tags').$type().default([]),
    collaborators: (0, pg_core_1.json)('collaborators').$type().default([]),
    isTeamMission: (0, pg_core_1.boolean)('is_team_mission').default(false),
    customThemeOverride: (0, pg_core_1.varchar)('custom_theme_override'),
    successCriteria: (0, pg_core_1.json)('success_criteria').$type().default([]),
    startedAt: (0, pg_core_1.timestamp)('started_at', { withTimezone: true }),
    completedAt: (0, pg_core_1.timestamp)('completed_at', { withTimezone: true }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.milestones = (0, pg_core_1.pgTable)('eos_milestones', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    missionId: (0, pg_core_1.varchar)('mission_id').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    dueDate: (0, pg_core_1.date)('due_date').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('pending').notNull(),
    points: (0, pg_core_1.integer)('points').default(10).notNull(),
    sortOrder: (0, pg_core_1.integer)('sort_order').notNull(),
    completedAt: (0, pg_core_1.timestamp)('completed_at', { withTimezone: true }),
    completedBy: (0, pg_core_1.varchar)('completed_by'),
    notes: (0, pg_core_1.text)('notes'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.missionUpdates = (0, pg_core_1.pgTable)('eos_mission_updates', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    missionId: (0, pg_core_1.varchar)('mission_id').notNull(),
    updateDate: (0, pg_core_1.date)('update_date').notNull(),
    progressPercentage: (0, pg_core_1.integer)('progress_percentage').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).notNull(),
    hoursWorked: (0, pg_core_1.decimal)('hours_worked', { precision: 4, scale: 1 }),
    notes: (0, pg_core_1.text)('notes').notNull(),
    milestonesCompleted: (0, pg_core_1.json)('milestones_completed').$type().default([]),
    blockers: (0, pg_core_1.text)('blockers'),
    nextSteps: (0, pg_core_1.text)('next_steps'),
    mood: (0, pg_core_1.varchar)('mood', { length: 20 }),
    updatedBy: (0, pg_core_1.varchar)('updated_by').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// REWARD SYSTEM
// ===============================
exports.rewardTypes = (0, pg_core_1.pgTable)('eos_reward_types', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_17 || (templateObject_17 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    category: (0, pg_core_1.varchar)('category', { length: 50 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    basePointsCost: (0, pg_core_1.integer)('base_points_cost').notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    adminApprovalRequired: (0, pg_core_1.boolean)('admin_approval_required').default(false),
    maxRedemptionsPerQuarter: (0, pg_core_1.integer)('max_redemptions_per_quarter'),
    metadata: (0, pg_core_1.json)('metadata').$type(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.personalRewards = (0, pg_core_1.pgTable)('eos_personal_rewards', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_18 || (templateObject_18 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    playerId: (0, pg_core_1.varchar)('player_id').notNull(),
    rewardTypeId: (0, pg_core_1.varchar)('reward_type_id').notNull(),
    customValue: (0, pg_core_1.decimal)('custom_value', { precision: 10, scale: 2 }),
    customDescription: (0, pg_core_1.text)('custom_description'),
    pointsCost: (0, pg_core_1.integer)('points_cost').notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    preferenceRanking: (0, pg_core_1.integer)('preference_ranking'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.rewardRedemptions = (0, pg_core_1.pgTable)('eos_reward_redemptions', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_19 || (templateObject_19 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    playerId: (0, pg_core_1.varchar)('player_id').notNull(),
    personalRewardId: (0, pg_core_1.varchar)('personal_reward_id').notNull(),
    pointsSpent: (0, pg_core_1.integer)('points_spent').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('pending').notNull(),
    requestedAt: (0, pg_core_1.timestamp)('requested_at', { withTimezone: true }).defaultNow(),
    approvedAt: (0, pg_core_1.timestamp)('approved_at', { withTimezone: true }),
    approvedBy: (0, pg_core_1.varchar)('approved_by'),
    fulfilledAt: (0, pg_core_1.timestamp)('fulfilled_at', { withTimezone: true }),
    fulfilledBy: (0, pg_core_1.varchar)('fulfilled_by'),
    notes: (0, pg_core_1.text)('notes'),
    rejectReason: (0, pg_core_1.text)('reject_reason'),
    quarterlyCount: (0, pg_core_1.integer)('quarterly_count').default(1),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// ACHIEVEMENT SYSTEM
// ===============================
exports.achievementTypes = (0, pg_core_1.pgTable)('eos_achievement_types', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_20 || (templateObject_20 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    category: (0, pg_core_1.varchar)('category', { length: 50 }).notNull(),
    iconName: (0, pg_core_1.varchar)('icon_name', { length: 50 }),
    pointsAwarded: (0, pg_core_1.integer)('points_awarded').default(25),
    isRepeatable: (0, pg_core_1.boolean)('is_repeatable').default(false),
    triggerCriteria: (0, pg_core_1.json)('trigger_criteria').$type().notNull(),
    rarity: (0, pg_core_1.varchar)('rarity', { length: 20 }).default('common'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.playerAchievements = (0, pg_core_1.pgTable)('eos_player_achievements', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_21 || (templateObject_21 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    playerId: (0, pg_core_1.varchar)('player_id').notNull(),
    achievementTypeId: (0, pg_core_1.varchar)('achievement_type_id').notNull(),
    earnedAt: (0, pg_core_1.timestamp)('earned_at', { withTimezone: true }).defaultNow(),
    contextData: (0, pg_core_1.json)('context_data').$type(),
    pointsEarned: (0, pg_core_1.integer)('points_earned').notNull(),
    repeatCount: (0, pg_core_1.integer)('repeat_count').default(1),
    relatedMissionId: (0, pg_core_1.varchar)('related_mission_id'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// TEAM & COLLABORATION
// ===============================
exports.teamChallenges = (0, pg_core_1.pgTable)('eos_team_challenges', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_22 || (templateObject_22 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    challengeType: (0, pg_core_1.varchar)('challenge_type', { length: 50 }).notNull(),
    startDate: (0, pg_core_1.date)('start_date').notNull(),
    endDate: (0, pg_core_1.date)('end_date').notNull(),
    targetMetric: (0, pg_core_1.varchar)('target_metric', { length: 100 }),
    targetValue: (0, pg_core_1.decimal)('target_value', { precision: 10, scale: 2 }),
    currentValue: (0, pg_core_1.decimal)('current_value', { precision: 10, scale: 2 }).default('0'),
    participantIds: (0, pg_core_1.json)('participant_ids').$type().notNull(),
    rewardPool: (0, pg_core_1.integer)('reward_pool').default(0),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('active'),
    winnerIds: (0, pg_core_1.json)('winner_ids').$type(),
    completedAt: (0, pg_core_1.timestamp)('completed_at', { withTimezone: true }),
    createdBy: (0, pg_core_1.varchar)('created_by').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.leaderboards = (0, pg_core_1.pgTable)('eos_leaderboards', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_23 || (templateObject_23 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    periodType: (0, pg_core_1.varchar)('period_type', { length: 20 }).notNull(),
    periodStart: (0, pg_core_1.date)('period_start').notNull(),
    periodEnd: (0, pg_core_1.date)('period_end').notNull(),
    rankings: (0, pg_core_1.json)('rankings').$type().notNull(),
    metricType: (0, pg_core_1.varchar)('metric_type', { length: 50 }).notNull(),
    lastUpdated: (0, pg_core_1.timestamp)('last_updated', { withTimezone: true }).defaultNow(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// TASK GENERATION & AI
// ===============================
exports.weeklyTasks = (0, pg_core_1.pgTable)('eos_weekly_tasks', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_24 || (templateObject_24 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    person: (0, pg_core_1.varchar)('person').notNull(),
    weekEnding: (0, pg_core_1.date)('week_ending').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    priority: (0, pg_core_1.integer)('priority').default(2).notNull(),
    estimatedTotalTime: (0, pg_core_1.varchar)('estimated_total_time', { length: 50 }),
    expectedImpact: (0, pg_core_1.text)('expected_impact'),
    dailyBreakdown: (0, pg_core_1.json)('daily_breakdown').$type().default([]),
    successCriteria: (0, pg_core_1.text)('success_criteria'),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('assigned').notNull(),
    completedAt: (0, pg_core_1.timestamp)('completed_at', { withTimezone: true }),
    actualTimeSpent: (0, pg_core_1.varchar)('actual_time_spent', { length: 50 }),
    impactAchieved: (0, pg_core_1.text)('impact_achieved'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
exports.dailyTasks = (0, pg_core_1.pgTable)('eos_daily_tasks', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_25 || (templateObject_25 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    weeklyTaskId: (0, pg_core_1.varchar)('weekly_task_id'),
    person: (0, pg_core_1.varchar)('person').notNull(),
    date: (0, pg_core_1.date)('date').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    estimatedMinutes: (0, pg_core_1.integer)('estimated_minutes'),
    actualMinutes: (0, pg_core_1.integer)('actual_minutes'),
    energyLevel: (0, pg_core_1.integer)('energy_level'),
    priority: (0, pg_core_1.integer)('priority').default(2),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('assigned').notNull(),
    completedAt: (0, pg_core_1.timestamp)('completed_at', { withTimezone: true }),
    notes: (0, pg_core_1.text)('notes'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// COMMUNICATION & NOTIFICATIONS
// ===============================
exports.eosEmails = (0, pg_core_1.pgTable)('eos_emails', {
    id: (0, pg_core_1.varchar)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_26 || (templateObject_26 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    type: (0, pg_core_1.varchar)('type', { length: 50 }).notNull(),
    recipient: (0, pg_core_1.varchar)('recipient').notNull(),
    subject: (0, pg_core_1.text)('subject').notNull(),
    templateUsed: (0, pg_core_1.varchar)('template_used', { length: 50 }),
    sent: (0, pg_core_1.boolean)('sent').default(false),
    sentAt: (0, pg_core_1.timestamp)('sent_at', { withTimezone: true }),
    relatedEntityType: (0, pg_core_1.varchar)('related_entity_type', { length: 50 }),
    relatedEntityId: (0, pg_core_1.varchar)('related_entity_id'),
    metadata: (0, pg_core_1.json)('metadata').$type(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// ===============================
// VALIDATION SCHEMAS
// ===============================
exports.insertVisionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.vision);
exports.insertSeatSchema = (0, drizzle_zod_1.createInsertSchema)(exports.seats);
exports.insertPersonalScorecardSchema = (0, drizzle_zod_1.createInsertSchema)(exports.personalScorecards);
exports.insertScorecardMetricSchema = (0, drizzle_zod_1.createInsertSchema)(exports.scorecardMetrics);
exports.insertWeeklyScorecardSchema = (0, drizzle_zod_1.createInsertSchema)(exports.weeklyScorecard);
exports.insertIssueSchema = (0, drizzle_zod_1.createInsertSchema)(exports.issues);
exports.insertMeetingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.meetings);
exports.insertTodoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.todos);
exports.insertRockSchema = (0, drizzle_zod_1.createInsertSchema)(exports.rocks);
exports.insertMissionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.missions);
exports.insertMissionUpdateSchema = (0, drizzle_zod_1.createInsertSchema)(exports.missionUpdates);
exports.insertMilestoneSchema = (0, drizzle_zod_1.createInsertSchema)(exports.milestones);
exports.insertPlayerProfileSchema = (0, drizzle_zod_1.createInsertSchema)(exports.playerProfiles);
exports.insertPersonalRewardSchema = (0, drizzle_zod_1.createInsertSchema)(exports.personalRewards);
exports.insertWeeklyTaskSchema = (0, drizzle_zod_1.createInsertSchema)(exports.weeklyTasks);
exports.insertDailyTaskSchema = (0, drizzle_zod_1.createInsertSchema)(exports.dailyTasks);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26;
