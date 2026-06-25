# 31. Creació de playlists per a l'usuari autenticat

Enunciat: [P06.04 Creació de playlists per l'usuari autenticat](../P06.04%20Creació%20de%20playlists%20per%20l'usuari%20autenticat.md)

# Guió resolució

## Tasca a desenvolupar

La tasca que tenim que desenvolupar, segons les especificacions donades, es pot resumir en 

```text
Crear una nova llista de reproducció.
Restriccions
	1. L'usuari ha d'estar autentificat
	2. Les dades de la petició són vàlides
```
Per a resoldre aquesta tasca, hem de crear un nou `end point`.

## Creació `end point`.

Abans de crear l'`end point` , hem de determinar una ruta pel mateix. L'enunciat de la tasca ens ofereix la ruta que ha de tenir aquest `end point`.

```bash
curl -X POST http://localhost:3000/playlists \
  -H "Authorization: Bearer EL_TEU_JWT_AQUÍ" \
  -H "Content-Type: application/json" \
  -d 'JSON D\'ENTRADA PLAYLIST'
```

La comanda `curl` ens dóna diverses informacions

```text
- end point: http://localhost:3000/playlists (/playlists)
- mètode end point: POST
```
Amb aquesta informació, podem crear ja la nostra ruta en el programa, tot i que de moment, el seu codi serà mínim
## Crear ruta

El nostre programa no conté cap ruta relacionada amb llistes de reproducció (`/playlists`) . Per tant, haurem de crear un fitxer `src/routes/playlistsRouter` que contindrà totes les rutes relacionades amb `/playlists` i caldrà informar a la nostra aplicació `app.ts` que hem afegit un nou fitxer amb rutes. 

Fitxer: `app.ts`
```ts
app.use("/playlists", playlistsRouter);
```

Amb la definició, ja estem dient que les rutes de gestió de `playlists` estaran en l'`end point /playlists (http://ipservidor:port/playlists)`

Fitxer: `src/routes/playlists.ts`

```ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import { authenticateJWT } from "../middlewares/authMiddleware";

export const playlistsRouter = Router();

playlistsRouter.post(
  "/",
  authenticateJWT,
  validate(createPlaylistkSchema, "body"),
  createPlaylistController
);
```
Aquesta ruta (POST /playlists) defineix una sèrie d'accions que haurà de fer

```text
"/" : defineix que resoldrà les peticions dirigides a  http://IP:port/playlists 
authenticateJWT : l'usuari ha d'estar autentificat per a poder executar l'acció.
validate(createPlaylistkSchema, "body") : comprovem que les dades que ens arriben de la petició 'body' són correctes. Per fer-ho, caldrà definir un tipus 'createPlaylistkSchema' amb les restriccions.
createPlaylistController : si els dos punts anteriors es compleixen (usuari autenticat i dades correctes) el controlador gestionarà la creació de la "play list".
```
### authenticateJWT

No cal que fem res. Ja tenim definida aquesta funció i hem comprovat que funciona de forma correcte.

### validate(createPlaylistkSchema, "body")

Per a desenvolupar aquest punt, hem de definir la informació que ha de facilitar l'usuari per a crear una llista de reproducció. 

```text
 Cada usuari autenticat podrà crear tantes carpetes com desitgi. Per diferenciar-les, cada carpeta tindrà un nom obligatori triat per l'usuari (ex: *"Música per a córrer"*, *"Clàssics dels 80"*). L'usuari també podrà associar una descripció adicional a la carpeta.
```

Del text anterior observem:

```text
nom playlist: obligatori.
descripció playlist: opcional
```

Per tant, l'usuari només caldrà que informi del `nom` que vol assignar a la llista de reproducció. Si ho desitja, ha de poder especificar una descripció que s'associarà a la mateixa.

Per altra banda, aquesta informació s'haurà de guardar en la taula de 'Playlists'. Aquest fet, implica unes limitacions de capacitat per a cada camp. 

```sql
name NVARCHAR(200) NOT NULL,
description NVARCHAR(500) NULL,
```

- El nom (`name`) de la `playlist` no pot superar els 200 caràcters.
- La descripció (`description`) no pot superar els 500 caràcters.

Utlitzarem la llibreria `zod` per a validar les dades.

Fitxer: `src/middlewares/validators/playlists/playlist.ts`

```ts
import { z } from "zod";

export const createPlaylistkSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Play list name is required"
  }).max(200,{
    message: "Play list name max length is 200 characters"
  }),
  description: z.string().trim().max(500,{
    message: "Play list description max length is 500 characters"
  }).nullable().optional()
});
```
# createPlaylistController

La funció del controlador és la de delegar la creació de la llista de reproducció a un servei. El controlador ens retornarà una resposta codificada amb el resultat de l'operació.

Fitxer: `src/controllers/playlistController.ts`
```ts
import { NextFunction, Response, Request } from "express";
import { UnauthorizedError } from "../types/error/custom/unauthorizedError";


export async function createPlaylistController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {

  try {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedError("User session not found or invalid token");
    }

    const userId = req.user.id as string;
    const playlistInput: CreatePlaylistInput = req.body; 
    
    const createdPlaylist:PlayListDto = await createPlaylist(playlistInput, userId);

    return res.status(201).json(createdPlaylist);
  } catch (error) {
      next(error);
  }
}
```
La línia `const createdPlayList: PlayListDto = await createPlayList(playlistInput, userId);` és la que implementa la funcionalitat del controlador.

```text
playlistInput -> dades que s'han rebut de la petició. Ja estan validades tot i que encara hi poden haver problemes. Per exemple, nom de la llista de reproducció ja existent.
PlayListDto -> defineix la informació (JSON) que enviarà l'end point al client si la petició s'executa sense errors.
await createPlayList(req.body) -> crida a una funció (servei) per a crear la llista de reproducció a la base de dades.
```

## Servei `createPlaylist`

El servei és l'encarregat d'emmagatzemar la informació a la base de dades. El controlador ja li envia les dades de la petició `playlistInput` i l'identificador de l'usuari `userId`. Necessitem aquestes dades per a poder inserir una llista de reproducció a la taula `Playlists` de la base de dades.

L'estructura del nostre servei és:

Fitxer: `src/services/playlistService.ts`
```ts
export async function createPlaylist(input: CreatePlaylistInput, userId: string): Promise<PlayListDto> {

const pool: ConnectionPool = await getConnectionPool();

// Validació de dades a nivell de base de dades
// Inserció de la llista de reproducció a la base de dades
// retornar objecte creat (resposta API ->  DTO)

}
```
###  Validació de dades a nivell de base de dades

En aquest punt, hem de tornar a tenir present l'especificació del client

`Un usuari no podrà donar el mateix nom a dues llistes de reproducció.`

Per tant, el nostre servei el primer que haurà de fer és validar que l'usuari no posseeix una altra llista de distribució amb el mateix nom. La sentencia SQL que hauríem d'executar és

```SQL
SELECT id from Playlists where name='....' and userId='....';
```

En aquesta sentència tenim dos paràmetres d'entrada  @name i @userId (especificats amb .... en la sentència SQL).

```ts
// Comprovar si l'usuari ja té una llista amb el mateix nom
    const playlistCheckName: IResult<{ id: string }> = await pool
    .request()
    .input("name", sql.NVarChar(256), input.name)
    .input("userId", sql.NVarChar(36), userId)
    .query<{ id: string }>("SELECT id FROM PlayLists WHERE userId = @userId and name = @name");

    if (playlistCheckName.recordset.length > 0) {
        throw new BadRequestError("A play list with this name already exists");
    }
```


# Proves a realitzar

`End point` a testejar: `POST /playlists`

| Prova realitzada                                                    | Codi HTML |
| ------------------------------------------------------------------- | --------: |
| Crida a l'end point sense passar Token                              | 401 Auth. |
| Totes les dades especificades i amb contingut correcte              |    201 OK |
| Nom llista de reproducció correcte (sense descripció)               |    201 OK |
| Totes les dades especificades. Descripció duplicada                 |    201 OK |
| Nom llista de reproducció buit ("")                                 |    400 BR |
| Sense nom llista de reproducció                                     |    400 BR |
| La llista de reproducció (nom) ja existeix per l'usuari             |    400 BR |
| La llista de reproducció (nom) ja existeix però per un altre usuari |    201 OK |
> LLegenda
> Auth. : Authentication
> BR: Bad Request
