import { Router } from "express";
import { trackRouter } from "./trackRoutes";
import { authRouter } from "./authRoutes";
import { playlistsRouter } from "./playlistsRouter";


const apiRouter = Router();

// Centralitzem i ramifiquem totes les entitats del MusicCloud
apiRouter.use("/tracks", trackRouter);
apiRouter.use("/users", authRouter);
apiRouter.use("/playlists", playlistsRouter);


export default apiRouter;