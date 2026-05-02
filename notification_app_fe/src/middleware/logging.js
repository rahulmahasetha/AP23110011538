import { AUTH_TOKEN } from '../config/auth';

const LOG_API_URL = '/evaluation-service/logs';

/**
 * Frontend Logging Middleware
 * Sends structured logs to the evaluation server.
 *
 * @param {string} stack   - 'frontend'
 * @param {string} level   - 'debug' | 'info' | 'warn' | 'error' | 'fatal'
 * @param {string} pkg     - 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils'
 * @param {string} message - Descriptive log message
 */
export const Log = async (stack, level, pkg, message) => {
  const token = localStorage.getItem('token') || AUTH_TOKEN;

  const logData = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    await fetch(LOG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(logData),
    });
  } catch {
    // Fail silently — do not use console.log per evaluation constraints
  }
};

export default Log;
