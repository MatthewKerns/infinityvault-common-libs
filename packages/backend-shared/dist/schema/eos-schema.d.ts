import { z } from "zod";
export declare const vision: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_vision";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_vision";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        coreValues: import("drizzle-orm/pg-core").PgColumn<{
            name: "core_values";
            tableName: "eos_vision";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        coreCustomers: import("drizzle-orm/pg-core").PgColumn<{
            name: "core_customers";
            tableName: "eos_vision";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        niche: import("drizzle-orm/pg-core").PgColumn<{
            name: "niche";
            tableName: "eos_vision";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        tenYearTarget: import("drizzle-orm/pg-core").PgColumn<{
            name: "ten_year_target";
            tableName: "eos_vision";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        marketingStrategy: import("drizzle-orm/pg-core").PgColumn<{
            name: "marketing_strategy";
            tableName: "eos_vision";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        threeYearPicture: import("drizzle-orm/pg-core").PgColumn<{
            name: "three_year_picture";
            tableName: "eos_vision";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        oneYearPlan: import("drizzle-orm/pg-core").PgColumn<{
            name: "one_year_plan";
            tableName: "eos_vision";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        quarterlyTheme: import("drizzle-orm/pg-core").PgColumn<{
            name: "quarterly_theme";
            tableName: "eos_vision";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_vision";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_vision";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const seats: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_seats";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_seats";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "eos_seats";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        accountabilityChartPosition: import("drizzle-orm/pg-core").PgColumn<{
            name: "accountability_chart_position";
            tableName: "eos_seats";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        roles: import("drizzle-orm/pg-core").PgColumn<{
            name: "roles";
            tableName: "eos_seats";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        responsibilities: import("drizzle-orm/pg-core").PgColumn<{
            name: "responsibilities";
            tableName: "eos_seats";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        kpis: import("drizzle-orm/pg-core").PgColumn<{
            name: "kpis";
            tableName: "eos_seats";
            dataType: "json";
            columnType: "PgJson";
            data: {
                name: string;
                target: number;
                unit: string;
                frequency: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        assignedTo: import("drizzle-orm/pg-core").PgColumn<{
            name: "assigned_to";
            tableName: "eos_seats";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        gwd: import("drizzle-orm/pg-core").PgColumn<{
            name: "gwd";
            tableName: "eos_seats";
            dataType: "json";
            columnType: "PgJson";
            data: {
                gets: boolean;
                wants: boolean;
                capacity: boolean;
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        coreValues: import("drizzle-orm/pg-core").PgColumn<{
            name: "core_values";
            tableName: "eos_seats";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        isActive: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_active";
            tableName: "eos_seats";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_seats";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_seats";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const personalScorecards: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_personal_scorecards";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_personal_scorecards";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        seatId: import("drizzle-orm/pg-core").PgColumn<{
            name: "seat_id";
            tableName: "eos_personal_scorecards";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        weekEnding: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_ending";
            tableName: "eos_personal_scorecards";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        kpiScores: import("drizzle-orm/pg-core").PgColumn<{
            name: "kpi_scores";
            tableName: "eos_personal_scorecards";
            dataType: "json";
            columnType: "PgJson";
            data: Record<string, number>;
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "eos_personal_scorecards";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_personal_scorecards";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const scorecardMetrics: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_scorecard_metrics";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_scorecard_metrics";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "eos_scorecard_metrics";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        owner: import("drizzle-orm/pg-core").PgColumn<{
            name: "owner";
            tableName: "eos_scorecard_metrics";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        target: import("drizzle-orm/pg-core").PgColumn<{
            name: "target";
            tableName: "eos_scorecard_metrics";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        unit: import("drizzle-orm/pg-core").PgColumn<{
            name: "unit";
            tableName: "eos_scorecard_metrics";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        frequency: import("drizzle-orm/pg-core").PgColumn<{
            name: "frequency";
            tableName: "eos_scorecard_metrics";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        category: import("drizzle-orm/pg-core").PgColumn<{
            name: "category";
            tableName: "eos_scorecard_metrics";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        formula: import("drizzle-orm/pg-core").PgColumn<{
            name: "formula";
            tableName: "eos_scorecard_metrics";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        isActive: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_active";
            tableName: "eos_scorecard_metrics";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_scorecard_metrics";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_scorecard_metrics";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const weeklyScorecard: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_weekly_scorecard";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_weekly_scorecard";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        weekEnding: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_ending";
            tableName: "eos_weekly_scorecard";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        metricId: import("drizzle-orm/pg-core").PgColumn<{
            name: "metric_id";
            tableName: "eos_weekly_scorecard";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        actualValue: import("drizzle-orm/pg-core").PgColumn<{
            name: "actual_value";
            tableName: "eos_weekly_scorecard";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        targetValue: import("drizzle-orm/pg-core").PgColumn<{
            name: "target_value";
            tableName: "eos_weekly_scorecard";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        variance: import("drizzle-orm/pg-core").PgColumn<{
            name: "variance";
            tableName: "eos_weekly_scorecard";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "eos_weekly_scorecard";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        redFlag: import("drizzle-orm/pg-core").PgColumn<{
            name: "red_flag";
            tableName: "eos_weekly_scorecard";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_weekly_scorecard";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const issueCategories: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_issue_categories";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_issue_categories";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "eos_issue_categories";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "eos_issue_categories";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        color: import("drizzle-orm/pg-core").PgColumn<{
            name: "color";
            tableName: "eos_issue_categories";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        isActive: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_active";
            tableName: "eos_issue_categories";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const issues: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_issues";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_issues";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "eos_issues";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        category: import("drizzle-orm/pg-core").PgColumn<{
            name: "category";
            tableName: "eos_issues";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "eos_issues";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_issues";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        impactLevel: import("drizzle-orm/pg-core").PgColumn<{
            name: "impact_level";
            tableName: "eos_issues";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        assignedTo: import("drizzle-orm/pg-core").PgColumn<{
            name: "assigned_to";
            tableName: "eos_issues";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdFrom: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_from";
            tableName: "eos_issues";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        resolutionNotes: import("drizzle-orm/pg-core").PgColumn<{
            name: "resolution_notes";
            tableName: "eos_issues";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        linksToVision: import("drizzle-orm/pg-core").PgColumn<{
            name: "links_to_vision";
            tableName: "eos_issues";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_issues";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_issues";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const meetings: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_meetings";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_meetings";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        type: import("drizzle-orm/pg-core").PgColumn<{
            name: "type";
            tableName: "eos_meetings";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        date: import("drizzle-orm/pg-core").PgColumn<{
            name: "date";
            tableName: "eos_meetings";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        attendees: import("drizzle-orm/pg-core").PgColumn<{
            name: "attendees";
            tableName: "eos_meetings";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        agenda: import("drizzle-orm/pg-core").PgColumn<{
            name: "agenda";
            tableName: "eos_meetings";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        issuesDiscussed: import("drizzle-orm/pg-core").PgColumn<{
            name: "issues_discussed";
            tableName: "eos_meetings";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        decisionsmade: import("drizzle-orm/pg-core").PgColumn<{
            name: "decisions_made";
            tableName: "eos_meetings";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        actionItems: import("drizzle-orm/pg-core").PgColumn<{
            name: "action_items";
            tableName: "eos_meetings";
            dataType: "json";
            columnType: "PgJson";
            data: {
                task: string;
                assignedTo: string;
                dueDate: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        rockUpdates: import("drizzle-orm/pg-core").PgColumn<{
            name: "rock_updates";
            tableName: "eos_meetings";
            dataType: "json";
            columnType: "PgJson";
            data: {
                rockId: string;
                progress: number;
                notes: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        scorecardReview: import("drizzle-orm/pg-core").PgColumn<{
            name: "scorecard_review";
            tableName: "eos_meetings";
            dataType: "json";
            columnType: "PgJson";
            data: Record<string, any>;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        meetingRating: import("drizzle-orm/pg-core").PgColumn<{
            name: "meeting_rating";
            tableName: "eos_meetings";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        rawTranscript: import("drizzle-orm/pg-core").PgColumn<{
            name: "raw_transcript";
            tableName: "eos_meetings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_meetings";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const todos: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_todos";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_todos";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "eos_todos";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        assignedTo: import("drizzle-orm/pg-core").PgColumn<{
            name: "assigned_to";
            tableName: "eos_todos";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        dueDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "due_date";
            tableName: "eos_todos";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        priority: import("drizzle-orm/pg-core").PgColumn<{
            name: "priority";
            tableName: "eos_todos";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_todos";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "eos_todos";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdFrom: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_from";
            tableName: "eos_todos";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        completedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "completed_at";
            tableName: "eos_todos";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_todos";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_todos";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const rocks: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_rocks";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_rocks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        userId: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "eos_rocks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "eos_rocks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        owner: import("drizzle-orm/pg-core").PgColumn<{
            name: "owner";
            tableName: "eos_rocks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        quarter: import("drizzle-orm/pg-core").PgColumn<{
            name: "quarter";
            tableName: "eos_rocks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        dueDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "due_date";
            tableName: "eos_rocks";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_rocks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        completionPercentage: import("drizzle-orm/pg-core").PgColumn<{
            name: "completion_percentage";
            tableName: "eos_rocks";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        milestones: import("drizzle-orm/pg-core").PgColumn<{
            name: "milestones";
            tableName: "eos_rocks";
            dataType: "json";
            columnType: "PgJson";
            data: {
                title: string;
                dueDate: string;
                completed: boolean;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        linksToVision: import("drizzle-orm/pg-core").PgColumn<{
            name: "links_to_vision";
            tableName: "eos_rocks";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        impactTags: import("drizzle-orm/pg-core").PgColumn<{
            name: "impact_tags";
            tableName: "eos_rocks";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "eos_rocks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_rocks";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_rocks";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const rockUpdates: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_rock_updates";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_rock_updates";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        rockId: import("drizzle-orm/pg-core").PgColumn<{
            name: "rock_id";
            tableName: "eos_rock_updates";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        updateDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "update_date";
            tableName: "eos_rock_updates";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        progressPercentage: import("drizzle-orm/pg-core").PgColumn<{
            name: "progress_percentage";
            tableName: "eos_rock_updates";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_rock_updates";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "eos_rock_updates";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_rock_updates";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const missionThemes: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_mission_themes";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_mission_themes";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "eos_mission_themes";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        displayName: import("drizzle-orm/pg-core").PgColumn<{
            name: "display_name";
            tableName: "eos_mission_themes";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        progressMeterName: import("drizzle-orm/pg-core").PgColumn<{
            name: "progress_meter_name";
            tableName: "eos_mission_themes";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        completionTerm: import("drizzle-orm/pg-core").PgColumn<{
            name: "completion_term";
            tableName: "eos_mission_themes";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        pointsName: import("drizzle-orm/pg-core").PgColumn<{
            name: "points_name";
            tableName: "eos_mission_themes";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        iconSet: import("drizzle-orm/pg-core").PgColumn<{
            name: "icon_set";
            tableName: "eos_mission_themes";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        colorScheme: import("drizzle-orm/pg-core").PgColumn<{
            name: "color_scheme";
            tableName: "eos_mission_themes";
            dataType: "json";
            columnType: "PgJson";
            data: {
                primary: string;
                secondary: string;
                accent: string;
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        isActive: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_active";
            tableName: "eos_mission_themes";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_mission_themes";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const playerProfiles: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_player_profiles";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_player_profiles";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        userId: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "eos_player_profiles";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        playerName: import("drizzle-orm/pg-core").PgColumn<{
            name: "player_name";
            tableName: "eos_player_profiles";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        preferredThemeId: import("drizzle-orm/pg-core").PgColumn<{
            name: "preferred_theme_id";
            tableName: "eos_player_profiles";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        totalPoints: import("drizzle-orm/pg-core").PgColumn<{
            name: "total_points";
            tableName: "eos_player_profiles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        level: import("drizzle-orm/pg-core").PgColumn<{
            name: "level";
            tableName: "eos_player_profiles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        currentStreak: import("drizzle-orm/pg-core").PgColumn<{
            name: "current_streak";
            tableName: "eos_player_profiles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        longestStreak: import("drizzle-orm/pg-core").PgColumn<{
            name: "longest_streak";
            tableName: "eos_player_profiles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        totalMissionsCompleted: import("drizzle-orm/pg-core").PgColumn<{
            name: "total_missions_completed";
            tableName: "eos_player_profiles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        totalMilestonesCompleted: import("drizzle-orm/pg-core").PgColumn<{
            name: "total_milestones_completed";
            tableName: "eos_player_profiles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        averageCompletionTime: import("drizzle-orm/pg-core").PgColumn<{
            name: "average_completion_time";
            tableName: "eos_player_profiles";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        preferredRewardTypes: import("drizzle-orm/pg-core").PgColumn<{
            name: "preferred_reward_types";
            tableName: "eos_player_profiles";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        gamificationSettings: import("drizzle-orm/pg-core").PgColumn<{
            name: "gamification_settings";
            tableName: "eos_player_profiles";
            dataType: "json";
            columnType: "PgJson";
            data: {
                showLeaderboard: boolean;
                enableNotifications: boolean;
                showProgressBadges: boolean;
                enableCompetitiveMode: boolean;
            };
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_player_profiles";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_player_profiles";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const missions: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_missions";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        legacyRockId: import("drizzle-orm/pg-core").PgColumn<{
            name: "legacy_rock_id";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        ownerId: import("drizzle-orm/pg-core").PgColumn<{
            name: "owner_id";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        quarter: import("drizzle-orm/pg-core").PgColumn<{
            name: "quarter";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        dueDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "due_date";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        completionPercentage: import("drizzle-orm/pg-core").PgColumn<{
            name: "completion_percentage";
            tableName: "eos_missions";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        difficultyLevel: import("drizzle-orm/pg-core").PgColumn<{
            name: "difficulty_level";
            tableName: "eos_missions";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        estimatedHours: import("drizzle-orm/pg-core").PgColumn<{
            name: "estimated_hours";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        actualHours: import("drizzle-orm/pg-core").PgColumn<{
            name: "actual_hours";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        basePoints: import("drizzle-orm/pg-core").PgColumn<{
            name: "base_points";
            tableName: "eos_missions";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        bonusPointsEarned: import("drizzle-orm/pg-core").PgColumn<{
            name: "bonus_points_earned";
            tableName: "eos_missions";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        qualityScore: import("drizzle-orm/pg-core").PgColumn<{
            name: "quality_score";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        impactScore: import("drizzle-orm/pg-core").PgColumn<{
            name: "impact_score";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        linksToVision: import("drizzle-orm/pg-core").PgColumn<{
            name: "links_to_vision";
            tableName: "eos_missions";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        impactTags: import("drizzle-orm/pg-core").PgColumn<{
            name: "impact_tags";
            tableName: "eos_missions";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        collaborators: import("drizzle-orm/pg-core").PgColumn<{
            name: "collaborators";
            tableName: "eos_missions";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        isTeamMission: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_team_mission";
            tableName: "eos_missions";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        customThemeOverride: import("drizzle-orm/pg-core").PgColumn<{
            name: "custom_theme_override";
            tableName: "eos_missions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        successCriteria: import("drizzle-orm/pg-core").PgColumn<{
            name: "success_criteria";
            tableName: "eos_missions";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        startedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "started_at";
            tableName: "eos_missions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        completedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "completed_at";
            tableName: "eos_missions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_missions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_missions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const milestones: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_milestones";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_milestones";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        missionId: import("drizzle-orm/pg-core").PgColumn<{
            name: "mission_id";
            tableName: "eos_milestones";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "eos_milestones";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "eos_milestones";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        dueDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "due_date";
            tableName: "eos_milestones";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_milestones";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        points: import("drizzle-orm/pg-core").PgColumn<{
            name: "points";
            tableName: "eos_milestones";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        sortOrder: import("drizzle-orm/pg-core").PgColumn<{
            name: "sort_order";
            tableName: "eos_milestones";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        completedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "completed_at";
            tableName: "eos_milestones";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        completedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "completed_by";
            tableName: "eos_milestones";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "eos_milestones";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_milestones";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_milestones";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const missionUpdates: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_mission_updates";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        missionId: import("drizzle-orm/pg-core").PgColumn<{
            name: "mission_id";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        updateDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "update_date";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        progressPercentage: import("drizzle-orm/pg-core").PgColumn<{
            name: "progress_percentage";
            tableName: "eos_mission_updates";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        hoursWorked: import("drizzle-orm/pg-core").PgColumn<{
            name: "hours_worked";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        milestonesCompleted: import("drizzle-orm/pg-core").PgColumn<{
            name: "milestones_completed";
            tableName: "eos_mission_updates";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        blockers: import("drizzle-orm/pg-core").PgColumn<{
            name: "blockers";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        nextSteps: import("drizzle-orm/pg-core").PgColumn<{
            name: "next_steps";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        mood: import("drizzle-orm/pg-core").PgColumn<{
            name: "mood";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        updatedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_by";
            tableName: "eos_mission_updates";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_mission_updates";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const rewardTypes: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_reward_types";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_reward_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "eos_reward_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        category: import("drizzle-orm/pg-core").PgColumn<{
            name: "category";
            tableName: "eos_reward_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "eos_reward_types";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        basePointsCost: import("drizzle-orm/pg-core").PgColumn<{
            name: "base_points_cost";
            tableName: "eos_reward_types";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        isActive: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_active";
            tableName: "eos_reward_types";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        adminApprovalRequired: import("drizzle-orm/pg-core").PgColumn<{
            name: "admin_approval_required";
            tableName: "eos_reward_types";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        maxRedemptionsPerQuarter: import("drizzle-orm/pg-core").PgColumn<{
            name: "max_redemptions_per_quarter";
            tableName: "eos_reward_types";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        metadata: import("drizzle-orm/pg-core").PgColumn<{
            name: "metadata";
            tableName: "eos_reward_types";
            dataType: "json";
            columnType: "PgJson";
            data: Record<string, any>;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_reward_types";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_reward_types";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const personalRewards: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_personal_rewards";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_personal_rewards";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        playerId: import("drizzle-orm/pg-core").PgColumn<{
            name: "player_id";
            tableName: "eos_personal_rewards";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        rewardTypeId: import("drizzle-orm/pg-core").PgColumn<{
            name: "reward_type_id";
            tableName: "eos_personal_rewards";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        customValue: import("drizzle-orm/pg-core").PgColumn<{
            name: "custom_value";
            tableName: "eos_personal_rewards";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        customDescription: import("drizzle-orm/pg-core").PgColumn<{
            name: "custom_description";
            tableName: "eos_personal_rewards";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        pointsCost: import("drizzle-orm/pg-core").PgColumn<{
            name: "points_cost";
            tableName: "eos_personal_rewards";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        isActive: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_active";
            tableName: "eos_personal_rewards";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        preferenceRanking: import("drizzle-orm/pg-core").PgColumn<{
            name: "preference_ranking";
            tableName: "eos_personal_rewards";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_personal_rewards";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_personal_rewards";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const rewardRedemptions: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_reward_redemptions";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_reward_redemptions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        playerId: import("drizzle-orm/pg-core").PgColumn<{
            name: "player_id";
            tableName: "eos_reward_redemptions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        personalRewardId: import("drizzle-orm/pg-core").PgColumn<{
            name: "personal_reward_id";
            tableName: "eos_reward_redemptions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        pointsSpent: import("drizzle-orm/pg-core").PgColumn<{
            name: "points_spent";
            tableName: "eos_reward_redemptions";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_reward_redemptions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        requestedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "requested_at";
            tableName: "eos_reward_redemptions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        approvedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "approved_at";
            tableName: "eos_reward_redemptions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        approvedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "approved_by";
            tableName: "eos_reward_redemptions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        fulfilledAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "fulfilled_at";
            tableName: "eos_reward_redemptions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        fulfilledBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "fulfilled_by";
            tableName: "eos_reward_redemptions";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "eos_reward_redemptions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        rejectReason: import("drizzle-orm/pg-core").PgColumn<{
            name: "reject_reason";
            tableName: "eos_reward_redemptions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        quarterlyCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "quarterly_count";
            tableName: "eos_reward_redemptions";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_reward_redemptions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_reward_redemptions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const achievementTypes: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_achievement_types";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_achievement_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "eos_achievement_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "eos_achievement_types";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        category: import("drizzle-orm/pg-core").PgColumn<{
            name: "category";
            tableName: "eos_achievement_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        iconName: import("drizzle-orm/pg-core").PgColumn<{
            name: "icon_name";
            tableName: "eos_achievement_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        pointsAwarded: import("drizzle-orm/pg-core").PgColumn<{
            name: "points_awarded";
            tableName: "eos_achievement_types";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        isRepeatable: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_repeatable";
            tableName: "eos_achievement_types";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        triggerCriteria: import("drizzle-orm/pg-core").PgColumn<{
            name: "trigger_criteria";
            tableName: "eos_achievement_types";
            dataType: "json";
            columnType: "PgJson";
            data: {
                type: string;
                conditions: Record<string, any>;
            };
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        rarity: import("drizzle-orm/pg-core").PgColumn<{
            name: "rarity";
            tableName: "eos_achievement_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        isActive: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_active";
            tableName: "eos_achievement_types";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_achievement_types";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_achievement_types";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const playerAchievements: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_player_achievements";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_player_achievements";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        playerId: import("drizzle-orm/pg-core").PgColumn<{
            name: "player_id";
            tableName: "eos_player_achievements";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        achievementTypeId: import("drizzle-orm/pg-core").PgColumn<{
            name: "achievement_type_id";
            tableName: "eos_player_achievements";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        earnedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "earned_at";
            tableName: "eos_player_achievements";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        contextData: import("drizzle-orm/pg-core").PgColumn<{
            name: "context_data";
            tableName: "eos_player_achievements";
            dataType: "json";
            columnType: "PgJson";
            data: Record<string, any>;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        pointsEarned: import("drizzle-orm/pg-core").PgColumn<{
            name: "points_earned";
            tableName: "eos_player_achievements";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        repeatCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "repeat_count";
            tableName: "eos_player_achievements";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        relatedMissionId: import("drizzle-orm/pg-core").PgColumn<{
            name: "related_mission_id";
            tableName: "eos_player_achievements";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_player_achievements";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const teamChallenges: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_team_challenges";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        challengeType: import("drizzle-orm/pg-core").PgColumn<{
            name: "challenge_type";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        startDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "start_date";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        endDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "end_date";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        targetMetric: import("drizzle-orm/pg-core").PgColumn<{
            name: "target_metric";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        targetValue: import("drizzle-orm/pg-core").PgColumn<{
            name: "target_value";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        currentValue: import("drizzle-orm/pg-core").PgColumn<{
            name: "current_value";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        participantIds: import("drizzle-orm/pg-core").PgColumn<{
            name: "participant_ids";
            tableName: "eos_team_challenges";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        rewardPool: import("drizzle-orm/pg-core").PgColumn<{
            name: "reward_pool";
            tableName: "eos_team_challenges";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        winnerIds: import("drizzle-orm/pg-core").PgColumn<{
            name: "winner_ids";
            tableName: "eos_team_challenges";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        completedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "completed_at";
            tableName: "eos_team_challenges";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_by";
            tableName: "eos_team_challenges";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_team_challenges";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_team_challenges";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const leaderboards: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_leaderboards";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_leaderboards";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        periodType: import("drizzle-orm/pg-core").PgColumn<{
            name: "period_type";
            tableName: "eos_leaderboards";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        periodStart: import("drizzle-orm/pg-core").PgColumn<{
            name: "period_start";
            tableName: "eos_leaderboards";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        periodEnd: import("drizzle-orm/pg-core").PgColumn<{
            name: "period_end";
            tableName: "eos_leaderboards";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        rankings: import("drizzle-orm/pg-core").PgColumn<{
            name: "rankings";
            tableName: "eos_leaderboards";
            dataType: "json";
            columnType: "PgJson";
            data: {
                playerId: string;
                playerName: string;
                score: number;
                rank: number;
                change: number;
            }[];
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        metricType: import("drizzle-orm/pg-core").PgColumn<{
            name: "metric_type";
            tableName: "eos_leaderboards";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        lastUpdated: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_updated";
            tableName: "eos_leaderboards";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_leaderboards";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const weeklyTasks: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_weekly_tasks";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        person: import("drizzle-orm/pg-core").PgColumn<{
            name: "person";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        weekEnding: import("drizzle-orm/pg-core").PgColumn<{
            name: "week_ending";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        priority: import("drizzle-orm/pg-core").PgColumn<{
            name: "priority";
            tableName: "eos_weekly_tasks";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        estimatedTotalTime: import("drizzle-orm/pg-core").PgColumn<{
            name: "estimated_total_time";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        expectedImpact: import("drizzle-orm/pg-core").PgColumn<{
            name: "expected_impact";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        dailyBreakdown: import("drizzle-orm/pg-core").PgColumn<{
            name: "daily_breakdown";
            tableName: "eos_weekly_tasks";
            dataType: "json";
            columnType: "PgJson";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        successCriteria: import("drizzle-orm/pg-core").PgColumn<{
            name: "success_criteria";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        completedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "completed_at";
            tableName: "eos_weekly_tasks";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        actualTimeSpent: import("drizzle-orm/pg-core").PgColumn<{
            name: "actual_time_spent";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        impactAchieved: import("drizzle-orm/pg-core").PgColumn<{
            name: "impact_achieved";
            tableName: "eos_weekly_tasks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_weekly_tasks";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_weekly_tasks";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const dailyTasks: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_daily_tasks";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_daily_tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        weeklyTaskId: import("drizzle-orm/pg-core").PgColumn<{
            name: "weekly_task_id";
            tableName: "eos_daily_tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        person: import("drizzle-orm/pg-core").PgColumn<{
            name: "person";
            tableName: "eos_daily_tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        date: import("drizzle-orm/pg-core").PgColumn<{
            name: "date";
            tableName: "eos_daily_tasks";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "eos_daily_tasks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "eos_daily_tasks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        estimatedMinutes: import("drizzle-orm/pg-core").PgColumn<{
            name: "estimated_minutes";
            tableName: "eos_daily_tasks";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        actualMinutes: import("drizzle-orm/pg-core").PgColumn<{
            name: "actual_minutes";
            tableName: "eos_daily_tasks";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        energyLevel: import("drizzle-orm/pg-core").PgColumn<{
            name: "energy_level";
            tableName: "eos_daily_tasks";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        priority: import("drizzle-orm/pg-core").PgColumn<{
            name: "priority";
            tableName: "eos_daily_tasks";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "eos_daily_tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        completedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "completed_at";
            tableName: "eos_daily_tasks";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "notes";
            tableName: "eos_daily_tasks";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_daily_tasks";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "eos_daily_tasks";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const eosEmails: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "eos_emails";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "eos_emails";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        type: import("drizzle-orm/pg-core").PgColumn<{
            name: "type";
            tableName: "eos_emails";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        recipient: import("drizzle-orm/pg-core").PgColumn<{
            name: "recipient";
            tableName: "eos_emails";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        subject: import("drizzle-orm/pg-core").PgColumn<{
            name: "subject";
            tableName: "eos_emails";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        templateUsed: import("drizzle-orm/pg-core").PgColumn<{
            name: "template_used";
            tableName: "eos_emails";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        sent: import("drizzle-orm/pg-core").PgColumn<{
            name: "sent";
            tableName: "eos_emails";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        sentAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "sent_at";
            tableName: "eos_emails";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        relatedEntityType: import("drizzle-orm/pg-core").PgColumn<{
            name: "related_entity_type";
            tableName: "eos_emails";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        relatedEntityId: import("drizzle-orm/pg-core").PgColumn<{
            name: "related_entity_id";
            tableName: "eos_emails";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        metadata: import("drizzle-orm/pg-core").PgColumn<{
            name: "metadata";
            tableName: "eos_emails";
            dataType: "json";
            columnType: "PgJson";
            data: Record<string, any>;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "eos_emails";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const insertVisionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    coreValues: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    coreCustomers: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    niche: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tenYearTarget: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    marketingStrategy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    threeYearPicture: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    oneYearPlan: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    quarterlyTheme: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    coreValues?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    coreCustomers?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    niche?: string;
    tenYearTarget?: string;
    marketingStrategy?: string;
    threeYearPicture?: string;
    oneYearPlan?: string;
    quarterlyTheme?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
}, {
    id?: string;
    coreValues?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    coreCustomers?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    niche?: string;
    tenYearTarget?: string;
    marketingStrategy?: string;
    threeYearPicture?: string;
    oneYearPlan?: string;
    quarterlyTheme?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
}>;
export declare const insertSeatSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    coreValues: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    accountabilityChartPosition: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    roles: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    responsibilities: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    kpis: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    assignedTo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gwd: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    isActive: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    name?: string;
    coreValues?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    createdAt?: unknown;
    updatedAt?: unknown;
    accountabilityChartPosition?: string;
    roles?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    responsibilities?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    kpis?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    assignedTo?: string;
    gwd?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    isActive?: unknown;
}, {
    id?: string;
    name?: string;
    coreValues?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    createdAt?: unknown;
    updatedAt?: unknown;
    accountabilityChartPosition?: string;
    roles?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    responsibilities?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    kpis?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    assignedTo?: string;
    gwd?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    isActive?: unknown;
}>;
export declare const insertPersonalScorecardSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    seatId: z.ZodString;
    weekEnding: z.ZodEnum<undefined>;
    kpiScores: z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    seatId?: string;
    weekEnding?: unknown;
    kpiScores?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    notes?: string;
}, {
    id?: string;
    createdAt?: unknown;
    seatId?: string;
    weekEnding?: unknown;
    kpiScores?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    notes?: string;
}>;
export declare const insertScorecardMetricSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    isActive: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    owner: z.ZodString;
    target: z.ZodEnum<undefined>;
    unit: z.ZodString;
    frequency: z.ZodString;
    category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    formula: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    name?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    isActive?: unknown;
    owner?: string;
    target?: unknown;
    unit?: string;
    frequency?: string;
    category?: string;
    formula?: string;
}, {
    id?: string;
    name?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    isActive?: unknown;
    owner?: string;
    target?: unknown;
    unit?: string;
    frequency?: string;
    category?: string;
    formula?: string;
}>;
export declare const insertWeeklyScorecardSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    weekEnding: z.ZodEnum<undefined>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metricId: z.ZodString;
    actualValue: z.ZodEnum<undefined>;
    targetValue: z.ZodEnum<undefined>;
    variance: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    redFlag: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    weekEnding?: unknown;
    notes?: string;
    metricId?: string;
    actualValue?: unknown;
    targetValue?: unknown;
    variance?: unknown;
    redFlag?: unknown;
}, {
    id?: string;
    createdAt?: unknown;
    weekEnding?: unknown;
    notes?: string;
    metricId?: string;
    actualValue?: unknown;
    targetValue?: unknown;
    variance?: unknown;
    redFlag?: unknown;
}>;
export declare const insertIssueSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    assignedTo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    category: z.ZodString;
    description: z.ZodString;
    title: z.ZodString;
    status: z.ZodOptional<z.ZodString>;
    impactLevel: z.ZodString;
    createdFrom: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resolutionNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    linksToVision: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    assignedTo?: string;
    category?: string;
    description?: string;
    title?: string;
    status?: string;
    impactLevel?: string;
    createdFrom?: string;
    resolutionNotes?: string;
    linksToVision?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    assignedTo?: string;
    category?: string;
    description?: string;
    title?: string;
    status?: string;
    impactLevel?: string;
    createdFrom?: string;
    resolutionNotes?: string;
    linksToVision?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
}>;
export declare const insertMeetingSchema: z.ZodObject<{
    date: z.ZodEnum<undefined>;
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    type: z.ZodString;
    attendees: z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>;
    agenda: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    issuesDiscussed: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    decisionsmade: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    actionItems: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    rockUpdates: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    scorecardReview: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    meetingRating: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    rawTranscript: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    date?: unknown;
    id?: string;
    createdAt?: unknown;
    type?: string;
    attendees?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    agenda?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    issuesDiscussed?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    decisionsmade?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    actionItems?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    rockUpdates?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    scorecardReview?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    meetingRating?: unknown;
    rawTranscript?: string;
}, {
    date?: unknown;
    id?: string;
    createdAt?: unknown;
    type?: string;
    attendees?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    agenda?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    issuesDiscussed?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    decisionsmade?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    actionItems?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    rockUpdates?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    scorecardReview?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    meetingRating?: unknown;
    rawTranscript?: string;
}>;
export declare const insertTodoSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    assignedTo: z.ZodString;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodString;
    status: z.ZodOptional<z.ZodString>;
    createdFrom: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dueDate: z.ZodEnum<undefined>;
    priority: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    assignedTo?: string;
    notes?: string;
    title?: string;
    status?: string;
    createdFrom?: string;
    dueDate?: unknown;
    priority?: unknown;
    completedAt?: unknown;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    assignedTo?: string;
    notes?: string;
    title?: string;
    status?: string;
    createdFrom?: string;
    dueDate?: unknown;
    priority?: unknown;
    completedAt?: unknown;
}>;
export declare const insertRockSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    owner: z.ZodString;
    title: z.ZodString;
    status: z.ZodOptional<z.ZodString>;
    linksToVision: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    dueDate: z.ZodEnum<undefined>;
    userId: z.ZodString;
    quarter: z.ZodString;
    completionPercentage: z.ZodOptional<z.ZodEnum<undefined>>;
    milestones: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    impactTags: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    notes?: string;
    owner?: string;
    title?: string;
    status?: string;
    linksToVision?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    dueDate?: unknown;
    userId?: string;
    quarter?: string;
    completionPercentage?: unknown;
    milestones?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    impactTags?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    notes?: string;
    owner?: string;
    title?: string;
    status?: string;
    linksToVision?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    dueDate?: unknown;
    userId?: string;
    quarter?: string;
    completionPercentage?: unknown;
    milestones?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    impactTags?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
}>;
export declare const insertMissionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodString;
    status: z.ZodOptional<z.ZodString>;
    linksToVision: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    dueDate: z.ZodEnum<undefined>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    quarter: z.ZodString;
    completionPercentage: z.ZodOptional<z.ZodEnum<undefined>>;
    impactTags: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    legacyRockId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    ownerId: z.ZodString;
    difficultyLevel: z.ZodOptional<z.ZodEnum<undefined>>;
    estimatedHours: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    actualHours: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    basePoints: z.ZodOptional<z.ZodEnum<undefined>>;
    bonusPointsEarned: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    qualityScore: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    impactScore: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    collaborators: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    isTeamMission: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    customThemeOverride: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    successCriteria: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    startedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    description?: string;
    title?: string;
    status?: string;
    linksToVision?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    dueDate?: unknown;
    completedAt?: unknown;
    quarter?: string;
    completionPercentage?: unknown;
    impactTags?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    legacyRockId?: string;
    ownerId?: string;
    difficultyLevel?: unknown;
    estimatedHours?: unknown;
    actualHours?: unknown;
    basePoints?: unknown;
    bonusPointsEarned?: unknown;
    qualityScore?: unknown;
    impactScore?: unknown;
    collaborators?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    isTeamMission?: unknown;
    customThemeOverride?: string;
    successCriteria?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    startedAt?: unknown;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    description?: string;
    title?: string;
    status?: string;
    linksToVision?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    dueDate?: unknown;
    completedAt?: unknown;
    quarter?: string;
    completionPercentage?: unknown;
    impactTags?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    legacyRockId?: string;
    ownerId?: string;
    difficultyLevel?: unknown;
    estimatedHours?: unknown;
    actualHours?: unknown;
    basePoints?: unknown;
    bonusPointsEarned?: unknown;
    qualityScore?: unknown;
    impactScore?: unknown;
    collaborators?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    isTeamMission?: unknown;
    customThemeOverride?: string;
    successCriteria?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    startedAt?: unknown;
}>;
export declare const insertMissionUpdateSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    notes: z.ZodString;
    status: z.ZodString;
    updateDate: z.ZodEnum<undefined>;
    progressPercentage: z.ZodEnum<undefined>;
    missionId: z.ZodString;
    hoursWorked: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    milestonesCompleted: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    blockers: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    nextSteps: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    mood: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    notes?: string;
    status?: string;
    updateDate?: unknown;
    progressPercentage?: unknown;
    missionId?: string;
    hoursWorked?: unknown;
    milestonesCompleted?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    blockers?: string;
    nextSteps?: string;
    mood?: string;
    updatedBy?: string;
}, {
    id?: string;
    createdAt?: unknown;
    notes?: string;
    status?: string;
    updateDate?: unknown;
    progressPercentage?: unknown;
    missionId?: string;
    hoursWorked?: unknown;
    milestonesCompleted?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    blockers?: string;
    nextSteps?: string;
    mood?: string;
    updatedBy?: string;
}>;
export declare const insertMilestoneSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodString;
    status: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodEnum<undefined>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    missionId: z.ZodString;
    points: z.ZodOptional<z.ZodEnum<undefined>>;
    sortOrder: z.ZodEnum<undefined>;
    completedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    notes?: string;
    description?: string;
    title?: string;
    status?: string;
    dueDate?: unknown;
    completedAt?: unknown;
    missionId?: string;
    points?: unknown;
    sortOrder?: unknown;
    completedBy?: string;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    notes?: string;
    description?: string;
    title?: string;
    status?: string;
    dueDate?: unknown;
    completedAt?: unknown;
    missionId?: string;
    points?: unknown;
    sortOrder?: unknown;
    completedBy?: string;
}>;
export declare const insertPlayerProfileSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    userId: z.ZodString;
    playerName: z.ZodString;
    preferredThemeId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    totalPoints: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    level: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    currentStreak: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    longestStreak: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    totalMissionsCompleted: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    totalMilestonesCompleted: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    averageCompletionTime: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    preferredRewardTypes: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    gamificationSettings: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    userId?: string;
    playerName?: string;
    preferredThemeId?: string;
    totalPoints?: unknown;
    level?: unknown;
    currentStreak?: unknown;
    longestStreak?: unknown;
    totalMissionsCompleted?: unknown;
    totalMilestonesCompleted?: unknown;
    averageCompletionTime?: unknown;
    preferredRewardTypes?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    gamificationSettings?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    userId?: string;
    playerName?: string;
    preferredThemeId?: string;
    totalPoints?: unknown;
    level?: unknown;
    currentStreak?: unknown;
    longestStreak?: unknown;
    totalMissionsCompleted?: unknown;
    totalMilestonesCompleted?: unknown;
    averageCompletionTime?: unknown;
    preferredRewardTypes?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    gamificationSettings?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
}>;
export declare const insertPersonalRewardSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    isActive: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    playerId: z.ZodString;
    rewardTypeId: z.ZodString;
    customValue: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    customDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pointsCost: z.ZodEnum<undefined>;
    preferenceRanking: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    isActive?: unknown;
    playerId?: string;
    rewardTypeId?: string;
    customValue?: unknown;
    customDescription?: string;
    pointsCost?: unknown;
    preferenceRanking?: unknown;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    isActive?: unknown;
    playerId?: string;
    rewardTypeId?: string;
    customValue?: unknown;
    customDescription?: string;
    pointsCost?: unknown;
    preferenceRanking?: unknown;
}>;
export declare const insertWeeklyTaskSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    weekEnding: z.ZodEnum<undefined>;
    description: z.ZodString;
    title: z.ZodString;
    status: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<undefined>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    successCriteria: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    person: z.ZodString;
    estimatedTotalTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expectedImpact: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dailyBreakdown: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[], z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[]>>>;
    actualTimeSpent: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    impactAchieved: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    weekEnding?: unknown;
    description?: string;
    title?: string;
    status?: string;
    priority?: unknown;
    completedAt?: unknown;
    successCriteria?: string;
    person?: string;
    estimatedTotalTime?: string;
    expectedImpact?: string;
    dailyBreakdown?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    actualTimeSpent?: string;
    impactAchieved?: string;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    weekEnding?: unknown;
    description?: string;
    title?: string;
    status?: string;
    priority?: unknown;
    completedAt?: unknown;
    successCriteria?: string;
    person?: string;
    estimatedTotalTime?: string;
    expectedImpact?: string;
    dailyBreakdown?: string | number | boolean | {
        [key: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any)[])[])[])[])[])[])[])[])[])[])[];
    actualTimeSpent?: string;
    impactAchieved?: string;
}>;
export declare const insertDailyTaskSchema: z.ZodObject<{
    date: z.ZodEnum<undefined>;
    id: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodString;
    status: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    person: z.ZodString;
    weeklyTaskId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    estimatedMinutes: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    actualMinutes: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
    energyLevel: z.ZodOptional<z.ZodNullable<z.ZodEnum<undefined>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    date?: unknown;
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    notes?: string;
    description?: string;
    title?: string;
    status?: string;
    priority?: unknown;
    completedAt?: unknown;
    person?: string;
    weeklyTaskId?: string;
    estimatedMinutes?: unknown;
    actualMinutes?: unknown;
    energyLevel?: unknown;
}, {
    date?: unknown;
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    notes?: string;
    description?: string;
    title?: string;
    status?: string;
    priority?: unknown;
    completedAt?: unknown;
    person?: string;
    weeklyTaskId?: string;
    estimatedMinutes?: unknown;
    actualMinutes?: unknown;
    energyLevel?: unknown;
}>;
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
