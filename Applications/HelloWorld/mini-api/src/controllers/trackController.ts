import { getAllTracks, createTrack, updateTrack, deleteTrack, findTrackById } from "../services/trackService";
import { NextFunction, Request, Response } from "express";
import { TrackDto } from "../types/track/trackDTO";
import { ErrorCode } from "../types/error/errorResponse";
import { NotFoundError } from "../types/error/custom/BadRequestError";


export async function getTracksController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const tracks:TrackDto[] = await getAllTracks();

    return res.status(200).json(tracks);
  } catch (error) {
      next(error);
  }
}

export async function getTrackByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
     
    const  id : string = req.params.id as string;
  
    try {
      const track:TrackDto | null = await findTrackById(id);

      if (!track) {
        throw new NotFoundError("Track not found", ErrorCode.TrackNotFound);
      }

      return res.status(200).json(track);
      
    } catch (error) {
        next(error);
    }
}

export async function createTrackController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
     
  try {
    const createdTrack: TrackDto = await createTrack(req.body);

    return res.status(201).json(createdTrack);
   } catch (error) {
        next(error);
    }
}

export async function updateTrackController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  
  const  id : string = req.params.id as string;
 
  try {

    const updatedTrack:TrackDto | null = await updateTrack(id, req.body);

    if (!updatedTrack) {
      throw new NotFoundError("Track not found", ErrorCode.TrackNotFound);
    }

    return res.status(200).json(updatedTrack);
  } catch (error) {
    next(error);
  }
}

export async function deleteTrackController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  
  const  id : string = req.params.id as string;

  try {
    const deleted:boolean = await deleteTrack(id);

    if (!deleted) {
      throw new NotFoundError("Track not found", ErrorCode.TrackNotFound);
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}