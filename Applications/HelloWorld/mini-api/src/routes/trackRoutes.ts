import { Router } from "express";
import {
  getTracksController,
  getTrackByIdController,
  createTrackController,
  updateTrackController,
  deleteTrackController
} from "../controllers/trackController";
import { validate } from "../middlewares/validate";
import { idParamSchema } from "../middlewares/validators/params/idParamSchema";
import { createTrackSchema } from "../middlewares/validators/track/track";
import { searchTracksSchema } from "../middlewares/validators/track/searchTracks";

export const trackRouter = Router();

trackRouter.get("/", validate(searchTracksSchema, "query"), getTracksController);

trackRouter.get(
  "/:id",
  validate(idParamSchema, "params"),
  getTrackByIdController
);

trackRouter.post(
  "/",
  validate(createTrackSchema, "body"),
  createTrackController
);

trackRouter.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(createTrackSchema, "body"),
  updateTrackController
);

trackRouter.delete(
  "/:id",
  validate(idParamSchema, "params"),
  deleteTrackController
);
