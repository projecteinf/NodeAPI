import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../types/error/custom/unauthorizedError";

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  // 1. Obtenir la capçalera Authorization
  const authHeader = req.headers.authorization;

  // 2. Validar que la capçalera existeixi i comenci per 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Access denied. No token provided.");
  }

  // 3. Extreure el token (separant el text per l'espai en blanc)
  const token = authHeader.split(" ")[1];

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET missing in environment variables");

    // 4. Verificar el token amb la clau secreta
    // Si ha expirat o s'ha manipulat, jwt.verify llançarà un error directament
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // 5. Injectar el payload desxifrat a la petició perquè el controlador el pugui fer servir
    req.user = decoded;

    // 6. Permetre el pas al següent middleware o controlador
    next();
  } catch (error) {
    // Si jwt.verify falla (per caducitat o manipulació), passem el nostre UnauthorizedError (401)
    next(new UnauthorizedError("Invalid or expired token."));
  }
}