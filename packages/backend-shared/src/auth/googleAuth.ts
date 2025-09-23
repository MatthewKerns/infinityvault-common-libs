// Re-export the Google Auth service for use by both website and chatbot backends
// This maintains the separation while allowing shared authentication functionality

export { GoogleAuthService } from '../../website/src/services/GoogleAuthService';
export type { GoogleUserInfo } from '../../website/src/services/GoogleAuthService';