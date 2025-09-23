/**
 * LLM Service Interface
 *
 * Provides a clean abstraction for LLM capabilities across the application.
 * This interface allows for different implementations (Bedrock, OpenAI, Ollama, etc.)
 * without creating cross-package dependencies.
 */
export interface LLMMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
export interface LLMChatRequest {
    messages: LLMMessage[];
    temperature?: number;
    maxTokens?: number;
    model?: string;
}
export interface LLMChatResponse {
    message: LLMMessage;
    model?: string;
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
    };
}
export interface LLMAnalysisResult {
    analysis: string;
    suggestions: string[];
    confidence?: number;
}
export interface LLMHealthStatus {
    bedrock?: boolean;
    openai?: boolean;
    ollama?: boolean;
    available: string[];
}
/**
 * Abstract LLM Service Interface
 *
 * Implementations should provide concrete implementations of these methods.
 */
export declare abstract class LLMService {
    /**
     * Send a chat request to the LLM
     */
    abstract chat(request: LLMChatRequest): Promise<LLMChatResponse>;
    /**
     * Generate a simple text response
     */
    abstract generateResponse(prompt: string): Promise<string>;
    /**
     * Analyze a query and provide structured insights
     */
    abstract analyzeQuery(query: string): Promise<LLMAnalysisResult>;
    /**
     * Check the health status of available LLM providers
     */
    abstract healthCheck(): Promise<LLMHealthStatus>;
}
/**
 * Default stub implementation for testing and development
 *
 * This implementation returns mock responses and can be used
 * when the actual LLM infrastructure is not available.
 */
export declare class StubLLMService extends LLMService {
    chat(request: LLMChatRequest): Promise<LLMChatResponse>;
    generateResponse(prompt: string): Promise<string>;
    analyzeQuery(query: string): Promise<LLMAnalysisResult>;
    healthCheck(): Promise<LLMHealthStatus>;
}
/**
 * Factory function to get the appropriate LLM service implementation
 *
 * This allows for easy switching between implementations based on
 * environment configuration without changing consumer code.
 */
export declare function createLLMService(config?: any): LLMService;
