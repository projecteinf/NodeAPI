import express, { Express, Request, Response } from "express";
import { apiInfo } from "./config/api";
import { getEnvironment } from "./config/environment";
import { trackRouter } from "./routes/trackRoutes";

export const app: Express = express();

app.use(express.json());

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

app.use("/tracks", trackRouter);