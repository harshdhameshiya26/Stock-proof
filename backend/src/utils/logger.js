// Structured application logger with levels, timestamps, and colorized output

const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const COLORS = {
  error: '\x1b[31m', // red
  warn:  '\x1b[33m', // yellow
  info:  '\x1b[36m', // cyan
  debug: '\x1b[35m', // magenta
  reset: '\x1b[0m',
};

const currentLevel =
  LEVELS[process.env.LOG_LEVEL] ??
  (process.env.NODE_ENV === 'production' ? LEVELS.info : LEVELS.debug);

const formatTimestamp = () => new Date().toISOString();

const log = (level, message, meta = null) => {
  if (LEVELS[level] > currentLevel) return;

  const stream = level === 'error' || level === 'warn' ? process.stderr : process.stdout;

  if (meta && typeof meta === 'object') {
    stream.write(`${message}\n${JSON.stringify(meta, null, 2)}\n`);
  } else {
    stream.write(`${message}\n`);
  }
};

const logger = {
  error: (message, meta) => log('error', message, meta),
  warn:  (message, meta) => log('warn',  message, meta),
  info:  (message, meta) => log('info',  message, meta),
  debug: (message, meta) => log('debug', message, meta),

  /** Log an HTTP request summary */
  http: (req, statusCode, durationMs) => {
    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    log(level, `${req.method} ${req.originalUrl} → ${statusCode} (${durationMs}ms)`, {
      ip: req.ip,
      ...(process.env.NODE_ENV !== 'production' && { body: req.body }),
    });
  },
};

export default logger;