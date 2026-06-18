import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { createPlaylistkSchema } from "../middlewares/validators/playlists/playlist";
import { createPlaylistController } from "../controllers/playlistController";



export const playlistsRouter = Router();


playlistsRouter.post(
  "/",
  authenticateJWT,
  validate(createPlaylistkSchema, "body"),
  createPlaylistController
);
