import { JwtPayload } from "jsonwebtoken";

// Estenem globalment la interfície Request d'Express que ja existeix a node_modules
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Afegim la propietat de forma opcional
    }
  }
}