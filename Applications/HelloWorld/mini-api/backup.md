
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
 *                 type: integ *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID de la cançó a eliminar
 *           schema:
 *             type: stringer
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

415F56D7-5A00-4D63-8AED-7951622C7EF6

/**
 * @openapi
 *   /tracks/{id}:
 *     delete:
 *       summary: Eliminar una cançó
 *       description: Elimina de manera permanent una cançó del sistema. Requereix autenticació.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID de la cançó a eliminar
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: Cançó eliminada amb èxit.
 *       404:
 *         description: La cançó no s'ha trobat.
 */

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
 * @openapi
* /api/tracks:
*   get:
*     summary: Llistar cançons
*     parameters:
*       - name: search
*         in: query
*         required: false
*         schema:
*           type: string
*     responses:
*       200:
*         description: OK