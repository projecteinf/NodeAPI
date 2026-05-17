export type ApiInfo = {
    name: string;
    version: string;
    description: string;
    resources: {
      tracks: string;
      artists: string;
      playlists: string;
    };
  };