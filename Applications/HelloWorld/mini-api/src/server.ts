import { app } from "./app";

const PORT:number = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
  });