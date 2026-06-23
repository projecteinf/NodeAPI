import { Router } from "express";
import {
  getTracksController,
  getTrackByIdController,
  createTrackController,
  updateTrackController,
  deleteTrackController
} from "../controllers/trackController";
import { validate } from "../middlewares/validate";
import { idParamSchema } from "../middlewares/validators/params/idParamSchema";
import { createTrackSchema } from "../middlewares/validators/track/track";
import { searchTracksSchema } from "../middlewares/validators/track/searchTracks";

export const trackRouter = Router();

/**
 * @openapi
 * /tracks:
 *   get:
 *     summary: Llistar i filtrar cançons
 *     description: Retorna un llistat de cançons suportant filtres per títol o durada, ordenació i paginació.
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Text per cercar parcialment al títol
 *         required: false
 *         schema:
 *           type: string
 *       - name: duration
 *         in: query
 *         description: Durada màxima en segons
 *         required: false
 *         schema:
 *           type: integer
 *       - name: sortBy
 *         in: query
 *         description: columna amb la qual volem ordenar les dades ( title | duration )
 *         required: false
 *         schema:
 *           type: string
 *       - name: sortOrder
 *         in: query
 *         description: criteri d'ordenació ascendent o descendent ( ASC | DESC )
 *         required: false
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: pàgina del llistat a la que es vol accedir
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: tracks que es volen visualitzar a cada plana
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Llistat de cançons retornat correctament.
 *       400:
 *         description: Error en la validació de les dades.
 * 
 */

trackRouter.get("/", validate(searchTracksSchema, "query"), getTracksController);

/**
 * @openapi
 * /tracks/{id}:
 *   get:
 *     summary: Obtenir una cançó
 *     description: Obtenir una cançó segons el seu ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cançó a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cançó obtinguda amb èxit.
 *       404:
 *         description: La cançó no s'ha trobat.
 */

trackRouter.get(
  "/:id",
  validate(idParamSchema, "params"),
  getTrackByIdController
);


/**
 * @openapi
 * /tracks:
 *   post:
 *     summary: Crear una nova cançó
 *     description: Afegeix una nova cançó al sistema. Requereix autenticació.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - durationSeconds
 *               - artistId
 *               - albumId
 *             properties:
 *               title:
 *                 type: string
 *               durationSeconds:
 *                 type: integer
 *               artistId:
 *                 type: string 
 *               albumId:
 *                 type: string 
 *     responses:
 *       201:
 *         description: Cançó creada correctament.
 *       400:
 *         description: Dades del cos (body) incorrectes o incompletes.
 *       401:
 *         description: No autoritzat. Manca el token JWT o és vàlid.
 */

trackRouter.post(
  "/",
  validate(createTrackSchema, "body"),
  createTrackController
);


/**
 * @openapi
 * /tracks/{id}:
 *   put:
 *     summary: Modificar dades cançó
 *     description: Modifica totes les dades d'una cançó per les noves dades 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cançó a eliminar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - durationSeconds
 *               - artistId
 *               - albumId
 *             properties:
 *               title:
 *                 type: string
 *               durationSeconds:
 *                 type: integer
 *               artistId:
 *                 type: string 
 *               albumId:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Cançó modificada amb èxit.
 *       404:
 *         description: La cançó no s'ha trobat.
 */

trackRouter.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(createTrackSchema, "body"),
  updateTrackController
);


/**
 * @openapi
 * /tracks/{id}:
 *   delete:
 *     summary: Eliminar una cançó
 *     description: Elimina de manera permanent una cançó del sistema. Requereix autenticació.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cançó a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cançó eliminada amb èxit.
 *       404:
 *         description: La cançó no s'ha trobat.
 */


trackRouter.delete(
  "/:id",
  validate(idParamSchema, "params"),
  deleteTrackController
);
