import express, { Express, Request, Response } from "express";
import { apiInfo } from "./config/api";
import { getEnvironment } from "./config/environment";
import { tracks } from "./data/track";

const app: Express = express();

const PORT: number = 3000;
const environment = getEnvironment();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
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

app.get("/tracks", (_req: Request, res: Response) => {
  res.status(200).json(tracks);
});


app.get("/tracks/:id", (req: Request, res: Response) => {
  const id:string = req.params.id as string;

  const track = tracks.find((track) => track.id === id);

  if (!track) {
    return res.status(404).json({
      message: "Track not found"
    });
  }

  res.status(200).json(track);
});


app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});