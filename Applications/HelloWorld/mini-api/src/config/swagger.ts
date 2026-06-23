import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MusicCloud API",
      version: "1.0.0",
      description: "Documentació oficial dinàmica de l'API de MusicCloud"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local"
      }
    ]
  },
  // Indiquem quins fitxers contenen els comentaris de documentació
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"] 
};

export const swaggerSpec = swaggerJSDoc(options);
