import { z } from 'zod';

/**
 * Zod Schemas for Input Validation
 */

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character'),
  marketingConsent: z.boolean()
});

export const authenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  system: z.enum(['brand', 'eos'])
});

export const pkceAuthSchema = z.object({
  email: z.string().email(),
  codeChallenge: z.string(),
  codeChallengeMethod: z.literal('S256'), // Security: Only allow S256, plain text defeats PKCE
  state: z.string()
});

export const pkceExchangeSchema = z.object({
  code: z.string(),
  codeVerifier: z.string(),
  state: z.string()
});

/**
 * TypeScript Types
 */

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type AuthenticateUserInput = z.infer<typeof authenticateUserSchema>;
export type PKCEAuthInput = z.infer<typeof pkceAuthSchema>;
export type PKCEExchangeInput = z.infer<typeof pkceExchangeSchema>;

export interface UserIdentityMapping {
  id: string;
  brandUserId: string;
  eosUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  system?: 'brand' | 'eos';
  expiresAt?: Date;
  error?: string;
}

export interface AuthResult {
  success: boolean;
  token?: string;
  userId?: string;
  system?: 'brand' | 'eos';
  expiresIn?: number;
  error?: string;
}

export interface CreateUserResult {
  success: boolean;
  brandUserId: string;
  eosUserId: string;
  mappingId: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface SyncProfileResult {
  success: boolean;
  brandUserId: string;
  eosUserId: string;
  updatedFields: string[];
}

export interface SessionTimeoutResult {
  success: boolean;
  message: string;
  brandSessionInvalidated: boolean;
  eosSessionInvalidated: boolean;
}

export interface PKCEAuthResult {
  success: boolean;
  authorizationUrl: string;
  state: string;
}

export interface RefreshTokenResult {
  success: boolean;
  token: string;
  expiresIn: number;
}
