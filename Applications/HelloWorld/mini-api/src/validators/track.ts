import { CreateTrackInput } from "../types/track/createTrack";

export function isCreateTrackInput(
    data: Partial<CreateTrackInput>
  ): data is CreateTrackInput {
    return (
      typeof data.title === "string" &&
      typeof data.artistId === "string" &&
      typeof data.durationSeconds === "number"
    );
  }