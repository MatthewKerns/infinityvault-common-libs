/**
 * Chat Message Component - Displays individual chat messages with rich formatting
 */

import React from 'react';
import { Bot, User, Clock, BarChart3, AlertTriangle, Target, TrendingUp, FileText } from 'lucide-react';
import { Badge } from '../primitives/badge';
import { Card, CardContent } from '../primitives/card';
import { cn } from '../../lib/utils';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  context?: string;
  metadata?: Record<string, any>;
  documentIntelligence?: any; // Type this properly based on your DocumentIntelligence type
}

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
  DocumentIntelligenceDisplay?: React.ComponentType<{ data: any }>; // Optional component prop
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isStreaming, DocumentIntelligenceDisplay }) => {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const getContextIcon = (context?: string) => {
    switch (context) {
      case 'rocks':
        return <Target className="h-3 w-3" />;
      case 'issues':
        return <AlertTriangle className="h-3 w-3" />;
      case 'scorecard':
        return <BarChart3 className="h-3 w-3" />;
      case 'intelligence':
        return <TrendingUp className="h-3 w-3" />;
      case 'documents':
        return <FileText className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getContextColor = (context?: string) => {
    switch (context) {
      case 'rocks':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'issues':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'scorecard':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'intelligence':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'documents':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return '';
    }
  };

  const renderContent = () => {
    // Document intelligence rendering
    if (message.documentIntelligence && DocumentIntelligenceDisplay) {
      return <DocumentIntelligenceDisplay data={message.documentIntelligence} />;
    }

    // Markdown-style rendering
    const lines = message.content.split('\n');
    return (
      <div className="space-y-2">
        {lines.map((line, index) => {
          // Headers
          if (line.startsWith('## ')) {
            return (
              <h3 key={index} className="text-lg font-semibold mt-4 mb-2">
                {line.replace('## ', '')}
              </h3>
            );
          }
          if (line.startsWith('# ')) {
            return (
              <h2 key={index} className="text-xl font-bold mt-4 mb-2">
                {line.replace('# ', '')}
              </h2>
            );
          }

          // Lists
          if (line.startsWith('- ') || line.startsWith('• ')) {
            return (
              <li key={index} className="ml-4 list-disc">
                {line.replace(/^[-•]\s/, '')}
              </li>
            );
          }

          // Code blocks
          if (line.startsWith('```')) {
            return (
              <pre key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-x-auto">
                <code className="text-sm">{line.replace(/^```|```$/g, '')}</code>
              </pre>
            );
          }

          // Regular paragraphs
          if (line.trim()) {
            return (
              <p key={index} className="leading-relaxed">
                {line}
              </p>
            );
          }

          // Empty lines
          return <div key={index} className="h-2" />;
        })}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg transition-colors',
        isUser ? 'bg-blue-50 dark:bg-blue-950/20' : 'bg-gray-50 dark:bg-gray-900/20',
        isStreaming && 'animate-pulse'
      )}
    >
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <div className="flex-grow space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          
          {message.context && (
            <Badge variant="outline" className={cn('ml-2 gap-1', getContextColor(message.context))}>
              {getContextIcon(message.context)}
              <span className="capitalize">{message.context}</span>
            </Badge>
          )}
        </div>

        <div className="text-gray-900 dark:text-gray-100">
          {renderContent()}
        </div>

        {message.metadata?.metrics && (
          <Card className="mt-3 bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="p-3">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Tokens:</span>
                  <span className="ml-1 font-medium">{message.metadata.metrics.tokens}</span>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <span className="ml-1 font-medium">{message.metadata.metrics.responseTime}ms</span>
                </div>
                <div>
                  <span className="text-gray-500">Model:</span>
                  <span className="ml-1 font-medium">{message.metadata.metrics.model}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};