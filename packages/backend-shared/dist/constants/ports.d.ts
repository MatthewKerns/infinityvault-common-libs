/**
 * Centralized Port Configuration
 *
 * All port numbers and service URLs are defined here to maintain consistency
 * across the entire application and prevent hardcoded port mismatches.
 */
export declare const DEVELOPMENT_PORTS: {
    readonly WEBSITE_BACKEND: 3000;
    readonly EOS_BACKEND: 3002;
    readonly WEBSITE_FRONTEND: 8000;
    readonly EOS_FRONTEND: 8002;
    readonly LEGACY_EOS_PORT: 3001;
};
export declare const PRODUCTION_PORTS: {
    readonly DEFAULT: 80;
    readonly HTTPS: 443;
};
export declare const getWebsiteBackendPort: () => number;
export declare const getEOSBackendPort: () => number;
export declare const buildBaseUrl: (port: number, hostname?: string) => string;
export declare const buildOAuthRedirectUri: (port: number, hostname?: string) => string;
export declare const getWebsiteBackendUrl: () => string;
export declare const getEOSBackendUrl: () => string;
export declare const getWebsiteOAuthRedirectUri: () => string;
export declare const getEOSOAuthRedirectUri: () => string;
export declare const isValidPort: (port: number) => boolean;
export declare const validatePortConfiguration: () => {
    valid: boolean;
    errors: string[];
};
export declare const PORTS: {
    readonly DEVELOPMENT: {
        readonly WEBSITE_BACKEND: 3000;
        readonly EOS_BACKEND: 3002;
        readonly WEBSITE_FRONTEND: 8000;
        readonly EOS_FRONTEND: 8002;
        readonly LEGACY_EOS_PORT: 3001;
    };
    readonly PRODUCTION: {
        readonly DEFAULT: 80;
        readonly HTTPS: 443;
    };
};
