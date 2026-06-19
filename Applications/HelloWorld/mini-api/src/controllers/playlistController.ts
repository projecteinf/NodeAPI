import { NextFunction, Response, Request } from "express";
import { UnauthorizedError } from "../types/error/custom/unauthorizedError";
import { PlayListDto } from "../types/playlist/playlistDTO";
import { CreatePlaylistInput } from "../types/playlist/createPlaylist";
import { addTrackPlaylist, createPlaylist, deletePlaylist } from "../services/playlistService";
import { AddTrackPlaylistInput } from "../types/playlist/addTrackPlaylist";
import { PlaylistTrackDto } from "../types/playlist/playlistTrackDTO";


export async function createPlaylistController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {

  try {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedError("User session not found or invalid token");
    }

    const userId = req.user.id as string;
    const playlistInput: CreatePlaylistInput = req.body; 
    
    const createdPlaylist:PlayListDto = await createPlaylist(playlistInput, userId);

    return res.status(201).json(createdPlaylist);
  } catch (error) {
      next(error);
  }
}

export async function deletePlaylistController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  
  const  id : string = req.params.id as string;

  try {

    if (!req.user || !req.user.id) {
      throw new UnauthorizedError("User session not found or invalid token");
    }
    
    const  id : string = req.params.id as string;
    const userId = req.user.id as string;

    await deletePlaylist(id,userId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// Song management


export async function addTrackPlaylistController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {

  try {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedError("User session not found or invalid token");
    }

    const userId = req.user.id as string;
    const playlistTrackInput:AddTrackPlaylistInput = req.body; 
    
    const createdPlaylist:PlaylistTrackDto = await addTrackPlaylist(playlistTrackInput, userId);

    return res.status(201).json(createdPlaylist);
  } catch (error) {
      next(error);
  }
}


