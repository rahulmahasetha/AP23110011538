/**
 * Logging Middleware - Reusable Package
 * Campus Hiring Evaluation - Afford Medical Technologies
 *
 * Usage:
 *   const { Log } = require('./logging_middleware/logger');
 *   Log('frontend', 'info', 'api', 'Fetching notifications');
 *
 * @param {string} stack   - 'frontend' | 'backend'
 * @param {string} level   - 'debug' | 'info' | 'warn' | 'error' | 'fatal'
 * @param {string} pkg     - See allowed packages in Pre-Test Setup doc
 * @param {string} message - Descriptive log message
 */

const LOG_API_URL = 'http://20.207.122.201/evaluation-service/logs';

const VALID_STACKS = ['frontend', 'backend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const VALID_PACKAGES = [
  // Frontend only
  'api', 'component', 'hook', 'page', 'state', 'style',
  // Backend only
  'cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service',
  // Both
  'auth', 'config', 'middleware', 'utils'
];

async function Log(stack, level, pkg, message) {
  if (!VALID_STACKS.includes(stack)) {
    return;
  }
  if (!VALID_LEVELS.includes(level)) {
    return;
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    return;
  }

  const logData = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    });
    return response.ok;
  } catch (error) {
   
    return false;
  }
}

module.exports = { Log };
