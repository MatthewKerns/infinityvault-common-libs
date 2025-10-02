# @infinityvault/identity-bridge

Unified identity bridge service for cross-system authentication between InfinityVault Brand Website and EOS Agent.

## Features

- **Atomic User Creation**: Create users atomically in both brand and EOS systems
- **Password Authentication**: Fully implemented email/password authentication with bcrypt hashing
- **PKCE OAuth Framework**: PKCE validation infrastructure ready (OAuth provider integration pending)
- **Dual-System Authentication**: Seamless authentication across brand website and EOS agent
- **Session Management**: Unified session handling with automatic synchronization
- **Profile Synchronization**: Real-time profile updates across both systems
- **Rate Limiting**: Built-in rate limiting (20 attempts per 15 minutes)
- **Security**: Timing-safe comparisons, bcrypt password hashing, JWT tokens

## Implementation Status

**Production-Ready Features**:
- ✅ Password-based authentication (createUser, authenticateUser)
- ✅ Session management and validation
- ✅ Token refresh functionality
- ✅ Profile synchronization across systems
- ✅ Rate limiting and security controls
- ✅ Audit logging for compliance

**In Development**:
- ⚠️ OAuth PKCE flow (PKCE challenge validation implemented, OAuth provider integration pending)
  - Currently throws error in production environment
  - Use password authentication until OAuth provider is fully integrated
  - See `exchangePKCECode` method documentation for implementation requirements

## Installation

```bash
npm install @infinityvault/identity-bridge
```

## Environment Variables

**REQUIRED** environment variables must be configured for security and proper operation:

```bash
# JWT Security (REQUIRED)
JWT_SECRET=your-secure-jwt-secret-min-32-characters

# Database Connection (REQUIRED)
DATABASE_URL=postgresql://user:password@host:5432/database

# OAuth Configuration (OPTIONAL - required only for OAuth PKCE flow)
OAUTH_CLIENT_ID=your-oauth-client-id
OAUTH_REDIRECT_URI=https://yourapp.com/auth/callback

# Environment (OPTIONAL - defaults to development)
NODE_ENV=development|production
```

See `.env.example` for a complete template.

**Security Notes**:
- `JWT_SECRET`: Must be at least 32 characters, use a cryptographically secure random string
- `DATABASE_URL`: Should use SSL in production (`?sslmode=require`)
- OAuth PKCE flow will throw error in production until OAuth provider is fully integrated
- Never commit `.env` file to version control

## Usage

```typescript
import { identityBridgeService, type CreateUserInput } from '@infinityvault/identity-bridge';

// Create user in both systems
const result = await identityBridgeService.createUser({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'SecurePass123!',
  marketingConsent: true
});

// Authenticate user for brand system
const authResult = await identityBridgeService.authenticateUser({
  email: 'user@example.com',
  password: 'SecurePass123!',
  system: 'brand'
});

// PKCE OAuth flow
const pkceResult = await identityBridgeService.initiatePKCEAuth({
  email: 'user@example.com',
  codeChallenge: 'challenge123',
  codeChallengeMethod: 'S256',
  state: 'state123'
});
```

## Security

- **PKCE OAuth**: S256 code challenge method required
- **Rate Limiting**: 20 authentication attempts per 15 minutes
- **Password Requirements**: Minimum 8 characters with uppercase, lowercase, number, and special character
- **JWT Tokens**: 1-hour expiration with secure signing
- **Bcrypt Hashing**: 10 salt rounds for password storage
- **Timing-Safe Comparison**: Prevents timing attacks on state validation

## API Reference

See [API.md](./API.md) for complete API documentation.

## License

Proprietary - InfinityVault
