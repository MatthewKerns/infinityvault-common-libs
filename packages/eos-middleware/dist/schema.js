import { pgTable, text, serial, integer, boolean, decimal, json, timestamp, varchar, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";
// ===============================
// EOS CHATBOT USER AUTHENTICATION
// ===============================
// EOS Chatbot users (separate from website users)
export const eosUsers = pgTable("eos_users", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    email: varchar("email").unique(),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
    isVerified: boolean("is_verified").default(false),
    verificationCode: varchar("verification_code"),
    verificationExpiry: timestamp("verification_expiry"),
    lastLoginAt: timestamp("last_login_at"),
    passwordHash: varchar("password_hash"),
    authProvider: varchar("auth_provider").default("email"), // 'email', 'google', 'sso'
    organizationRole: varchar("organization_role"), // 'owner', 'integrator', 'manager', 'employee'
    eosPermissions: json("eos_permissions").$type(), // ['view_rocks', 'edit_issues', 'admin']
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// EOS Chatbot authentication sessions
export const eosAuthSessions = pgTable("eos_auth_sessions", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id").notNull(),
    sessionToken: varchar("session_token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    ipAddress: varchar("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow(),
    rememberMeToken: varchar("remember_me_token"),
    rememberMeExpiresAt: timestamp("remember_me_expires_at"),
    updatedAt: timestamp("updated_at").defaultNow(),
    isActive: boolean("is_active").default(true),
});
// EOS Remember me tokens for secure persistent authentication
export const eosRememberMeTokens = pgTable("eos_remember_me_tokens", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id").notNull(),
    tokenHash: varchar("token_hash", { length: 64 }).notNull().unique(),
    series: varchar("series", { length: 32 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    lastUsedAt: timestamp("last_used_at").defaultNow(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    isActive: boolean("is_active").default(true),
});
// EOS Rate limiting for authentication security
export const eosAuthRateLimits = pgTable("eos_auth_rate_limits", {
    id: serial("id").primaryKey(),
    keyHash: varchar("key_hash", { length: 64 }).notNull().unique(),
    keyType: varchar("key_type", { length: 20 }).notNull(), // 'ip', 'user', 'email'
    action: varchar("action", { length: 50 }).notNull(), // 'auth_attempt', 'oauth_attempt', etc.
    attemptCount: integer("attempt_count").default(0),
    firstAttemptAt: timestamp("first_attempt_at").defaultNow(),
    lastAttemptAt: timestamp("last_attempt_at").defaultNow(),
    blockedUntil: timestamp("blocked_until"),
    windowStart: timestamp("window_start").defaultNow(),
    expiresAt: timestamp("expires_at").notNull(),
});
// EOS Authentication audit log for security monitoring
export const eosAuthAuditLog = pgTable("eos_auth_audit_log", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id"),
    action: varchar("action", { length: 50 }).notNull(),
    eventType: varchar("event_type", { length: 20 }).default("auth"), // 'auth', 'security'
    severity: varchar("severity", { length: 10 }).default("low"), // 'low', 'medium', 'high', 'critical'
    description: text("description"),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    success: boolean("success").notNull(),
    failureReason: text("failure_reason"),
    metadata: json("metadata").$type(),
    createdAt: timestamp("created_at").defaultNow(),
});
// EOS Express session store
export const eosSessions = pgTable("eos_sessions", {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
});
// ===============================
// EOS SYSTEM CHANGES
// ===============================
export const eosChanges = pgTable('eos_changes', {
    id: serial('id').primaryKey(),
    component: varchar('component', { length: 32 }).notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: varchar('status', { length: 32 }).notNull(),
    progress: integer('progress').default(0).notNull(),
    impactLevel: varchar('impact_level', { length: 16 }).notNull(),
    estimatedCompletion: varchar('estimated_completion', { length: 64 }),
    lastUpdated: timestamp('last_updated', { withTimezone: true }).defaultNow().notNull(),
    relatedTasks: json('related_tasks').$type(),
    metrics: json('metrics').$type(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
export const insertEosChangeSchema = createInsertSchema(eosChanges).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    lastUpdated: true,
});
// ===============================
// CHAT MESSAGES
// ===============================
export const chatMessages = pgTable('chat_messages', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    role: text('role').notNull(), // 'user' | 'assistant'
    content: text('content').notNull(),
    sessionId: text('session_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, createdAt: true });
// ===============================
// AGENT FEEDBACK SYSTEM
// ===============================
export const agentInteractions = pgTable('agent_interactions', {
    id: serial('id').primaryKey(),
    interactionId: varchar('interaction_id').default(sql `gen_random_uuid()`).notNull().unique(),
    sessionId: text('session_id').notNull(),
    userId: text('user_id'),
    userMessage: text('user_message').notNull(),
    agentResponse: text('agent_response').notNull(),
    responseTime: integer('response_time').notNull(),
    toolsUsed: json('tools_used').$type().default([]),
    contextType: text('context_type'),
    complexity: text('complexity').default('moderate'),
    errorOccurred: boolean('error_occurred').default(false),
    errorMessage: text('error_message'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
export const userFeedback = pgTable('user_feedback_chatbot', {
    id: serial('id').primaryKey(),
    feedbackId: varchar('feedback_id').default(sql `gen_random_uuid()`).notNull().unique(),
    interactionId: varchar('interaction_id').notNull(),
    sessionId: text('session_id').notNull(),
    userId: text('user_id'),
    feedbackType: text('feedback_type').notNull(),
    overallRating: integer('overall_rating'),
    helpfulnessRating: integer('helpfulness_rating'),
    accuracyRating: integer('accuracy_rating'),
    speedRating: integer('speed_rating'),
    feedbackCategories: json('feedback_categories').$type().default([]),
    comments: text('comments'),
    taskCompleted: boolean('task_completed'),
    retryRequired: boolean('retry_required').default(false),
    satisfactionInferred: decimal('satisfaction_inferred', { precision: 3, scale: 2 }),
    createdAt: timestamp('created_at').defaultNow(),
});
export const interactionMetrics = pgTable('interaction_metrics', {
    id: serial('id').primaryKey(),
    interactionId: varchar('interaction_id').notNull(),
    sessionId: text('session_id').notNull(),
    userId: text('user_id'),
    messageCount: integer('message_count').notNull().default(1),
    sessionDuration: integer('session_duration'),
    retryAttempts: integer('retry_attempts').default(0),
    abandonmentOccurred: boolean('abandonment_occurred').default(false),
    timeToResolution: integer('time_to_resolution'),
    userExpertiseLevel: text('user_expertise_level').default('intermediate'),
    timeOfDay: integer('time_of_day'),
    dayOfWeek: integer('day_of_week'),
    deviceType: text('device_type'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at').defaultNow(),
});
// ===============================
// PRODUCT PURCHASING QUIZ
// ===============================
export const quizSessions = pgTable('quiz_sessions', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    sessionId: varchar('session_id', { length: 50 }).unique().notNull(),
    userId: varchar('user_id'),
    category: varchar('category', { length: 20 }).notNull(),
    focus: varchar('focus', { length: 30 }).notNull(),
    subFocus: json('sub_focus').notNull(),
    userDream: text('user_dream').notNull(),
    startedAt: timestamp('started_at', { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    referrerUrl: text('referrer_url'),
});
export const quizLlmAnalysis = pgTable('quiz_llm_analysis', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    quizSessionId: varchar('quiz_session_id').references(() => quizSessions.id, { onDelete: 'cascade' }).notNull(),
    llmModel: varchar('llm_model', { length: 50 }).notNull(),
    processingTimestamp: timestamp('processing_timestamp', { withTimezone: true }).defaultNow().notNull(),
    enhancedProfile: json('enhanced_profile').notNull(),
    processingTimeMs: integer('processing_time_ms'),
    tokenUsage: integer('token_usage'),
    processingCost: decimal('processing_cost', { precision: 8, scale: 4 }),
    success: boolean('success').default(true).notNull(),
    errorMessage: text('error_message'),
});
export const quizRecommendations = pgTable('quiz_recommendations', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    quizSessionId: varchar('quiz_session_id').references(() => quizSessions.id, { onDelete: 'cascade' }).notNull(),
    productAsin: varchar('product_asin', { length: 20 }).notNull(),
    recommendationRank: integer('recommendation_rank').notNull(),
    recommendationScore: decimal('recommendation_score', { precision: 4, scale: 3 }),
    reasoning: text('reasoning').notNull(),
    attributionLink: text('attribution_link').notNull(),
    pricingInfo: json('pricing_info'),
    generatedAt: timestamp('generated_at', { withTimezone: true }).defaultNow().notNull(),
});
export const quizConversions = pgTable('quiz_conversions', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    quizSessionId: varchar('quiz_session_id').references(() => quizSessions.id),
    recommendationId: varchar('recommendation_id').references(() => quizRecommendations.id),
    userId: varchar('user_id'),
    conversionType: varchar('conversion_type', { length: 20 }).notNull(),
    conversionValue: decimal('conversion_value', { precision: 10, scale: 2 }),
    occurredAt: timestamp('occurred_at', { withTimezone: true }).defaultNow().notNull(),
    attributionData: json('attribution_data'),
});
// ===============================
// BRAND ATTRIBUTION SYSTEM
// ===============================
export const brandAttributionCampaigns = pgTable('brand_attribution_campaigns', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    campaignName: varchar('campaign_name', { length: 200 }).notNull(),
    productAsin: varchar('product_asin', { length: 20 }).notNull(),
    promoType: varchar('promo_type', { length: 20 }).notNull(),
    promoId: varchar('promo_id', { length: 100 }),
    amazonPromoUrl: text('amazon_promo_url'),
    discountAmount: decimal('discount_amount', { precision: 8, scale: 2 }),
    discountType: varchar('discount_type', { length: 20 }),
    startDate: timestamp('start_date', { withTimezone: true }),
    endDate: timestamp('end_date', { withTimezone: true }),
    status: varchar('status', { length: 20 }).default('pending').notNull(),
    attributionTag: varchar('attribution_tag', { length: 100 }),
    finalBrandedUrl: text('final_branded_url'),
    qrCodeUrl: text('qr_code_url'),
    errorMessage: text('error_message'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
export const attributionPerformanceMetrics = pgTable('attribution_performance_metrics', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    campaignId: varchar('campaign_id').references(() => brandAttributionCampaigns.id, { onDelete: 'cascade' }).notNull(),
    impressions: integer('impressions').default(0),
    clicks: integer('clicks').default(0),
    conversions: integer('conversions').default(0),
    revenue: decimal('revenue', { precision: 12, scale: 2 }).default('0'),
    clickThroughRate: decimal('click_through_rate', { precision: 5, scale: 2 }),
    conversionRate: decimal('conversion_rate', { precision: 5, scale: 2 }),
    returnOnAdSpend: decimal('return_on_ad_spend', { precision: 8, scale: 2 }),
    reportDate: timestamp('report_date', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
export const qrCodeAssets = pgTable('qr_code_assets', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    campaignId: varchar('campaign_id').references(() => brandAttributionCampaigns.id, { onDelete: 'cascade' }).notNull(),
    standardUrl: text('standard_url'),
    highResUrl: text('high_res_url'),
    vectorUrl: text('vector_url'),
    printReadyUrl: text('print_ready_url'),
    generatedAt: timestamp('generated_at', { withTimezone: true }).defaultNow().notNull(),
});
export const googleSheetsSyncLog = pgTable('google_sheets_sync_log', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    campaignId: varchar('campaign_id').references(() => brandAttributionCampaigns.id),
    syncType: varchar('sync_type', { length: 50 }).notNull(),
    sheetRowIndex: integer('sheet_row_index'),
    success: boolean('success').notNull(),
    errorMessage: text('error_message'),
    syncedAt: timestamp('synced_at', { withTimezone: true }).defaultNow().notNull(),
});
// ===============================
// FINANCIAL ANALYTICS
// ===============================
export const customerPurchases = pgTable('customer_purchases', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    customerId: varchar('customer_id').notNull(),
    orderId: varchar('order_id', { length: 100 }).notNull(),
    orderDate: timestamp('order_date', { withTimezone: true }).notNull(),
    platform: varchar('platform', { length: 50 }).notNull(),
    grossAmount: decimal('gross_amount', { precision: 12, scale: 2 }).notNull(),
    netAmount: decimal('net_amount', { precision: 12, scale: 2 }).notNull(),
    taxes: decimal('taxes', { precision: 10, scale: 2 }).default('0'),
    shipping: decimal('shipping', { precision: 8, scale: 2 }).default('0'),
    discounts: decimal('discounts', { precision: 8, scale: 2 }).default('0'),
    items: json('items').$type().notNull(),
    status: varchar('status', { length: 20 }).default('completed').notNull(),
    acquisitionChannel: varchar('acquisition_channel', { length: 100 }),
    campaignId: varchar('campaign_id', { length: 100 }),
    attributionData: json('attribution_data'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
export const customerLtvCalculations = pgTable('customer_ltv_calculations', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    customerId: varchar('customer_id').notNull(),
    calculationMethod: varchar('calculation_method', { length: 20 }).notNull(),
    calculationDate: timestamp('calculation_date', { withTimezone: true }).notNull(),
    ltvValue: decimal('ltv_value', { precision: 10, scale: 2 }).notNull(),
    totalRevenue: decimal('total_revenue', { precision: 10, scale: 2 }),
    grossMargin: decimal('gross_margin', { precision: 10, scale: 2 }),
    orderCount: integer('order_count'),
    averageOrderValue: decimal('average_order_value', { precision: 8, scale: 2 }),
    customerLifespanDays: integer('customer_lifespan_days'),
    predictedLifespanMonths: decimal('predicted_lifespan_months', { precision: 4, scale: 1 }),
    predictedMonthlyValue: decimal('predicted_monthly_value', { precision: 8, scale: 2 }),
    churnProbability: decimal('churn_probability', { precision: 4, scale: 3 }),
    predictionConfidence: decimal('prediction_confidence', { precision: 4, scale: 3 }),
    customerFeatures: json('customer_features'),
    cohortData: json('cohort_data'),
    calculationNotes: text('calculation_notes'),
    recalculationTriggeredBy: varchar('recalculation_triggered_by', { length: 100 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
export const customerCohorts = pgTable('customer_cohorts', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    cohortMonth: timestamp('cohort_month', { withTimezone: true }).notNull(),
    acquisitionChannel: varchar('acquisition_channel', { length: 100 }),
    customerSegment: varchar('customer_segment', { length: 50 }),
    month0Customers: integer('month_0_customers'),
    month1Customers: integer('month_1_customers'),
    month3Customers: integer('month_3_customers'),
    month6Customers: integer('month_6_customers'),
    month12Customers: integer('month_12_customers'),
    month0Revenue: decimal('month_0_revenue', { precision: 10, scale: 2 }),
    month1Revenue: decimal('month_1_revenue', { precision: 10, scale: 2 }),
    month3Revenue: decimal('month_3_revenue', { precision: 10, scale: 2 }),
    month6Revenue: decimal('month_6_revenue', { precision: 10, scale: 2 }),
    month12Revenue: decimal('month_12_revenue', { precision: 10, scale: 2 }),
    cohortLtv: decimal('cohort_ltv', { precision: 10, scale: 2 }),
    cohortPaybackPeriodMonths: decimal('cohort_payback_period_months', { precision: 4, scale: 1 }),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
export const advertisingSpend = pgTable('advertising_spend', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    channel: varchar('channel', { length: 50 }).notNull(),
    campaignType: varchar('campaign_type', { length: 100 }),
    campaignId: varchar('campaign_id', { length: 200 }),
    campaignName: varchar('campaign_name', { length: 300 }),
    spendDate: timestamp('spend_date', { withTimezone: true }).notNull(),
    dailySpend: decimal('daily_spend', { precision: 10, scale: 2 }).notNull(),
    impressions: integer('impressions'),
    clicks: integer('clicks'),
    conversions: integer('conversions'),
    attributedRevenue: decimal('attributed_revenue', { precision: 10, scale: 2 }),
    newCustomersAttributed: integer('new_customers_attributed').default(0),
    attributionConfidence: decimal('attribution_confidence', { precision: 4, scale: 3 }),
    attributionModel: varchar('attribution_model', { length: 50 }),
    importedAt: timestamp('imported_at', { withTimezone: true }).defaultNow().notNull(),
    dataSource: varchar('data_source', { length: 100 }),
    rawData: json('raw_data'),
});
export const cacCalculations = pgTable('cac_calculations', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    calculationPeriodStart: timestamp('calculation_period_start', { withTimezone: true }).notNull(),
    calculationPeriodEnd: timestamp('calculation_period_end', { withTimezone: true }).notNull(),
    calculationMethod: varchar('calculation_method', { length: 20 }).notNull(),
    totalAdSpend: decimal('total_ad_spend', { precision: 12, scale: 2 }),
    totalAdditionalCosts: decimal('total_additional_costs', { precision: 10, scale: 2 }),
    totalNewCustomers: integer('total_new_customers'),
    blendedCac: decimal('blended_cac', { precision: 8, scale: 2 }),
    channelBreakdown: json('channel_breakdown'),
    teamCosts: decimal('team_costs', { precision: 8, scale: 2 }),
    toolCosts: decimal('tool_costs', { precision: 8, scale: 2 }),
    attributionCosts: decimal('attribution_costs', { precision: 8, scale: 2 }),
    otherCosts: decimal('other_costs', { precision: 8, scale: 2 }),
    bestPerformingChannel: varchar('best_performing_channel', { length: 50 }),
    worstPerformingChannel: varchar('worst_performing_channel', { length: 50 }),
    efficiencyTrends: json('efficiency_trends'),
    calculatedAt: timestamp('calculated_at', { withTimezone: true }).defaultNow().notNull(),
});
export const customerAcquisitionAttribution = pgTable('customer_acquisition_attribution', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    customerId: varchar('customer_id').notNull(),
    acquisitionChannel: varchar('acquisition_channel', { length: 50 }),
    acquisitionCampaign: varchar('acquisition_campaign', { length: 200 }),
    acquisitionDate: timestamp('acquisition_date', { withTimezone: true }),
    touchPoints: json('touch_points'),
    attributionModel: varchar('attribution_model', { length: 50 }),
    primaryAttributionWeight: decimal('primary_attribution_weight', { precision: 4, scale: 3 }),
    attributedSpend: decimal('attributed_spend', { precision: 8, scale: 2 }),
    fullyLoadedAcquisitionCost: decimal('fully_loaded_acquisition_cost', { precision: 8, scale: 2 }),
    attributionConfidence: decimal('attribution_confidence', { precision: 4, scale: 3 }),
    verificationMethod: varchar('verification_method', { length: 100 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
export const monthlyProfitLoss = pgTable('monthly_profit_loss', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    statementYear: integer('statement_year').notNull(),
    statementMonth: integer('statement_month').notNull(),
    amazonGrossSales: decimal('amazon_gross_sales', { precision: 12, scale: 2 }),
    amazonReturns: decimal('amazon_returns', { precision: 10, scale: 2 }),
    amazonNetSales: decimal('amazon_net_sales', { precision: 12, scale: 2 }),
    brandAttributionRefunds: decimal('brand_attribution_refunds', { precision: 8, scale: 2 }),
    directWebsiteSales: decimal('direct_website_sales', { precision: 10, scale: 2 }),
    otherDirectSales: decimal('other_direct_sales', { precision: 8, scale: 2 }),
    vipSubscriptionRevenue: decimal('vip_subscription_revenue', { precision: 8, scale: 2 }),
    otherSubscriptionRevenue: decimal('other_subscription_revenue', { precision: 8, scale: 2 }),
    totalRevenue: decimal('total_revenue', { precision: 12, scale: 2 }),
    manufacturingCosts: decimal('manufacturing_costs', { precision: 10, scale: 2 }),
    transportationCosts: decimal('transportation_costs', { precision: 8, scale: 2 }),
    landedCosts: decimal('landed_costs', { precision: 10, scale: 2 }),
    totalCogs: decimal('total_cogs', { precision: 10, scale: 2 }),
    amazonReferralFees: decimal('amazon_referral_fees', { precision: 8, scale: 2 }),
    amazonFbaFees: decimal('amazon_fba_fees', { precision: 8, scale: 2 }),
    amazonStorageFees: decimal('amazon_storage_fees', { precision: 6, scale: 2 }),
    amazonAdvertisingFees: decimal('amazon_advertising_fees', { precision: 8, scale: 2 }),
    otherAmazonFees: decimal('other_amazon_fees', { precision: 6, scale: 2 }),
    totalAmazonCosts: decimal('total_amazon_costs', { precision: 10, scale: 2 }),
    metaAdSpend: decimal('meta_ad_spend', { precision: 8, scale: 2 }),
    googleAdSpend: decimal('google_ad_spend', { precision: 8, scale: 2 }),
    tiktokAdSpend: decimal('tiktok_ad_spend', { precision: 8, scale: 2 }),
    otherPlatformSpend: decimal('other_platform_spend', { precision: 6, scale: 2 }),
    creativeProductionCosts: decimal('creative_production_costs', { precision: 6, scale: 2 }),
    marketingToolCosts: decimal('marketing_tool_costs', { precision: 4, scale: 2 }),
    totalMarketingCosts: decimal('total_marketing_costs', { precision: 10, scale: 2 }),
    softwareSubscriptions: decimal('software_subscriptions', { precision: 6, scale: 2 }),
    teamCosts: decimal('team_costs', { precision: 10, scale: 2 }),
    professionalServices: decimal('professional_services', { precision: 6, scale: 2 }),
    officeExpenses: decimal('office_expenses', { precision: 4, scale: 2 }),
    otherOperatingExpenses: decimal('other_operating_expenses', { precision: 6, scale: 2 }),
    totalOperatingExpenses: decimal('total_operating_expenses', { precision: 12, scale: 2 }),
    grossProfit: decimal('gross_profit', { precision: 12, scale: 2 }),
    operatingProfit: decimal('operating_profit', { precision: 12, scale: 2 }),
    netProfit: decimal('net_profit', { precision: 12, scale: 2 }),
    grossMargin: decimal('gross_margin', { precision: 6, scale: 4 }),
    operatingMargin: decimal('operating_margin', { precision: 6, scale: 4 }),
    netMargin: decimal('net_margin', { precision: 6, scale: 4 }),
    amazonFeeRatio: decimal('amazon_fee_ratio', { precision: 6, scale: 4 }),
    marketingEfficiency: decimal('marketing_efficiency', { precision: 6, scale: 3 }),
    cacLtvRatio: decimal('cac_ltv_ratio', { precision: 6, scale: 4 }),
    generatedAt: timestamp('generated_at', { withTimezone: true }).defaultNow().notNull(),
    generatedBy: varchar('generated_by', { length: 100 }),
    dataSourcesUsed: json('data_sources_used'),
    calculationNotes: text('calculation_notes'),
}, (table) => ({
    uniquePeriod: unique().on(table.statementYear, table.statementMonth),
}));
export const productCogs = pgTable('product_cogs', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    sku: varchar('sku', { length: 100 }).notNull(),
    productName: varchar('product_name', { length: 300 }),
    manufacturingCost: decimal('manufacturing_cost', { precision: 8, scale: 4 }).notNull(),
    transportationCost: decimal('transportation_cost', { precision: 6, scale: 4 }),
    landedCost: decimal('landed_cost', { precision: 8, scale: 4 }).notNull(),
    supplier: varchar('supplier', { length: 200 }),
    costCurrency: varchar('cost_currency', { length: 3 }).default('USD'),
    exchangeRate: decimal('exchange_rate', { precision: 8, scale: 6 }).default('1.0'),
    effectiveFrom: timestamp('effective_from', { withTimezone: true }).notNull(),
    effectiveTo: timestamp('effective_to', { withTimezone: true }),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
export const ltvCalculationTriggers = pgTable('ltv_calculation_triggers', {
    id: varchar('id').primaryKey().default(sql `gen_random_uuid()`),
    customerId: varchar('customer_id'),
    triggerEvent: varchar('trigger_event', { length: 100 }).notNull(),
    triggerData: json('trigger_data'),
    processed: boolean('processed').default(false),
    processingStartedAt: timestamp('processing_started_at', { withTimezone: true }),
    processingCompletedAt: timestamp('processing_completed_at', { withTimezone: true }),
    processingError: text('processing_error'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
// ===============================
// VALIDATION SCHEMAS
// ===============================
export const quizSessionSchema = createInsertSchema(quizSessions);
export const quizLlmAnalysisSchema = createInsertSchema(quizLlmAnalysis);
export const quizRecommendationSchema = createInsertSchema(quizRecommendations);
export const quizConversionSchema = createInsertSchema(quizConversions);
export const brandAttributionCampaignSchema = createInsertSchema(brandAttributionCampaigns, {
    campaignName: z.string().min(1).max(200),
    productAsin: z.string().min(1).max(20),
    promoType: z.enum(['social_promo', 'coupon']),
    discountType: z.enum(['percentage', 'dollar']).optional(),
    status: z.enum(['pending', 'active', 'expired', 'error']),
});
export const agentInteractionSchema = createInsertSchema(agentInteractions).omit({
    id: true,
    interactionId: true,
    createdAt: true,
    updatedAt: true,
});
export const userFeedbackChatbotSchema = createInsertSchema(userFeedback).omit({
    id: true,
    feedbackId: true,
    createdAt: true,
});
export const interactionMetricsSchema = createInsertSchema(interactionMetrics).omit({
    id: true,
    createdAt: true,
});
// ===============================
// EOS CORE BUSINESS COMPONENTS
// ===============================
// EOS Rocks (Quarterly Goals)
export const eosRocks = pgTable("eos_rocks", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    owner: varchar("owner", { length: 100 }),
    quarter: varchar("quarter", { length: 10 }).notNull(), // "Q1 2024"
    dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
    progress: integer("progress").default(0).notNull(), // 0-100
    status: varchar("status", { length: 20 }).default("not_started").notNull(), // not_started, in_progress, at_risk, completed
    userId: varchar("user_id").references(() => eosUsers.id, { onDelete: 'cascade' }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
// EOS Issues (Problems to solve)
export const eosIssues = pgTable("eos_issues", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description").notNull(),
    owner: varchar("owner", { length: 100 }),
    priority: varchar("priority", { length: 20 }).default("medium").notNull(), // low, medium, high, urgent
    status: varchar("status", { length: 20 }).default("open").notNull(), // open, in_progress, resolved, closed
    dueDate: timestamp("due_date", { withTimezone: true }),
    resolution: text("resolution"),
    userId: varchar("user_id").references(() => eosUsers.id, { onDelete: 'cascade' }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
// EOS Scorecard Metrics (KPIs)
export const eosScorecardMetrics = pgTable("eos_scorecard_metrics", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    metricName: varchar("metric_name", { length: 100 }).notNull(),
    targetValue: decimal("target_value", { precision: 12, scale: 2 }),
    actualValue: decimal("actual_value", { precision: 12, scale: 2 }),
    unit: varchar("unit", { length: 20 }), // $, %, count, etc.
    frequency: varchar("frequency", { length: 20 }).default("weekly").notNull(), // daily, weekly, monthly
    owner: varchar("owner", { length: 100 }),
    weekEnding: timestamp("week_ending", { withTimezone: true }),
    status: varchar("status", { length: 20 }).default("on_track").notNull(), // on_track, at_risk, off_track
    userId: varchar("user_id").references(() => eosUsers.id, { onDelete: 'cascade' }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
// ===============================
// EOS USER AUTHENTICATION TYPES
// ===============================
export const insertEosUserSchema = createInsertSchema(eosUsers);
export const upsertEosUserSchema = createInsertSchema(eosUsers).omit({
    createdAt: true,
    updatedAt: true,
});
// ===============================
// EOS CORE BUSINESS TYPES & SCHEMAS
// ===============================
export const insertEosRockSchema = createInsertSchema(eosRocks).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const updateEosRockSchema = createInsertSchema(eosRocks).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
}).partial();
export const insertEosIssueSchema = createInsertSchema(eosIssues).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const updateEosIssueSchema = createInsertSchema(eosIssues).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
}).partial();
export const insertEosScorecardMetricSchema = createInsertSchema(eosScorecardMetrics).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const updateEosScorecardMetricSchema = createInsertSchema(eosScorecardMetrics).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
}).partial();
//# sourceMappingURL=schema.js.map