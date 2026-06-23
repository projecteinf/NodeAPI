import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Finestra de temps: 15 minuts (en mil·lisegons)
  max: 100, // Límit: Cada IP pot fer un màxim de 100 peticions per finestra
  message: {
    status: 429,
    error: "Too Many Requests",
    message: "Has superat el límit de peticions permès. Si us plau, intenta-ho més tard en uns 15 minuts."
  },
  standardHeaders: true, // Retorna informació del límit a les capçaleres 'RateLimit-*'
  legacyHeaders: false, // Desactiva les capçaleres antigues 'X-RateLimit-*'
});