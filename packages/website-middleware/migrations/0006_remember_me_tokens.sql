-- Migration: Add remember me tokens and enhanced authentication tables
-- Created: 2025-09-21
-- Purpose: Add remember me token support and rate limiting for shared authentication

-- Remember me tokens table
CREATE TABLE brandwebsite.remember_me_tokens (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL REFERENCES brandwebsite.users(id) ON DELETE CASCADE,
  token_hash VARCHAR(64) NOT NULL UNIQUE,
  series VARCHAR(32) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- Rate limiting table for authentication security
CREATE TABLE brandwebsite.auth_rate_limits (
  id SERIAL PRIMARY KEY,
  key_hash VARCHAR(64) NOT NULL UNIQUE,
  key_type VARCHAR(20) NOT NULL, -- 'ip', 'user', 'email'
  action VARCHAR(50) NOT NULL, -- 'auth_attempt', 'oauth_attempt', etc.
  attempt_count INTEGER DEFAULT 0 NOT NULL,
  first_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  blocked_until TIMESTAMP WITH TIME ZONE,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Authentication audit log for security monitoring
CREATE TABLE brandwebsite.auth_audit_log (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) REFERENCES brandwebsite.users(id) ON DELETE SET NULL,
  action VARCHAR(50) NOT NULL,
  event_type VARCHAR(20) DEFAULT 'auth', -- 'auth', 'security'
  severity VARCHAR(10) DEFAULT 'low', -- 'low', 'medium', 'high', 'critical'
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  success BOOLEAN NOT NULL,
  failure_reason TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add remember me fields to existing auth_sessions table
ALTER TABLE brandwebsite.auth_sessions
ADD COLUMN remember_me_token VARCHAR(255),
ADD COLUMN remember_me_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
ADD COLUMN is_active BOOLEAN DEFAULT TRUE NOT NULL;

-- Create indexes for performance
CREATE INDEX idx_remember_me_tokens_user_id ON brandwebsite.remember_me_tokens(user_id);
CREATE INDEX idx_remember_me_tokens_series ON brandwebsite.remember_me_tokens(series);
CREATE INDEX idx_remember_me_tokens_expires_at ON brandwebsite.remember_me_tokens(expires_at);
CREATE INDEX idx_remember_me_tokens_is_active ON brandwebsite.remember_me_tokens(is_active) WHERE is_active = TRUE;

CREATE INDEX idx_auth_rate_limits_key_hash ON brandwebsite.auth_rate_limits(key_hash);
CREATE INDEX idx_auth_rate_limits_key_type_action ON brandwebsite.auth_rate_limits(key_type, action);
CREATE INDEX idx_auth_rate_limits_expires_at ON brandwebsite.auth_rate_limits(expires_at);
CREATE INDEX idx_auth_rate_limits_blocked_until ON brandwebsite.auth_rate_limits(blocked_until) WHERE blocked_until IS NOT NULL;

CREATE INDEX idx_auth_audit_log_user_id ON brandwebsite.auth_audit_log(user_id);
CREATE INDEX idx_auth_audit_log_action ON brandwebsite.auth_audit_log(action);
CREATE INDEX idx_auth_audit_log_event_type ON brandwebsite.auth_audit_log(event_type);
CREATE INDEX idx_auth_audit_log_created_at ON brandwebsite.auth_audit_log(created_at);
CREATE INDEX idx_auth_audit_log_success ON brandwebsite.auth_audit_log(success);
CREATE INDEX idx_auth_audit_log_severity ON brandwebsite.auth_audit_log(severity);

CREATE INDEX idx_auth_sessions_updated_at ON brandwebsite.auth_sessions(updated_at);
CREATE INDEX idx_auth_sessions_is_active ON brandwebsite.auth_sessions(is_active) WHERE is_active = TRUE;

-- Update function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at fields
CREATE TRIGGER update_auth_sessions_updated_at
  BEFORE UPDATE ON brandwebsite.auth_sessions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Add cleanup function for expired tokens and rate limits
CREATE OR REPLACE FUNCTION cleanup_expired_auth_data()
RETURNS INTEGER AS $$
DECLARE
  cleaned_count INTEGER := 0;
  temp_count INTEGER;
BEGIN
  -- Clean up expired remember me tokens
  DELETE FROM brandwebsite.remember_me_tokens
  WHERE expires_at < NOW() OR is_active = FALSE;
  GET DIAGNOSTICS temp_count = ROW_COUNT;
  cleaned_count := cleaned_count + temp_count;

  -- Clean up expired auth sessions
  DELETE FROM brandwebsite.auth_sessions
  WHERE expires_at < NOW();
  GET DIAGNOSTICS temp_count = ROW_COUNT;
  cleaned_count := cleaned_count + temp_count;

  -- Clean up expired rate limit entries
  DELETE FROM brandwebsite.auth_rate_limits
  WHERE expires_at < NOW();
  GET DIAGNOSTICS temp_count = ROW_COUNT;
  cleaned_count := cleaned_count + temp_count;

  -- Clean up old audit log entries (keep last 90 days)
  DELETE FROM brandwebsite.auth_audit_log
  WHERE created_at < NOW() - INTERVAL '90 days';
  GET DIAGNOSTICS temp_count = ROW_COUNT;
  cleaned_count := cleaned_count + temp_count;

  RETURN cleaned_count;
END;
$$ LANGUAGE plpgsql;

-- Add comments for documentation
COMMENT ON TABLE brandwebsite.remember_me_tokens IS 'Secure remember me tokens with automatic rotation support';
COMMENT ON TABLE brandwebsite.auth_rate_limits IS 'Rate limiting data for authentication security';
COMMENT ON TABLE brandwebsite.auth_audit_log IS 'Comprehensive audit log for authentication and security events';
COMMENT ON FUNCTION cleanup_expired_auth_data() IS 'Maintenance function to clean up expired authentication data';

-- Insert initial rate limiting configuration (optional)
INSERT INTO brandwebsite.auth_rate_limits (key_hash, key_type, action, attempt_count, expires_at)
VALUES
  ('system_init', 'system', 'initialization', 0, NOW() + INTERVAL '1 day')
ON CONFLICT (key_hash) DO NOTHING;