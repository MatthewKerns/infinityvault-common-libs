# @infinityvault/website-middleware

Website-specific schemas and middleware for the InfinityVault e-commerce platform.

## Features

- **E-commerce Database Schema** - Products, cart, orders, customers
- **Analytics Schema** - User behavior, A/B testing, page views
- **Marketing Schema** - Promotions, rewards, scratch & win
- **Database Connection Factory** - Ready-to-use database instance

## Database Tables

### Core E-commerce
- `products` - Product catalog
- `colorVariants` - Product color options
- `cartItems` - Shopping cart management
- `users` - Customer accounts
- `userPurchases` - Order history

### Marketing & Promotions
- `promoDraws` - Promotional campaigns
- `promoClaims` - User promotion claims
- `scratchWinParticipations` - Scratch & win game data
- `userRewards` - Customer loyalty points

### Analytics & Insights
- `userPageViews` - Page view tracking
- `userEvents` - Custom event tracking
- `userAbTests` - A/B test assignments
- `userCartAbandonment` - Cart abandonment analysis

## Usage

```typescript
import { createWebsiteDatabase, products, users } from '@infinityvault/website-middleware';

// Get database instance
const { db } = createWebsiteDatabase();

// Query products
const allProducts = await db.select().from(products);

// User management
const user = await db.select().from(users).where(eq(users.email, 'user@example.com'));
```

## Database Configuration

Set environment variables:

```bash
DATABASE_URL_WEBSITE=postgresql://user:pass@localhost:5432/website
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

## Types

All database tables include TypeScript types:

```typescript
import type {
  Product,
  InsertProduct,
  User,
  UserReward
} from '@infinityvault/website-middleware';
```

## Development

```bash
npm run build    # Build TypeScript
npm run dev      # Watch mode
npm run test     # Run tests
```

Part of the InfinityVault domain separation architecture.