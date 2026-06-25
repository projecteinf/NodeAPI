import express, { Express, Request, Response } from "express";
import { apiInfo } from "./config/api";
import { getEnvironment } from "./config/environment";
import { trackRouter } from "./routes/trackRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./routes/authRoutes";
import { playlistsRouter } from "./routes/playlistsRouter";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import helmet from "helmet";
import { apiLimiter } from "./config/rateLimiter";
import { corsOptions } from "./config/cors";
import cors from "cors";
import { logger } from "./config/logger";
import morgan from "morgan";
import apiRouter from "./routes";
export const app: Express = express();

app.use(express.json());

app.use(helmet()); // Activa les 15 capçaleres de seguretat automàtiques
app.use(apiLimiter); // Aplica el límit de peticions a tota l'API

app.use(cors(corsOptions)); 

// Configurar Morgan perquè utilitzi el format 'dev' o 'combined' i ho enviï a Winston
const morganStream = {
  write: (message: string) => logger.info(message.trim())
};

// Injectem Morgan com a middleware global
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream: morganStream }));2. 


const environment = getEnvironment();

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    name: apiInfo.name,
    version: apiInfo.version,
    status: "OK",
    description: apiInfo.description,
    resources: apiInfo.resources,
    meta: {
      environment
    }
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", apiRouter); 

app.use(errorHandler);


