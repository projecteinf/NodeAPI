import { ApiInfo } from "../types/api/api";

export const apiInfo: ApiInfo = {
    name: "MusicCloud API",
    version: "1.0.0",
    description: "API REST per gestionar tracks, artistes i playlists",
    resources: {
      tracks: "/tracks",
      artists: "/artists",
      playlists: "/playlists"
    }
  };