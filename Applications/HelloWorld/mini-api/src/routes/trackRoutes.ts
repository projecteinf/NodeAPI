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

export const trackRouter = Router();

trackRouter.get("/", getTracksController);

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
