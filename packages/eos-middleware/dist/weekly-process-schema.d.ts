import { z } from "zod";
export declare const weeklyIdeas: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "weekly_ideas";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 300;
        }>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        submittedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "submitted_by";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 100;
        }>;
        submittedByUserId: import("drizzle-orm/pg-core").PgColumn<{
            name: "submitted_by_user_id";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        category: import("drizzle-orm/pg-core").PgColumn<{
            name: "category";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 50;
        }>;
        impactScore: import("drizzle-orm/pg-core").PgColumn<{
            name: "impact_score";
            tableName: "weekly_ideas";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        urgencyScore: import("drizzle-orm/pg-core").PgColumn<{
            name: "urgency_score";
            tableName: "weekly_ideas";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        effortEstimate: import("drizzle-orm/pg-core").PgColumn<{
            name: "effort_estimate";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 20;
        }>;
        resourcesRequired: import("drizzle-orm/pg-core").PgColumn<{
            name: "resources_required";
            tableName: "weekly_ideas";
            dataType: "json";
            columnType: "PgJson";
            data: {
                people?: string[];
                budget?: number;
                tools?: string[];
                time?: string;
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                people?: string[];
                budget?: number;
                tools?: string[];
                time?: string;
            };
        }>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 20;
        }>;
        priority: import("drizzle-orm/pg-core").PgColumn<{
            name: "priority";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 20;
        }>;
        weekSubmitted: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_submitted";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        targetImplementationWeek: import("drizzle-orm/pg-core").PgColumn<{
            name: "target_implementation_week";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        actualImplementationWeek: import("drizzle-orm/pg-core").PgColumn<{
            name: "actual_implementation_week";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        rejectionReason: import("drizzle-orm/pg-core").PgColumn<{
            name: "rejection_reason";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        implementationNotes: import("drizzle-orm/pg-core").PgColumn<{
            name: "implementation_notes";
            tableName: "weekly_ideas";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        outcomes: import("drizzle-orm/pg-core").PgColumn<{
            name: "outcomes";
            tableName: "weekly_ideas";
            dataType: "json";
            columnType: "PgJson";
            data: {
                measuredImpact?: string;
                lessonsLearned?: string[];
                followUpActions?: string[];
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                measuredImpact?: string;
                lessonsLearned?: string[];
                followUpActions?: string[];
            };
        }>;
        tags: import("drizzle-orm/pg-core").PgColumn<{
            name: "tags";
            tableName: "weekly_ideas";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: string[];
        }>;
        attachments: import("drizzle-orm/pg-core").PgColumn<{
            name: "attachments";
            tableName: "weekly_ideas";
            dataType: "json";
            columnType: "PgJson";
            data: {
                name: string;
                url: string;
                type: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                name: string;
                url: string;
                type: string;
            }[];
        }>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "weekly_ideas";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "weekly_ideas";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const teamCapacity: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "team_capacity";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "team_capacity";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        userId: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "team_capacity";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        userName: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_name";
            tableName: "team_capacity";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 100;
        }>;
        weekStarting: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_starting";
            tableName: "team_capacity";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        plannedDays: import("drizzle-orm/pg-core").PgColumn<{
            name: "planned_days";
            tableName: "team_capacity";
            dataType: "json";
            columnType: "PgJson";
            data: {
                monday: boolean;
                tuesday: boolean;
                wednesday: boolean;
                thursday: boolean;
                friday: boolean;
                saturday: boolean;
                sunday: boolean;
            };
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                monday: boolean;
                tuesday: boolean;
                wednesday: boolean;
                thursday: boolean;
                friday: boolean;
                saturday: boolean;
                sunday: boolean;
            };
        }>;
        actualDays: import("drizzle-orm/pg-core").PgColumn<{
            name: "actual_days";
            tableName: "team_capacity";
            dataType: "json";
            columnType: "PgJson";
            data: {
                monday: boolean;
                tuesday: boolean;
                wednesday: boolean;
                thursday: boolean;
                friday: boolean;
                saturday: boolean;
                sunday: boolean;
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                monday: boolean;
                tuesday: boolean;
                wednesday: boolean;
                thursday: boolean;
                friday: boolean;
                saturday: boolean;
                sunday: boolean;
            };
        }>;
        plannedHours: import("drizzle-orm/pg-core").PgColumn<{
            name: "planned_hours";
            tableName: "team_capacity";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        actualHours: import("drizzle-orm/pg-core").PgColumn<{
            name: "actual_hours";
            tableName: "team_capacity";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        utilizationRate: import("drizzle-orm/pg-core").PgColumn<{
            name: "utilization_rate";
            tableName: "team_capacity";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        focusAreas: import("drizzle-orm/pg-core").PgColumn<{
            name: "focus_areas";
            tableName: "team_capacity";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: string[];
        }>;
        completedTasks: import("drizzle-orm/pg-core").PgColumn<{
            name: "completed_tasks";
            tableName: "team_capacity";
            dataType: "json";
            columnType: "PgJson";
            data: {
                taskId: string;
                taskName: string;
                hoursSpent: number;
                outcome: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                taskId: string;
                taskName: string;
                hoursSpent: number;
                outcome: string;
            }[];
        }>;
        blockers: import("drizzle-orm/pg-core").PgColumn<{
            name: "blockers";
            tableName: "team_capacity";
            dataType: "json";
            columnType: "PgJson";
            data: {
                description: string;
                impact: string;
                resolved: boolean;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                description: string;
                impact: string;
                resolved: boolean;
            }[];
        }>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "team_capacity";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "team_capacity";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "team_capacity";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const businessPillars: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "business_pillars";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "business_pillars";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        pillarName: import("drizzle-orm/pg-core").PgColumn<{
            name: "pillar_name";
            tableName: "business_pillars";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 100;
        }>;
        weekStarting: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_starting";
            tableName: "business_pillars";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "business_pillars";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 20;
        }>;
        healthScore: import("drizzle-orm/pg-core").PgColumn<{
            name: "health_score";
            tableName: "business_pillars";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastWeekWork: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_week_work";
            tableName: "business_pillars";
            dataType: "json";
            columnType: "PgJson";
            data: {
                item: string;
                completed: boolean;
                impact: string;
                owner: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                item: string;
                completed: boolean;
                impact: string;
                owner: string;
            }[];
        }>;
        thisWeekPlan: import("drizzle-orm/pg-core").PgColumn<{
            name: "this_week_plan";
            tableName: "business_pillars";
            dataType: "json";
            columnType: "PgJson";
            data: {
                item: string;
                priority: string;
                owner: string;
                targetOutcome: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                item: string;
                priority: string;
                owner: string;
                targetOutcome: string;
            }[];
        }>;
        keyMetrics: import("drizzle-orm/pg-core").PgColumn<{
            name: "key_metrics";
            tableName: "business_pillars";
            dataType: "json";
            columnType: "PgJson";
            data: {
                metricName: string;
                value: number;
                target: number;
                unit: string;
                trend: "up" | "down" | "stable";
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                metricName: string;
                value: number;
                target: number;
                unit: string;
                trend: "up" | "down" | "stable";
            }[];
        }>;
        challenges: import("drizzle-orm/pg-core").PgColumn<{
            name: "challenges";
            tableName: "business_pillars";
            dataType: "json";
            columnType: "PgJson";
            data: {
                issue: string;
                severity: "low" | "medium" | "high" | "critical";
                mitigation: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                issue: string;
                severity: "low" | "medium" | "high" | "critical";
                mitigation: string;
            }[];
        }>;
        opportunities: import("drizzle-orm/pg-core").PgColumn<{
            name: "opportunities";
            tableName: "business_pillars";
            dataType: "json";
            columnType: "PgJson";
            data: {
                opportunity: string;
                potentialImpact: string;
                requiredResources: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                opportunity: string;
                potentialImpact: string;
                requiredResources: string;
            }[];
        }>;
        ownerUserId: import("drizzle-orm/pg-core").PgColumn<{
            name: "owner_user_id";
            tableName: "business_pillars";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        ownerName: import("drizzle-orm/pg-core").PgColumn<{
            name: "owner_name";
            tableName: "business_pillars";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 100;
        }>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "business_pillars";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "business_pillars";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "business_pillars";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const weeklyPlans: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "weekly_plans";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "weekly_plans";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        weekStarting: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_starting";
            tableName: "weekly_plans";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        weekEnding: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_ending";
            tableName: "weekly_plans";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        weekNumber: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_number";
            tableName: "weekly_plans";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        year: import("drizzle-orm/pg-core").PgColumn<{
            name: "year";
            tableName: "weekly_plans";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        overallHealth: import("drizzle-orm/pg-core").PgColumn<{
            name: "overall_health";
            tableName: "weekly_plans";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 20;
        }>;
        executiveSummary: import("drizzle-orm/pg-core").PgColumn<{
            name: "executive_summary";
            tableName: "weekly_plans";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        previousWeekAssessment: import("drizzle-orm/pg-core").PgColumn<{
            name: "previous_week_assessment";
            tableName: "weekly_plans";
            dataType: "json";
            columnType: "PgJson";
            data: {
                completedItems: Array<{
                    item: string;
                    pillar: string;
                    outcome: string;
                    successLevel: "exceeded" | "met" | "partial" | "failed";
                }>;
                missedItems: Array<{
                    item: string;
                    pillar: string;
                    reason: string;
                    carryForward: boolean;
                }>;
                keyLearnings: string[];
                teamCapacityUtilization: number;
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                completedItems: Array<{
                    item: string;
                    pillar: string;
                    outcome: string;
                    successLevel: "exceeded" | "met" | "partial" | "failed";
                }>;
                missedItems: Array<{
                    item: string;
                    pillar: string;
                    reason: string;
                    carryForward: boolean;
                }>;
                keyLearnings: string[];
                teamCapacityUtilization: number;
            };
        }>;
        prioritizedIdeas: import("drizzle-orm/pg-core").PgColumn<{
            name: "prioritized_ideas";
            tableName: "weekly_plans";
            dataType: "json";
            columnType: "PgJson";
            data: {
                ideaId: string;
                title: string;
                impactScore: number;
                urgencyScore: number;
                priorityMatrix: "do_first" | "schedule" | "delegate" | "eliminate";
                scheduledWeek?: string;
                assignedTo?: string;
                notes?: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                ideaId: string;
                title: string;
                impactScore: number;
                urgencyScore: number;
                priorityMatrix: "do_first" | "schedule" | "delegate" | "eliminate";
                scheduledWeek?: string;
                assignedTo?: string;
                notes?: string;
            }[];
        }>;
        weekPlan: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_plan";
            tableName: "weekly_plans";
            dataType: "json";
            columnType: "PgJson";
            data: {
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
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
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
            };
        }>;
        expectedCapacity: import("drizzle-orm/pg-core").PgColumn<{
            name: "expected_capacity";
            tableName: "weekly_plans";
            dataType: "json";
            columnType: "PgJson";
            data: {
                totalManDays: number;
                byPerson: Record<string, {
                    days: number;
                    availability: string;
                    plannedTasks: string[];
                }>;
                constraints: string[];
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                totalManDays: number;
                byPerson: Record<string, {
                    days: number;
                    availability: string;
                    plannedTasks: string[];
                }>;
                constraints: string[];
            };
        }>;
        pillarsStatus: import("drizzle-orm/pg-core").PgColumn<{
            name: "pillars_status";
            tableName: "weekly_plans";
            dataType: "json";
            columnType: "PgJson";
            data: Record<string, {
                currentHealth: "healthy" | "at_risk" | "critical" | "improving";
                healthScore: number;
                weeklyTrend: "improving" | "stable" | "declining";
                focus: string;
                keyActions: string[];
                owner: string;
            }>;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: Record<string, {
                currentHealth: "healthy" | "at_risk" | "critical" | "improving";
                healthScore: number;
                weeklyTrend: "improving" | "stable" | "declining";
                focus: string;
                keyActions: string[];
                owner: string;
            }>;
        }>;
        risksAndOpportunities: import("drizzle-orm/pg-core").PgColumn<{
            name: "risks_and_opportunities";
            tableName: "weekly_plans";
            dataType: "json";
            columnType: "PgJson";
            data: {
                risks: Array<{
                    risk: string;
                    probability: "low" | "medium" | "high";
                    impact: "low" | "medium" | "high";
                    mitigation: string;
                    owner: string;
                }>;
                opportunities: Array<{
                    opportunity: string;
                    potential: string;
                    nextSteps: string;
                    owner: string;
                }>;
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                risks: Array<{
                    risk: string;
                    probability: "low" | "medium" | "high";
                    impact: "low" | "medium" | "high";
                    mitigation: string;
                    owner: string;
                }>;
                opportunities: Array<{
                    opportunity: string;
                    potential: string;
                    nextSteps: string;
                    owner: string;
                }>;
            };
        }>;
        weeklyMetrics: import("drizzle-orm/pg-core").PgColumn<{
            name: "weekly_metrics";
            tableName: "weekly_plans";
            dataType: "json";
            columnType: "PgJson";
            data: {
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
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
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
            };
        }>;
        additionalNotes: import("drizzle-orm/pg-core").PgColumn<{
            name: "additional_notes";
            tableName: "weekly_plans";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        preparedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "prepared_by";
            tableName: "weekly_plans";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 100;
        }>;
        preparedByUserId: import("drizzle-orm/pg-core").PgColumn<{
            name: "prepared_by_user_id";
            tableName: "weekly_plans";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        reviewedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "reviewed_by";
            tableName: "weekly_plans";
            dataType: "json";
            columnType: "PgJson";
            data: {
                name: string;
                userId?: string;
                reviewedAt: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                name: string;
                userId?: string;
                reviewedAt: string;
            }[];
        }>;
        approvalStatus: import("drizzle-orm/pg-core").PgColumn<{
            name: "approval_status";
            tableName: "weekly_plans";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 20;
        }>;
        publishedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "published_at";
            tableName: "weekly_plans";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "weekly_plans";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "weekly_plans";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const weeklyRetrospectives: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "weekly_retrospectives";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "weekly_retrospectives";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        weekStarting: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_starting";
            tableName: "weekly_retrospectives";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        weekPlanId: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_plan_id";
            tableName: "weekly_retrospectives";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        successes: import("drizzle-orm/pg-core").PgColumn<{
            name: "successes";
            tableName: "weekly_retrospectives";
            dataType: "json";
            columnType: "PgJson";
            data: {
                item: string;
                pillar: string;
                impact: string;
                shouldRepeat: boolean;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                item: string;
                pillar: string;
                impact: string;
                shouldRepeat: boolean;
            }[];
        }>;
        challenges: import("drizzle-orm/pg-core").PgColumn<{
            name: "challenges";
            tableName: "weekly_retrospectives";
            dataType: "json";
            columnType: "PgJson";
            data: {
                item: string;
                pillar: string;
                rootCause: string;
                preventionStrategy: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                item: string;
                pillar: string;
                rootCause: string;
                preventionStrategy: string;
            }[];
        }>;
        keyLearnings: import("drizzle-orm/pg-core").PgColumn<{
            name: "key_learnings";
            tableName: "weekly_retrospectives";
            dataType: "json";
            columnType: "PgJson";
            data: {
                learning: string;
                actionItem: string;
                owner: string;
                dueDate?: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                learning: string;
                actionItem: string;
                owner: string;
                dueDate?: string;
            }[];
        }>;
        processImprovements: import("drizzle-orm/pg-core").PgColumn<{
            name: "process_improvements";
            tableName: "weekly_retrospectives";
            dataType: "json";
            columnType: "PgJson";
            data: {
                currentProcess: string;
                proposedImprovement: string;
                expectedBenefit: string;
                implementationPlan: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                currentProcess: string;
                proposedImprovement: string;
                expectedBenefit: string;
                implementationPlan: string;
            }[];
        }>;
        teamFeedback: import("drizzle-orm/pg-core").PgColumn<{
            name: "team_feedback";
            tableName: "weekly_retrospectives";
            dataType: "json";
            columnType: "PgJson";
            data: {
                feedbackFrom: string;
                category: string;
                feedback: string;
                actionRequired: boolean;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                feedbackFrom: string;
                category: string;
                feedback: string;
                actionRequired: boolean;
            }[];
        }>;
        metricsReview: import("drizzle-orm/pg-core").PgColumn<{
            name: "metrics_review";
            tableName: "weekly_retrospectives";
            dataType: "json";
            columnType: "PgJson";
            data: {
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
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
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
            };
        }>;
        facilitatedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "facilitated_by";
            tableName: "weekly_retrospectives";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 100;
        }>;
        participantCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "participant_count";
            tableName: "weekly_retrospectives";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        overallSentiment: import("drizzle-orm/pg-core").PgColumn<{
            name: "overall_sentiment";
            tableName: "weekly_retrospectives";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 20;
        }>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "weekly_retrospectives";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "weekly_retrospectives";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const insertWeeklyIdeaSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    submittedBy: z.ZodString;
    submittedByUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    category: z.ZodString;
    impactScore: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    urgencyScore: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    effortEstimate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resourcesRequired: z.ZodOptional<z.ZodNullable<z.ZodType<{
        people?: string[];
        budget?: number;
        tools?: string[];
        time?: string;
    }, z.ZodTypeDef, {
        people?: string[];
        budget?: number;
        tools?: string[];
        time?: string;
    }>>>;
    status: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    weekSubmitted: z.ZodOptional<z.ZodString>;
    targetImplementationWeek: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    actualImplementationWeek: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    implementationNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    outcomes: z.ZodOptional<z.ZodNullable<z.ZodType<{
        measuredImpact?: string;
        lessonsLearned?: string[];
        followUpActions?: string[];
    }, z.ZodTypeDef, {
        measuredImpact?: string;
        lessonsLearned?: string[];
        followUpActions?: string[];
    }>>>;
    tags: z.ZodOptional<z.ZodNullable<z.ZodType<string[], z.ZodTypeDef, string[]>>>;
    attachments: z.ZodOptional<z.ZodNullable<z.ZodType<{
        name: string;
        url: string;
        type: string;
    }[], z.ZodTypeDef, {
        name: string;
        url: string;
        type: string;
    }[]>>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    category: string;
    submittedBy: string;
    status?: string | undefined;
    priority?: string | null | undefined;
    submittedByUserId?: string | null | undefined;
    impactScore?: number | null | undefined;
    urgencyScore?: number | null | undefined;
    effortEstimate?: string | null | undefined;
    resourcesRequired?: {
        people?: string[];
        budget?: number;
        tools?: string[];
        time?: string;
    } | null | undefined;
    weekSubmitted?: string | undefined;
    targetImplementationWeek?: string | null | undefined;
    actualImplementationWeek?: string | null | undefined;
    rejectionReason?: string | null | undefined;
    implementationNotes?: string | null | undefined;
    outcomes?: {
        measuredImpact?: string;
        lessonsLearned?: string[];
        followUpActions?: string[];
    } | null | undefined;
    tags?: string[] | null | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
    }[] | null | undefined;
}, {
    description: string;
    title: string;
    category: string;
    submittedBy: string;
    status?: string | undefined;
    priority?: string | null | undefined;
    submittedByUserId?: string | null | undefined;
    impactScore?: number | null | undefined;
    urgencyScore?: number | null | undefined;
    effortEstimate?: string | null | undefined;
    resourcesRequired?: {
        people?: string[];
        budget?: number;
        tools?: string[];
        time?: string;
    } | null | undefined;
    weekSubmitted?: string | undefined;
    targetImplementationWeek?: string | null | undefined;
    actualImplementationWeek?: string | null | undefined;
    rejectionReason?: string | null | undefined;
    implementationNotes?: string | null | undefined;
    outcomes?: {
        measuredImpact?: string;
        lessonsLearned?: string[];
        followUpActions?: string[];
    } | null | undefined;
    tags?: string[] | null | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
    }[] | null | undefined;
}>;
export declare const insertTeamCapacitySchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
    userName: z.ZodString;
    weekStarting: z.ZodString;
    plannedDays: z.ZodType<{
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    }, z.ZodTypeDef, {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    }>;
    actualDays: z.ZodOptional<z.ZodNullable<z.ZodType<{
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    }, z.ZodTypeDef, {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    }>>>;
    plannedHours: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    actualHours: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    utilizationRate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    focusAreas: z.ZodOptional<z.ZodNullable<z.ZodType<string[], z.ZodTypeDef, string[]>>>;
    completedTasks: z.ZodOptional<z.ZodNullable<z.ZodType<{
        taskId: string;
        taskName: string;
        hoursSpent: number;
        outcome: string;
    }[], z.ZodTypeDef, {
        taskId: string;
        taskName: string;
        hoursSpent: number;
        outcome: string;
    }[]>>>;
    blockers: z.ZodOptional<z.ZodNullable<z.ZodType<{
        description: string;
        impact: string;
        resolved: boolean;
    }[], z.ZodTypeDef, {
        description: string;
        impact: string;
        resolved: boolean;
    }[]>>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    userId: string;
    userName: string;
    weekStarting: string;
    plannedDays: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    };
    notes?: string | null | undefined;
    actualDays?: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    } | null | undefined;
    plannedHours?: string | null | undefined;
    actualHours?: string | null | undefined;
    utilizationRate?: string | null | undefined;
    focusAreas?: string[] | null | undefined;
    completedTasks?: {
        taskId: string;
        taskName: string;
        hoursSpent: number;
        outcome: string;
    }[] | null | undefined;
    blockers?: {
        description: string;
        impact: string;
        resolved: boolean;
    }[] | null | undefined;
}, {
    userId: string;
    userName: string;
    weekStarting: string;
    plannedDays: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    };
    notes?: string | null | undefined;
    actualDays?: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    } | null | undefined;
    plannedHours?: string | null | undefined;
    actualHours?: string | null | undefined;
    utilizationRate?: string | null | undefined;
    focusAreas?: string[] | null | undefined;
    completedTasks?: {
        taskId: string;
        taskName: string;
        hoursSpent: number;
        outcome: string;
    }[] | null | undefined;
    blockers?: {
        description: string;
        impact: string;
        resolved: boolean;
    }[] | null | undefined;
}>;
export declare const insertBusinessPillarSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    pillarName: z.ZodString;
    weekStarting: z.ZodString;
    status: z.ZodString;
    healthScore: z.ZodNumber;
    lastWeekWork: z.ZodOptional<z.ZodNullable<z.ZodType<{
        item: string;
        completed: boolean;
        impact: string;
        owner: string;
    }[], z.ZodTypeDef, {
        item: string;
        completed: boolean;
        impact: string;
        owner: string;
    }[]>>>;
    thisWeekPlan: z.ZodOptional<z.ZodNullable<z.ZodType<{
        item: string;
        priority: string;
        owner: string;
        targetOutcome: string;
    }[], z.ZodTypeDef, {
        item: string;
        priority: string;
        owner: string;
        targetOutcome: string;
    }[]>>>;
    keyMetrics: z.ZodOptional<z.ZodNullable<z.ZodType<{
        metricName: string;
        value: number;
        target: number;
        unit: string;
        trend: "up" | "down" | "stable";
    }[], z.ZodTypeDef, {
        metricName: string;
        value: number;
        target: number;
        unit: string;
        trend: "up" | "down" | "stable";
    }[]>>>;
    challenges: z.ZodOptional<z.ZodNullable<z.ZodType<{
        issue: string;
        severity: "low" | "medium" | "high" | "critical";
        mitigation: string;
    }[], z.ZodTypeDef, {
        issue: string;
        severity: "low" | "medium" | "high" | "critical";
        mitigation: string;
    }[]>>>;
    opportunities: z.ZodOptional<z.ZodNullable<z.ZodType<{
        opportunity: string;
        potentialImpact: string;
        requiredResources: string;
    }[], z.ZodTypeDef, {
        opportunity: string;
        potentialImpact: string;
        requiredResources: string;
    }[]>>>;
    ownerUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    ownerName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    status: string;
    weekStarting: string;
    pillarName: string;
    healthScore: number;
    notes?: string | null | undefined;
    lastWeekWork?: {
        item: string;
        completed: boolean;
        impact: string;
        owner: string;
    }[] | null | undefined;
    thisWeekPlan?: {
        item: string;
        priority: string;
        owner: string;
        targetOutcome: string;
    }[] | null | undefined;
    keyMetrics?: {
        metricName: string;
        value: number;
        target: number;
        unit: string;
        trend: "up" | "down" | "stable";
    }[] | null | undefined;
    challenges?: {
        issue: string;
        severity: "low" | "medium" | "high" | "critical";
        mitigation: string;
    }[] | null | undefined;
    opportunities?: {
        opportunity: string;
        potentialImpact: string;
        requiredResources: string;
    }[] | null | undefined;
    ownerUserId?: string | null | undefined;
    ownerName?: string | null | undefined;
}, {
    status: string;
    weekStarting: string;
    pillarName: string;
    healthScore: number;
    notes?: string | null | undefined;
    lastWeekWork?: {
        item: string;
        completed: boolean;
        impact: string;
        owner: string;
    }[] | null | undefined;
    thisWeekPlan?: {
        item: string;
        priority: string;
        owner: string;
        targetOutcome: string;
    }[] | null | undefined;
    keyMetrics?: {
        metricName: string;
        value: number;
        target: number;
        unit: string;
        trend: "up" | "down" | "stable";
    }[] | null | undefined;
    challenges?: {
        issue: string;
        severity: "low" | "medium" | "high" | "critical";
        mitigation: string;
    }[] | null | undefined;
    opportunities?: {
        opportunity: string;
        potentialImpact: string;
        requiredResources: string;
    }[] | null | undefined;
    ownerUserId?: string | null | undefined;
    ownerName?: string | null | undefined;
}>;
export declare const insertWeeklyPlanSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    weekStarting: z.ZodString;
    weekEnding: z.ZodString;
    weekNumber: z.ZodNumber;
    year: z.ZodNumber;
    overallHealth: z.ZodString;
    executiveSummary: z.ZodString;
    previousWeekAssessment: z.ZodOptional<z.ZodNullable<z.ZodType<{
        completedItems: Array<{
            item: string;
            pillar: string;
            outcome: string;
            successLevel: "exceeded" | "met" | "partial" | "failed";
        }>;
        missedItems: Array<{
            item: string;
            pillar: string;
            reason: string;
            carryForward: boolean;
        }>;
        keyLearnings: string[];
        teamCapacityUtilization: number;
    }, z.ZodTypeDef, {
        completedItems: Array<{
            item: string;
            pillar: string;
            outcome: string;
            successLevel: "exceeded" | "met" | "partial" | "failed";
        }>;
        missedItems: Array<{
            item: string;
            pillar: string;
            reason: string;
            carryForward: boolean;
        }>;
        keyLearnings: string[];
        teamCapacityUtilization: number;
    }>>>;
    prioritizedIdeas: z.ZodOptional<z.ZodNullable<z.ZodType<{
        ideaId: string;
        title: string;
        impactScore: number;
        urgencyScore: number;
        priorityMatrix: "do_first" | "schedule" | "delegate" | "eliminate";
        scheduledWeek?: string;
        assignedTo?: string;
        notes?: string;
    }[], z.ZodTypeDef, {
        ideaId: string;
        title: string;
        impactScore: number;
        urgencyScore: number;
        priorityMatrix: "do_first" | "schedule" | "delegate" | "eliminate";
        scheduledWeek?: string;
        assignedTo?: string;
        notes?: string;
    }[]>>>;
    weekPlan: z.ZodOptional<z.ZodNullable<z.ZodType<{
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
    }, z.ZodTypeDef, {
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
    }>>>;
    expectedCapacity: z.ZodOptional<z.ZodNullable<z.ZodType<{
        totalManDays: number;
        byPerson: Record<string, {
            days: number;
            availability: string;
            plannedTasks: string[];
        }>;
        constraints: string[];
    }, z.ZodTypeDef, {
        totalManDays: number;
        byPerson: Record<string, {
            days: number;
            availability: string;
            plannedTasks: string[];
        }>;
        constraints: string[];
    }>>>;
    pillarsStatus: z.ZodOptional<z.ZodNullable<z.ZodType<Record<string, {
        currentHealth: "healthy" | "at_risk" | "critical" | "improving";
        healthScore: number;
        weeklyTrend: "improving" | "stable" | "declining";
        focus: string;
        keyActions: string[];
        owner: string;
    }>, z.ZodTypeDef, Record<string, {
        currentHealth: "healthy" | "at_risk" | "critical" | "improving";
        healthScore: number;
        weeklyTrend: "improving" | "stable" | "declining";
        focus: string;
        keyActions: string[];
        owner: string;
    }>>>>;
    risksAndOpportunities: z.ZodOptional<z.ZodNullable<z.ZodType<{
        risks: Array<{
            risk: string;
            probability: "low" | "medium" | "high";
            impact: "low" | "medium" | "high";
            mitigation: string;
            owner: string;
        }>;
        opportunities: Array<{
            opportunity: string;
            potential: string;
            nextSteps: string;
            owner: string;
        }>;
    }, z.ZodTypeDef, {
        risks: Array<{
            risk: string;
            probability: "low" | "medium" | "high";
            impact: "low" | "medium" | "high";
            mitigation: string;
            owner: string;
        }>;
        opportunities: Array<{
            opportunity: string;
            potential: string;
            nextSteps: string;
            owner: string;
        }>;
    }>>>;
    weeklyMetrics: z.ZodOptional<z.ZodNullable<z.ZodType<{
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
    }, z.ZodTypeDef, {
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
    }>>>;
    additionalNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    preparedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    preparedByUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewedBy: z.ZodOptional<z.ZodNullable<z.ZodType<{
        name: string;
        userId?: string;
        reviewedAt: string;
    }[], z.ZodTypeDef, {
        name: string;
        userId?: string;
        reviewedAt: string;
    }[]>>>;
    approvalStatus: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    publishedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    weekEnding: string;
    weekStarting: string;
    weekNumber: number;
    year: number;
    overallHealth: string;
    executiveSummary: string;
    previousWeekAssessment?: {
        completedItems: Array<{
            item: string;
            pillar: string;
            outcome: string;
            successLevel: "exceeded" | "met" | "partial" | "failed";
        }>;
        missedItems: Array<{
            item: string;
            pillar: string;
            reason: string;
            carryForward: boolean;
        }>;
        keyLearnings: string[];
        teamCapacityUtilization: number;
    } | null | undefined;
    prioritizedIdeas?: {
        ideaId: string;
        title: string;
        impactScore: number;
        urgencyScore: number;
        priorityMatrix: "do_first" | "schedule" | "delegate" | "eliminate";
        scheduledWeek?: string;
        assignedTo?: string;
        notes?: string;
    }[] | null | undefined;
    weekPlan?: {
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
    } | null | undefined;
    expectedCapacity?: {
        totalManDays: number;
        byPerson: Record<string, {
            days: number;
            availability: string;
            plannedTasks: string[];
        }>;
        constraints: string[];
    } | null | undefined;
    pillarsStatus?: Record<string, {
        currentHealth: "healthy" | "at_risk" | "critical" | "improving";
        healthScore: number;
        weeklyTrend: "improving" | "stable" | "declining";
        focus: string;
        keyActions: string[];
        owner: string;
    }> | null | undefined;
    risksAndOpportunities?: {
        risks: Array<{
            risk: string;
            probability: "low" | "medium" | "high";
            impact: "low" | "medium" | "high";
            mitigation: string;
            owner: string;
        }>;
        opportunities: Array<{
            opportunity: string;
            potential: string;
            nextSteps: string;
            owner: string;
        }>;
    } | null | undefined;
    weeklyMetrics?: {
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
    } | null | undefined;
    additionalNotes?: string | null | undefined;
    preparedBy?: string | null | undefined;
    preparedByUserId?: string | null | undefined;
    reviewedBy?: {
        name: string;
        userId?: string;
        reviewedAt: string;
    }[] | null | undefined;
    approvalStatus?: string | null | undefined;
    publishedAt?: Date | null | undefined;
}, {
    weekEnding: string;
    weekStarting: string;
    weekNumber: number;
    year: number;
    overallHealth: string;
    executiveSummary: string;
    previousWeekAssessment?: {
        completedItems: Array<{
            item: string;
            pillar: string;
            outcome: string;
            successLevel: "exceeded" | "met" | "partial" | "failed";
        }>;
        missedItems: Array<{
            item: string;
            pillar: string;
            reason: string;
            carryForward: boolean;
        }>;
        keyLearnings: string[];
        teamCapacityUtilization: number;
    } | null | undefined;
    prioritizedIdeas?: {
        ideaId: string;
        title: string;
        impactScore: number;
        urgencyScore: number;
        priorityMatrix: "do_first" | "schedule" | "delegate" | "eliminate";
        scheduledWeek?: string;
        assignedTo?: string;
        notes?: string;
    }[] | null | undefined;
    weekPlan?: {
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
    } | null | undefined;
    expectedCapacity?: {
        totalManDays: number;
        byPerson: Record<string, {
            days: number;
            availability: string;
            plannedTasks: string[];
        }>;
        constraints: string[];
    } | null | undefined;
    pillarsStatus?: Record<string, {
        currentHealth: "healthy" | "at_risk" | "critical" | "improving";
        healthScore: number;
        weeklyTrend: "improving" | "stable" | "declining";
        focus: string;
        keyActions: string[];
        owner: string;
    }> | null | undefined;
    risksAndOpportunities?: {
        risks: Array<{
            risk: string;
            probability: "low" | "medium" | "high";
            impact: "low" | "medium" | "high";
            mitigation: string;
            owner: string;
        }>;
        opportunities: Array<{
            opportunity: string;
            potential: string;
            nextSteps: string;
            owner: string;
        }>;
    } | null | undefined;
    weeklyMetrics?: {
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
    } | null | undefined;
    additionalNotes?: string | null | undefined;
    preparedBy?: string | null | undefined;
    preparedByUserId?: string | null | undefined;
    reviewedBy?: {
        name: string;
        userId?: string;
        reviewedAt: string;
    }[] | null | undefined;
    approvalStatus?: string | null | undefined;
    publishedAt?: Date | null | undefined;
}>;
export declare const insertWeeklyRetrospectiveSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    weekStarting: z.ZodString;
    weekPlanId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    successes: z.ZodOptional<z.ZodNullable<z.ZodType<{
        item: string;
        pillar: string;
        impact: string;
        shouldRepeat: boolean;
    }[], z.ZodTypeDef, {
        item: string;
        pillar: string;
        impact: string;
        shouldRepeat: boolean;
    }[]>>>;
    challenges: z.ZodOptional<z.ZodNullable<z.ZodType<{
        item: string;
        pillar: string;
        rootCause: string;
        preventionStrategy: string;
    }[], z.ZodTypeDef, {
        item: string;
        pillar: string;
        rootCause: string;
        preventionStrategy: string;
    }[]>>>;
    keyLearnings: z.ZodOptional<z.ZodNullable<z.ZodType<{
        learning: string;
        actionItem: string;
        owner: string;
        dueDate?: string;
    }[], z.ZodTypeDef, {
        learning: string;
        actionItem: string;
        owner: string;
        dueDate?: string;
    }[]>>>;
    processImprovements: z.ZodOptional<z.ZodNullable<z.ZodType<{
        currentProcess: string;
        proposedImprovement: string;
        expectedBenefit: string;
        implementationPlan: string;
    }[], z.ZodTypeDef, {
        currentProcess: string;
        proposedImprovement: string;
        expectedBenefit: string;
        implementationPlan: string;
    }[]>>>;
    teamFeedback: z.ZodOptional<z.ZodNullable<z.ZodType<{
        feedbackFrom: string;
        category: string;
        feedback: string;
        actionRequired: boolean;
    }[], z.ZodTypeDef, {
        feedbackFrom: string;
        category: string;
        feedback: string;
        actionRequired: boolean;
    }[]>>>;
    metricsReview: z.ZodOptional<z.ZodNullable<z.ZodType<{
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
    }, z.ZodTypeDef, {
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
    }>>>;
    facilitatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    participantCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    overallSentiment: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    weekStarting: string;
    challenges?: {
        item: string;
        pillar: string;
        rootCause: string;
        preventionStrategy: string;
    }[] | null | undefined;
    weekPlanId?: string | null | undefined;
    successes?: {
        item: string;
        pillar: string;
        impact: string;
        shouldRepeat: boolean;
    }[] | null | undefined;
    keyLearnings?: {
        learning: string;
        actionItem: string;
        owner: string;
        dueDate?: string;
    }[] | null | undefined;
    processImprovements?: {
        currentProcess: string;
        proposedImprovement: string;
        expectedBenefit: string;
        implementationPlan: string;
    }[] | null | undefined;
    teamFeedback?: {
        feedbackFrom: string;
        category: string;
        feedback: string;
        actionRequired: boolean;
    }[] | null | undefined;
    metricsReview?: {
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
    } | null | undefined;
    facilitatedBy?: string | null | undefined;
    participantCount?: number | null | undefined;
    overallSentiment?: string | null | undefined;
}, {
    weekStarting: string;
    challenges?: {
        item: string;
        pillar: string;
        rootCause: string;
        preventionStrategy: string;
    }[] | null | undefined;
    weekPlanId?: string | null | undefined;
    successes?: {
        item: string;
        pillar: string;
        impact: string;
        shouldRepeat: boolean;
    }[] | null | undefined;
    keyLearnings?: {
        learning: string;
        actionItem: string;
        owner: string;
        dueDate?: string;
    }[] | null | undefined;
    processImprovements?: {
        currentProcess: string;
        proposedImprovement: string;
        expectedBenefit: string;
        implementationPlan: string;
    }[] | null | undefined;
    teamFeedback?: {
        feedbackFrom: string;
        category: string;
        feedback: string;
        actionRequired: boolean;
    }[] | null | undefined;
    metricsReview?: {
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
    } | null | undefined;
    facilitatedBy?: string | null | undefined;
    participantCount?: number | null | undefined;
    overallSentiment?: string | null | undefined;
}>;
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
//# sourceMappingURL=weekly-process-schema.d.ts.map