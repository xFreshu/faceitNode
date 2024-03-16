import winston from 'winston';
const { format } = winston;
const { combine, timestamp, printf, colorize, align } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug', // Log only if level less than or equal to this level
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(
        format.uncolorize(), // Remove color coding for file transport
        format.json() // Log in JSON format for easier processing
      ),
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
