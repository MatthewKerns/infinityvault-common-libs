import { pgTable, text, serial, integer, boolean, decimal, json, timestamp, varchar, primaryKey, real, unique, pgSchema } from "drizzle-orm/pg-core";
// Define brandwebsite schema
export const brandwebsiteSchema = pgSchema('brandwebsite');
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";
// ===============================
// CORE PRODUCT TABLES
// ===============================
export const products = brandwebsiteSchema.table("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
    category: text("category").notNull(),
    features: json("features").$type().notNull(),
    specifications: json("specifications").$type().notNull(),
    isActive: boolean("is_active").notNull().default(true),
});
export const colorVariants = brandwebsiteSchema.table("color_variants", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    colorName: text("color_name").notNull(),
    colorCode: text("color_code").notNull(),
    imageUrl: text("image_url").notNull(),
    secondaryImageUrl: text("secondary_image_url"),
    inStock: boolean("in_stock").notNull().default(true),
    stockCount: integer("stock_count").notNull().default(0),
});
export const cartItems = pgTable("cart_items", {
    id: serial("id").primaryKey(),
    sessionId: text("session_id").notNull(),
    productId: integer("product_id").notNull(),
    colorVariantId: integer("color_variant_id").notNull(),
    quantity: integer("quantity").notNull().default(1),
});
// ===============================
// USER MANAGEMENT
// ===============================
// User table for authentication
export const users = brandwebsiteSchema.table("users", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    email: varchar("email").unique(),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
    isVerified: boolean("is_verified").default(false),
    verificationCode: varchar("verification_code"), // Optional - only for email/SMS verification
    verificationExpiry: timestamp("verification_expiry"), // Optional - only for email/SMS verification
    lastLoginAt: timestamp("last_login_at"),
    phoneVerified: boolean("phone_verified").default(false),
    phoneNumber: varchar("phone_number"),
    marketingConsent: boolean("marketing_consent").default(false),
    lastClaimAt: timestamp("last_claim_at"),
    totalClaims: integer("total_claims").default(0),
    passwordHash: varchar("password_hash"),
    birthday: varchar("birthday"),
    authProvider: varchar("auth_provider").default("email"),
    role: varchar("role", { length: 20 }).default("customer"),
    // New multi-auth fields
    smsVerificationRequired: boolean("sms_verification_required").default(true),
    orderIdVerified: boolean("order_id_verified").default(false),
    verificationBypassReason: varchar("verification_bypass_reason", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// Federated authentication identities  
export const federatedIdentities = pgTable("federated_identities", {
    id: varchar("id").default(sql `gen_random_uuid()`),
    userId: varchar("user_id").notNull(),
    provider: varchar("provider").notNull(),
    providerUserId: varchar("provider_user_id").notNull(),
    emailAtIdP: varchar("email_at_idp"),
    emailVerified: boolean("email_verified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
    uniqueProviderUser: primaryKey({ columns: [table.provider, table.providerUserId] }),
}));
// Authentication sessions
export const authSessions = brandwebsiteSchema.table("auth_sessions", {
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
// Remember me tokens for secure persistent authentication
export const rememberMeTokens = brandwebsiteSchema.table("remember_me_tokens", {
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
// Rate limiting for authentication security
export const authRateLimits = brandwebsiteSchema.table("auth_rate_limits", {
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
// Authentication audit log for security monitoring
export const authAuditLog = brandwebsiteSchema.table("auth_audit_log", {
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
// User authentication methods (multi-auth support)
export const userAuthMethods = pgTable("user_auth_methods", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    authType: varchar("auth_type", { length: 20 }).notNull(),
    identifier: varchar("identifier", { length: 255 }).notNull(),
    isVerified: boolean("is_verified").default(false),
    isPrimary: boolean("is_primary").default(false),
    verificationToken: varchar("verification_token"),
    verificationExpiresAt: timestamp("verification_expires_at"),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
    uniqueAuthMethod: unique().on(table.authType, table.identifier),
}));
// Account linking requests
export const accountLinkingRequests = pgTable("account_linking_requests", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    primaryUserId: varchar("primary_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    secondaryUserId: varchar("secondary_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    authMethod: varchar("auth_method", { length: 20 }).notNull(),
    verificationToken: varchar("verification_token", { length: 255 }).notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    status: varchar("status", { length: 20 }).default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    resolvedAt: timestamp("resolved_at"),
    resolutionDetails: text("resolution_details"),
});
// Order ID verifications
export const orderIdVerifications = pgTable("order_id_verifications", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    orderId: varchar("order_id", { length: 100 }).notNull().unique(),
    userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
    verifiedAt: timestamp("verified_at"),
    verificationSource: varchar("verification_source", { length: 50 }).default("manual"),
    isUsed: boolean("is_used").default(false),
    usedAt: timestamp("used_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// SMS verification codes
export const smsVerificationCodes = pgTable("sms_verification_codes", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
    userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
    verificationCode: varchar("verification_code", { length: 10 }).notNull(),
    purpose: varchar("purpose", { length: 30 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    attempts: integer("attempts").default(0),
    maxAttempts: integer("max_attempts").default(5),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp("created_at").defaultNow(),
});
// Multi-auth audit log
export const multiAuthAuditLog = pgTable("multi_auth_audit_log", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
    action: varchar("action", { length: 50 }).notNull(),
    authMethod: varchar("auth_method", { length: 20 }),
    identifier: varchar("identifier", { length: 255 }),
    ipAddress: varchar("ip_address"),
    userAgent: text("user_agent"),
    success: boolean("success").notNull(),
    failureReason: text("failure_reason"),
    metadata: json("metadata").$type(),
    createdAt: timestamp("created_at").defaultNow(),
});
// ===============================
// EXPERIMENTAL PRODUCTS
// ===============================
export const experimentalProducts = pgTable("experimental_products", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    category: text("category").notNull(),
    estimatedPrice: decimal("estimated_price", { precision: 10, scale: 2 }),
    features: json("features").$type().notNull(),
    voteCount: integer("vote_count").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow(),
});
export const experimentalProductVotes = pgTable("experimental_product_votes", {
    userId: varchar("user_id").notNull(),
    experimentalProductId: integer("experimental_product_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
    pk: primaryKey({ columns: [table.userId, table.experimentalProductId] }),
}));
// ===============================
// PROMOTIONAL SYSTEM
// ===============================
export const promoDraws = pgTable("promo_draws", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    campaignKey: varchar("campaign_key").notNull(),
    prize: varchar("prize").notNull(),
    weightAtDraw: real("weight_at_draw").notNull(),
    ipHash: varchar("ip_hash"),
    deviceHash: varchar("device_hash"),
    createdAt: timestamp("created_at").defaultNow(),
});
export const promoClaims = pgTable("promo_claims", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    drawId: varchar("draw_id").unique().references(() => promoDraws.id),
    userId: varchar("user_id").references(() => users.id),
    email: varchar("email").notNull(),
    orderId: varchar("order_id").notNull(),
    emailVerified: boolean("email_verified").default(false),
    verifiedAt: timestamp("verified_at"),
    codeId: varchar("code_id").unique(),
    codeRevealedAt: timestamp("code_revealed_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
export const promoCodes = pgTable("promo_codes", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    campaignKey: varchar("campaign_key").notNull(),
    prize: varchar("prize").notNull(),
    code: varchar("code").unique().notNull(),
    consumed: boolean("consumed").default(false),
    consumedAt: timestamp("consumed_at"),
    claimId: varchar("claim_id").unique(),
});
// Campaigns table for promotional campaigns
export const campaigns = pgTable("campaigns", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: varchar("name", { length: 200 }).notNull(),
    description: text("description"),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    maxAttempts: integer("max_attempts").default(1).notNull(),
    dailyLimit: integer("daily_limit"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
// Prizes table for scratch & win prizes
export const prizes = pgTable("prizes", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: varchar("name", { length: 200 }).notNull(),
    description: text("description"),
    value: varchar("value", { length: 50 }),
    imageUrl: varchar("image_url", { length: 500 }),
    probability: integer("probability").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
// Game attempts table for tracking user attempts
export const gameAttempts = pgTable("game_attempts", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id").notNull(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    won: boolean("won").notNull(),
    prizeId: varchar("prize_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
// User prizes table for tracking user prize wins
export const userPrizes = pgTable("user_prizes", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id").notNull(),
    prizeId: varchar("prize_id").notNull(),
    promoCode: varchar("promo_code", { length: 50 }).unique(),
    isRedeemed: boolean("is_redeemed").default(false).notNull(),
    redeemedAt: timestamp("redeemed_at"),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
// ===============================
// ORDER VERIFICATION SYSTEM
// ===============================
// Manual order verification tickets (MVP)
export const verificationTickets = brandwebsiteSchema.table("verification_tickets", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id"), // nullable for guest submissions
    email: varchar("email").notNull(),
    orderId: varchar("order_id").notNull(),
    orderDate: timestamp("order_date").notNull(),
    phoneLast4: varchar("phone_last_4", { length: 4 }),
    status: varchar("status", { length: 20 }).notNull().default("PENDING"), // PENDING | APPROVED | DENIED | INFO_NEEDED
    pointsAwarded: integer("points_awarded"),
    promoSource: varchar("promo_source"),
    cooldownCodeId: varchar("cooldown_code_id"), // for reuse tracking
    reviewedBy: varchar("reviewed_by"), // admin user ID
    notesInternal: text("notes_internal"),
    attachmentUrls: json("attachment_urls").$type(),
    consentGiven: boolean("consent_given").notNull().default(false),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    uniqueOrderId: unique().on(table.orderId), // one claim per order ID
    emailStatusIdx: unique().on(table.email, table.status),
}));
// Audit log for verification events
export const verificationEvents = brandwebsiteSchema.table("verification_events", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    ticketId: varchar("ticket_id").notNull(),
    eventType: varchar("event_type", { length: 30 }).notNull(), // SUBMITTED | APPROVED | DENIED | INFO_REQUESTED | USER_REPLIED | POINTS_CREDITED
    eventMeta: json("event_meta").$type(),
    performedBy: varchar("performed_by"), // user ID of who performed action
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
// Discount code usage tracking for cooldown enforcement
export const discountCodeUsage = brandwebsiteSchema.table("discount_code_usage", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    email: varchar("email").notNull(),
    discountCodeId: varchar("discount_code_id").notNull(),
    lastUsedAt: timestamp("last_used_at").defaultNow().notNull(),
    deviceFingerprint: varchar("device_fingerprint", { length: 64 }),
}, (table) => ({
    emailCodeIdx: unique().on(table.email, table.discountCodeId),
}));
// ===============================
// SCRATCH & WIN AUTHENTICATION
// ===============================
export const scratchWinParticipations = pgTable('scratch_win_participations', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id').notNull(),
    participatedAt: timestamp('participated_at', { withTimezone: true }).defaultNow().notNull(),
    nextEligibleAt: timestamp('next_eligible_at', { withTimezone: true }).notNull(),
    prizeType: varchar('prize_type', { length: 20 }).notNull(),
    discountCode: varchar('discount_code', { length: 50 }),
    prizeClaimed: boolean('prize_claimed').default(false).notNull(),
    prizeClaimedAt: timestamp('prize_claimed_at', { withTimezone: true }),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    deviceFingerprint: varchar('device_fingerprint', { length: 64 }),
    sessionId: varchar('session_id', { length: 255 }),
    currentStep: varchar('current_step', { length: 50 }).default('wheel_spin'),
    stepData: json('step_data').$type().default({}),
    manualApprovalStatus: varchar('manual_approval_status', { length: 20 }),
    manualApprovalAt: timestamp('manual_approval_at', { withTimezone: true }),
    manualApprovalBy: varchar('manual_approval_by', { length: 255 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    accountEligibilityIdx: unique().on(table.userId, table.nextEligibleAt),
}));
export const accountCreationIncentives = pgTable('account_creation_incentives', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id').notNull(),
    incentiveType: varchar('incentive_type', { length: 20 }).default('signup_10_percent').notNull(),
    discountCode: varchar('discount_code', { length: 50 }).notNull(),
    claimed: boolean('claimed').default(false).notNull(),
    claimedAt: timestamp('claimed_at', { withTimezone: true }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
export const userMarketingPreferences = pgTable('user_marketing_preferences', {
    userId: varchar('user_id').primaryKey(),
    emailOptIn: boolean('email_opt_in').default(false).notNull(),
    smsOptIn: boolean('sms_opt_in').default(false).notNull(),
    vipClubMember: boolean('vip_club_member').default(false).notNull(),
    vipNotifications: boolean('vip_notifications').default(false).notNull(),
    productPreviews: boolean('product_previews').default(false).notNull(),
    productVoting: boolean('product_voting').default(false).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
// ===============================
// USER ANALYTICS
// ===============================
// Express session table (required by connect-pg-simple)
export const sessions = pgTable("sessions", {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
});
// User achievements and milestones
export const userAchievements = pgTable("user_achievements", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    achievementType: text("achievement_type").notNull(),
    achievementLevel: integer("achievement_level").notNull().default(1),
    unlockedAt: timestamp("unlocked_at").defaultNow(),
    metadata: json("metadata").$type(),
});
// User purchase history for tracking milestones
export const userPurchases = pgTable("user_purchases", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    productId: integer("product_id").notNull(),
    colorVariantId: integer("color_variant_id").notNull(),
    quantity: integer("quantity").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    purchaseDate: timestamp("purchase_date").defaultNow(),
});
// User reward points
export const userRewards = pgTable("user_rewards", {
    userId: varchar("user_id").primaryKey(),
    totalPoints: integer("total_points").notNull().default(0),
    currentPoints: integer("current_points").notNull().default(0),
    totalSpent: decimal("total_spent", { precision: 10, scale: 2 }).notNull().default("0.00"),
    totalPurchases: integer("total_purchases").notNull().default(0),
    totalItems: integer("total_items").notNull().default(0),
    memberSince: timestamp("member_since").defaultNow(),
    lastActivity: timestamp("last_activity").defaultNow(),
});
// Page view tracking
export const userPageViews = pgTable("user_page_views", {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id").notNull(),
    userId: varchar("user_id"),
    path: text("path").notNull(),
    title: text("title"),
    referrer: text("referrer"),
    viewedAt: timestamp("viewed_at").defaultNow(),
    timeOnPage: integer("time_on_page"),
    exitPage: boolean("exit_page").default(false),
});
// User interaction events
export const userEvents = pgTable("user_events", {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id").notNull(),
    userId: varchar("user_id"),
    eventType: varchar("event_type").notNull(),
    element: varchar("element"),
    elementText: text("element_text"),
    page: text("page").notNull(),
    metadata: json("metadata").$type(),
    createdAt: timestamp("created_at").defaultNow(),
});
// A/B test participation tracking
export const userAbTests = pgTable("user_ab_tests", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id"),
    sessionId: varchar("session_id").notNull(),
    testName: varchar("test_name").notNull(),
    variant: varchar("variant").notNull(),
    assignedAt: timestamp("assigned_at").defaultNow(),
    convertedAt: timestamp("converted_at"),
    conversionType: varchar("conversion_type"),
    conversionValue: decimal("conversion_value", { precision: 10, scale: 2 }),
});
// Cart abandonment tracking
export const userCartAbandonment = pgTable("user_cart_abandonment", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id"),
    sessionId: varchar("session_id").notNull(),
    cartValue: decimal("cart_value", { precision: 10, scale: 2 }).notNull(),
    itemCount: integer("item_count").notNull(),
    products: json("products").$type(),
    abandonedAt: timestamp("abandoned_at").defaultNow(),
    recoveredAt: timestamp("recovered_at"),
    recoveryMethod: varchar("recovery_method"),
});
// User preferences
export const userPreferences = pgTable("user_preferences", {
    userId: varchar("user_id").primaryKey(),
    emailMarketing: boolean("email_marketing").default(true),
    smsMarketing: boolean("sms_marketing").default(false),
    pushNotifications: boolean("push_notifications").default(true),
    currency: varchar("currency").default("USD"),
    language: varchar("language").default("en"),
    timezone: varchar("timezone"),
    favoriteCategories: json("favorite_categories").$type(),
    priceAlerts: json("price_alerts").$type(),
    wishlist: json("wishlist").$type(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// Email marketing interactions
export const userEmailInteractions = pgTable("user_email_interactions", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    email: varchar("email").notNull(),
    campaignId: varchar("campaign_id"),
    campaignName: varchar("campaign_name"),
    subject: text("subject"),
    eventType: varchar("event_type").notNull(),
    clickedUrl: text("clicked_url"),
    ipAddress: varchar("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow(),
});
// Customer support interactions
export const userSupportTickets = pgTable("user_support_tickets", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    email: varchar("email").notNull(),
    subject: text("subject").notNull(),
    category: varchar("category"),
    priority: varchar("priority").default("medium"),
    status: varchar("status").default("open"),
    description: text("description").notNull(),
    resolution: text("resolution"),
    assignedTo: varchar("assigned_to"),
    resolvedAt: timestamp("resolved_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// Customer feedback and reviews
export const userFeedback = pgTable("user_feedback", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    productId: integer("product_id"),
    orderReference: varchar("order_reference"),
    rating: integer("rating"),
    title: text("title"),
    comment: text("comment"),
    isVerifiedPurchase: boolean("is_verified_purchase").default(false),
    isPublic: boolean("is_public").default(true),
    helpfulVotes: integer("helpful_votes").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// ===============================
// MARKETING SPLIT TESTING SYSTEM
// ===============================
// Marketing tests configuration and management
export const marketingTests = brandwebsiteSchema.table("marketing_tests", {
    id: serial("id").primaryKey(),
    testName: varchar("test_name", { length: 255 }).notNull().unique(),
    testType: varchar("test_type", { length: 100 }).notNull(), // 'amazon_listing', 'video_ad', 'image_ad', 'email_marketing'
    vertical: varchar("vertical", { length: 100 }).notNull(), // 'main_image', 'a_plus_content', 'listing_video', etc.
    productIds: json("product_ids").$type(),
    variants: json("variants").notNull(),
    testConfig: json("test_config").notNull(),
    status: varchar("status", { length: 50 }).default("draft"), // 'draft', 'active', 'paused', 'completed', 'archived'
    trafficSplit: json("traffic_split").$type().notNull(), // e.g., [50, 50] for 50/50 split
    minimumSampleSize: integer("minimum_sample_size").default(1000),
    confidenceLevel: decimal("confidence_level", { precision: 3, scale: 2 }).default("0.95"),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    winnerVariant: varchar("winner_variant", { length: 100 }),
    createdBy: varchar("created_by", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// Test performance metrics tracking
export const testPerformance = brandwebsiteSchema.table("test_performance", {
    id: serial("id").primaryKey(),
    testId: integer("test_id").notNull().references(() => marketingTests.id, { onDelete: "cascade" }),
    variantId: varchar("variant_id", { length: 100 }).notNull(),
    metricName: varchar("metric_name", { length: 100 }).notNull(), // 'conversion_rate', 'click_through_rate', 'revenue', etc.
    metricValue: decimal("metric_value", { precision: 15, scale: 6 }).notNull(),
    sampleSize: integer("sample_size").default(0),
    measurementDate: timestamp("measurement_date").defaultNow(),
    metadata: json("metadata"),
});
// User variant assignments for tests
export const testAssignments = brandwebsiteSchema.table("test_assignments", {
    id: serial("id").primaryKey(),
    testId: integer("test_id").notNull().references(() => marketingTests.id, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 255 }),
    sessionId: varchar("session_id", { length: 255 }),
    variantId: varchar("variant_id", { length: 100 }).notNull(),
    assignedAt: timestamp("assigned_at").defaultNow(),
    convertedAt: timestamp("converted_at"),
    conversionType: varchar("conversion_type", { length: 100 }),
    conversionValue: decimal("conversion_value", { precision: 10, scale: 2 }),
});
// Platform deployment tracking
export const testDeployments = brandwebsiteSchema.table("test_deployments", {
    id: serial("id").primaryKey(),
    testId: integer("test_id").notNull().references(() => marketingTests.id, { onDelete: "cascade" }),
    variantId: varchar("variant_id", { length: 100 }).notNull(),
    platform: varchar("platform", { length: 100 }).notNull(), // 'amazon', 'tiktok', 'facebook', etc.
    platformAssetId: varchar("platform_asset_id", { length: 255 }), // External platform's asset ID
    deploymentConfig: json("deployment_config"),
    deployedAt: timestamp("deployed_at").defaultNow(),
    status: varchar("status", { length: 50 }).default("active"), // 'active', 'paused', 'failed', 'removed'
    errorMessage: text("error_message"),
});
// Automated insights and recommendations
export const testInsights = brandwebsiteSchema.table("test_insights", {
    id: serial("id").primaryKey(),
    testId: integer("test_id").notNull().references(() => marketingTests.id, { onDelete: "cascade" }),
    insightType: varchar("insight_type", { length: 100 }).notNull(), // 'performance_alert', 'recommendation', 'statistical_significance'
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    confidenceScore: decimal("confidence_score", { precision: 3, scale: 2 }),
    recommendedAction: varchar("recommended_action", { length: 255 }),
    actionData: json("action_data"),
    createdAt: timestamp("created_at").defaultNow(),
    acknowledged: boolean("acknowledged").default(false),
    acknowledgedAt: timestamp("acknowledged_at"),
    acknowledgedBy: varchar("acknowledged_by", { length: 255 }),
});
// ===============================
// PRODUCT RESEARCH SYSTEM TABLES
// ===============================
// Core Amazon products catalog
export const amazonProducts = brandwebsiteSchema.table("amazon_products", {
    asin: varchar("asin", { length: 10 }).primaryKey(),
    title: text("title").notNull(),
    brand: varchar("brand", { length: 255 }),
    category: varchar("category", { length: 255 }),
    subcategory: varchar("subcategory", { length: 255 }),
    currentPrice: decimal("current_price", { precision: 10, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("USD"),
    availability: varchar("availability", { length: 50 }),
    primeEligible: boolean("prime_eligible").default(false),
    images: json("images").$type(),
    features: json("features").$type(),
    specifications: json("specifications").$type(),
    aPlusContent: json("a_plus_content").$type(),
    lastScrapedAt: timestamp("last_scraped_at").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
// Time-series sales and performance metrics
export const salesMetrics = brandwebsiteSchema.table("sales_metrics", {
    id: serial("id").primaryKey(),
    asin: varchar("asin", { length: 10 }).notNull().references(() => amazonProducts.asin, { onDelete: "cascade" }),
    bsrRank: integer("bsr_rank"),
    bsrCategory: varchar("bsr_category", { length: 255 }),
    estimatedDailySales: integer("estimated_daily_sales"),
    estimatedMonthlyRevenue: decimal("estimated_monthly_revenue", { precision: 12, scale: 2 }),
    reviewCount: integer("review_count"),
    averageRating: decimal("average_rating", { precision: 3, scale: 2 }),
    questionsAnswered: integer("questions_answered"),
    recordedAt: timestamp("recorded_at").defaultNow(),
});
// Competitor pricing and offer tracking
export const competitorOffers = brandwebsiteSchema.table("competitor_offers", {
    id: serial("id").primaryKey(),
    asin: varchar("asin", { length: 10 }).notNull().references(() => amazonProducts.asin, { onDelete: "cascade" }),
    sellerId: varchar("seller_id", { length: 50 }),
    sellerName: varchar("seller_name", { length: 255 }),
    price: decimal("price", { precision: 10, scale: 2 }),
    shippingCost: decimal("shipping_cost", { precision: 10, scale: 2 }),
    totalCost: decimal("total_cost", { precision: 10, scale: 2 }),
    condition: varchar("condition", { length: 20 }),
    fulfillmentType: varchar("fulfillment_type", { length: 20 }),
    hasBuyBox: boolean("has_buy_box").default(false),
    availability: varchar("availability", { length: 50 }),
    recordedAt: timestamp("recorded_at").defaultNow(),
});
// Marketing material analysis and insights
export const marketingMaterials = brandwebsiteSchema.table("marketing_materials", {
    id: serial("id").primaryKey(),
    asin: varchar("asin", { length: 10 }).notNull().references(() => amazonProducts.asin, { onDelete: "cascade" }),
    materialType: varchar("material_type", { length: 50 }).notNull(),
    content: text("content"),
    extractedKeywords: json("extracted_keywords").$type(),
    sentimentScore: decimal("sentiment_score", { precision: 3, scale: 2 }),
    readabilityScore: decimal("readability_score", { precision: 5, scale: 2 }),
    competitiveElements: json("competitive_elements").$type(),
    processedAt: timestamp("processed_at").defaultNow(),
});
// Aggregated product reviews with intelligence processing
export const productReviewsAggregated = brandwebsiteSchema.table("product_reviews_aggregated", {
    id: serial("id").primaryKey(),
    asin: varchar("asin", { length: 10 }).notNull().references(() => amazonProducts.asin, { onDelete: "cascade" }),
    reviewId: varchar("review_id", { length: 50 }).notNull().unique(),
    rating: integer("rating"),
    title: text("title"),
    content: text("content"),
    verifiedPurchase: boolean("verified_purchase"),
    helpfulVotes: integer("helpful_votes").default(0),
    reviewDate: timestamp("review_date"),
    sentiment: varchar("sentiment", { length: 20 }),
    extractedIssues: json("extracted_issues").$type(),
    extractedFeatures: json("extracted_features").$type(),
    processedAt: timestamp("processed_at").defaultNow(),
});
// Search query history and results tracking
export const searchQueries = brandwebsiteSchema.table("search_queries", {
    id: serial("id").primaryKey(),
    queryText: text("query_text").notNull(),
    filters: json("filters").$type(),
    resultCount: integer("result_count"),
    results: json("results").$type(),
    userId: varchar("user_id", { length: 255 }),
    purpose: varchar("purpose", { length: 50 }),
    executedAt: timestamp("executed_at").defaultNow(),
});
// AI chatbot context storage for product research
export const chatbotContext = brandwebsiteSchema.table("chatbot_context", {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 255 }).notNull(),
    contextType: varchar("context_type", { length: 50 }).notNull(),
    contextData: json("context_data").$type(),
    asin: varchar("asin", { length: 10 }),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow(),
});
// ===============================
// CONSTANTS AND ENUMS
// ===============================
export const ACHIEVEMENT_TYPES = {
    FIRST_PURCHASE: 'first_purchase',
    DECK_BUILDER: 'deck_builder',
    SERIOUS_COLLECTOR: 'serious_collector',
    VAULT_LEGEND: 'vault_legend'
};
// ===============================
// VALIDATION SCHEMAS
// ===============================
export const insertProductSchema = createInsertSchema(products).omit({
    id: true,
});
export const insertColorVariantSchema = createInsertSchema(colorVariants).omit({
    id: true,
});
export const insertCartItemSchema = createInsertSchema(cartItems).omit({
    id: true,
});
export const insertUserSchema = createInsertSchema(users);
export const upsertUserSchema = createInsertSchema(users).omit({
    createdAt: true,
    updatedAt: true,
});
export const insertExperimentalProductSchema = createInsertSchema(experimentalProducts).omit({
    id: true,
    voteCount: true,
    createdAt: true,
});
export const insertExperimentalProductVoteSchema = createInsertSchema(experimentalProductVotes).omit({
    createdAt: true,
});
// Verification system schemas
export const insertVerificationTicketSchema = createInsertSchema(verificationTickets).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    // Add custom validation for order ID format
    orderId: z.string().regex(/^\d{3}-\d{7}-\d{7}$/, "Invalid Amazon Order ID format"),
    email: z.string().email("Invalid email format"),
    orderDate: z.date().refine(date => date <= new Date() && date >= new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), "Order date must be within the last 180 days"),
    phoneLast4: z.string().length(4, "Must be exactly 4 digits").regex(/^\d{4}$/, "Must be 4 digits").optional(),
    consentGiven: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
});
export const insertVerificationEventSchema = createInsertSchema(verificationEvents).omit({
    id: true,
    createdAt: true,
});
export const insertDiscountCodeUsageSchema = createInsertSchema(discountCodeUsage).omit({
    id: true,
    lastUsedAt: true,
});
// Admin action schemas
export const approveVerificationSchema = z.object({
    pointsAwarded: z.number().int().min(1).max(1000),
    note: z.string().max(500).optional(),
});
export const denyVerificationSchema = z.object({
    reason: z.string().min(1).max(500),
});
export const requestInfoSchema = z.object({
    instructions: z.string().min(1).max(1000),
});
// ===============================
// PRODUCT RESEARCH VALIDATION SCHEMAS
// ===============================
// Amazon Products schemas
export const insertAmazonProductSchema = createInsertSchema(amazonProducts).extend({
    asin: z.string().regex(/^[A-Z0-9]{10}$/, "ASIN must be 10 alphanumeric characters"),
    currentPrice: z.number().positive().optional(),
    currency: z.string().length(3).default("USD"),
    images: z.array(z.object({
        url: z.string().url(),
        type: z.string(),
        alt: z.string().optional()
    })).optional(),
    features: z.array(z.string()).optional(),
    specifications: z.record(z.string()).optional(),
    aPlusContent: z.record(z.any()).optional(),
});
export const updateAmazonProductSchema = insertAmazonProductSchema.partial().omit({
    asin: true,
    createdAt: true,
});
// Sales Metrics schemas
export const insertSalesMetricsSchema = createInsertSchema(salesMetrics).omit({
    id: true,
    recordedAt: true,
}).extend({
    asin: z.string().regex(/^[A-Z0-9]{10}$/, "ASIN must be 10 alphanumeric characters"),
    bsrRank: z.number().int().positive().optional(),
    estimatedDailySales: z.number().int().nonnegative().optional(),
    estimatedMonthlyRevenue: z.number().nonnegative().optional(),
    reviewCount: z.number().int().nonnegative().optional(),
    averageRating: z.number().min(1).max(5).optional(),
    questionsAnswered: z.number().int().nonnegative().optional(),
});
// Competitor Offers schemas
export const insertCompetitorOfferSchema = createInsertSchema(competitorOffers).omit({
    id: true,
    recordedAt: true,
}).extend({
    asin: z.string().regex(/^[A-Z0-9]{10}$/, "ASIN must be 10 alphanumeric characters"),
    price: z.number().nonnegative().optional(),
    shippingCost: z.number().nonnegative().optional(),
    totalCost: z.number().nonnegative().optional(),
    condition: z.enum(["New", "Used - Like New", "Used - Very Good", "Used - Good", "Used - Acceptable", "Refurbished"]).optional(),
    fulfillmentType: z.enum(["FBA", "FBM", "Merchant", "Unknown"]).optional(),
});
// Marketing Materials schemas
export const insertMarketingMaterialSchema = createInsertSchema(marketingMaterials).omit({
    id: true,
    processedAt: true,
}).extend({
    asin: z.string().regex(/^[A-Z0-9]{10}$/, "ASIN must be 10 alphanumeric characters"),
    materialType: z.enum(["title", "bullets", "description", "a_plus", "keywords", "features"]),
    extractedKeywords: z.array(z.object({
        keyword: z.string(),
        relevance: z.number().min(0).max(1)
    })).optional(),
    sentimentScore: z.number().min(-1).max(1).optional(),
    readabilityScore: z.number().nonnegative().optional(),
    competitiveElements: z.array(z.object({
        element: z.string(),
        type: z.string(),
        impact: z.string()
    })).optional(),
});
// Product Reviews schemas
export const insertProductReviewSchema = createInsertSchema(productReviewsAggregated).omit({
    id: true,
    processedAt: true,
}).extend({
    asin: z.string().regex(/^[A-Z0-9]{10}$/, "ASIN must be 10 alphanumeric characters"),
    reviewId: z.string().min(1).max(50),
    rating: z.number().int().min(1).max(5).optional(),
    helpfulVotes: z.number().int().nonnegative().default(0),
    sentiment: z.enum(["positive", "negative", "neutral", "mixed"]).optional(),
    extractedIssues: z.array(z.object({
        issue: z.string(),
        severity: z.enum(["low", "medium", "high", "critical"]),
        frequency: z.number().int().nonnegative()
    })).optional(),
    extractedFeatures: z.array(z.object({
        feature: z.string(),
        sentiment: z.enum(["positive", "negative", "neutral"]),
        mentions: z.number().int().nonnegative()
    })).optional(),
});
// Search Queries schemas
export const insertSearchQuerySchema = createInsertSchema(searchQueries).omit({
    id: true,
    executedAt: true,
}).extend({
    queryText: z.string().min(1).max(500),
    filters: z.object({
        minPrice: z.number().nonnegative().optional(),
        maxPrice: z.number().nonnegative().optional(),
        minRating: z.number().min(1).max(5).optional(),
        category: z.string().optional(),
        brand: z.string().optional(),
        primeOnly: z.boolean().optional(),
        freeShipping: z.boolean().optional(),
    }).optional(),
    resultCount: z.number().int().nonnegative().optional(),
    results: z.array(z.object({
        asin: z.string().regex(/^[A-Z0-9]{10}$/),
        title: z.string(),
        price: z.number().nonnegative(),
        rating: z.number().min(1).max(5),
        rank: z.number().int().positive()
    })).optional(),
    purpose: z.enum(["research", "monitoring", "analysis", "competitive", "trending"]).optional(),
});
// Chatbot Context schemas
export const insertChatbotContextSchema = createInsertSchema(chatbotContext).omit({
    id: true,
    createdAt: true,
}).extend({
    sessionId: z.string().min(1).max(255),
    contextType: z.enum(["product", "competitor", "market", "search", "analysis"]),
    contextData: z.object({
        products: z.array(z.any()).optional(),
        competitors: z.array(z.any()).optional(),
        marketTrends: z.any().optional(),
        customerSentiment: z.any().optional(),
        salesPerformance: z.any().optional(),
        recommendations: z.array(z.any()).optional(),
    }).optional(),
    asin: z.string().regex(/^[A-Z0-9]{10}$/).optional(),
    expiresAt: z.date().optional(),
});
// Product search request schema
export const productSearchSchema = z.object({
    keyword: z.string().min(1).max(200),
    category: z.string().optional(),
    brand: z.string().optional(),
    minPrice: z.number().nonnegative().optional(),
    maxPrice: z.number().nonnegative().optional(),
    minRating: z.number().min(1).max(5).optional(),
    primeOnly: z.boolean().default(false),
    sortBy: z.enum(["relevance", "price_low", "price_high", "rating", "newest"]).default("relevance"),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().nonnegative().default(0),
});
// Sales analysis request schema
export const salesAnalysisSchema = z.object({
    asin: z.string().regex(/^[A-Z0-9]{10}$/, "ASIN must be 10 alphanumeric characters"),
    period: z.enum(["1d", "7d", "30d", "90d"]).default("30d"),
    includeCompetitors: z.boolean().default(false),
    includeForecasting: z.boolean().default(false),
});
// Review analysis request schema
export const reviewAnalysisSchema = z.object({
    asin: z.string().regex(/^[A-Z0-9]{10}$/, "ASIN must be 10 alphanumeric characters"),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    minRating: z.number().int().min(1).max(5).optional(),
    maxRating: z.number().int().min(1).max(5).optional(),
    verifiedOnly: z.boolean().default(false),
    includeImages: z.boolean().default(false),
});
// Constants for auth types and statuses
export const AUTH_TYPES = {
    SMS: 'sms',
    EMAIL: 'email',
    GOOGLE: 'google',
    PASSWORD: 'password'
};
export const AUTH_PURPOSES = {
    REGISTRATION: 'registration',
    ACCOUNT_LINKING: 'account_linking',
    LOGIN: 'login',
    VERIFICATION: 'verification'
};
export const LINKING_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    EXPIRED: 'expired'
};
export const VERIFICATION_SOURCES = {
    MANUAL: 'manual',
    API: 'api',
    IMPORT: 'import',
    USER_INPUT: 'user_input'
};
// Constants for split testing
export const TEST_TYPES = {
    AMAZON_LISTING: 'amazon_listing',
    VIDEO_AD: 'video_ad',
    IMAGE_AD: 'image_ad',
    EMAIL_MARKETING: 'email_marketing'
};
export const TEST_VERTICALS = {
    // Amazon listing verticals
    MAIN_IMAGE: 'main_image',
    SECONDARY_IMAGES: 'secondary_images',
    A_PLUS_CONTENT: 'a_plus_content',
    LISTING_VIDEO: 'listing_video',
    TITLE: 'title',
    BULLETS: 'bullets',
    // Video ad verticals
    VIDEO_CREATIVE: 'video_creative',
    VIDEO_THUMBNAIL: 'video_thumbnail',
    VIDEO_HOOK: 'video_hook',
    VIDEO_CTA: 'video_cta',
    // Image ad verticals
    IMAGE_CREATIVE: 'image_creative',
    IMAGE_BACKGROUND: 'image_background',
    IMAGE_ANGLE: 'image_angle',
    IMAGE_TEXT: 'image_text',
    // Email marketing verticals
    SUBJECT_LINE: 'subject_line',
    EMAIL_CREATIVE: 'email_creative',
    SEND_TIME: 'send_time'
};
export const TEST_STATUS = {
    DRAFT: 'draft',
    ACTIVE: 'active',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    ARCHIVED: 'archived'
};
export const DEPLOYMENT_STATUS = {
    ACTIVE: 'active',
    PAUSED: 'paused',
    FAILED: 'failed',
    REMOVED: 'removed'
};
export const PLATFORMS = {
    AMAZON: 'amazon',
    TIKTOK: 'tiktok',
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    YOUTUBE: 'youtube',
    PINTEREST: 'pinterest',
    GOOGLE: 'google'
};
// ===============================
// PRODUCT RESEARCH CONSTANTS
// ===============================
export const PRODUCT_RESEARCH_MATERIAL_TYPES = {
    TITLE: 'title',
    BULLETS: 'bullets',
    DESCRIPTION: 'description',
    A_PLUS: 'a_plus',
    KEYWORDS: 'keywords',
    FEATURES: 'features'
};
export const FULFILLMENT_TYPES = {
    FBA: 'FBA',
    FBM: 'FBM',
    MERCHANT: 'Merchant',
    UNKNOWN: 'Unknown'
};
export const PRODUCT_CONDITIONS = {
    NEW: 'New',
    USED_LIKE_NEW: 'Used - Like New',
    USED_VERY_GOOD: 'Used - Very Good',
    USED_GOOD: 'Used - Good',
    USED_ACCEPTABLE: 'Used - Acceptable',
    REFURBISHED: 'Refurbished'
};
export const CONTEXT_TYPES = {
    PRODUCT: 'product',
    COMPETITOR: 'competitor',
    MARKET: 'market',
    SEARCH: 'search',
    ANALYSIS: 'analysis'
};
export const SEARCH_PURPOSES = {
    RESEARCH: 'research',
    MONITORING: 'monitoring',
    ANALYSIS: 'analysis',
    COMPETITIVE: 'competitive',
    TRENDING: 'trending'
};
export const SENTIMENT_TYPES = {
    POSITIVE: 'positive',
    NEGATIVE: 'negative',
    NEUTRAL: 'neutral',
    MIXED: 'mixed'
};
export const ISSUE_SEVERITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
};
