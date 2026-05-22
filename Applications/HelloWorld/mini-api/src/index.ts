import express, { Express, Request, Response } from "express";
import { trackRouter } from "./routes/trackRoutes";
import { getEnvironment } from "./config/environment";



const app: Express = express();
const PORT: number = 3000;
const environment = getEnvironment();

app.use(express.json());  // Per poder llegir el body (JSON) de les peticions

app.use("/tracks", trackRouter);

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});