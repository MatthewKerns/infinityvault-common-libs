CREATE TABLE "advertising_spend" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"channel" varchar(50) NOT NULL,
	"campaign_type" varchar(100),
	"campaign_id" varchar(200),
	"campaign_name" varchar(300),
	"spend_date" timestamp with time zone NOT NULL,
	"daily_spend" numeric(10, 2) NOT NULL,
	"impressions" integer,
	"clicks" integer,
	"conversions" integer,
	"attributed_revenue" numeric(10, 2),
	"new_customers_attributed" integer DEFAULT 0,
	"attribution_confidence" numeric(4, 3),
	"attribution_model" varchar(50),
	"imported_at" timestamp with time zone DEFAULT now() NOT NULL,
	"data_source" varchar(100),
	"raw_data" json
);
--> statement-breakpoint
CREATE TABLE "agent_interactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"interaction_id" varchar DEFAULT gen_random_uuid() NOT NULL,
	"session_id" text NOT NULL,
	"user_id" text,
	"user_message" text NOT NULL,
	"agent_response" text NOT NULL,
	"response_time" integer NOT NULL,
	"tools_used" json DEFAULT '[]'::json,
	"context_type" text,
	"complexity" text DEFAULT 'moderate',
	"error_occurred" boolean DEFAULT false,
	"error_message" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "agent_interactions_interaction_id_unique" UNIQUE("interaction_id")
);
--> statement-breakpoint
CREATE TABLE "attribution_performance_metrics" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" varchar NOT NULL,
	"impressions" integer DEFAULT 0,
	"clicks" integer DEFAULT 0,
	"conversions" integer DEFAULT 0,
	"revenue" numeric(12, 2) DEFAULT '0',
	"click_through_rate" numeric(5, 2),
	"conversion_rate" numeric(5, 2),
	"return_on_ad_spend" numeric(8, 2),
	"report_date" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brand_attribution_campaigns" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_name" varchar(200) NOT NULL,
	"product_asin" varchar(20) NOT NULL,
	"promo_type" varchar(20) NOT NULL,
	"promo_id" varchar(100),
	"amazon_promo_url" text,
	"discount_amount" numeric(8, 2),
	"discount_type" varchar(20),
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"attribution_tag" varchar(100),
	"final_branded_url" text,
	"qr_code_url" text,
	"error_message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cac_calculations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"calculation_period_start" timestamp with time zone NOT NULL,
	"calculation_period_end" timestamp with time zone NOT NULL,
	"calculation_method" varchar(20) NOT NULL,
	"total_ad_spend" numeric(12, 2),
	"total_additional_costs" numeric(10, 2),
	"total_new_customers" integer,
	"blended_cac" numeric(8, 2),
	"channel_breakdown" json,
	"team_costs" numeric(8, 2),
	"tool_costs" numeric(8, 2),
	"attribution_costs" numeric(8, 2),
	"other_costs" numeric(8, 2),
	"best_performing_channel" varchar(50),
	"worst_performing_channel" varchar(50),
	"efficiency_trends" json,
	"calculated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"session_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customer_acquisition_attribution" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" varchar NOT NULL,
	"acquisition_channel" varchar(50),
	"acquisition_campaign" varchar(200),
	"acquisition_date" timestamp with time zone,
	"touch_points" json,
	"attribution_model" varchar(50),
	"primary_attribution_weight" numeric(4, 3),
	"attributed_spend" numeric(8, 2),
	"fully_loaded_acquisition_cost" numeric(8, 2),
	"attribution_confidence" numeric(4, 3),
	"verification_method" varchar(100),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_cohorts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cohort_month" timestamp with time zone NOT NULL,
	"acquisition_channel" varchar(100),
	"customer_segment" varchar(50),
	"month_0_customers" integer,
	"month_1_customers" integer,
	"month_3_customers" integer,
	"month_6_customers" integer,
	"month_12_customers" integer,
	"month_0_revenue" numeric(10, 2),
	"month_1_revenue" numeric(10, 2),
	"month_3_revenue" numeric(10, 2),
	"month_6_revenue" numeric(10, 2),
	"month_12_revenue" numeric(10, 2),
	"cohort_ltv" numeric(10, 2),
	"cohort_payback_period_months" numeric(4, 1),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_ltv_calculations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" varchar NOT NULL,
	"calculation_method" varchar(20) NOT NULL,
	"calculation_date" timestamp with time zone NOT NULL,
	"ltv_value" numeric(10, 2) NOT NULL,
	"total_revenue" numeric(10, 2),
	"gross_margin" numeric(10, 2),
	"order_count" integer,
	"average_order_value" numeric(8, 2),
	"customer_lifespan_days" integer,
	"predicted_lifespan_months" numeric(4, 1),
	"predicted_monthly_value" numeric(8, 2),
	"churn_probability" numeric(4, 3),
	"prediction_confidence" numeric(4, 3),
	"customer_features" json,
	"cohort_data" json,
	"calculation_notes" text,
	"recalculation_triggered_by" varchar(100),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_purchases" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" varchar NOT NULL,
	"order_id" varchar(100) NOT NULL,
	"order_date" timestamp with time zone NOT NULL,
	"platform" varchar(50) NOT NULL,
	"gross_amount" numeric(12, 2) NOT NULL,
	"net_amount" numeric(12, 2) NOT NULL,
	"taxes" numeric(10, 2) DEFAULT '0',
	"shipping" numeric(8, 2) DEFAULT '0',
	"discounts" numeric(8, 2) DEFAULT '0',
	"items" json NOT NULL,
	"status" varchar(20) DEFAULT 'completed' NOT NULL,
	"acquisition_channel" varchar(100),
	"campaign_id" varchar(100),
	"attribution_data" json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eos_auth_sessions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"session_token" varchar NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" varchar,
	"user_agent" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "eos_auth_sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "eos_changes" (
	"id" serial PRIMARY KEY NOT NULL,
	"component" varchar(32) NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" varchar(32) NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"impact_level" varchar(16) NOT NULL,
	"estimated_completion" varchar(64),
	"last_updated" timestamp with time zone DEFAULT now() NOT NULL,
	"related_tasks" json,
	"metrics" json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eos_sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" json NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eos_users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"is_verified" boolean DEFAULT false,
	"verification_code" varchar,
	"verification_expiry" timestamp,
	"last_login_at" timestamp,
	"password_hash" varchar,
	"auth_provider" varchar DEFAULT 'email',
	"organization_role" varchar,
	"eos_permissions" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "eos_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "google_sheets_sync_log" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" varchar,
	"sync_type" varchar(50) NOT NULL,
	"sheet_row_index" integer,
	"success" boolean NOT NULL,
	"error_message" text,
	"synced_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interaction_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"interaction_id" varchar NOT NULL,
	"session_id" text NOT NULL,
	"user_id" text,
	"message_count" integer DEFAULT 1 NOT NULL,
	"session_duration" integer,
	"retry_attempts" integer DEFAULT 0,
	"abandonment_occurred" boolean DEFAULT false,
	"time_to_resolution" integer,
	"user_expertise_level" text DEFAULT 'intermediate',
	"time_of_day" integer,
	"day_of_week" integer,
	"device_type" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ltv_calculation_triggers" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" varchar,
	"trigger_event" varchar(100) NOT NULL,
	"trigger_data" json,
	"processed" boolean DEFAULT false,
	"processing_started_at" timestamp with time zone,
	"processing_completed_at" timestamp with time zone,
	"processing_error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monthly_profit_loss" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"statement_year" integer NOT NULL,
	"statement_month" integer NOT NULL,
	"amazon_gross_sales" numeric(12, 2),
	"amazon_returns" numeric(10, 2),
	"amazon_net_sales" numeric(12, 2),
	"brand_attribution_refunds" numeric(8, 2),
	"direct_website_sales" numeric(10, 2),
	"other_direct_sales" numeric(8, 2),
	"vip_subscription_revenue" numeric(8, 2),
	"other_subscription_revenue" numeric(8, 2),
	"total_revenue" numeric(12, 2),
	"manufacturing_costs" numeric(10, 2),
	"transportation_costs" numeric(8, 2),
	"landed_costs" numeric(10, 2),
	"total_cogs" numeric(10, 2),
	"amazon_referral_fees" numeric(8, 2),
	"amazon_fba_fees" numeric(8, 2),
	"amazon_storage_fees" numeric(6, 2),
	"amazon_advertising_fees" numeric(8, 2),
	"other_amazon_fees" numeric(6, 2),
	"total_amazon_costs" numeric(10, 2),
	"meta_ad_spend" numeric(8, 2),
	"google_ad_spend" numeric(8, 2),
	"tiktok_ad_spend" numeric(8, 2),
	"other_platform_spend" numeric(6, 2),
	"creative_production_costs" numeric(6, 2),
	"marketing_tool_costs" numeric(4, 2),
	"total_marketing_costs" numeric(10, 2),
	"software_subscriptions" numeric(6, 2),
	"team_costs" numeric(10, 2),
	"professional_services" numeric(6, 2),
	"office_expenses" numeric(4, 2),
	"other_operating_expenses" numeric(6, 2),
	"total_operating_expenses" numeric(12, 2),
	"gross_profit" numeric(12, 2),
	"operating_profit" numeric(12, 2),
	"net_profit" numeric(12, 2),
	"gross_margin" numeric(6, 4),
	"operating_margin" numeric(6, 4),
	"net_margin" numeric(6, 4),
	"amazon_fee_ratio" numeric(6, 4),
	"marketing_efficiency" numeric(6, 3),
	"cac_ltv_ratio" numeric(6, 4),
	"generated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"generated_by" varchar(100),
	"data_sources_used" json,
	"calculation_notes" text,
	CONSTRAINT "monthly_profit_loss_statement_year_statement_month_unique" UNIQUE("statement_year","statement_month")
);
--> statement-breakpoint
CREATE TABLE "product_cogs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sku" varchar(100) NOT NULL,
	"product_name" varchar(300),
	"manufacturing_cost" numeric(8, 4) NOT NULL,
	"transportation_cost" numeric(6, 4),
	"landed_cost" numeric(8, 4) NOT NULL,
	"supplier" varchar(200),
	"cost_currency" varchar(3) DEFAULT 'USD',
	"exchange_rate" numeric(8, 6) DEFAULT '1.0',
	"effective_from" timestamp with time zone NOT NULL,
	"effective_to" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "qr_code_assets" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" varchar NOT NULL,
	"standard_url" text,
	"high_res_url" text,
	"vector_url" text,
	"print_ready_url" text,
	"generated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_conversions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_session_id" varchar,
	"recommendation_id" varchar,
	"user_id" varchar,
	"conversion_type" varchar(20) NOT NULL,
	"conversion_value" numeric(10, 2),
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"attribution_data" json
);
--> statement-breakpoint
CREATE TABLE "quiz_llm_analysis" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_session_id" varchar NOT NULL,
	"llm_model" varchar(50) NOT NULL,
	"processing_timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"enhanced_profile" json NOT NULL,
	"processing_time_ms" integer,
	"token_usage" integer,
	"processing_cost" numeric(8, 4),
	"success" boolean DEFAULT true NOT NULL,
	"error_message" text
);
--> statement-breakpoint
CREATE TABLE "quiz_recommendations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_session_id" varchar NOT NULL,
	"product_asin" varchar(20) NOT NULL,
	"recommendation_rank" integer NOT NULL,
	"recommendation_score" numeric(4, 3),
	"reasoning" text NOT NULL,
	"attribution_link" text NOT NULL,
	"pricing_info" json,
	"generated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_sessions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" varchar(50) NOT NULL,
	"user_id" varchar,
	"category" varchar(20) NOT NULL,
	"focus" varchar(30) NOT NULL,
	"sub_focus" json NOT NULL,
	"user_dream" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"ip_address" varchar(45),
	"user_agent" text,
	"referrer_url" text,
	CONSTRAINT "quiz_sessions_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
CREATE TABLE "user_feedback_chatbot" (
	"id" serial PRIMARY KEY NOT NULL,
	"feedback_id" varchar DEFAULT gen_random_uuid() NOT NULL,
	"interaction_id" varchar NOT NULL,
	"session_id" text NOT NULL,
	"user_id" text,
	"feedback_type" text NOT NULL,
	"overall_rating" integer,
	"helpfulness_rating" integer,
	"accuracy_rating" integer,
	"speed_rating" integer,
	"feedback_categories" json DEFAULT '[]'::json,
	"comments" text,
	"task_completed" boolean,
	"retry_required" boolean DEFAULT false,
	"satisfaction_inferred" numeric(3, 2),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_feedback_chatbot_feedback_id_unique" UNIQUE("feedback_id")
);
--> statement-breakpoint
ALTER TABLE "attribution_performance_metrics" ADD CONSTRAINT "attribution_performance_metrics_campaign_id_brand_attribution_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."brand_attribution_campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "google_sheets_sync_log" ADD CONSTRAINT "google_sheets_sync_log_campaign_id_brand_attribution_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."brand_attribution_campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qr_code_assets" ADD CONSTRAINT "qr_code_assets_campaign_id_brand_attribution_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."brand_attribution_campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_conversions" ADD CONSTRAINT "quiz_conversions_quiz_session_id_quiz_sessions_id_fk" FOREIGN KEY ("quiz_session_id") REFERENCES "public"."quiz_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_conversions" ADD CONSTRAINT "quiz_conversions_recommendation_id_quiz_recommendations_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."quiz_recommendations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_llm_analysis" ADD CONSTRAINT "quiz_llm_analysis_quiz_session_id_quiz_sessions_id_fk" FOREIGN KEY ("quiz_session_id") REFERENCES "public"."quiz_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_recommendations" ADD CONSTRAINT "quiz_recommendations_quiz_session_id_quiz_sessions_id_fk" FOREIGN KEY ("quiz_session_id") REFERENCES "public"."quiz_sessions"("id") ON DELETE cascade ON UPDATE no action;