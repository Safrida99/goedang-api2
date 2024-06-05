class QueryError extends Error {
    constructor(message, statusCode = 400) {
      super(message);
  
      this.statusCode = statusCode;
      this.name = 'QueryError';
    }
  }
  
class QueryNotFound extends Error {
    constructor(message, statusCode = 404) {
      super(message);
  
      this.statusCode = statusCode;
      this.name = 'QueryNotFound';
    }
  }
  
class ValidationError extends Error {
    constructor(message, statusCode = 400) {
      super(message);
  
      this.statusCode = statusCode;
      this.name = 'ValidationError';
    }
  }
  module.exports = { QueryError, QueryNotFound, ValidationError };