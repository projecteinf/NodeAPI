import { randomUUID } from "node:crypto";
import { tracks } from "../data/track";
import { Track } from "../types/track/track";
import { isCreateTrackInput } from "../validators/track";
import { CreateTrackInput } from "../types/track/createTrack";
import { ErrorResponse } from "../types/error/errorResponse";

export function getAllTracks(): Track[] {
    return tracks;
}

export function findTrackById(id:string): Track | undefined {
    return  tracks.find((track) => track.id === id);
}

export function createTrack(trackInput:Partial<CreateTrackInput>): Track | ErrorResponse {

    if (!isCreateTrackInput(trackInput)) {
        const errorData:ErrorResponse = 
        {
          message: "Invalid track data"
        };
        return errorData;
      }
  
      const newTrack: Track = {
        id: randomUUID(),
        ...trackInput
      };
  
      tracks.push(newTrack);
      return newTrack;
}