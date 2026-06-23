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
export const app: Express = express();

app.use(express.json());

app.use(helmet()); // Activa les 15 capçaleres de seguretat automàtiques
app.use(apiLimiter); // Aplica el límit de peticions a tota l'API

app.use(cors(corsOptions)); 

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
app.use("/tracks", trackRouter);
app.use("/users", authRouter);
app.use("/playlists", playlistsRouter);

app.use(errorHandler);


