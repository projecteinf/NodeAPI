import express, { Express, Request, Response } from "express";
import { trackRouter } from "./routes/trackRoutes";

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

app.use("/tracks", trackRouter);

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});