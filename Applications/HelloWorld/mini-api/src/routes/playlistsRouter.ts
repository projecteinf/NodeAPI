import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { createPlaylistkSchema } from "../middlewares/validators/playlists/playlist";
import { addTrackPlaylistController, createPlaylistController, deletePlaylistController, deleteTrackPlaylistController } from "../controllers/playlistController";
import { idParamSchema } from "../middlewares/validators/params/idParamSchema";
import { addSongPlaylistSchema } from "../middlewares/validators/playlists/track";
import { paramPlaylistSchema } from "../middlewares/validators/params/paramPlaylistSchema";

export const playlistsRouter = Router();


playlistsRouter.post(
  "/",
  authenticateJWT,
  validate(createPlaylistkSchema, "body"),
  createPlaylistController
);


playlistsRouter.delete(
  "/:id",
  authenticateJWT,
  validate(idParamSchema, "params"),
  deletePlaylistController
);

playlistsRouter.post(
  "/tracks",
  authenticateJWT,
  validate(addSongPlaylistSchema, "body"),
  addTrackPlaylistController
);


playlistsRouter.delete(
  "/:idPlaylist/tracks/:idTrack",
  authenticateJWT,
  validate(paramPlaylistSchema, "params"),
  deleteTrackPlaylistController
);
