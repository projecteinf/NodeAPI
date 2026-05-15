import express, { Express, Request, Response } from "express";

/*

  Express , Request i Response són tipus de dades 
  express -> funció que s'executa per a crear una aplicació de tipus Express
  
*/

const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API funcionant correctament" });
});

app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});