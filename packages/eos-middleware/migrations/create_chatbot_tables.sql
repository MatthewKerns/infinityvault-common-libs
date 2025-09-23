-- Create chatbot tables manually
-- These tables support the database persistence layer for the EOS chatbot

-- Chat Sessions table
CREATE TABLE IF NOT EXISTS eos_chat_sessions (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    user_id VARCHAR,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    last_activity TIMESTAMP DEFAULT now() NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Chat Messages table
CREATE TABLE IF NOT EXISTS eos_chat_messages (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR NOT NULL,
    message TEXT NOT NULL,
    sender VARCHAR(20) NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text',
    response TEXT,
    confidence DECIMAL(5,3),
    processing_time INTEGER,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Agent Tasks table
CREATE TABLE IF NOT EXISTS eos_agent_tasks (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR NOT NULL,
    message_id VARCHAR,
    agent_name VARCHAR(100) NOT NULL,
    task_type VARCHAR(100) NOT NULL,
    task_data JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL,
    result JSONB,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    updated_at TIMESTAMP DEFAULT now(),
    completed_at TIMESTAMP
);

-- Agent Interactions table
CREATE TABLE IF NOT EXISTS eos_agent_interactions (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR NOT NULL,
    message_id VARCHAR,
    from_agent VARCHAR(100) NOT NULL,
    to_agent VARCHAR(100) NOT NULL,
    interaction_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    context JSONB DEFAULT '{}'::jsonb,
    response TEXT,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    responded_at TIMESTAMP,
    data JSONB DEFAULT '{}'::jsonb
);

-- User Feedback table
CREATE TABLE IF NOT EXISTS eos_user_feedback (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR,
    message_id VARCHAR,
    rating INTEGER NOT NULL,
    feedback_type VARCHAR(20) NOT NULL,
    comment TEXT,
    suggested_improvement TEXT,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Interaction Metrics table
CREATE TABLE IF NOT EXISTS eos_interaction_metrics (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR,
    message_id VARCHAR,
    metric_type VARCHAR(50) NOT NULL,
    value DECIMAL(10,4) NOT NULL,
    unit VARCHAR(50),
    timestamp TIMESTAMP DEFAULT now() NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Add foreign key constraints
ALTER TABLE eos_chat_messages ADD CONSTRAINT fk_chat_messages_session
    FOREIGN KEY (session_id) REFERENCES eos_chat_sessions(id) ON DELETE CASCADE;

ALTER TABLE eos_agent_tasks ADD CONSTRAINT fk_agent_tasks_session
    FOREIGN KEY (session_id) REFERENCES eos_chat_sessions(id) ON DELETE CASCADE;

ALTER TABLE eos_agent_interactions ADD CONSTRAINT fk_agent_interactions_session
    FOREIGN KEY (session_id) REFERENCES eos_chat_sessions(id) ON DELETE CASCADE;

ALTER TABLE eos_user_feedback ADD CONSTRAINT fk_user_feedback_session
    FOREIGN KEY (session_id) REFERENCES eos_chat_sessions(id) ON DELETE CASCADE;

ALTER TABLE eos_interaction_metrics ADD CONSTRAINT fk_interaction_metrics_session
    FOREIGN KEY (session_id) REFERENCES eos_chat_sessions(id) ON DELETE CASCADE;

-- Create indexes for performance (basic ones since complex ones had issues)
CREATE INDEX IF NOT EXISTS idx_chat_sessions_last_activity ON eos_chat_sessions(last_activity);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON eos_chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON eos_chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_session_id ON eos_agent_tasks(session_id);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status ON eos_agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_agent_interactions_session_id ON eos_agent_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_session_id ON eos_user_feedback(session_id);
CREATE INDEX IF NOT EXISTS idx_interaction_metrics_session_id ON eos_interaction_metrics(session_id);