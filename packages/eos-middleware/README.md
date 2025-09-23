# @infinityvault/eos-middleware

EOS (Entrepreneurial Operating System) specific schemas and middleware for the InfinityVault chatbot platform.

## Features

- **EOS Database Schema** - Changes tracking, user management, chat history
- **Agent Management** - Agent interactions and feedback systems
- **Document Intelligence** - Document processing and analysis
- **Database Connection Factory** - Ready-to-use EOS database instance

## Database Tables

### EOS User Management
- `eosUsers` - EOS system users (separate from website users)
- `eosAuthSessions` - Authentication sessions for EOS
- `eosSessions` - Express session store

### EOS System Tracking
- `eosChanges` - EOS system changes and improvements
- `chatMessages` - Chat conversation history
- `chatSessions` - Chat session management

### Agent System
- `agentInteractions` - Agent interaction tracking
- `agentFeedback` - User feedback on agent responses
- `documentProcessingJobs` - Document analysis jobs

### Business Intelligence
- Sales data analysis tables
- Performance metrics tracking
- Business intelligence aggregations

## Usage

```typescript
import { createEOSDatabase, eosUsers, eosChanges } from '@infinityvault/eos-middleware';

// Get database instance
const { db } = createEOSDatabase();

// Track EOS changes
const changes = await db.select().from(eosChanges).where(eq(eosChanges.status, 'in_progress'));

// User management
const eosUser = await db.select().from(eosUsers).where(eq(eosUsers.email, 'user@company.com'));
```

## Database Configuration

Set environment variables:

```bash
DATABASE_URL_EOS=postgresql://user:pass@localhost:5432/eos
# or fallback to
DATABASE_URL=postgresql://user:pass@localhost:5432/main
```

## Schema Management

```bash
# Generate migrations
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Studio (database browser)
npx drizzle-kit studio
```

## EOS Integration

This middleware supports the complete EOS methodology:

- **Vision/Traction Organizer (VTO)** components
- **People Accountability Chart** tracking
- **Process** documentation automation
- **Quarterly Rocks** (goals) management
- **Issues** identification and categorization

## Types

All database tables include TypeScript types:

```typescript
import type {
  EosUser,
  EosChange,
  InsertEosChange,
  ChatMessageRow,
  AgentInteraction
} from '@infinityvault/eos-middleware';
```

## Agent System

Supports advanced agent interactions:

- LLM Manager integration
- Intelligent Router for intent classification
- Master Coordinator for agent orchestration
- Feedback loops and performance tracking

## Development

```bash
npm run build    # Build TypeScript
npm run dev      # Watch mode
npm run test     # Run tests
```

Part of the InfinityVault domain separation architecture.