"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ConflictError = exports.NotFoundError = exports.RepositoryError = exports.AbstractRepository = void 0;
// Abstract base class for common repository functionality
class AbstractRepository {
    constructor(config) {
        this.config = config;
    }
    // Common utility methods
    generateId() {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    validateRequiredFields(data, fields) {
        for (const field of fields) {
            if (!data[field]) {
                throw new Error(`Required field '${field}' is missing`);
            }
        }
    }
    sanitizeData(data) {
        // Remove undefined values and sanitize input
        const sanitized = {};
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
}
exports.AbstractRepository = AbstractRepository;
// Repository errors
class RepositoryError extends Error {
    constructor(message, operation, originalError) {
        super(message);
        this.operation = operation;
        this.originalError = originalError;
        this.name = 'RepositoryError';
    }
}
exports.RepositoryError = RepositoryError;
class NotFoundError extends RepositoryError {
    constructor(resource, identifier) {
        super(`${resource} not found: ${identifier}`, 'find');
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends RepositoryError {
    constructor(resource, field, value) {
        super(`${resource} already exists with ${field}: ${value}`, 'create');
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends RepositoryError {
    constructor(field, value, requirement) {
        super(`Invalid ${field}: ${value}. ${requirement}`, 'validate');
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=index.js.map