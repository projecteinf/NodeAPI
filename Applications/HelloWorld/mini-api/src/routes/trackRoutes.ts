import { Router } from "express";
import {
  getTracks,
  getTrackById,
  // putTrack,
  // deleteTrack
} from "../controllers/trackController";

export const trackRouter = Router();

trackRouter.get("/", getTracks);
trackRouter.get("/:id", getTrackById);
