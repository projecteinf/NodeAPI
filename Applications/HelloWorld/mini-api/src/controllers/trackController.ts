import { Request, Response } from "express";
import {    getAllTracks,
            findTrackById,
            createTrack,
            updateTrack,
            deleteTrack
 } from "../services/trackService";
import { TrackResponse } from "../types/track/trackResponse";
import { CreateTrackInput } from "../types/track/createTrack";
import { isCreateTrackInput } from "../validators/track";
import { Track } from "../types/track/track";


export function getTracksController(_req: Request, res: Response) {
  const allTracks:Track[] = getAllTracks();

  return res.status(200).json(allTracks);
}

export function getTrackByIdController(req: Request, res: Response<TrackResponse>) {
  const id:string = req.params.id as string;

  const track:Track | undefined = findTrackById(id);

  if (!track) {
    return res.status(404).json({
      message: "Track not found"
    });
  }

  return res.status(200).json(track);
}

export function createTrackController(
  req: Request<{}, TrackResponse, Partial<CreateTrackInput>>,
  res: Response<TrackResponse> ) {
  const trackInput: Partial<CreateTrackInput> = req.body;

  if (!isCreateTrackInput(trackInput))  {
    return res.status(400).json({
      message: "Invalid track data"
    });
  }

  const newTrack:Track = createTrack(trackInput);

  return res.status(201).json(newTrack);
}

export function putTrackController(
  req: Request<{ id: string}, TrackResponse, Partial<CreateTrackInput>>,
  res: Response<TrackResponse> ) {

    const id:string = req.params.id as string;
    const trackInput: Partial<CreateTrackInput> = req.body;

    if (!isCreateTrackInput(trackInput))  {
      return res.status(400).json({
        message: "Invalid track data"
      });
    }
    
    const updatedTrack:Track | undefined = updateTrack(id, trackInput);

    if (!updatedTrack) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(200).json(updatedTrack);
  }

  export function deleteTrackController(req: Request<{ id: string }>, res: Response)  {

    const id: string = req.params.id as string;   
    
    if (deleteTrack(id)) {
     return res.status(204).send();
    }
    else {
      return res.status(404).json({
        message: "Track not found"
      });
    }
    
  }