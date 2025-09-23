import { pgTable, text, serial, integer, boolean, decimal, json, timestamp, varchar, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// ===============================
// VISION COMPONENT
// ===============================

export const vision = pgTable('eos_vision', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  coreValues: json('core_values').$type<string[]>().default([]),
  coreCustomers: json('core_customers').$type<string[]>().default([]),
  niche: text('niche'),
  tenYearTarget: text('ten_year_target'),
  marketingStrategy: text('marketing_strategy'),
  threeYearPicture: text('three_year_picture'),
  oneYearPlan: text('one_year_plan'),
  quarterlyTheme: text('quarterly_theme'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// PEOPLE COMPONENT
// ===============================

export const seats = pgTable('eos_seats', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull(),
  accountabilityChartPosition: varchar('accountability_chart_position', { length: 100 }),
  roles: json('roles').$type<string[]>().default([]),
  responsibilities: json('responsibilities').$type<string[]>().default([]),
  kpis: json('kpis').$type<Array<{
    name: string;
    target: number;
    unit: string;
    frequency: string;
  }>>().default([]),
  assignedTo: varchar('assigned_to'),
  gwd: json('gwd').$type<{
    gets: boolean;
    wants: boolean;
    capacity: boolean;
  }>(),
  coreValues: json('core_values').$type<string[]>().default([]),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const personalScorecards = pgTable('eos_personal_scorecards', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  seatId: varchar('seat_id').notNull(),
  weekEnding: date('week_ending').notNull(),
  kpiScores: json('kpi_scores').$type<Record<string, number>>().notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// DATA COMPONENT
// ===============================

export const scorecardMetrics = pgTable('eos_scorecard_metrics', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull(),
  owner: varchar('owner').notNull(),
  target: decimal('target', { precision: 10, scale: 2 }).notNull(),
  unit: varchar('unit', { length: 20 }).notNull(),
  frequency: varchar('frequency', { length: 20 }).notNull(),
  category: varchar('category', { length: 50 }),
  formula: text('formula'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const weeklyScorecard = pgTable('eos_weekly_scorecard', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  weekEnding: date('week_ending').notNull(),
  metricId: varchar('metric_id').notNull(),
  actualValue: decimal('actual_value', { precision: 10, scale: 2 }).notNull(),
  targetValue: decimal('target_value', { precision: 10, scale: 2 }).notNull(),
  variance: decimal('variance', { precision: 10, scale: 2 }),
  notes: text('notes'),
  redFlag: boolean('red_flag').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// ISSUES COMPONENT
// ===============================

export const issueCategories = pgTable('eos_issue_categories', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description'),
  color: varchar('color', { length: 7 }),
  isActive: boolean('is_active').default(true),
});

export const issues = pgTable('eos_issues', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 20 }).default('identified').notNull(),
  impactLevel: varchar('impact_level', { length: 10 }).notNull(),
  assignedTo: varchar('assigned_to'),
  createdFrom: varchar('created_from', { length: 50 }),
  resolutionNotes: text('resolution_notes'),
  linksToVision: json('links_to_vision').$type<string[]>().default([]),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// PROCESS COMPONENT
// ===============================

export const meetings = pgTable('eos_meetings', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  type: varchar('type', { length: 20 }).notNull(),
  date: date('date').notNull(),
  attendees: json('attendees').$type<string[]>().notNull(),
  agenda: json('agenda').$type<string[]>(),
  issuesDiscussed: json('issues_discussed').$type<string[]>(),
  decisionsmade: json('decisions_made').$type<string[]>(),
  actionItems: json('action_items').$type<Array<{
    task: string;
    assignedTo: string;
    dueDate: string;
  }>>(),
  rockUpdates: json('rock_updates').$type<Array<{
    rockId: string;
    progress: number;
    notes: string;
  }>>(),
  scorecardReview: json('scorecard_review').$type<Record<string, any>>(),
  meetingRating: integer('meeting_rating'),
  rawTranscript: text('raw_transcript'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const todos = pgTable('eos_todos', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  assignedTo: varchar('assigned_to').notNull(),
  dueDate: date('due_date').notNull(),
  priority: integer('priority').default(2),
  status: varchar('status', { length: 20 }).default('open').notNull(),
  notes: text('notes'),
  createdFrom: varchar('created_from', { length: 50 }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// TRACTION COMPONENT (LEGACY ROCKS)
// ===============================

export const rocks = pgTable('eos_rocks', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar('user_id').notNull(),
  title: text('title').notNull(),
  owner: varchar('owner').notNull(),
  quarter: varchar('quarter', { length: 10 }).notNull(),
  dueDate: date('due_date').notNull(),
  status: varchar('status', { length: 20 }).default('in_progress').notNull(),
  completionPercentage: integer('completion_percentage').default(0).notNull(),
  milestones: json('milestones').$type<Array<{
    title: string;
    dueDate: string;
    completed: boolean;
  }>>().default([]),
  linksToVision: json('links_to_vision').$type<string[]>().default([]),
  impactTags: json('impact_tags').$type<string[]>().default([]),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const rockUpdates = pgTable('eos_rock_updates', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  rockId: varchar('rock_id').notNull(),
  updateDate: date('update_date').notNull(),
  progressPercentage: integer('progress_percentage').notNull(),
  status: varchar('status', { length: 20 }).notNull(),
  notes: text('notes').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// GAMIFIED MISSION SYSTEM
// ===============================

export const missionThemes = pgTable('eos_mission_themes', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 50 }).notNull(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  progressMeterName: varchar('progress_meter_name', { length: 100 }).notNull(),
  completionTerm: varchar('completion_term', { length: 50 }).notNull(),
  pointsName: varchar('points_name', { length: 50 }).notNull(),
  iconSet: varchar('icon_set', { length: 50 }).default('default'),
  colorScheme: json('color_scheme').$type<{
    primary: string;
    secondary: string;
    accent: string;
  }>(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const playerProfiles = pgTable('eos_player_profiles', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar('user_id').notNull().unique(),
  playerName: varchar('player_name', { length: 100 }).notNull(),
  preferredThemeId: varchar('preferred_theme_id'),
  totalPoints: integer('total_points').default(0),
  level: integer('level').default(1),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  totalMissionsCompleted: integer('total_missions_completed').default(0),
  totalMilestonesCompleted: integer('total_milestones_completed').default(0),
  averageCompletionTime: decimal('average_completion_time', { precision: 5, scale: 2 }),
  preferredRewardTypes: json('preferred_reward_types').$type<string[]>().default([]),
  gamificationSettings: json('gamification_settings').$type<{
    showLeaderboard: boolean;
    enableNotifications: boolean;
    showProgressBadges: boolean;
    enableCompetitiveMode: boolean;
  }>().default({
    showLeaderboard: true,
    enableNotifications: true,
    showProgressBadges: true,
    enableCompetitiveMode: false,
  }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const missions = pgTable('eos_missions', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  legacyRockId: varchar('legacy_rock_id'),
  ownerId: varchar('owner_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  quarter: varchar('quarter', { length: 10 }).notNull(),
  dueDate: date('due_date').notNull(),
  status: varchar('status', { length: 20 }).default('active').notNull(),
  completionPercentage: integer('completion_percentage').default(0).notNull(),
  difficultyLevel: integer('difficulty_level').default(3).notNull(),
  estimatedHours: decimal('estimated_hours', { precision: 5, scale: 1 }),
  actualHours: decimal('actual_hours', { precision: 5, scale: 1 }),
  basePoints: integer('base_points').default(100).notNull(),
  bonusPointsEarned: integer('bonus_points_earned').default(0),
  qualityScore: decimal('quality_score', { precision: 3, scale: 2 }),
  impactScore: decimal('impact_score', { precision: 3, scale: 2 }),
  linksToVision: json('links_to_vision').$type<string[]>().default([]),
  impactTags: json('impact_tags').$type<string[]>().default([]),
  collaborators: json('collaborators').$type<string[]>().default([]),
  isTeamMission: boolean('is_team_mission').default(false),
  customThemeOverride: varchar('custom_theme_override'),
  successCriteria: json('success_criteria').$type<string[]>().default([]),
  startedAt: timestamp('started_at', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const milestones = pgTable('eos_milestones', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  missionId: varchar('mission_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  dueDate: date('due_date').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(),
  points: integer('points').default(10).notNull(),
  sortOrder: integer('sort_order').notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  completedBy: varchar('completed_by'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const missionUpdates = pgTable('eos_mission_updates', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  missionId: varchar('mission_id').notNull(),
  updateDate: date('update_date').notNull(),
  progressPercentage: integer('progress_percentage').notNull(),
  status: varchar('status', { length: 20 }).notNull(),
  hoursWorked: decimal('hours_worked', { precision: 4, scale: 1 }),
  notes: text('notes').notNull(),
  milestonesCompleted: json('milestones_completed').$type<string[]>().default([]),
  blockers: text('blockers'),
  nextSteps: text('next_steps'),
  mood: varchar('mood', { length: 20 }),
  updatedBy: varchar('updated_by').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// REWARD SYSTEM
// ===============================

export const rewardTypes = pgTable('eos_reward_types', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  description: text('description'),
  basePointsCost: integer('base_points_cost').notNull(),
  isActive: boolean('is_active').default(true),
  adminApprovalRequired: boolean('admin_approval_required').default(false),
  maxRedemptionsPerQuarter: integer('max_redemptions_per_quarter'),
  metadata: json('metadata').$type<Record<string, any>>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const personalRewards = pgTable('eos_personal_rewards', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  playerId: varchar('player_id').notNull(),
  rewardTypeId: varchar('reward_type_id').notNull(),
  customValue: decimal('custom_value', { precision: 10, scale: 2 }),
  customDescription: text('custom_description'),
  pointsCost: integer('points_cost').notNull(),
  isActive: boolean('is_active').default(true),
  preferenceRanking: integer('preference_ranking'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const rewardRedemptions = pgTable('eos_reward_redemptions', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  playerId: varchar('player_id').notNull(),
  personalRewardId: varchar('personal_reward_id').notNull(),
  pointsSpent: integer('points_spent').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(),
  requestedAt: timestamp('requested_at', { withTimezone: true }).defaultNow(),
  approvedAt: timestamp('approved_at', { withTimezone: true }),
  approvedBy: varchar('approved_by'),
  fulfilledAt: timestamp('fulfilled_at', { withTimezone: true }),
  fulfilledBy: varchar('fulfilled_by'),
  notes: text('notes'),
  rejectReason: text('reject_reason'),
  quarterlyCount: integer('quarterly_count').default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// ACHIEVEMENT SYSTEM
// ===============================

export const achievementTypes = pgTable('eos_achievement_types', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  iconName: varchar('icon_name', { length: 50 }),
  pointsAwarded: integer('points_awarded').default(25),
  isRepeatable: boolean('is_repeatable').default(false),
  triggerCriteria: json('trigger_criteria').$type<{
    type: string;
    conditions: Record<string, any>;
  }>().notNull(),
  rarity: varchar('rarity', { length: 20 }).default('common'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const playerAchievements = pgTable('eos_player_achievements', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  playerId: varchar('player_id').notNull(),
  achievementTypeId: varchar('achievement_type_id').notNull(),
  earnedAt: timestamp('earned_at', { withTimezone: true }).defaultNow(),
  contextData: json('context_data').$type<Record<string, any>>(),
  pointsEarned: integer('points_earned').notNull(),
  repeatCount: integer('repeat_count').default(1),
  relatedMissionId: varchar('related_mission_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// TEAM & COLLABORATION
// ===============================

export const teamChallenges = pgTable('eos_team_challenges', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description'),
  challengeType: varchar('challenge_type', { length: 50 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  targetMetric: varchar('target_metric', { length: 100 }),
  targetValue: decimal('target_value', { precision: 10, scale: 2 }),
  currentValue: decimal('current_value', { precision: 10, scale: 2 }).default('0'),
  participantIds: json('participant_ids').$type<string[]>().notNull(),
  rewardPool: integer('reward_pool').default(0),
  status: varchar('status', { length: 20 }).default('active'),
  winnerIds: json('winner_ids').$type<string[]>(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  createdBy: varchar('created_by').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const leaderboards = pgTable('eos_leaderboards', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  periodType: varchar('period_type', { length: 20 }).notNull(),
  periodStart: date('period_start').notNull(),
  periodEnd: date('period_end').notNull(),
  rankings: json('rankings').$type<Array<{
    playerId: string;
    playerName: string;
    score: number;
    rank: number;
    change: number;
  }>>().notNull(),
  metricType: varchar('metric_type', { length: 50 }).notNull(),
  lastUpdated: timestamp('last_updated', { withTimezone: true }).defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// TASK GENERATION & AI
// ===============================

export const weeklyTasks = pgTable('eos_weekly_tasks', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  person: varchar('person').notNull(),
  weekEnding: date('week_ending').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  priority: integer('priority').default(2).notNull(),
  estimatedTotalTime: varchar('estimated_total_time', { length: 50 }),
  expectedImpact: text('expected_impact'),
  dailyBreakdown: json('daily_breakdown').$type<string[]>().default([]),
  successCriteria: text('success_criteria'),
  status: varchar('status', { length: 20 }).default('assigned').notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  actualTimeSpent: varchar('actual_time_spent', { length: 50 }),
  impactAchieved: text('impact_achieved'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const dailyTasks = pgTable('eos_daily_tasks', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  weeklyTaskId: varchar('weekly_task_id'),
  person: varchar('person').notNull(),
  date: date('date').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  estimatedMinutes: integer('estimated_minutes'),
  actualMinutes: integer('actual_minutes'),
  energyLevel: integer('energy_level'),
  priority: integer('priority').default(2),
  status: varchar('status', { length: 20 }).default('assigned').notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// COMMUNICATION & NOTIFICATIONS
// ===============================

export const eosEmails = pgTable('eos_emails', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  type: varchar('type', { length: 50 }).notNull(),
  recipient: varchar('recipient').notNull(),
  subject: text('subject').notNull(),
  templateUsed: varchar('template_used', { length: 50 }),
  sent: boolean('sent').default(false),
  sentAt: timestamp('sent_at', { withTimezone: true }),
  relatedEntityType: varchar('related_entity_type', { length: 50 }),
  relatedEntityId: varchar('related_entity_id'),
  metadata: json('metadata').$type<Record<string, any>>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ===============================
// VALIDATION SCHEMAS
// ===============================

export const insertVisionSchema = createInsertSchema(vision);
export const insertSeatSchema = createInsertSchema(seats);
export const insertPersonalScorecardSchema = createInsertSchema(personalScorecards);
export const insertScorecardMetricSchema = createInsertSchema(scorecardMetrics);
export const insertWeeklyScorecardSchema = createInsertSchema(weeklyScorecard);
export const insertIssueSchema = createInsertSchema(issues);
export const insertMeetingSchema = createInsertSchema(meetings);
export const insertTodoSchema = createInsertSchema(todos);
export const insertRockSchema = createInsertSchema(rocks);
export const insertMissionSchema = createInsertSchema(missions);
export const insertMissionUpdateSchema = createInsertSchema(missionUpdates);
export const insertMilestoneSchema = createInsertSchema(milestones);
export const insertPlayerProfileSchema = createInsertSchema(playerProfiles);
export const insertPersonalRewardSchema = createInsertSchema(personalRewards);
export const insertWeeklyTaskSchema = createInsertSchema(weeklyTasks);
export const insertDailyTaskSchema = createInsertSchema(dailyTasks);

// ===============================
// TYPE EXPORTS
// ===============================

export type Vision = typeof vision.$inferSelect;
export type InsertVision = typeof vision.$inferInsert;

export type Seat = typeof seats.$inferSelect;
export type InsertSeat = typeof seats.$inferInsert;

export type PersonalScorecard = typeof personalScorecards.$inferSelect;
export type InsertPersonalScorecard = typeof personalScorecards.$inferInsert;

export type ScorecardMetric = typeof scorecardMetrics.$inferSelect;
export type InsertScorecardMetric = typeof scorecardMetrics.$inferInsert;

export type WeeklyScorecard = typeof weeklyScorecard.$inferSelect;
export type InsertWeeklyScorecard = typeof weeklyScorecard.$inferInsert;

export type Issue = typeof issues.$inferSelect;
export type InsertIssue = typeof issues.$inferInsert;

export type Meeting = typeof meetings.$inferSelect;
export type InsertMeeting = typeof meetings.$inferInsert;

export type Todo = typeof todos.$inferSelect;
export type InsertTodo = typeof todos.$inferInsert;

export type Rock = typeof rocks.$inferSelect;
export type InsertRock = typeof rocks.$inferInsert;

export type RockUpdate = typeof rockUpdates.$inferSelect;
export type InsertRockUpdate = typeof rockUpdates.$inferInsert;

export type WeeklyTask = typeof weeklyTasks.$inferSelect;
export type InsertWeeklyTask = typeof weeklyTasks.$inferInsert;

export type DailyTask = typeof dailyTasks.$inferSelect;
export type InsertDailyTask = typeof dailyTasks.$inferInsert;

// Gamification Types
export type MissionTheme = typeof missionThemes.$inferSelect;
export type InsertMissionTheme = typeof missionThemes.$inferInsert;

export type PlayerProfile = typeof playerProfiles.$inferSelect;
export type InsertPlayerProfile = typeof playerProfiles.$inferInsert;

export type Mission = typeof missions.$inferSelect;
export type InsertMission = typeof missions.$inferInsert;

export type Milestone = typeof milestones.$inferSelect;
export type InsertMilestone = typeof milestones.$inferInsert;

export type MissionUpdate = typeof missionUpdates.$inferSelect;
export type InsertMissionUpdate = typeof missionUpdates.$inferInsert;

export type RewardType = typeof rewardTypes.$inferSelect;
export type InsertRewardType = typeof rewardTypes.$inferInsert;

export type PersonalReward = typeof personalRewards.$inferSelect;
export type InsertPersonalReward = typeof personalRewards.$inferInsert;

export type RewardRedemption = typeof rewardRedemptions.$inferSelect;
export type InsertRewardRedemption = typeof rewardRedemptions.$inferInsert;

export type AchievementType = typeof achievementTypes.$inferSelect;
export type InsertAchievementType = typeof achievementTypes.$inferInsert;

export type PlayerAchievement = typeof playerAchievements.$inferSelect;
export type InsertPlayerAchievement = typeof playerAchievements.$inferInsert;

export type TeamChallenge = typeof teamChallenges.$inferSelect;
export type InsertTeamChallenge = typeof teamChallenges.$inferInsert;

export type Leaderboard = typeof leaderboards.$inferSelect;
export type InsertLeaderboard = typeof leaderboards.$inferInsert;

export type EosEmail = typeof eosEmails.$inferSelect;
export type InsertEosEmail = typeof eosEmails.$inferInsert;

// ===============================
// GAMIFICATION INTERFACES
// ===============================

export interface MissionProgress {
  missionId: string;
  completionPercentage: number;
  milestonesCompleted: number;
  totalMilestones: number;
  pointsEarned: number;
  potentialPoints: number;
  daysRemaining: number;
  isOnTrack: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface PlayerStats {
  playerId: string;
  playerName: string;
  currentLevel: number;
  totalPoints: number;
  pointsToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  missionCompletionRate: number;
  averageQualityScore: number;
  rankThisQuarter: number;
  favoriteMissionTypes: string[];
  recentAchievements: PlayerAchievement[];
}

export interface RewardStoreItem {
  personalRewardId: string;
  rewardType: RewardType;
  pointsCost: number;
  customDescription?: string;
  isAffordable: boolean;
  quarterlyLimitReached: boolean;
  estimatedFulfillmentTime?: string;
}

export interface MissionDashboard {
  playerProfile: PlayerProfile;
  activeMissions: Mission[];
  missionProgress: MissionProgress[];
  availableRewards: RewardStoreItem[];
  recentAchievements: PlayerAchievement[];
  leaderboardPosition: number;
  teamChallenges: TeamChallenge[];
  upcomingMilestones: Milestone[];
}