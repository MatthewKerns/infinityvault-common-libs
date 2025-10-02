/**
 * Test setup and global mocks
 */

// Mock environment variables
process.env.JWT_SECRET = 'test-secret-key-for-testing-only';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.OAUTH_CLIENT_ID = 'test-client-id';
process.env.OAUTH_REDIRECT_URI = 'http://localhost:3000/callback';

export {};
