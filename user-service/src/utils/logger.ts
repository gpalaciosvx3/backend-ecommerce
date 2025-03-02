import { Request, Response, NextFunction } from "express";
import winston from "winston";
import "winston-daily-rotate-file";

// Formato de Consola
const consoleFormat = winston.format.printf(({ level, message }) => {
  return `${level.toUpperCase()}: ${typeof message === "string" ? message : JSON.stringify(message)}`;
});

// Formato de Archivo
const fileFormat = winston.format.printf(({ level, message, timestamp }) => {
  const formattedMessage = typeof message === "string" ? message : JSON.stringify(message);
  return `[${timestamp}] ${level.toUpperCase()}: ${formattedMessage}`;
});

const logger = winston.createLogger({
  level: "info",
  transports: [
      new winston.transports.Console({
          format: winston.format.combine(
              winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
              consoleFormat
          )
      }),
      new winston.transports.DailyRotateFile({
          filename: "logs/user-service-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxSize: "20m",
          maxFiles: "14d",
          format: winston.format.combine(
              winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
              fileFormat
          )
      })
  ]
});



export { logger };
