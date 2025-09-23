CREATE SCHEMA "brandwebsite";
--> statement-breakpoint
CREATE TABLE "account_creation_incentives" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"incentive_type" varchar(20) DEFAULT 'signup_10_percent' NOT NULL,
	"discount_code" varchar(50) NOT NULL,
	"claimed" boolean DEFAULT false NOT NULL,
	"claimed_at" timestamp with time zone,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account_linking_requests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"primary_user_id" varchar NOT NULL,
	"secondary_user_id" varchar NOT NULL,
	"auth_method" varchar(20) NOT NULL,
	"verification_token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"status" varchar(20) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"resolved_at" timestamp,
	"resolution_details" text,
	CONSTRAINT "account_linking_requests_verification_token_unique" UNIQUE("verification_token")
);
--> statement-breakpoint
CREATE TABLE "brandwebsite"."auth_sessions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"session_token" varchar NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" varchar,
	"user_agent" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "auth_sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"max_attempts" integer DEFAULT 1 NOT NULL,
	"daily_limit" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"product_id" integer NOT NULL,
	"color_variant_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brandwebsite"."color_variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"color_name" text NOT NULL,
	"color_code" text NOT NULL,
	"image_url" text NOT NULL,
	"secondary_image_url" text,
	"in_stock" boolean DEFAULT true NOT NULL,
	"stock_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brandwebsite"."discount_code_usage" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"discount_code_id" varchar NOT NULL,
	"last_used_at" timestamp DEFAULT now() NOT NULL,
	"device_fingerprint" varchar(64),
	CONSTRAINT "discount_code_usage_email_discount_code_id_unique" UNIQUE("email","discount_code_id")
);
--> statement-breakpoint
CREATE TABLE "experimental_product_votes" (
	"user_id" varchar NOT NULL,
	"experimental_product_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "experimental_product_votes_user_id_experimental_product_id_pk" PRIMARY KEY("user_id","experimental_product_id")
);
--> statement-breakpoint
CREATE TABLE "experimental_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"category" text NOT NULL,
	"estimated_price" numeric(10, 2),
	"features" json NOT NULL,
	"vote_count" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "federated_identities" (
	"id" varchar DEFAULT gen_random_uuid(),
	"user_id" varchar NOT NULL,
	"provider" varchar NOT NULL,
	"provider_user_id" varchar NOT NULL,
	"email_at_idp" varchar,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "federated_identities_provider_provider_user_id_pk" PRIMARY KEY("provider","provider_user_id")
);
--> statement-breakpoint
CREATE TABLE "game_attempts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"won" boolean NOT NULL,
	"prize_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "multi_auth_audit_log" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"action" varchar(50) NOT NULL,
	"auth_method" varchar(20),
	"identifier" varchar(255),
	"ip_address" varchar,
	"user_agent" text,
	"success" boolean NOT NULL,
	"failure_reason" text,
	"metadata" json,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "order_id_verifications" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" varchar(100) NOT NULL,
	"user_id" varchar,
	"verified_at" timestamp,
	"verification_source" varchar(50) DEFAULT 'manual',
	"is_used" boolean DEFAULT false,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "order_id_verifications_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE "prizes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"value" varchar(50),
	"image_url" varchar(500),
	"probability" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brandwebsite"."products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"base_price" numeric(10, 2) NOT NULL,
	"category" text NOT NULL,
	"features" json NOT NULL,
	"specifications" json NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promo_claims" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"draw_id" varchar,
	"user_id" varchar,
	"email" varchar NOT NULL,
	"order_id" varchar NOT NULL,
	"email_verified" boolean DEFAULT false,
	"verified_at" timestamp,
	"code_id" varchar,
	"code_revealed_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "promo_claims_draw_id_unique" UNIQUE("draw_id"),
	CONSTRAINT "promo_claims_code_id_unique" UNIQUE("code_id")
);
--> statement-breakpoint
CREATE TABLE "promo_codes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_key" varchar NOT NULL,
	"prize" varchar NOT NULL,
	"code" varchar NOT NULL,
	"consumed" boolean DEFAULT false,
	"consumed_at" timestamp,
	"claim_id" varchar,
	CONSTRAINT "promo_codes_code_unique" UNIQUE("code"),
	CONSTRAINT "promo_codes_claim_id_unique" UNIQUE("claim_id")
);
--> statement-breakpoint
CREATE TABLE "promo_draws" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_key" varchar NOT NULL,
	"prize" varchar NOT NULL,
	"weight_at_draw" real NOT NULL,
	"ip_hash" varchar,
	"device_hash" varchar,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "scratch_win_participations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"participated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"next_eligible_at" timestamp with time zone NOT NULL,
	"prize_type" varchar(20) NOT NULL,
	"discount_code" varchar(50),
	"prize_claimed" boolean DEFAULT false NOT NULL,
	"prize_claimed_at" timestamp with time zone,
	"ip_address" varchar(45),
	"user_agent" text,
	"device_fingerprint" varchar(64),
	"session_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "scratch_win_participations_user_id_next_eligible_at_unique" UNIQUE("user_id","next_eligible_at")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" json NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sms_verification_codes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"user_id" varchar,
	"verification_code" varchar(10) NOT NULL,
	"purpose" varchar(30) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"attempts" integer DEFAULT 0,
	"max_attempts" integer DEFAULT 5,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_ab_tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"session_id" varchar NOT NULL,
	"test_name" varchar NOT NULL,
	"variant" varchar NOT NULL,
	"assigned_at" timestamp DEFAULT now(),
	"converted_at" timestamp,
	"conversion_type" varchar,
	"conversion_value" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"achievement_type" text NOT NULL,
	"achievement_level" integer DEFAULT 1 NOT NULL,
	"unlocked_at" timestamp DEFAULT now(),
	"metadata" json
);
--> statement-breakpoint
CREATE TABLE "user_auth_methods" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"auth_type" varchar(20) NOT NULL,
	"identifier" varchar(255) NOT NULL,
	"is_verified" boolean DEFAULT false,
	"is_primary" boolean DEFAULT false,
	"verification_token" varchar,
	"verification_expires_at" timestamp,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_auth_methods_auth_type_identifier_unique" UNIQUE("auth_type","identifier")
);
--> statement-breakpoint
CREATE TABLE "user_cart_abandonment" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"session_id" varchar NOT NULL,
	"cart_value" numeric(10, 2) NOT NULL,
	"item_count" integer NOT NULL,
	"products" json,
	"abandoned_at" timestamp DEFAULT now(),
	"recovered_at" timestamp,
	"recovery_method" varchar
);
--> statement-breakpoint
CREATE TABLE "user_email_interactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"email" varchar NOT NULL,
	"campaign_id" varchar,
	"campaign_name" varchar,
	"subject" text,
	"event_type" varchar NOT NULL,
	"clicked_url" text,
	"ip_address" varchar,
	"user_agent" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar NOT NULL,
	"user_id" varchar,
	"event_type" varchar NOT NULL,
	"element" varchar,
	"element_text" text,
	"page" text NOT NULL,
	"metadata" json,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"product_id" integer,
	"order_reference" varchar,
	"rating" integer,
	"title" text,
	"comment" text,
	"is_verified_purchase" boolean DEFAULT false,
	"is_public" boolean DEFAULT true,
	"helpful_votes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_marketing_preferences" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"email_opt_in" boolean DEFAULT false NOT NULL,
	"sms_opt_in" boolean DEFAULT false NOT NULL,
	"vip_club_member" boolean DEFAULT false NOT NULL,
	"vip_notifications" boolean DEFAULT false NOT NULL,
	"product_previews" boolean DEFAULT false NOT NULL,
	"product_voting" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_page_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar NOT NULL,
	"user_id" varchar,
	"path" text NOT NULL,
	"title" text,
	"referrer" text,
	"viewed_at" timestamp DEFAULT now(),
	"time_on_page" integer,
	"exit_page" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"email_marketing" boolean DEFAULT true,
	"sms_marketing" boolean DEFAULT false,
	"push_notifications" boolean DEFAULT true,
	"currency" varchar DEFAULT 'USD',
	"language" varchar DEFAULT 'en',
	"timezone" varchar,
	"favorite_categories" json,
	"price_alerts" json,
	"wishlist" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_prizes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"prize_id" varchar NOT NULL,
	"promo_code" varchar(50),
	"is_redeemed" boolean DEFAULT false NOT NULL,
	"redeemed_at" timestamp,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_prizes_promo_code_unique" UNIQUE("promo_code")
);
--> statement-breakpoint
CREATE TABLE "user_purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"product_id" integer NOT NULL,
	"color_variant_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"purchase_date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_rewards" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"total_points" integer DEFAULT 0 NOT NULL,
	"current_points" integer DEFAULT 0 NOT NULL,
	"total_spent" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"total_purchases" integer DEFAULT 0 NOT NULL,
	"total_items" integer DEFAULT 0 NOT NULL,
	"member_since" timestamp DEFAULT now(),
	"last_activity" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_support_tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"email" varchar NOT NULL,
	"subject" text NOT NULL,
	"category" varchar,
	"priority" varchar DEFAULT 'medium',
	"status" varchar DEFAULT 'open',
	"description" text NOT NULL,
	"resolution" text,
	"assigned_to" varchar,
	"resolved_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "brandwebsite"."users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"is_verified" boolean DEFAULT false,
	"verification_code" varchar,
	"verification_expiry" timestamp,
	"last_login_at" timestamp,
	"phone_verified" boolean DEFAULT false,
	"phone_number" varchar,
	"marketing_consent" boolean DEFAULT false,
	"last_claim_at" timestamp,
	"total_claims" integer DEFAULT 0,
	"password_hash" varchar,
	"birthday" varchar,
	"auth_provider" varchar DEFAULT 'email',
	"role" varchar(20) DEFAULT 'customer',
	"sms_verification_required" boolean DEFAULT true,
	"order_id_verified" boolean DEFAULT false,
	"verification_bypass_reason" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "brandwebsite"."verification_events" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ticket_id" varchar NOT NULL,
	"event_type" varchar(30) NOT NULL,
	"event_meta" json,
	"performed_by" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brandwebsite"."verification_tickets" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"email" varchar NOT NULL,
	"order_id" varchar NOT NULL,
	"order_date" timestamp NOT NULL,
	"phone_last_4" varchar(4),
	"status" varchar(20) DEFAULT 'PENDING' NOT NULL,
	"points_awarded" integer,
	"promo_source" varchar,
	"cooldown_code_id" varchar,
	"reviewed_by" varchar,
	"notes_internal" text,
	"attachment_urls" json,
	"consent_given" boolean DEFAULT false NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "verification_tickets_order_id_unique" UNIQUE("order_id"),
	CONSTRAINT "verification_tickets_email_status_unique" UNIQUE("email","status")
);
--> statement-breakpoint
ALTER TABLE "account_linking_requests" ADD CONSTRAINT "account_linking_requests_primary_user_id_users_id_fk" FOREIGN KEY ("primary_user_id") REFERENCES "brandwebsite"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_linking_requests" ADD CONSTRAINT "account_linking_requests_secondary_user_id_users_id_fk" FOREIGN KEY ("secondary_user_id") REFERENCES "brandwebsite"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "multi_auth_audit_log" ADD CONSTRAINT "multi_auth_audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "brandwebsite"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_id_verifications" ADD CONSTRAINT "order_id_verifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "brandwebsite"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promo_claims" ADD CONSTRAINT "promo_claims_draw_id_promo_draws_id_fk" FOREIGN KEY ("draw_id") REFERENCES "public"."promo_draws"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promo_claims" ADD CONSTRAINT "promo_claims_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "brandwebsite"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sms_verification_codes" ADD CONSTRAINT "sms_verification_codes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "brandwebsite"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_auth_methods" ADD CONSTRAINT "user_auth_methods_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "brandwebsite"."users"("id") ON DELETE cascade ON UPDATE no action;