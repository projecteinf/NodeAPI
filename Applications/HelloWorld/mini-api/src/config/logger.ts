import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

// Customitzem com es pintarà el text pla a la consola o fitxer
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info", // Llegim de l'entorn la gravetat mínima
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Captura automàticament el Stack Trace si és un error
    format.json() // Per defecte, format JSON estructurat (ideal per a producció)
  ),
  transports: [
    // 1. Guardem tots els errors greus a un fitxer
    new transports.File({ filename: "logs/error.log", level: "error" }),
    // 2. Guardem l'historial complet d'informació a un altre fitxer
    new transports.File({ filename: "logs/combined.log" })
  ]
});

// Si estem en desenvolupament local, afegim també la sortida per pantalla ben acolorida
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        customFormat
      )
    })
  );
}