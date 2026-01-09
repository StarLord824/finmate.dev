import { ChatOpenAI } from '@langchain/openai';

/**
 * ChatOpenRouter - Wrapper for OpenRouter API using LangChain's ChatOpenAI
 * 
 * OpenRouter provides access to multiple LLM models (GPT-4, Claude, Gemini, etc.)
 * through a unified API that's compatible with OpenAI's format.
 */
export class ChatOpenRouter extends ChatOpenAI {
  constructor(options: {
    modelName: string;  // e.g. "openai/gpt-4o", "anthropic/claude-3.5-sonnet"
    apiKey?: string;
    temperature?: number;
    maxTokens?: number;
  }) {
    const apiKey = options.apiKey || process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenRouter API key is required');
    }

    super({
      modelName: options.modelName,
      openAIApiKey: apiKey,
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 1024,
      configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
        defaultHeaders: {
          'HTTP-Referer': process.env.APP_URL || 'https://finmate.dev',
          'X-Title': 'FinMate Traders Arena',
        },
      },
    });
  }
}

/**
 * Available models on OpenRouter
 */
export const AVAILABLE_MODELS = {
  // OpenAI
  'gpt-4o': 'openai/gpt-4o',
  'gpt-4-turbo': 'openai/gpt-4-turbo',
  'gpt-3.5-turbo': 'openai/gpt-3.5-turbo',
  
  // Anthropic
  'claude-3.5-sonnet': 'anthropic/claude-3.5-sonnet',
  'claude-3-opus': 'anthropic/claude-3-opus',
  'claude-3-haiku': 'anthropic/claude-3-haiku',
  
  // Google
  'gemini-pro': 'google/gemini-pro',
  'gemini-1.5-pro': 'google/gemini-1.5-pro',
  
  // Meta
  'llama-3.1-70b': 'meta-llama/llama-3.1-70b-instruct',
  'llama-3.1-8b': 'meta-llama/llama-3.1-8b-instruct',
  
  // Mistral
  'mistral-large': 'mistralai/mistral-large',
  'mixtral-8x7b': 'mistralai/mixtral-8x7b-instruct',
} as const;

export type ModelId = keyof typeof AVAILABLE_MODELS;
