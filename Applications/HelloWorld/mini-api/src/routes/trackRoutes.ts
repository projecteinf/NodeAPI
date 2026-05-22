import { Router } from "express";
import {
  getTracksController,
  getTrackByIdController,
  createTrackController,
  putTrackController,
  deleteTrackController
} from "../controllers/trackController";

export const trackRouter = Router();

trackRouter.get("/", getTracksController);
trackRouter.get("/:id", getTrackByIdController);
trackRouter.post("/", createTrackController);
trackRouter.put("/:id", putTrackController);
trackRouter.delete("/:id", deleteTrackController);
