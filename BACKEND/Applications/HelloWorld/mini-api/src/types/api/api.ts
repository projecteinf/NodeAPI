import { ApiResources } from "./resources";

export interface ApiInfo {
    name: string;
    version: string;
    description: string;
    resources: ApiResources;
  };