import express, { Express, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { apiInfo } from "./config/api";
import { getEnvironment } from "./config/environment";
import { tracks } from "./data/track";
import { isCreateTrackInput } from "./validators/track";
import { CreateTrackInput } from "./types/track/createTrack";
import { Track } from "./types/track/track";
import { CreateTrackResponse } from "./types/track/trackResponse";
const app: Express = express();
const PORT: number = 3000;
const environment = getEnvironment();

app.use(express.json());  // Per poder llegir el body (JSON) de les peticions


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
  const trackInput: Partial<CreateTrackInput> = req.body;

    if (!isCreateTrackInput(trackInput)) {
      return res.status(400).json({
        message: "Invalid track data"
      });
    }

    const newTrack: Track = {
      id: randomUUID(),
      ...trackInput
    };

    tracks.push(newTrack);

    return res.status(201).json(newTrack);
});

app.post(
  "/tracks",
  (
    req: Request<{}, CreateTrackResponse, Partial<CreateTrackInput>>,
    res: Response<CreateTrackResponse>
  ) => {
    const trackInput: Partial<CreateTrackInput> = req.body;

    if (!isCreateTrackInput(trackInput)) {
      return res.status(400).json({
        message: "Invalid track data"
      });
    }

    const newTrack: Track = {
      id: randomUUID(),
      ...trackInput
    };

    tracks.push(newTrack);

    return res.status(201).json(newTrack);
  }
);

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});