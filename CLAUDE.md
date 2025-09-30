# InfinityVault Common Libraries - Project Memory

## Repository Overview

**@infinityvault/common-libs** - Shared packages, UI components, and utility libraries providing unified functionality across the InfinityVault ecosystem.

This repository contains reusable npm packages that provide authentication, infrastructure, UI components, and shared utilities for both the EOS Agent and Brand Website repositories.

## Published Packages

- `@infinityvault/shared-auth` - Unified authentication system with PKCE validation
- `@infinityvault/shared-ui` - React component library and design system
- `@infinityvault/shared-infrastructure` - Database connections and shared services
- `@infinityvault/eos-middleware` - EOS-specific middleware and utilities
- `@infinityvault/website-middleware` - E-commerce middleware and utilities
- `@infinityvault/identity-service` - Cross-platform identity management

## Essential Commands

- Build All: `npm run build`
- Test All: `npm test`
- Lint All: `npm run lint`
- Publish: `npm run publish:all`
- Version: `npm run version:all`

## Package Architecture

### Core Shared Libraries

#### @infinityvault/shared-auth
```typescript
// Unified authentication across all services
export interface AuthConfig {
  googleClientId: string;
  googleClientSecret: string;
  redirectUri: string;
  pkceEnabled: boolean;
}

export class UnifiedAuthService {
  // PKCE-compliant OAuth flows
  // Cross-service session management
  // Token validation and refresh
  // Rate limiting integration
}
```

#### @infinityvault/shared-ui
```typescript
// Design system components
export const Button: React.FC<ButtonProps>;
export const Modal: React.FC<ModalProps>;
export const DataTable: React.FC<DataTableProps>;
export const ChatInterface: React.FC<ChatInterfaceProps>;

// Theme system
export const theme = {
  colors: { /* unified color palette */ },
  typography: { /* consistent fonts */ },
  spacing: { /* standardized spacing */ }
};
```

#### @infinityvault/shared-infrastructure
```typescript
// Database connection management
export class DatabaseConnectionManager {
  // Schema-aware connections
  // Connection pooling
  // Migration utilities
  // Health monitoring
}

// Shared service interfaces
export interface LoggingService;
export interface CacheService;
export interface QueueService;
```

## Security Requirements

- **Authentication**: PKCE + state validation for all OAuth implementations
- **Input Validation**: Zod schemas for all shared interfaces
- **Rate Limiting**: Configurable rate limiting utilities
- **Token Management**: Secure token storage and rotation
- **Cross-Origin**: CORS configuration utilities

## Code Style & Architecture

- Use 2-space indentation
- TypeScript strict mode required
- Follow DRY principles across all packages
- Comprehensive JSDoc documentation
- Semantic versioning for all releases
- Zero breaking changes without major version bump

## Package Development Workflow

### Monorepo Structure
```
/packages/
  /shared-auth/          # Authentication utilities
    /src/
    /tests/
    package.json
  /shared-ui/            # React component library
    /src/
    /stories/            # Storybook stories
    /tests/
    package.json
  /shared-infrastructure/ # Database and services
    /src/
    /tests/
    package.json
  /eos-middleware/       # EOS-specific utilities
  /website-middleware/   # E-commerce utilities
  /identity-service/     # Cross-platform identity
```

### Development Commands
```bash
# Install dependencies for all packages
npm install

# Build all packages
npm run build

# Test specific package
npm run test --workspace=@infinityvault/shared-auth

# Publish all packages
npm run publish:all

# Version bump
npm run version:patch  # or version:minor, version:major
```

## Package Specifications

### @infinityvault/shared-auth

**Purpose**: Unified authentication system with PKCE compliance

**Key Features**:
- Google OAuth integration with PKCE validation
- Cross-service session management
- Token refresh and validation
- Rate limiting integration
- Security event logging

**Dependencies**:
```json
{
  "zod": "^3.22.0",
  "jose": "^5.0.0",
  "crypto": "node:crypto"
}
```

**API Surface**:
```typescript
export class AuthService {
  // OAuth flow management
  initiateAuth(config: AuthConfig): Promise<AuthResult>;
  validateCallback(code: string, state: string): Promise<TokenSet>;
  refreshToken(refreshToken: string): Promise<TokenSet>;

  // Session management
  createSession(userId: string): Promise<Session>;
  validateSession(sessionId: string): Promise<Session | null>;
  destroySession(sessionId: string): Promise<void>;

  // Security utilities
  generatePKCE(): PKCEPair;
  validateCSRF(token: string): boolean;
  rateLimitCheck(identifier: string): Promise<boolean>;
}
```

### @infinityvault/shared-ui

**Purpose**: React component library and design system

**Key Features**:
- Consistent UI components across applications
- Theme system with dark/light mode support
- Accessibility-first component design
- Responsive design utilities
- Animation and transition helpers

**Dependencies**:
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "lucide-react": "^0.400.0",
  "tailwindcss": "^3.3.0"
}
```

**Component Categories**:
```typescript
// Form Components
export const Input: React.FC<InputProps>;
export const Select: React.FC<SelectProps>;
export const TextArea: React.FC<TextAreaProps>;
export const FileUpload: React.FC<FileUploadProps>;

// Layout Components
export const Container: React.FC<ContainerProps>;
export const Grid: React.FC<GridProps>;
export const Stack: React.FC<StackProps>;
export const Sidebar: React.FC<SidebarProps>;

// Feedback Components
export const Alert: React.FC<AlertProps>;
export const Toast: React.FC<ToastProps>;
export const Modal: React.FC<ModalProps>;
export const Spinner: React.FC<SpinnerProps>;

// Business Components
export const ChatInterface: React.FC<ChatInterfaceProps>;
export const DataTable: React.FC<DataTableProps>;
export const AdminPanel: React.FC<AdminPanelProps>;
export const ProductCard: React.FC<ProductCardProps>;
```

### @infinityvault/shared-infrastructure

**Purpose**: Database connections and shared backend services

**Key Features**:
- Schema-aware database connections
- Connection pooling and health monitoring
- Migration utilities
- Shared service interfaces
- Configuration management

**Dependencies**:
```json
{
  "pg": "^8.11.0",
  "redis": "^4.6.0",
  "aws-sdk": "^2.1400.0"
}
```

**Infrastructure Services**:
```typescript
// Database Management
export class DatabaseManager {
  createConnection(schema: string): Promise<Connection>;
  healthCheck(): Promise<HealthStatus>;
  runMigrations(schema: string): Promise<MigrationResult>;
}

// Cache Management
export class CacheManager {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  invalidate(pattern: string): Promise<void>;
}

// Configuration Service
export class ConfigService {
  get(key: string): string | undefined;
  getRequired(key: string): string;
  getNumber(key: string, defaultValue?: number): number;
  getBoolean(key: string, defaultValue?: boolean): boolean;
}
```

## Testing Strategy

### Package-Level Testing
```bash
# Unit tests for individual packages
npm run test:unit --workspace=@infinityvault/shared-auth

# Integration tests across packages
npm run test:integration

# End-to-end tests for complete workflows
npm run test:e2e

# Visual regression tests for UI components
npm run test:visual --workspace=@infinityvault/shared-ui
```

### Quality Gates
- **Test Coverage**: ≥90% for all packages
- **Type Safety**: TypeScript strict mode compliance
- **API Compatibility**: No breaking changes without major version
- **Performance**: Bundle size monitoring and optimization
- **Security**: Automated vulnerability scanning

## Publishing Workflow

### Semantic Versioning
```bash
# Patch version (bug fixes)
npm run version:patch

# Minor version (new features, backward compatible)
npm run version:minor

# Major version (breaking changes)
npm run version:major
```

### Release Process
1. **Pre-release Validation**
   - All tests pass across packages
   - No security vulnerabilities detected
   - API documentation updated
   - CHANGELOG.md updated

2. **Build and Package**
   - TypeScript compilation for all packages
   - Bundle optimization and tree-shaking
   - Declaration file generation
   - Asset processing

3. **Publishing**
   - Authenticate with npm registry
   - Publish packages in dependency order
   - Tag git release with version
   - Update dependent repositories

4. **Post-release**
   - Update consuming repositories
   - Monitor for integration issues
   - Document migration guides if needed

## Consumer Integration

### Package Installation
```bash
# Install in EOS Agent repository
npm install @infinityvault/shared-auth @infinityvault/shared-ui @infinityvault/eos-middleware

# Install in Brand Website repository
npm install @infinityvault/shared-auth @infinityvault/shared-ui @infinityvault/website-middleware
```

### Usage Examples
```typescript
// EOS Agent usage
import { AuthService } from '@infinityvault/shared-auth';
import { ChatInterface } from '@infinityvault/shared-ui';
import { EOSMiddleware } from '@infinityvault/eos-middleware';

// Brand Website usage
import { AuthService } from '@infinityvault/shared-auth';
import { ProductCard, DataTable } from '@infinityvault/shared-ui';
import { EcommerceMiddleware } from '@infinityvault/website-middleware';
```

## Migration and Compatibility

### Breaking Change Policy
- **Major Version**: Breaking changes allowed with migration guide
- **Minor Version**: New features only, backward compatible
- **Patch Version**: Bug fixes only, no API changes

### Migration Support
```typescript
// Deprecated API warnings
export const legacyAuthService = deprecate(
  oldAuthService,
  'Use @infinityvault/shared-auth AuthService instead'
);

// Backward compatibility adapters
export const createLegacyAdapter = (newService: AuthService) => {
  // Adapter implementation
};
```

## Documentation

### Package Documentation
- **README.md**: Installation and basic usage
- **API.md**: Complete API reference with examples
- **CHANGELOG.md**: Version history and migration notes
- **CONTRIBUTING.md**: Development guidelines

### Storybook Integration
```bash
# Start Storybook for UI components
npm run storybook --workspace=@infinityvault/shared-ui

# Build static Storybook
npm run build-storybook
```

## Sub-Agent Guidelines

**Core Requirements for Common Libraries Sub-Agents**:
- 2-space indentation, TypeScript strict, const > let
- Comprehensive JSDoc documentation for all exports
- TDD workflow with ≥90% coverage for shared utilities
- Semantic versioning compliance for all changes
- Zero breaking changes without major version bump
- Essential commands: `npm run build`, `npm test`, `npm run lint`

**Package Development Expertise Required**:
- Understanding of npm package publishing workflows
- Knowledge of semantic versioning and API design
- Experience with monorepo management and tooling
- Cross-platform compatibility considerations

## Never Do

- Publish packages with breaking changes in minor/patch versions
- Include environment-specific configuration in shared packages
- Create circular dependencies between packages
- Store sensitive data or secrets in published packages
- Skip API documentation for public interfaces
- Publish without comprehensive testing
- Include platform-specific code without proper abstractions

## Quality Standards

### Code Quality
- **TypeScript Strict**: All packages use strict mode
- **ESLint**: Shared configuration across packages
- **Prettier**: Consistent code formatting
- **Tests**: ≥90% coverage for all exported functionality

### Documentation Requirements
- **API Documentation**: JSDoc for all public interfaces
- **Usage Examples**: Practical examples for each package
- **Migration Guides**: Clear upgrade paths for breaking changes
- **Troubleshooting**: Common issues and solutions

### Performance Standards
- **Bundle Size**: Monitor and optimize package sizes
- **Tree Shaking**: Support for dead code elimination
- **Lazy Loading**: Support for dynamic imports where appropriate
- **Memory Usage**: Efficient resource management

This Common Libraries repository provides the foundation for consistency, reusability, and maintainability across the entire InfinityVault ecosystem, enabling rapid development while maintaining high quality standards.