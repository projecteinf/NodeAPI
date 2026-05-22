import { Request, Response } from "express";
import {    getAllTracks,
            findTrackById,
 } from "../services/trackService";
import { TrackResponse } from "../types/track/trackResponse";


export function getTracks(_req: Request, res: Response) {
  const allTracks = getAllTracks();

  return res.status(200).json(allTracks);
}




export function getTrackById(req: Request, res: Response<TrackResponse>) {
   const id = req.params.id as string;

  const track = findTrackById(id);

  if (!track) {
    return res.status(404).json({
      message: "Track not found"
    });
  }

  return res.status(200).json(track);
}



  