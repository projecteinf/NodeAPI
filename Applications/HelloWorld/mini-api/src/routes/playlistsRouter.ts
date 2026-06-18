import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { createPlaylistkSchema } from "../middlewares/validators/playlists/playlist";
import { createPlaylistController, deletePlaylistController } from "../controllers/playlistController";
import { idParamSchema } from "../middlewares/validators/params/idParamSchema";



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