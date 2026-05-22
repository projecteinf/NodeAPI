import { randomUUID } from "node:crypto";
import { tracks } from "../data/track";
import { Track } from "../types/track/track";
import { CreateTrackInput } from "../types/track/createTrack";


export function getAllTracks(): Track[] {
    return tracks;
}

export function findTrackById(id:string): Track | undefined {
    return  tracks.find((track) => track.id === id);
}

export function createTrack(trackInput: CreateTrackInput): Track {
  const newTrack: Track = {
    id: randomUUID(),
    ...trackInput
  };

  tracks.push(newTrack);

  return newTrack;
}

export function updateTrack(trackId:string, trackInput: CreateTrackInput): Track | undefined {

  const trackIndex = tracks.findIndex((track) => track.id === trackId);

  let updatedTrack:Track | undefined;

  if ( trackIndex != -1) 
  {
    updatedTrack = {
      id: trackId,
      ...trackInput
    };
  
    tracks[trackIndex] = updatedTrack;    
  }

  return updatedTrack;
}

export function deleteTrack(id:string): boolean {
  const trackIndex = tracks.findIndex((track) => track.id === id);

  if (trackIndex === -1) {
   return false;
  }

  tracks.splice(trackIndex, 1);
  return true;
}