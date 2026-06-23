import { CorsOptions } from "cors";

// Llista blanca de dominis autoritzats a fer peticions a la nostra API
const whitelist = [
  "http://localhost:5173", // Port típic de les aplicacions de React / Vite
  "http://localhost:4200", // Port típic d'Angular
  "https://www.musiccloud-app.com" // El nostre futur domini de producció
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Si estem en desenvolupament local (origen undefined, ex: postman/curl) 
    // o si l'origen de la web està a la llista blanca, donem permís
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Bloquejat pel sistema de seguretat CORS de MusicCloud"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Permetem que ens enviïn el token JWT
  credentials: true // Permet l'enviament de cookies o capçaleres d'autenticació si calgués
};