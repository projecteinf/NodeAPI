import { AppEnvironment } from "../types/environment";

export function getEnvironment(): AppEnvironment {
  const environment = process.env.NODE_ENV;

  if (
    environment === "development" ||
    environment === "test" ||
    environment === "production"
  ) {
    return environment;
  }

  return "development";
}