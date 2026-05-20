import { CreateTrackInput } from "../types/track/createTrack";

export function isCreateTrackInput(
    data: Partial<CreateTrackInput>
  ): data is CreateTrackInput {
    return (
      typeof data.title === "string" &&
      typeof data.artist === "string" &&
      typeof data.duration === "number"
    );
  }