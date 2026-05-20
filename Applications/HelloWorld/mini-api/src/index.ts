import express, { Express, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { apiInfo } from "./config/api";
import { getEnvironment } from "./config/environment";
import { tracks } from "./data/track";
import { isCreateTrackInput } from "./validators/track";
import { CreateTrackInput } from "./types/track/createTrack";
import { Track } from "./types/track/track";
import { TrackResponse } from "./types/track/trackResponse";


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
  const id:string = req.params.id as string;

  const track = tracks.find((track) => track.id === id);

  if (!track) {
    return res.status(404).json({
      message: "Track not found"
    });
  }

  res.status(200).json(track);
});

app.post(
  "/tracks",
  (
    req: Request<{}, TrackResponse, Partial<CreateTrackInput>>,
    res: Response<TrackResponse>
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

app.put(
  "/tracks/:id",
  (
    req: Request<{ id: string}, TrackResponse, Partial<CreateTrackInput>>,
    res: Response<TrackResponse>
  ) => {
    const id:string = req.params.id as string;
    const trackInput: Partial<CreateTrackInput> = req.body;

    const trackIndex = tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    if (!isCreateTrackInput(trackInput)) {
      return res.status(400).json({
        message: "Invalid track data"
      });
    }

    const updatedTrack: Track = {
      id,
      ...trackInput
    };

    tracks[trackIndex] = updatedTrack;

    return res.status(200).json(updatedTrack);
  }
);

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});