/**
 * @infinityvault/backend-shared
 * 
 * Shared backend utilities and services for InfinityVault applications
 * Provides common functionality for authentication, messaging, and data processing
 */

// Authentication services
export {
  GoogleAuthService,
  type GoogleUserInfo,
  type GoogleAuthConfig
} from './auth/googleAuth';

// Database schemas and types
export * from './schema';

// Service interfaces and implementations
export { EmailService } from './services/EmailService';
export { SMSService } from './services/SMSService';
export {
  LLMService,
  StubLLMService,
  createLLMService,
  type LLMMessage,
  type LLMChatRequest,
  type LLMChatResponse,
  type LLMAnalysisResult,
  type LLMHealthStatus
} from './services/LLMService';

// Constants
export * from './constants/ports';

// Version info
export const version = '1.0.0';
export const name = '@infinityvault/backend-shared';