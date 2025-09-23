/**
 * Centralized Port Configuration
 * 
 * All port numbers and service URLs are defined here to maintain consistency
 * across the entire application and prevent hardcoded port mismatches.
 */

// Development Port Configuration
export const DEVELOPMENT_PORTS = {
  // Backend Services
  WEBSITE_BACKEND: 3000,
  EOS_BACKEND: 3002,
  
  // Frontend Services  
  WEBSITE_FRONTEND: 8000,
  EOS_FRONTEND: 8002,
  
  // Legacy/Alternative Ports (for reference only)
  LEGACY_EOS_PORT: 3001, // DO NOT USE - maintained for migration reference
} as const;

// Production Port Configuration  
export const PRODUCTION_PORTS = {
  // Production services typically use standard ports (80/443)
  // or are handled by reverse proxy
  DEFAULT: 80,
  HTTPS: 443,
} as const;

// Environment-aware port getters
export const getWebsiteBackendPort = (): number => {
  if (process.env.NODE_ENV === 'production') {
    return parseInt(process.env.PORT || '3000', 10);
  }
  return DEVELOPMENT_PORTS.WEBSITE_BACKEND;
};

export const getEOSBackendPort = (): number => {
  if (process.env.NODE_ENV === 'production') {
    return parseInt(process.env.PORT || '3002', 10);
  }
  return DEVELOPMENT_PORTS.EOS_BACKEND;
};

// Base URL builders for OAuth redirects and API calls
export const buildBaseUrl = (port: number, hostname = 'localhost'): string => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseHost = process.env.NODE_ENV === 'production' ? hostname : `${hostname}:${port}`;
  return `${protocol}://${baseHost}`;
};

export const buildOAuthRedirectUri = (port: number, hostname = 'localhost'): string => {
  const baseUrl = buildBaseUrl(port, hostname);
  return `${baseUrl}/api/auth/google/callback`;
};

// Service-specific URL builders
export const getWebsiteBackendUrl = (): string => {
  const port = getWebsiteBackendPort();
  return buildBaseUrl(port, process.env.NODE_ENV === 'production' ? 'api.infinityvault.com' : 'localhost');
};

export const getEOSBackendUrl = (): string => {
  const port = getEOSBackendPort();
  return buildBaseUrl(port, process.env.NODE_ENV === 'production' ? 'eos.infinityvault.com' : 'localhost');
};

// OAuth redirect URI builders
export const getWebsiteOAuthRedirectUri = (): string => {
  const port = getWebsiteBackendPort();
  const hostname = process.env.NODE_ENV === 'production' ? 'api.infinityvault.com' : 'localhost';
  return buildOAuthRedirectUri(port, hostname);
};

export const getEOSOAuthRedirectUri = (): string => {
  const port = getEOSBackendPort();
  const hostname = process.env.NODE_ENV === 'production' ? 'eos.infinityvault.com' : 'localhost';
  return buildOAuthRedirectUri(port, hostname);
};

// Port validation utilities
export const isValidPort = (port: number): boolean => {
  return port >= 1 && port <= 65535;
};

export const validatePortConfiguration = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check that all required ports are valid
  const requiredPorts = [
    DEVELOPMENT_PORTS.WEBSITE_BACKEND,
    DEVELOPMENT_PORTS.EOS_BACKEND,
    DEVELOPMENT_PORTS.WEBSITE_FRONTEND,
    DEVELOPMENT_PORTS.EOS_FRONTEND,
  ];
  
  for (const port of requiredPorts) {
    if (!isValidPort(port)) {
      errors.push(`Invalid port number: ${port}`);
    }
  }
  
  // Check for port conflicts
  const usedPorts = new Set();
  for (const port of requiredPorts) {
    if (usedPorts.has(port)) {
      errors.push(`Port conflict detected: ${port} is used by multiple services`);
    }
    usedPorts.add(port);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

// Export all port constants for easy access
export const PORTS = {
  DEVELOPMENT: DEVELOPMENT_PORTS,
  PRODUCTION: PRODUCTION_PORTS,
} as const;