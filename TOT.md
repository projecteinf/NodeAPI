
// Nom fitxer: Pràctiques/Part 8 - Qualitat professional/P08.02 Protecció de l'API.md
```ts


# 38. Protecció de l'API: Rate Limiting i Helmet (Seguretat)

# Pràctica

Protecció i Blindatge del MusicCloud amb Helmet i Rate Limiting

# Objectiu

Instal·laràs i configuraràs Helmet i `express-rate-limit` al projecte MusicCloud per protegir l'aplicació globalment. Establiràs un límit de seguretat de 100 peticions cada 15 minuts per adreça IP. Si un usuari supera el límit, rebrà un missatge d'error personalitzat amb el codi 429.

# Pas 1: Instal·lació de dependències

Executa la següent comanda a la teva terminal per instal·lar els paquets de seguretat (Helmet ja inclou els seus propis tipus de TypeScript, per a `express-rate-limit` no calen tipus extres en versions recents):

```bash
npm install helmet express-rate-limit
```
# Pas 2: Configurar el Rate Limiter

Crea un fitxer dedicat per a la configuració del límit de peticions a `src/config/rateLimiter.ts`. D'aquesta manera mantenim el fitxer d'arrencada net.

```ts
import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Finestra de temps: 15 minuts (en mil·lisegons)
  max: 100, // Límit: Cada IP pot fer un màxim de 100 peticions per finestra
  message: {
    status: 429,
    error: "Too Many Requests",
    message: "Has superat el límit de peticions permès. Si us plau, intenta-ho més tard en uns 15 minuts."
  },
  standardHeaders: true, // Retorna informació del límit a les capçaleres 'RateLimit-*'
  legacyHeaders: false, // Desactiva les capçaleres antigues 'X-RateLimit-*'
});

```
# Pas 3: Aplicar els middlewares a `src/app.ts`

Obre el teu fitxer d'arrencada `src/app.ts`. Importa `helmet` i el teu `apiLimiter`, i registra'ls com a middlewares globals abans de la declaració de qualsevol ruta:

```ts
import express from "express";
import helmet from "helmet"; // Importem Helmet
import { apiLimiter } from "./config/rateLimiter"; // Importem el Rate Limiter
import trackRouter from "./routes/trackRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

// 1. CAPA DE SEGURETAT GLOBAL
app.use(helmet());
app.use(apiLimiter);

app.use(cors(corsOptions)); 

// 2. MIDDLEWARES DE PARSING
app.use(express.json());

// 3. RUTES
app.use("/tracks", trackRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

```


```


// Nom fitxer: Pràctiques/Part 8 - Qualitat professional/Solució/Mostra de registre de logs.md
```ts


S'ha utilitzat una eina de beautify per tal de millorar la lectura del log
## combined.log

```json
{
  "code": "ESOCKET",
  "level": "error",
  "message": "Failed to connect to localhost:1433 - Could not connect (sequence)",
  "name": "ConnectionError",
  "originalError": {
    "code": "ESOCKET"
  },
  "stack": "ConnectionError: Failed to connect to localhost:1433 - Could not connect (sequence)\n    at /home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/mssql/lib/tedious/connection-pool.js:86:17\n    at Connection.err (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1812:9)\n    at Object.onceWrapper (node:events:634:26)\n    at Connection.emit (node:events:519:28)\n    at Connection.emit (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1974:18)\n    at <anonymous> (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1834:14)\n    at process.processTicksAndRejections (node:internal/process/task_queues:84:11)",
  "timestamp": "2026-06-25 09:45:15"
}
{
  "level": "info",
  "message": "GET /tracks/3C0DAE72-1984-4CC7-83D5-B511A6614661 500 66 - 17.444 ms",
  "timestamp": "2026-06-25 09:45:15"
}
{
  "level": "warn",
  "message": "Operation [404] - NOT_FOUND: Track does not exist",
  "timestamp": "2026-06-25 09:51:46"
}
{
  "level": "info",
  "message": "GET /tracks/3C0DAE72-1984-4CC7-83D5-B511A6614661 404 53 - 7.850 ms",
  "timestamp": "2026-06-25 09:51:46"
}
```
## error.log

```json
{
  "code": "ESOCKET",
  "level": "error",
  "message": "Failed to connect to localhost:1433 - Could not connect (sequence)",
  "name": "ConnectionError",
  "originalError": {
    "code": "ESOCKET"
  },
  "stack": "ConnectionError: Failed to connect to localhost:1433 - Could not connect (sequence)\n    at /home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/mssql/lib/tedious/connection-pool.js:86:17\n    at Connection.err (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1812:9)\n    at Object.onceWrapper (node:events:634:26)\n    at Connection.emit (node:events:519:28)\n    at Connection.emit (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1974:18)\n    at <anonymous> (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1834:14)\n    at process.processTicksAndRejections (node:internal/process/task_queues:84:11)",
  "timestamp": "2026-06-25 09:45:15"
}
```



```


// Nom fitxer: Pràctiques/Part 8 - Qualitat professional/Solució/logs/combined.log.md
```ts


```log
{"level":"warn","message":"Operation [404] - NOT_FOUND: Track does not exist","timestamp":"2026-06-25 09:51:46"}
{"level":"info","message":"GET /tracks/3C0DAE72-1984-4CC7-83D5-B511A6614661 404 53 - 7.850 ms","timestamp":"2026-06-25 09:51:46"}
```


```


// Nom fitxer: Pràctiques/Part 8 - Qualitat professional/Solució/logs/error.log.md
```ts


```log
{"code":"ESOCKET","level":"error","message":"Failed to connect to localhost:1433 - Could not connect (sequence)","name":"ConnectionError","originalError":{"code":"ESOCKET"},"stack":"ConnectionError: Failed to connect to localhost:1433 - Could not connect (sequence)\n    at /home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/mssql/lib/tedious/connection-pool.js:86:17\n    at Connection.err (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1812:9)\n    at Object.onceWrapper (node:events:634:26)\n    at Connection.emit (node:events:519:28)\n    at Connection.emit (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1974:18)\n    at <anonymous> (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1834:14)\n    at process.processTicksAndRejections (node:internal/process/task_queues:84:11)","timestamp":"2026-06-25 09:45:15"}
```


```


// Nom fitxer: Pràctiques/Part 8 - Qualitat professional/Solució/SOL-P08.02 Protecció de l'API.md
```ts


# Protecció capçalera

Abans d'aplicar la protecció de la capçalera a la nostra aplicació, quan executem la comanda

```bash
curl -i http://localhost:3000/tracks
```

La informació que obtenim de la capçalera és:

```yaml
curl -i http://localhost:3000/tracks
HTTP/1.1 200 OK
X-Powered-By: Express
RateLimit-Policy: 100;w=900
RateLimit-Limit: 100
RateLimit-Remaining: 99
RateLimit-Reset: 900
Content-Type: application/json; charset=utf-8
Content-Length: 658
ETag: W/"292-fzZqAVod6i7nLX7j/s6ffIlSs0Y"
Date: Tue, 23 Jun 2026 16:36:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

Després de la protecció amb `Helmet`, les dades resultants són:

```yaml
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
RateLimit-Policy: 100;w=900
RateLimit-Limit: 100
RateLimit-Remaining: 99
RateLimit-Reset: 900
Content-Type: application/json; charset=utf-8
Content-Length: 658
ETag: W/"292-fzZqAVod6i7nLX7j/s6ffIlSs0Y"
Date: Tue, 23 Jun 2026 16:42:31 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
# Protecció atacs massius

```bash
for i in {1..101} 
  do 
    echo -e "\n\nEXECUCIÓ NÚMERO $i\n"
    curl http://localhost:3000/tracks | tail -n1 
done
```

```json

EXECUCIÓ NÚMERO 100

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   658  100   658    0     0   267k      0 --:--:-- --:--:-- --:--:--  321k
{
  "info": {},
  "data": [
    {
      "id": "FE3C4F2A-B094-4908-B4D8-AFD5C9989656",
      "title": "Billie Jean",
      "duration": 294
    },
    {
      "id": "887D5619-927A-4466-BFCF-DB97ABED62D1",
      "title": "Bohemian Rhapsody",
      "duration": 354
    },
    {
      "id": "229F0C58-8E69-451C-90A4-5546DCBF2CE3",
      "title": "Don't Stop Me Now Remastered",
      "duration": 294
    },
    {
      "id": "7C5E8FFF-1893-45FA-AA88-B84AA994B33E",
      "title": "Don't Stop Me Now Remastered 2026",
      "duration": 225
    },
    {
      "id": "0943DF7C-20CD-4AD4-9C37-D821B825D639",
      "title": "Get Lucky",
      "duration": 369
    },
    {
      "id": "50AD955C-DA0E-4BB5-A509-1B0EBC91F750",
      "title": "One More Time",
      "duration": 320
    },
    {
      "id": "30D1A058-992A-4FD1-9AAD-56F5AC0422D1",
      "title": "Smells Like Teen Spirit",
      "duration": 301
    }
  ]
}

EXECUCIÓ NÚMERO 101

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   149  100   149    0     0   144k      0 --:--:-- --:--:-- --:--:--  145k
{
  "status": 429,
  "error": "Too Many Requests",
  "message": "Has superat el límit de peticions permès. Si us plau, intenta-ho més tard en uns 15 minuts."
}
```

```


// Nom fitxer: Pràctiques/Part 8 - Qualitat professional/P08.03 Traçabilitat del servidor.md
```ts


# Pràctica

Implementació de la Traçabilitat i Historial de Logs al MusicCloud

# Objectiu

Instal·la i configura Winston i Morgan en el projecte MusicCloud seguint l'estructura centralitzada vista a la teoria. Hauràs d'assegurar-te que:

1. Totes les peticions HTTP es registren automàticament a la consola i al fitxer `logs/combined.log`.

2. El teu middleware de gestió d'errors global (`errorHandler`) utilitzi `logger.error(error)` en lloc de `console.error(error)`, fent que qualsevol caiguda o fallada de SQL Server deixi constància escrita amb el seu *Stack Trace* al fitxer `logs/error.log`.

---


```


// Nom fitxer: Pràctiques/Part 8 - Qualitat professional/P08.01 Documentació interactiva amb OpenAPI i Swagger.md
```ts


# 37. Documentació interactiva amb OpenAPI i Swagger

# Pràctica

Creació de la Documentació Interactiva Swagger al MusicCloud per a l'`end point/tracks` .

# Objectiu

Has d'instal·lar les llibreries de Swagger i configurar la documentació interactiva de la teva API a la ruta `/api-docs`. 

Cal documentar només l'`end point /tracks`  . Tot i que en la nostra pràctica no està habilitada l'autenticació per aquest `end point` tingues en compte les següents restriccions a nivell de documentació

```text
get -> end point public
get/id -> end point public
post / put / delete -> requereixen que l'usuari estigui autenticat.
```


```


// Nom fitxer: Pràctiques/Part 1 - API Mínima/P01.03 Entorns d'execució.md
```ts



> En aquest projecte mostrarem l'entorn dins de la resposta de `GET /` amb finalitat didàctica. En una API real, no sempre és recomanable exposar informació interna del servidor.

## Configuració d'entorns

### Objectiu

Configurar l'API MusicCloud perquè pugui executar-se en tres entorns diferents:

```text
development
test
production
```

L'`endpoint GET /` haurà de retornar dins del JSON quin entorn està actiu.

---

## Tasca

Afegeix a l'API una configuració d'entorn basada en la variable `NODE_ENV`.

L'aplicació haurà de reconèixer aquests tres valors:

```text
development
test
production
```

Si `NODE_ENV` no està definida o té un valor no vàlid, l'aplicació haurà d'utilitzar `development` per defecte.

---
## Estructura

Afegeix un nou fitxer:

```text
src/config/environment.ts
```

El projecte hauria de quedar així:

```text
src/
├── config/
│   ├── api.ts
│   └── environment.ts
├── types/
│   └── api.ts
└── index.ts
```

---
## Scripts del `package.json`

Instal·la `cross-env` per fer que els scripts funcionin igual en Windows, Linux i macOS:

```bash
npm install -D cross-env
```

Modifica els scripts:

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx src/index.ts",
    "test": "cross-env NODE_ENV=test tsx src/index.ts",
    "build": "tsc",
    "start": "cross-env NODE_ENV=production node dist/index.js"
  }
}
```
---
## Comprova el funcionament

### Entorn de desenvolupament

Executa:

```bash
npm run dev
```

Verifica que l'entorn que s'està executant és el de desenvolupament.

---
### Entorn de proves

Atura el servidor i executa:

```bash
npm run test
```

Verifica que l'entorn que s'està executant és el de test.

---

### Entorn de producció

Primer compila el projecte:

```bash
npm run build
```

Després executa:

```bash
npm start
```

Verifica que l'entorn que s'està executant és el de producció.

---
## Entrega

Modifica el repositori de GitHub creat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
src/config/environment.ts
src/index.ts modificat
package.json modificat
commit al repositori
```



```


// Nom fitxer: Pràctiques/Part 1 - API Mínima/P01.01 Creació  mini Web API.md
```ts


# Creació d'una mini Web API amb Express i TypeScript
## Objectiu de la pràctica

L'empresa MusicCloud ens ha demanat que desenvolupem una aplicació tipus Spotify. 

L'objectiu d'aquesta primera pràctica és crear una **mini Web API** utilitzant **Node.js**, **Express** i **TypeScript**. Aquesta mini web serà la base del producte final.
## Context

Com a primer pas, cal crear una API mínima que permeti comprovar que el servidor funciona correctament.

La primera versió de l'API només tindrà una ruta principal que retornarà un missatge en format JSON.

Quan un usuari accedeixi a:
```text
http://localhost:3100
```
el servidor haurà de respondre:
```json
{
  "message": "API funcionant correctament"
}
```
## Tasques a realitzar

### Crear el projecte

Crea una carpeta per al projecte amb el nom:
```text
mini-api
```
Entra dins la carpeta i inicialitza el projecte amb `npm`.

El projecte haurà de tenir, com a mínim, aquesta estructura:
```text
mini-api/
├── src/
│   └── index.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```
### Instal·lar les dependències

Instal·la Express com a dependència principal del projecte.

També hauràs d'instal·lar les eines necessàries per treballar amb TypeScript en desenvolupament.

El projecte haurà d'incloure:

```text
express
typescript
tsx
@types/node
@types/express
```

Recorda que algunes dependències només són necessàries durant el desenvolupament.
### Configurar TypeScript

Modifica el fitxer `tsconfig.json` perquè el projecte compleixi aquests requisits:
```text
El codi font estarà dins la carpeta src.
El codi compilat es generarà dins la carpeta dist.
El projecte utilitzarà comprovació estricta de tipus.
La versió objectiu de JavaScript serà ES2022.
El sistema de mòduls serà compatible amb Node.js.
```
### Configurar els scripts del projecte

El fitxer `package.json` haurà de tenir scripts per poder fer aquestes accions:

| Script  | Funció                                  |
| ------- | --------------------------------------- |
| `dev`   | Executar el projecte en desenvolupament |
| `build` | Compilar el projecte TypeScript         |
| `start` | Executar el projecte compilat           |

Per tant, s'hauran de poder executar aquestes ordres:
```bash
npm run dev
npm run build
npm start
```
### Crear el servidor Express

Dins el fitxer `src/index.ts`, crea una aplicació Express que compleixi els requisits següents:
```text
Importar Express.
Crear una aplicació Express.
Definir el port 3000.
Crear una ruta GET a /.
Retornar una resposta JSON.
Posar el servidor a escoltar.
Mostrar un missatge per consola quan el servidor s'hagi iniciat.
```
La ruta principal `/` haurà de retornar exactament aquesta resposta:
```json
{
  "message": "API funcionant correctament"
}
```
### Comprovar el funcionament

Executa el servidor:
```bash
npm run dev
```
Comprova el funcionament obrint al navegador:
```text
http://localhost:3100
```
### Compilar i executar el projecte

Compila el projecte TypeScript.

Comprova que s'ha generat la carpeta:
```text
dist/
```
Després, executa la versió compilada del projecte.
```bash
npm run start
```
El servidor haurà de continuar responent correctament a:

```text
http://localhost:3000
```
## Lliurament

La pràctica s'haurà de lliurar mitjançant un **repositori de GitHub**.

Cada alumne/a haurà de crear un nou repositori amb el projecte de la mini Web API.

El repositori haurà d'incloure tot el codi necessari per executar i compilar l'aplicació, però **no haurà d'incloure la carpeta `node_modules/`**.

A l'arrel del projecte s'haurà de crear una carpeta anomenada:
```text
Documentació
```
Aquesta carpeta haurà d'incloure la documentació tècnica de la pràctica i evidències de funcionament.

1.  En el fitxer `Creació mini web api`, s'inclouran les instruccions executades per a generar el projecte i els canvis realitzats en el mateix.
2. En el fitxer `Execució desenvolupament`, s'inclouran les instruccions per executar l'aplicació en desenvolupament. Cal afegir en el document evidències del seu funcionament.
3. En el fitxer `Execució producció`, s'inclouran les instruccions per a implementar l'aplicació a producció. Cal afegir en el document evidències del seu funcionament.


```


// Nom fitxer: Pràctiques/Part 1 - API Mínima/P01.02 Primer endpoint.md
```ts


# Primer `endpoint GET /`

## Objectiu

Modificar l’endpoint principal de l’API perquè retorni informació general sobre **MusicCloud API** en format JSON.

Aquest endpoint servirà com a punt d’entrada informatiu de l’API.

---
## Tasca

Modifica l’endpoint `GET /` perquè deixi de retornar només un missatge simple i retorni una resposta JSON més completa.

La resposta ha d’incloure els camps següents:

```text
name
version
status
description
resources
```

El bloc `resources` ha de contenir, com a mínim, aquestes rutes:

```text
tracks
artists
playlists
```

---
## Requisits tècnics

Crea un fitxer de configuració per guardar la informació general de l’API:

```text
src/config/api.ts
```

Aquest fitxer ha de contenir una constant exportada amb la informació de l’API.

Exemple orientatiu:

```ts
type ApiInfo = {
  name: string;
  version: string;
  description: string;
  resources: {
    tracks: string;
    artists: string;
    playlists: string;
  };
};

export const apiInfo: ApiInfo = {
  name: "MusicCloud API",
  version: "1.0.0",
  description: "API REST per gestionar tracks, artistes i playlists",
  resources: {
    tracks: "/tracks",
    artists: "/artists",
    playlists: "/playlists"
  }
};
```

Després, importa aquesta constant al fitxer principal del servidor i utilitza-la dins de l'endpoint `GET /`.

---
## Entrega

Modifica el repositori de GitHub creat en la pràctica anterior.

La pràctica ha d’incloure:

```text
el fitxer src/config/api.ts
el fitxer principal modificat
el commit corresponent al repositori
```

---

```


// Nom fitxer: Pràctiques/Part 2 - Recursos en memòria/P02.02.GET tracks.md
```ts


# Pràctica proposada

## Tasca

Afegeix a l’API MusicCloud l’endpoint:

```http
GET /tracks
```

Aquest endpoint ha de retornar tots els tracks guardats en memòria.

---
## Requisits

L’endpoint ha de complir aquests requisits:

```text
ha de respondre a la ruta /tracks
ha d’utilitzar el mètode GET
ha de retornar l’array tracks
ha de respondre amb codi d’estat 200
la resposta ha d’estar en format JSON
```

---

## Comprovació

Executa el servidor:

```bash
npm run dev
```

Comprova funcionament i estat

```bash
curl -i http://localhost:3000/tracks
```


---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d’incloure:

```text
el fitxer src/index.ts modificat
l’endpoint GET /tracks funcionant
un commit amb els canvis realitzats
document de comprovació de funcionament de l'endpoint
```


```


// Nom fitxer: Pràctiques/Part 2 - Recursos en memòria/P02.03.GET track by ID.md
```ts


# Get track by ID

## Tasca

Afegeix a l'API MusicCloud l'endpoint:

```http
GET /tracks/:id
```

Aquest endpoint ha de permetre obtenir un track concret a partir del seu identificador.

---

## Requisits

L'endpoint ha de complir aquests requisits:

```text
ha de respondre a la ruta /tracks/:id
ha d'obtenir l'identificador des de req.params.id
ha de buscar el track dins de l'array tracks
si el track existeix, ha de retornar-lo amb estat 200
si el track no existeix, ha de retornar estat 404
la resposta ha d'estar en format JSON
```

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
el fitxer src/index.ts modificat
l'endpoint GET /tracks/:id funcionant
comprovació de funcionament de les diferents possibilitats
un commit amb els canvis realitzats
```


```


// Nom fitxer: Pràctiques/Part 2 - Recursos en memòria/P02.06.DELETE tracks.md
```ts



# Pràctica proposada

## Tasca

Afegeix a l'API MusicCloud l'endpoint:

```http
DELETE /tracks/:id
```

Aquest endpoint ha de permetre eliminar un track existent dins de l'array en memòria.

---

## Requisits

L'endpoint ha de complir aquests requisits:

```text
ha de respondre a la ruta /tracks/:id
ha d'utilitzar el mètode DELETE
ha de llegir l'id des de req.params.id
ha de comprovar si el track existeix
si el track existeix, l'ha d'eliminar de l'array tracks
si s'elimina correctament, ha de retornar estat 204
si el track no existeix, ha de retornar estat 404
la resposta d'error ha d'estar en format JSON
```

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
src/index.ts modificat
l'endpoint DELETE /tracks/:id funcionant
comprovació dels casos 204 i 404
```

---

```


// Nom fitxer: Pràctiques/Part 2 - Recursos en memòria/P02.04.POST Tracks.md
```ts


# Pràctica proposada

## Tasca

Afegeix a l'API MusicCloud l'endpoint:

```http
POST /tracks
```

Aquest endpoint ha de permetre crear un nou track en memòria.

---

## Requisits

L'endpoint ha de complir aquests requisits:

```text
ha de respondre a la ruta /tracks
ha d'utilitzar el mètode POST
ha de llegir les dades des de req.body
ha de validar que title, artist i duration existeixen i tenen el tipus correcte
ha de generar automàticament un id per al nou track
ha d'afegir el nou track a l'array tracks
si les dades són correctes, ha de retornar el nou track amb estat 201
si les dades són incorrectes, ha de retornar estat 400
la resposta ha d'estar en format JSON
```

També cal crear:

```text
src/validators/track.ts
```

amb la funció:

```ts
isCreateTrackInput()
```

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
un fitxer per a cada tipus de dada
src/validators/track.ts creat
src/index.ts modificat
l'endpoint POST /tracks funcionant
evidències de comprovació dels casos 201 i 400
```

---


```


// Nom fitxer: Pràctiques/Part 2 - Recursos en memòria/P02.01.Tracks en memòria.md
```ts


# 04. Tracks en memòria

## Pràctica: tracks en memòria

### Tasca

Afegeix al projecte MusicCloud el recurs `Track` en memòria.

Has de crear:

```text
src/types/track.ts
src/data/tracks.ts
```

El tipus `Track` ha d’incloure:

```text
id
title
artist
duration
```

L’array `tracks` ha de contenir com a mínim tres cançons.

---
### Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d’incloure:

```text
el fitxer src/types/track.ts
el fitxer src/data/tracks.ts
un commit amb els canvis realitzats
```



```


// Nom fitxer: Pràctiques/Part 2 - Recursos en memòria/P02.05.PUT tracks.md
```ts


# Pràctica

## Tasca

Afegeix a l'API MusicCloud l'endpoint:

```http
PUT /tracks/:id
```

Aquest endpoint ha de permetre actualitzar un track existent dins de l'array en memòria.

---
## Requisits

L'endpoint ha de complir aquests requisits:

```text
ha de respondre a la ruta /tracks/:id
ha d’utilitzar el mètode PUT
ha de llegir l'id des de req.params.id
ha de llegir les dades des de req.body
ha de comprovar si el track existeix
ha de validar que title, artist i duration existeixen i tenen el tipus correcte
si el track existeix i les dades són correctes, ha d’actualitzar-lo
ha de mantenir el mateix id del track
si s’actualitza correctament, ha de retornar el track actualitzat amb estat 200
si el track no existeix, ha de retornar estat 404
si les dades són incorrectes, ha de retornar estat 400
la resposta ha d’estar en format JSON
```

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d’incloure:

```text
src/index.ts modificat
l’endpoint PUT /tracks/:id funcionant
comprovació dels casos 200, 400 i 404
```

---


```


// Nom fitxer: Pràctiques/Part 7 - Funcionalitats avançades/P07.03 Paginació eficient i ordenació.md
```ts


# 36. Paginació eficient i ordenació de resultats en l'API

# Pràctica

Implementació de la Paginació i Ordenació al MusicCloud. L'`end point` no pot retornar més de 100 registres per pàgina. 
# Objectiu

Actualitza l'endpoint de llistar cançons (`GET /tracks`) per suportar paginació eficient (`page`, `limit`) i ordenació dinàmica (`sortBy`, `sortOrder`). Si l'usuari no especifica cap d'aquests valors, el sistema ha d'aplicar els valors per defecte (Pàgina 1, límit de 10 cançons, ordenat per títol de manera ascendent).

Per a validar la informació d'entrada a Zod pots utilitzar la funció enum.

```ts
import { z } from "zod";

export const searchTracksSchema = z.object({
	...
  // Validació de l'ordenació restringida a valors permesos
	sortBy: z.enum(["title", "duration"]).optional()
	...
});
```


```


// Nom fitxer: Pràctiques/Part 7 - Funcionalitats avançades/P07.02 Validació de Query Parameters.md
```ts


# 35. Validació de Query Parameters: Cerca i Filtres a l'API

# Pràctica

Validació de Filtres i Cerca de Cançons al MusicCloud. La cerca de cançons és pública per a tothom -> No cal estar autenticat a l'aplicació.

# Objectiu

Has d'implementar la funcionalitat de cerca i filtrat a l'endpoint de llistar cançons (`GET /tracks`) de la teva aplicació **MusicCloud**. L'endpoint ha de permetre filtrar de manera opcional pel títol de la cançó (`search`) i per la duració (`duration`). Les dades de la URL s'han de validar estrictament amb `zod` fent servir el mètode configurat per a la `query` abans d'arribar al controlador.

# Validació de dades `query string`

Per a validar les dades, utilitza el següent esquema

```ts
import { z } from "zod";

export const searchTracksSchema = z.object({
  search: z.string().trim().optional(),
  // z.coerce.number() agafarà el string "180", el transformarà al número 180 
  // i finalment comprovarà si és un número vàlid.
  duration: z.coerce.number().optional()
});
```

```


// Nom fitxer: Pràctiques/Part 7 - Funcionalitats avançades/P07.01 Relacions molts a molts.md
```ts


# 34. Relacions Many-to-Many 
# Pràctica

Implementació de la Gestió de Cançons en llistes de reproducció al MusicCloud

# Objectiu

Has d'implementar els mecanismes per **afegir** i **eliminar** cançons de les llistes de reproducció a **MusicCloud**. Els endpoints han d'estar completament protegits: un usuari només podrà modificar les llistes de reproducció que hagi creat ell mateix. Si ho intenta amb una llista de reproducció d'un altre usuari, el sistema llançarà un error `ForbiddenError` (HTTP 403).

La cançó que s'afegeix sempre s'ubicarà al final de la llista.


```


// Nom fitxer: Pràctiques/Part 6 - Autenticació i Seguretat de l'Usuari 1/P06.02 Login i generació de JSON Web Tokens (JWT).md
```ts


# Pràctica 

Implementació del Login al MusicCloud

# Objectiu

Has d'implementar el procés complet de Login a la teva aplicació **MusicCloud**. A diferència de l'exemple teòric que utilitza l'*username*, **el teu sistema s'ha d'autenticar obligatòriament utilitzant l'Email i la Contrasenya**.

Hauràs d'utilitzar la teoria apresa per completar els següents fitxers seguint l'arquitectura del teu projecte.

---
# Configuració del fitxer d'entorn

Afegeix al teu fitxer `.env` les variables per configurar el comportament de la signatura del JWT. Utilitza aquests valors.

- Secret: LaTevaClauSuperSecretaIComplexaDeMinim32Caracters123!
- Temps de caducitat: 2 hores

---

# Tipat i Validació de Dades (Zod)

Crea una interfície per recollir les dades del formulari i el seu corresponent esquema de validació amb `zod`. Tingues en compte la decisió de disseny d'**utilitzar l'email**.

## Completa el fitxer `src/types/user/loginUser.ts`

```ts
export interface LoginUserInput {
  // Defineix les propietats necessàries per l'autenticació
}

```

## Validació dades entrada

Crea el fitxer `src/middlewares/validators/user/loginSchema.ts` i valida les dades d'entrada utilitzant `zod`.

---
## Desenvolupament de la Lògica de Negoci 

La lògica de negoci està continguda en el fitxer `userService.ts` . 

Afegeix la funció  `loginUser` amb els següents requeriments

* Ha de rebre com a paràmetre un objecte de tipus `LoginUserInput`.

* Ha de retornar una promesa amb un objecte que contingui el `token` (string) i les dades públiques de l'usuari en format `UserDto`. Utilitza el següent format.

```ts
Promise<{ token: string; user: UserDto }>
```

* La consulta SQL ha de filtrar per `@email` en lloc de per `@username`.
* Recorda mantenir la mesura de seguretat fonamental: tant si falla perquè l'email no existeix com si falla perquè la contrasenya és errònia, s'ha de llançar un `BadRequestError` amb el mateix missatge exacte: `"Invalid email or password"`.

---
## Enrutament i Controladors

###  Endpoint al controlador (`src/controllers/authController.ts`)

Afegeix la funció `loginUserController`. Aquesta funció ha de:

1. Rebre la petició d'Express.
2. Invocar la funció que has programat al `userService`.
3. Respondre amb un status **200 OK** enviant el JSON amb el token i l'usuari en cas d'èxit.
4. Enviar qualsevol error al següent middleware usant `next(error)`.

### Registrar la ruta (`src/routes/authRoutes.ts`)

Afegeix la ruta de tipus `POST` apuntant a `/login`. Recorda aplicar-li el middleware de validació genèric `validate(...)` passant-li l'esquema `loginUserSchema` que has definit a l'Exercici 2.

---


```


// Nom fitxer: Pràctiques/Part 6 - Autenticació i Seguretat de l'Usuari 1/P06.04 Creació de playlists per l'usuari autenticat.md
```ts


# Tasca

Especificació - creació de carpetes: 
[P-ESP.06.04 Especificació funcional](P-ESP.06.04%20Especificació%20funcional.md)

---
# Desenvolupament de la Lògica de Negoci

Hauràs de crear un nou `end point /playlists` segons el document d'especificació enllaçat al document. 

Tingues en compte que **només cal fer la part de creació de carpetes**

# Com provar-ho amb `curl`

Per testejar que tot funciona correctament, primer necessitaràs el token que vas obtenir al fer Login. L'URL que has d'utilitzar és la següent 

```bash
curl -X POST http://localhost:3000/playlists \
  -H "Authorization: Bearer EL_TEU_JWT_AQUÍ" \
  -H "Content-Type: application/json" \
  -d 'JSON D\'ENTRADA PLAYLIST'
```
Recordar modificar
```text
EL_TEU_JWT_AQUÍ
JSON D\'ENTRADA PLAYLIST
```
pels valors associats.

```


// Nom fitxer: Pràctiques/Part 6 - Autenticació i Seguretat de l'Usuari 1/Solució guiada/SOL-P06.04 Creació de playlists per l'usuari autenticat 1.md
```ts


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


```


// Nom fitxer: Pràctiques/Part 6 - Autenticació i Seguretat de l'Usuari 1/P06.05 Protecció de recursos i control d'accés.md
```ts


# 32. Protecció de recursos i control d'accés (Ownership)

# Pràctica

Crea l'`end point` per a eliminar una llista de reproducció.

```


// Nom fitxer: Pràctiques/Part 6 - Autenticació i Seguretat de l'Usuari 1/P-ESP.06.04 Especificació funcional.md
```ts



# **Especificació Funcional

## Gestió de Carpetes de Cançons**

### Descripció de la necessitat

El sistema ha de permetre que els usuaris organitzin i personalitzin la seva experiència musical mitjançant la creació de **carpetes** virtuals. Una carpeta és un contenidor privat on l'usuari pot agrupar les seves cançons preferides segons els seus propis criteris (estat d'ànim, gènere, activitat, etc.).

### Requeriments detallats:

1. **Creació il·limitada i identificació:** Cada usuari autenticat podrà crear tantes carpetes com desitgi. Per diferenciar-les, cada carpeta tindrà un **nom obligatori** triat per l'usuari (ex: *"Música per a córrer"*, *"Clàssics dels 80"*). L'usuari també podrà associar una descripció adicional a la carpeta. Un usuari no podrà donar el mateix nom a dues llistes de reproducció.

2. **Gestió del contingut (Afegir / Treure):** L'usuari tindrà el control total sobre el contingut de les seves carpetes. Des de la interfície de reproducció o el cercador, es podrà "afegir a una carpeta" qualsevol cançó de la plataforma. De la mateixa manera, des de dins de la carpeta, l'usuari podrà eliminar qualsevol cançó que ja no hi vulgui tenir.

3. **Reproducció seqüencial:** Una carpeta actuarà com una unitat de reproducció. L'usuari ha de poder iniciar la reproducció de la carpeta, i el sistema enllaçarà totes les cançons contingudes en un **ordre seqüencial** (de la primera a l'última segons l'ordre en què es van afegir).

4. **Propietat i Privacitat (Seguretat):** Les carpetes són d'àmbit privat. Un usuari només pot veure, modificar i reproduir les carpetes que ell mateix ha creat. Cap usuari pot accedir a les carpetes d'altres membres de la plataforma.



```


// Nom fitxer: Pràctiques/Part 6 - Autenticació i Seguretat de l'Usuari 1/P06.01 Registre d'usuaris i hashing de contrasenyes (bcrypt).md
```ts


# Pràctica

## Tasca

Instal·lar la llibreria `bcrypt`, crear les rutes, els esquemes de validació de Zod, el servei i el controlador per permetre el registre d'usuaris a l'API de MusicCloud.

---
## Requisits

```text
Instal·lar bcrypt i els seus corresponents tipus per a TypeScript.
Crear el fitxer d'esquema de validació per a l'usuari amb Zod.
Crear UserDto per evitar retornar el hash de la contrasenya en la resposta.
Crear userService.ts amb la lògica de comprovació de duplicats i hashing.
Crear authController.ts i la seva ruta /auth/register.
```
---
# Instruccions
## Instal·lar Bcrypt

Executa a la terminal del projecte per instal·lar la llibreria i els tipus de TypeScript:

```bash
npm install bcrypt
npm install --save-dev @types/bcrypt

```
---
## Crear els Types, DTO d'Usuari i esquema de validació.

La nostra base de dades ja conté una taula Users amb la següent estructura. 

```sql
  id UNIQUEIDENTIFIER
  username NVARCHAR(100)
  email NVARCHAR(255)
  password NVARCHAR(60)
  createdAt DATETIME2
```

Per a l'usuari necessitem crear 3 tipus diferents de dades
- `createUserInput`: registrar usuari.
- `user`: representació de l'usuari en la base de dades.
- `userDto`: resposta de l'API quan es requereix la informació d'un usuari.

Per a validar la informació de l'usuari, cal que creis un esquema `createUserSchema`. Les restriccions que s'han d'aplicar són:

- username: mínim 8 caràcters.
- email: format vàlid. Utilitza `z.email` per a la validació.
- password: mínim 8 caràcters. De moment, no es valida la complexitat de la mateixa. Només longitud.
---
---
## Servei per a gestió d'usuaris (`userService.ts`)

De moment, aquest servei només contindrà el codi per a registrar un usuari. 

Crea el fitxer `src/services/userService.ts`. A nivell de base de dades tenim les següents restriccions.
```
- El correu és únic.
- El nom d'usuari és únic. 
```

Comprovades totes les restriccions es procedirà amb
```
- Calcular el hash del password utilitzant un factor de cost 10 rutes (Valor recomanat).
- Inserir l'usuari a la base de dades.
```
Codi d'exemple amb l'estructura principal. Utilitza l'exemple de `tracks`  per a finalitzar el codi del servei.
```ts
import bcrypt from "bcrypt";
....

export async function registerUser(input: CreateUserInput): Promise<UserDto> {
  ....
  // Comprovar si l'email ja existeix
  const userCheck: IResult<{ id: string }> = await pool
    .request()
    .input("email", sql.NVarChar(256), input.email)
    .query<{ id: string }>("SELECT id FROM Users WHERE email = @email");

  if (userCheck.recordset.length > 0) {
    throw new BadRequestError("An account with this email already exists");
  }

  ... 
  
  // Generar el Hash de la contrasenya de forma asíncrona
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(input.password, saltRounds);

  // Insertar l'usuari a la Base de Dades
  ....
}

```
---
## Controlador d'usuaris (`authController.ts`)

Crea el fitxer `src/controllers/authController.ts`. De moment, deixa el controlador "net", amb un únic controlador per a registrar els usuaris.

---
## Rutes d'Autenticació i connexió a l'App

Crea el fitxer `src/routes/authRoutes.ts`:

```ts
import { Router } from "express";
import { registerController } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../middlewares/validators/user/userSchema";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema, "body"), registerController);

```

Finalment, obre `src/app.ts` i afegeix la nova ruta base per a l'autenticació:

```ts
import { authRouter } from "./routes/authRoutes";

// ... sota de la ruta de tracks
app.use("/auth", authRouter);

```
---
# Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
- Taula 'Users' creada a la base de dades SQL Server.
- Documentació de tests sobre el registre d'usuari.
- Evidència d'encriptació del password a la base de dades.
```


```


// Nom fitxer: Pràctiques/Part 6 - Autenticació i Seguretat de l'Usuari 1/P06.03. Middleware d'autenticació.md
```ts


# 30. Middleware d'autenticació (JWT Middleware)

# Pràctica

Implementació del Middleware d'Autenticació al MusicCloud

# Objectiu

Has d'implementar el mecanisme de protecció de rutes de la teva aplicació **MusicCloud**. Crearàs el middleware de verificació de tokens i l'aplicaràs per protegir un nou endpoint de l'usuari: `GET /users/me`, que retornarà el perfil de l'usuari autenticat actualment.

Hauràs de completar els següents fitxers seguint l'arquitectura del teu projecte.

---
# Declaració de Tipus Global

Crea el fitxer `src/types/express-user-extension.d.ts` per tal que TypeScript reconegui la propietat `user` de tipus `JwtPayload` dins de l'objecte `req` de les teves peticions. 

```ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

```

Per tal que el compilador sàpiga on localitzar aquest fitxer, li hem d'especificar en la configuració de TypeScript.

Fitxer: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "sourceMap": false,
    "declaration": false
  },
  "include": ["src","src/types/express-user-extension.d.ts"]
}

```


---
# Desenvolupament del Middleware

Crea el fitxer `src/middlewares/authMiddleware.ts` i implementa la funció `authenticateJWT`.

* Ha d'extreure el token de la capçalera `Authorization` de manera segura.
* Ha de verificar la signatura usant `process.env.JWT_SECRET`.
* En cas que el token sigui correcte, l'ha de desar a `req.user` (que ara estarà tipat com a `JwtPayload`) i cridar a `next()`.
* En cas de fallada (token absent, mal formatat o caducat), ha de passar un `UnauthorizedError` (HTTP 401) mitjançant la funció `next(error)` per tal que el teu gestor d'errors global es faci càrrec de la resposta.

---
# Controladors i Enrutament Protegit

Per provar que el middleware funciona correctament, crearem la ruta "El meu perfil".
## Endpoint al controlador (`src/controllers/userController.ts`)

Afegeix o crea la funció `getMeController`. Aquesta funció ha de:

1. Recuperar el `id` de l'usuari que el middleware ha hagut d'injectar prèviament a `req.user`. Com que `req.user` és un `JwtPayload`, pots accedir directament a `req.user.id`.
2. Si per alguna raó `req.user` no existeix, llançar un `UnauthorizedError`.
3. Invocar la funció `findUserById(req.user.id)` que ja tens programada al teu `userService`.
4. Respondre amb un status **200 OK** enviant les dades de l'usuari (`UserDto`).

## Registrar la ruta protegida (`src/routes/userRoutes.ts`)

Registra la ruta de tipus `GET` apuntant a `/me`. Aplica-li el middleware que acabes de crear com a pas intermediari abans d'arribar al controlador.

```ts
import { Router } from "express";
import { getMeController } from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

// L'usuari ha de passar primer pel "peatge" de l'authenticateJWT
router.get("/me", authenticateJWT, getMeController);

export default router;

```

## Comprovar codi

Quan cridem a una ruta privada, cal enviar el token en la petició. Utilitzem l'argument `-H` de la comanda curl per a especificar el Token. 

```bash
curl -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer EL_TEU_JWT_AQUÍ"
``` 



```


// Nom fitxer: Pràctiques/Part 5 - Validació i errors/P05.04 Codificació resposta HTTP.md
```ts


# 24. Codificació de la resposta HTTP 

# Pràctica

## Objectiu

L'objectiu d'aquesta pràctica és comprovar que l'API retorna els **codis HTTP correctes** tant en situacions correctes com en situacions d'error.

En aquesta pràctica no s'hauria de modificar el codi de l'aplicació, excepte si es detecta que algun endpoint retorna un codi HTTP incorrecte.

El projecte ja hauria de tenir implementats:

```text
middlewares de validació amb Zod
middleware validate aplicat a les rutes
controllers amb next(error)
error handler global
respostes 404 quan un recurs no existeix
respostes correctes en operacions GET, POST, PUT i DELETE
```

La pràctica consisteix a provar l'API, comprovar els codis retornats i documentar els resultats.

---
# Taula de comprovació

Completa la següent taula

```md
# Comprovació dels codis HTTP

Data:

## Estat inicial

- API arrencada amb `npm run dev`
- SQL Server en funcionament
- Middleware `validate` aplicat a les rutes de tracks
- Error handler global registrat després de les rutes

## Resultats

| Prova | Codi esperat | Codi obtingut | Correcte? | Observacions |
|---|---:|---:|---|---|
| GET /tracks |  |  |  |  |
| GET /tracks/abc |  |  |  |  |
| GET /tracks/UUID existent |  |  |  |  |
| GET /tracks/UUID inexistent |  |  |  |  |
| POST /tracks body correcte |  |  |  |  |
| POST /tracks body incorrecte |  |  |  |  |
| PUT /tracks/UUID existent |  |  |  |  |
| PUT /tracks/abc |  |  |  |  |
| PUT /tracks body incorrecte |  |  |  |  |
| PUT /tracks/UUID inexistent |  |  |  |  |
| DELETE /tracks/UUID existent |  |  |  |  |
| DELETE /tracks/abc |  |  |  |  |
| DELETE /tracks/UUID inexistent |  |  |  |  |
| SQL Server aturat |  |  |  |  |
```

---
# Codis que encara no s'apliquen

## `401 Unauthorized`

Encara no tenim autenticació.

Per tant, cap endpoint hauria de retornar `401`.

Aquest codi s'utilitzarà quan s'afegeixi autenticació amb JWT.

Exemple futur:

```text
POST /playlists sense token → 401 Unauthorized
```

## `403 Forbidden`

Encara no tenim autorització ni permisos d'usuari.

Per tant, cap endpoint hauria de retornar `403`.

Aquest codi s'utilitzarà quan un usuari autenticat intenti fer una acció que no té permesa.

Exemple futur:

```text
DELETE /playlists/:id d'una playlist d'un altre usuari → 403 Forbidden
```

## `409 Conflict`

En aquesta fase encara no cal implementar `409`.

Aquest codi s'utilitzarà quan una petició sigui vàlida, però entri en conflicte amb l'estat actual del sistema.

Exemples futurs:

```text
registrar un email que ja existeix
crear un username duplicat
crear un artista amb un nom duplicat
eliminar un recurs que està sent referenciat per un altre
```

---
# Entrega

Cal entregar un document de comprovació, per exemple:

```text
docs/comprovacio-codis-http.md
```

El document ha d'incloure:

```text
taula de proves completada
observacions si cal
```

També es poden afegir captures de terminal o fragments de sortida de `curl -i`.

---


```


// Nom fitxer: Pràctiques/Part 5 - Validació i errors/P05.01.Validació amb Zod.md
```ts


# 22. Validació amb Zod

# Pràctica

## Tasca

Substitueix la validació manual de tracks per validació amb **Zod**.

Has de validar:

```text
POST /tracks
PUT /tracks/:id
GET /tracks/:id
DELETE /tracks/:id
```

En aquest moment, faràs la validació directament dins dels controllers.

---
## Requisits

El projecte ha de complir aquests requisits:

```text
zod ha d'estar instal·lat
s'ha de crear un schema per validar CreateTrackInput
s'ha de crear un schema per validar req.params.id
POST /tracks ha de retornar 400 si el body no és vàlid
PUT /tracks/:id ha de retornar 400 si el body no és vàlid
GET PUT DELETE /tracks/:id ha de retornar 400 si l'id no és vàlid
els serveis no han de validar req.body
els serveis han de rebre dades ja validades
el projecte ha de compilar sense errors
```

---
## Instal·lar Zod

Des de l'arrel del projecte:

```bash
npm install zod
```

No cal instal·lar tipus separats.

Zod ja inclou suport per TypeScript.

---
## Creació schemas

Necessitem 2 schemas. 

- Validació del body específic de tracks
- Validació dels paràmetres de ruta (id)

### Tracks (Body)

```ts
import { z } from "zod";

export const createTrackSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required"
  }),
  artistId: z.uuid({
    message: "Artist id must be a valid UUID"
  }),
  albumId: z
    .uuid({
      message: "Album id must be a valid UUID"
    })
    .nullable()
    .optional(),
  durationSeconds: z
    .number({
      message: "Duration must be a number"
    })
    .int({
      message: "Duration must be an integer"
    })
    .positive({
      message: "Duration must be greater than 0"
    })
});
```

### Paràmetres (id)

```ts
export const trackIdParamsSchema = z.object({
  id: z.uuid({
    message: "Track id must be a valid UUID"
  })
});
```

---
## Validar `GET /tracks/:id`

Modifica `getTrackByIdController`:

```ts
export async function getTrackByIdController(
  req: Request,
  res: Response
): Promise<Response> {
  
	const paramsValidation = trackIdParamsSchema.safeParse(req.params);
	
	if (!paramsValidation.success) {
	  return res.status(400).json({
		message: "Invalid track id"
	  });
	}
	try {
	    const id: string = paramsValidation.data.id;
	
	    const track: Track | null = await findTrackById(id);
	
	    if (!track) {
	      return res.status(404).json({
	        message: "Track not found"
	      });
	    }
	
	    return res.status(200).json(track);
	  } catch (error) {
	    console.error(error);
	
	    return res.status(500).json({
	      message: "Internal server error"
	    });
	  }
}
```

Ara no agafem directament:

```ts
const id = req.params.id as string;
```

Primer validem `req.params`.

---
## Validar `POST /tracks`

Modifica `createTrackController`:

```ts
export async function createTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  const bodyValidation = createTrackSchema.safeParse(req.body);
	
	if (!bodyValidation.success) {
	  return res.status(400).json({
		message: "Invalid track data"
	  });
	}
	try {
	    const createdTrack: TrackDto = await createTrack(bodyValidation.data);
	
	    return res.status(201).json(createdTrack);
	  } catch (error) {
	    console.error(error);
	
	    return res.status(500).json({
	      message: "Internal server error"
	    });
	  }
}
```

La línia important és:

```ts
const bodyValidation = createTrackSchema.safeParse(req.body);
```

Si la validació falla, retornem `400`.

Si funciona, utilitzem:

```ts
bodyValidation.data
```

Aquestes són les dades ja validades.

---
# Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
zod instal·lat
src/validators/track.ts amb schemas de Zod
validació dels end points
documentació de funcionament (correcte i incorrecte dels end points)
```

---


```


// Nom fitxer: Pràctiques/Part 5 - Validació i errors/P05.03. Error handler global.md
```ts


# 24. Error handler global
# Pràctica

## Tasca

Crea un middleware global per gestionar errors inesperats.

Després, modifica els controllers perquè enviïn els errors al middleware amb:

```ts
next(error);
```
---
## Requisits

El projecte ha de complir aquests requisits:

```text
s'ha de crear un error handler global
l'error handler s'ha de registrar al final de l'app
els controllers han d'importar NextFunction
els controllers han de rebre el paràmetre next
els catch dels controllers han de fer next(error)
els controllers no han de retornar manualment el 500
el projecte ha de compilar sense errors
```
---
## Crear el middleware d'errors

Crea el fitxer `src/middlewares/errorHandler.ts` amb el codi

Afegeix aquest codi:

```ts
import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  console.error(error);

  return res.status(500).json({
    message: "Internal server error"
  });
}
```

Observa que aquest middleware té quatre paràmetres:

```text
error
_req
res
_next
```

Això és el que fa que Express el reconegui com un middleware d'errors.

Utilitzem `_req` i `_next` perquè en aquest punt no els necessitem, però Express requereix aquesta signatura.

---
## Registrar l'error handler a `app.ts`

Importa i registra l'error handler a `src/app.ts`

```ts
import { errorHandler } from "./middlewares/errorHandler";

app.use(errorHandler);
```
---
## Modificar imports del controller

En el controlador de Tracks, afegeix la llibreria `NextFunction` de la llibreria `express`.

Necessitem `NextFunction` per poder rebre `next`.

---
## Modificar `getTracksController`

Abans:

```ts
import { Request, Response } from "express";

export async function getTracksController(
  _req: Request,
  res: Response
): Promise<Response> {
  try {
    const tracks: TrackDto[] = await getAllTracks();

    return res.status(200).json(tracks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

Ara:

```ts
import { NextFunction, Request, Response } from "express";

export async function getTracksController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const tracks: TrackDto[] = await getAllTracks();

    return res.status(200).json(tracks);
  } catch (error) {
    next(error);
  }
}
```

El controller ja no construeix la resposta `500`.

Només envia l'error al middleware global.

---
## Provar un error inesperat

Per provar l'error handler global, pots aturar el contenidor de SQL Server:

```bash
docker stop musiccloud-sqlserver
```

---
# Entrega

La pràctica ha d'incloure:

```text
src/middlewares/errorHandler.ts creat
errorHandler registrat a app.ts
controllers amb NextFunction
respostes 500 centralitzades
validació continuant amb middleware validate
```


```


// Nom fitxer: Pràctiques/Part 5 - Validació i errors/P05.05 Respostes d'error detallades.md
```ts


# Pràctica

## Tasca

Els errors retornen una resposta més detallada i homogènia.

---
## Requisits

El projecte ha de complir aquests requisits:

```text
ErrorResponse ha d'incloure message i code
code ha d'utilitzar un enum ErrorCode
ErrorResponse ha de poder incloure errors detallats
retornar errors detallats per les diferents situacions
```

---
## Crear una funció per transformar errors de Zod

Crea el fitxer:

```text
src/utils/formatZodErrors.ts
```

Amb aquest contingut:

```ts
export function formatZodErrors(error: ZodError): ErrorDetail[] {
  return error.issues.map((issue) => {
    return {
      field: issue.path.join(".") || "request",
      message: issue.message
    };
  });
}
```

Aquesta funció converteix els errors de Zod en el nostre format propi.

---

## Actualitzar el middleware `validate`

Obre el fitxer:

```text
src/middlewares/validate.ts
```

La validació ja ha d'estar centralitzada aquí.

Una possible versió anterior pot ser:

```ts
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

type RequestSource = "body" | "params" | "query";

export function validate(
  schema: ZodSchema,
  source: RequestSource
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const validationResult = schema.safeParse(req[source]);

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid request data"
      });
    }

    next();
  };
}
```

Modifica'l així:

```ts
import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { ErrorCode, ErrorResponse } from "../types/error/errorResponse";
import { formatZodErrors } from "../utils/formatZodErrors";

type RequestSource = "body" | "params" | "query";

export function validate(
  schema: ZodType,
  source: RequestSource
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const validationResult = schema.safeParse(req[source]);

    if (!validationResult.success) {
      const response: ErrorResponse = {
        message: "Invalid request data",
        code: ErrorCode.ValidationError,
        errors: formatZodErrors(validationResult.error)
      };

      return res.status(400).json(response);
    }

    if (source === "body") {
      req.body = validationResult.data;
    }

    if (source === "params") {
      req.params = validationResult.data  as Request["params"];
    }

    if (source === "query") {
      req.query = validationResult.data  as Request["query"];
    }

    next();
  };
}
```

Ara el middleware fa dues coses:

```text
retorna errors detallats si la validació falla
substitueix req.body, req.params o req.query per les dades validades
```

Això és útil perquè, per exemple, si el schema fa `.trim()`, el controller rebrà ja el valor netejat.

---
## Actualitzar els errors 404 als controllers

Substitueix a `src/controllers/trackController.ts` el codi

```ts
return res.status(404).json({
  message: "Track not found"
});
```

per:

```ts
return res.status(404).json({
  message: "Track not found",
  code: ErrorCode.TrackNotFound
});
```


---
## Actualitzar l'error handler global

Modifica l'arxiu `src/middlewares/errorHandler.ts` amb:

```ts
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  console.error(error);

  const response: ErrorResponse = {
    message: "Internal server error",
    code: ErrorCode.InternalServerError
  };

  return res.status(500).json(response);
}
```

Aquest middleware continua amagant els detalls interns al client.

---
# Entrega

La pràctica ha d'incloure:

```text
validate retornant errors detallats
proves amb curl sobre el funcionament
```

---


```


// Nom fitxer: Pràctiques/Part 5 - Validació i errors/P05.06 Classes d'errors personalitzades.md
```ts


# 27. Classes d'errors personalitzades (Custom Errors)
# Pràctica

## Tasca

Crear la infraestructura de classes d'error personalitzades, modificar el middleware `errorHandler` perquè les sàpiga gestionar i refactoritzar els controladors de *Tracks* per utilitzar-les.

---
## Requisits

El projecte ha de complir aquests requisits:

```text
Crear una classe base AppError que hereti d'Error
Crear les classes derivades NotFoundError i BadRequestError
Actualitzar l'enum ErrorCode amb codis nous si cal
Modificar l'errorHandler per respondre dinàmicament segons la classe d'error
Refactoritzar els mètodes de trackController

```
---
## Crear la classe base `AppError` i derivades

Pel nostre projecte necessitarem les següents classes personalitzades de gestió d'errors.

```ts
import { ErrorCode } from "../types/error/errorCode";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, code: ErrorCode) {
    super(message);
    
    // Assignem el prototip explícitament (requerit en algunes versions de TS en estendre Error)
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // Tots els Custom Errors de l'aplicació seran operacionals

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.InternalServerError) {
    super(message, 404, code);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.ValidationError) {
    super(message, 400, code);
  }
}
```
---
## Actualitzar l'enum de codis d'error

A la teva codificació d'errors afegeix un codi genèric de "RESOURCE_NOT_FOUND" (recurs no trobat)

---
## Actualitzar el middleware `errorHandler` global

Obre el fitxer `src/middlewares/errorHandler.ts`. Ara farem servir l'operador `instanceof` per comprovar si l'error rebut prové de la nostra família d'errors `AppError`:

```ts

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  // 1. Si és un error operacional nostre, responem amb les seves dades
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      message: error.message,
      code: error.code
    };
    return res.status(error.statusCode).json(response);
  }

  // 2. Si l'error no és operational (bug, fallada de BD, etc.), fem log intern i responem 500
  console.error("💥 ERROR INESPERAT:", error);

  const response: ErrorResponse = {
    message: "Internal server error",
    code: ErrorCode.InternalServerError
  };

  return res.status(500).json(response);
}
```
---
## Refactoritzar el controlador `trackController.ts`

Obre el fitxer `src/controllers/trackController.ts`. En lloc de fer un `return res.status(404).json(...)` manual, instanciaciarem un `NotFoundError` i el passarem a la funció `next(error)` per fer-lo viatjar cap a l'error handler.

### `getTrackByIdController`

```ts
export async function getTrackByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
     
    const id : string = req.params.id as string;
  
    try {
      const track: TrackDto | null = await findTrackById(id);

      if (!track) {
        // En lloc de respondre directament, llencem l'error cap al catch
        throw new NotFoundError("Track not found", ErrorCode.TrackNotFound);
      }

      return res.status(200).json(track);
      
    } catch (error) {
        next(error); // L'errorHandler capturarà el NotFoundError de forma automàtica
    }
}
```
---
# Entrega

La pràctica ha d'incloure:

```text
- El fitxer appError.ts creat correctament.
- El controlador trackController.ts lliure de respostes estructurades 404 manuals.
- Evidència de proves realitzades.
```


```


// Nom fitxer: Pràctiques/Part 5 - Validació i errors/P05.02. Middleware validate.md
```ts


# 23. Middleware validate

# Pràctica

## Tasca

Crea un middleware `validate` que permeti validar dades amb Zod abans d'executar un controller.

L'aplicarem a les rutes de tracks.

---
## Requisits

El projecte ha de complir aquests requisits:

```text
s'ha de crear un middleware validate
el middleware ha de rebre un schema de Zod
el middleware ha de poder validar body, params o query
les rutes han d'utilitzar validate
els controllers ja no han de fer safeParse
POST /tracks ha de validar req.body
PUT /tracks/:id ha de validar req.params i req.body
GET i DELETE /tracks/:id han de validar req.params
el projecte ha de compilar sense errors
```

---
---
## Crear el middleware `validate`

Dins la carpeta  `src/middlewares` crea l'arxiu `validate.ts` amb el codi

```ts
import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

type RequestSource = "body" | "params" | "query";

export function validate(
  schema: ZodType,
  source: RequestSource
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const validationResult = schema.safeParse(req[source]);

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid request data"
      });
    }

    next();
  };
}
```

Aquest middleware rep dos paràmetres:

```text
schema → schema de Zod
source → part de la request que volem validar
```

Per exemple:

```ts
validate(createTrackSchema, "body")
```

valida:

```ts
req.body
```

I:

```ts
validate(idParamSchema, "params")
```

valida:

```ts
req.params
```

---

## Revisar els schemas

Has de tenir els schemas separats.

Per exemple:

```text
src/validators/track/createTrackSchema.ts
src/validators/params/idParamSchema.ts
```

El schema per crear tracks:

```ts
import { z } from "zod";

export const createTrackSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required"
  }),

  artistId: z.string().uuid({
    message: "Artist id must be a valid UUID"
  }),

  albumId: z
    .string()
    .uuid({
      message: "Album id must be a valid UUID"
    })
    .nullable()
    .optional(),

  durationSeconds: z
    .number({
      message: "Duration must be a number"
    })
    .int({
      message: "Duration must be an integer"
    })
    .positive({
      message: "Duration must be greater than 0"
    })
});
```

El schema genèric per validar `/:id`:

```ts
import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().uuid({
    message: "Id must be a valid UUID"
  })
});
```

---
## Aplicar el middleware a les rutes

Obre el fitxer:

```text
src/routes/trackRoutes.ts
```

Importa el middleware i els schemas.

Modifica les rutes:

```ts
export const trackRouter = Router();

trackRouter.get("/", getTracksController);

trackRouter.get(
  "/:id",
  validate(idParamSchema, "params"),
  getTrackByIdController
);

trackRouter.post(
  "/",
  validate(createTrackSchema, "body"),
  createTrackController
);

trackRouter.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(createTrackSchema, "body"),
  updateTrackController
);

trackRouter.delete(
  "/:id",
  validate(idParamSchema, "params"),
  deleteTrackController
);
```

Ara la validació es fa abans d'arribar al controller.

---
## Netejar els controladors

Eliminem la validació dels diferents controladors.

### `getTrackByIdController`

```ts
export async function getTrackByIdController(
  req: Request,
  res: Response
): Promise<Response> {
  const id: string = req.params.id;

  try {
    const track: TrackDto | null = await findTrackById(id);

    if (!track) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(200).json(track);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```
---

### `createTrackController`

```ts
export async function createTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const createdTrack: TrackDto = await createTrack(req.body);

    return res.status(201).json(createdTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

---
# Entrega

La pràctica ha d'incloure:

```text
middleware validate creat
validació de params amb idParamSchema
validació de body amb createTrackSchema
rutes actualitzades
controllers sense safeParse
POST /tracks validat pel middleware
PUT /tracks/:id validat pel middleware
GET /tracks/:id validat pel middleware
DELETE /tracks/:id validat pel middleware
Evidències de funcionament
projecte compilant sense errors
```

---


```


// Nom fitxer: Pràctiques/Part 4 - Persistència amb Microsoft SQL Server/P04.01.Microsoft SQL Server amb Docker.md
```ts


# Pràctica

Atenció:  per a poder desenvolupar aquesta pràctica, cal que primer instal·lis el software [Docker](https://www.docker.com/products/docker-desktop/) al teu equip.
## Tasca

Prepara un contenidor Docker amb **Microsoft SQL Server** per utilitzar-lo com a gestor de base de dades del projecte **MusicCloud**.

En aquesta pràctica encara no connectarem l’API Node.js amb la base de dades. L’objectiu és deixar preparat el servidor de base de dades perquè més endavant puguem substituir els arrays en memòria per dades persistents.

Has de crear:

```text
docker-compose.yml
```

I has d’arrencar un contenidor amb **Microsoft SQL Server**.

---
## Requisits

El projecte ha de complir aquests requisits:

```text
docker-compose.yml ha d’estar creat a l’arrel del projecte
docker-compose.yml ha de definir un servei per a Microsoft SQL Server
el contenidor ha d’utilitzar una imatge oficial de SQL Server
el contenidor ha d’exposar el port 1433
el contenidor ha de tenir una contrasenya d’administrador
el contenidor ha d’acceptar la llicència de Microsoft SQL Server
el contenidor ha de tenir un volum per conservar les dades (ubica el volum en una carpeta data fora de la carpeta src)
el contenidor ha de poder arrencar amb docker compose up -d
```

També s’ha de poder comprovar que el contenidor està en funcionament.

---

## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d’incloure:

```text
docker-compose.yml creat
servei sqlserver definit correctament
contenidor arrencant sense errors
port 1433 exposat
volum de dades configurat (ubicat en una carpeta data fora de la carpeta src)
captura o evidència de docker ps
captura o evidència dels logs indicant que SQL Server està preparat
```

---


```


// Nom fitxer: Pràctiques/Part 4 - Persistència amb Microsoft SQL Server/P04.05. Substituir arrays per consultes SQL.md
```ts


# 20. Substituir arrays per consultes SQL
# Pràctica

## Tasca

Substitueix l'ús de l'array de tracks per consultes SQL contra Microsoft SQL Server.

Els endpoints han de continuar funcionant:

```text
GET /tracks
GET /tracks/:id
POST /tracks
PUT /tracks/:id
DELETE /tracks/:id
```

Però ara les dades han de sortir de la base de dades `MusicCloud`.

---
## Requisits

El projecte ha de complir aquests requisits:

```text
SQL Server ha d'estar en execució
la base de dades MusicCloud ha d'existir
les taules Artists, Albums i Tracks han d'existir
src/config/database.ts ha d'estar creat
trackService.ts ha de consultar SQL Server
els serveis han de ser asíncrons
els controllers han d'utilitzar await
les consultes amb dades externes han d'utilitzar paràmetres
els endpoints han de mantenir el mateix comportament HTTP
el projecte ha de compilar sense errors
```

---
## Crear tipus per als tracks

Si ja tens tipus creats, adapta'ls amb el següent contingut.

```ts

export interface CreateTrackInput {
  title: string;
  artistId: string;
  albumId?: string | null;
  durationSeconds: number;
}

export interface Track extends CreateTrackInput{
  id: string;  
}

export type Track = Track | ErrorResponse;

```

Aquí diferenciem:

```text
Track       → dades que retorna l'API
CreateTrackInput    → dades necessàries per crear un track
UpdateTrackInput    → dades necessàries per modificar un track
```

---
## Substituir `trackService.ts`

Obre el fitxer:

```text
src/services/trackService.ts
```

I substitueix la lògica basada en arrays per consultes SQL.

És important observar que la resposta de l'API no és una "promise" de Track, sinó un "promise" de Track. La representació de dades que retorna l'API (Track) és independent de la representació física (Track) de la base de dades.

```ts
import { CreateTrackInput } from "../types/track/createTrack";
import { Track } from "../types/track/Track";
import { getConnectionPool, sql } from "../config/database";
import { ConnectionPool, IResult } from "mssql";

export async function getAllTracks(): Promise<Track[]> {
  const pool:ConnectionPool = await getConnectionPool();

  const result:IResult<Track> = await pool.request().query<Track>(`
    SELECT
      CONVERT(NVARCHAR(36), Tracks.id) AS id,
      title,
      artistid,
      albumid,
      durationSeconds
    FROM Tracks
    ORDER BY Tracks.title;
  `);

  return result.recordset;
}

export async function findTrackById(
  id: string
): Promise<Track | null> {
  const pool:ConnectionPool = await getConnectionPool();

  const result:IResult<Track> = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .query<Track>(`
      SELECT
        CONVERT(NVARCHAR(36), Tracks.id) AS id,
        title,
        artistid,
        albumid,
        durationSeconds
      FROM Tracks
      WHERE Tracks.id = @id;
    `);

  return result.recordset[0] ?? null;
}

export async function createTrack(
  input: CreateTrackInput
): Promise<Track> {
  const pool:ConnectionPool = await getConnectionPool();

  const insertResult:IResult<{ id: string }> = await pool
    .request()
    .input("title", sql.NVarChar(200), input.title)
    .input("artistId", sql.UniqueIdentifier, input.artistId)
    .input("albumId", sql.UniqueIdentifier, input.albumId ?? null)
    .input("durationSeconds", sql.Int, input.durationSeconds)
    .query<{ id: string }>(`
      INSERT INTO Tracks (title, artistId, albumId, durationSeconds)
      OUTPUT CONVERT(NVARCHAR(36), INSERTED.id) AS id
      VALUES (@title, @artistId, @albumId, @durationSeconds);
    `);

  const createdId:string = insertResult.recordset[0].id;

  const createdTrack:Track | null = await findTrackById(createdId);

  if (!createdTrack) {
    throw new Error("Track was created but could not be retrieved.");
  }

  return createdTrack;
}

export async function updateTrack(
  id: string,
  input: CreateTrackInput
): Promise<Track | null> {
  const pool:ConnectionPool = await getConnectionPool();

  const result = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .input("title", sql.NVarChar(200), input.title)
    .input("artistId", sql.UniqueIdentifier, input.artistId)
    .input("albumId", sql.UniqueIdentifier, input.albumId ?? null)
    .input("durationSeconds", sql.Int, input.durationSeconds)
    .query<{ affectedRows: number }>(`
      UPDATE Tracks
      SET
        title = @title,
        artistId = @artistId,
        albumId = @albumId,
        durationSeconds = @durationSeconds
      WHERE id = @id;

      SELECT @@ROWCOUNT AS affectedRows;
    `);

  const affectedRows:number = result.recordset[0]?.affectedRows ?? 0;

  if (affectedRows === 0) {
    return null;
  }

  return findTrackById(id);
}

export async function deleteTrack(id: string): Promise<boolean> {
  const pool = await getConnectionPool();

  const result:IResult<{affectedRows:number}> = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .query<{ affectedRows: number }>(`
      DELETE FROM Tracks
      WHERE id = @id;

      SELECT @@ROWCOUNT AS affectedRows;
    `);

  const affectedRows:number = result.recordset[0]?.affectedRows ?? 0;

  return affectedRows > 0;
}
```

Aquest servei ja no depèn de cap array.

Totes les dades venen de SQL Server.

---
## Adaptar `trackController.ts`

Obre:

```text
src/controllers/trackController.ts
```

El contingut pot quedar així:

```ts
import { getAllTracks, createTrack, updateTrack, deleteTrack, findTrackById } from "../services/trackService";
import { Request, Response } from "express";
import { Track } from "../types/track/Track";

export async function getTracksController(
  _req: Request,
  res: Response
): Promise<Response> {
  try {
    const tracks:Track[] = await getAllTracks();

    return res.status(200).json(tracks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function getTrackByIdController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const  id : string = req.params.id as string;

    const track:Track | null = await findTrackById(id);

    if (!track) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(200).json(track);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function createTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const createdTrack:Track = await createTrack(req.body);

    return res.status(201).json(createdTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function updateTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const  id : string = req.params.id as string;

    const updatedTrack:Track | null = await updateTrack(id, req.body);

    if (!updatedTrack) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(200).json(updatedTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function deleteTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const  id : string = req.params.id as string;

    const deleted:boolean = await deleteTrack(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

En aquest punt encara repetim `try/catch` a cada controller.

No és perfecte, però és acceptable.

A la Part 5 ho millorarem amb un error handler global.

---
## Revisar les rutes

El fitxer:

```text
src/routes/trackRoutes.ts
```

hauria de continuar sent semblant a aquest:

```ts
import { Router } from "express";
import {
  createTrackController,
  deleteTrackController,
  getTrackByIdController,
  getTracksController,
  updateTrackController
} from "../controllers/trackController";

export const trackRouter = Router();

trackRouter.get("/", getTracksController);
trackRouter.get("/:id", getTrackByIdController);
trackRouter.post("/", createTrackController);
trackRouter.put("/:id", updateTrackController);
trackRouter.delete("/:id", deleteTrackController);
```

La ruta no hauria de contenir SQL.

Només connecta endpoints amb controllers.

---
## Eliminar o deixar de fer servir `src/data/tracks.ts`

Si fins ara tenies:

```text
src/data/tracks.ts
```

ja no hauria de ser necessari per als endpoints.

Pots eliminar-lo o deixar-lo sense ús.

El més net és eliminar-lo si ja no el necessites.

També revisa que no hi hagi imports antics:

```ts
import { tracks } from "../data/tracks";
```

Si encara existeixen, s'han d'eliminar.

---
# Test `GET 

## /tracks`

Arrenca l'API:

```bash
npm run dev
```

Fes una petició:

```bash
curl -i http://localhost:3000/tracks
```

Hauries de rebre una resposta semblant a:

```json
[
  {
    "id": "A1B2C3...",
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "durationSeconds": 354
  }
]
```

El valor exacte de l'`id` serà un `UNIQUEIDENTIFIER`.

---

## /tracks/:id`

Copia l'`id` d'un track retornat per `GET /tracks`.

Després executa:

```bash
curl -i http://localhost:3000/tracks/ID_DEL_TRACK
```

Per exemple:

```bash
curl -i http://localhost:3000/tracks/7F9619FF-8B86-D011-B42D-00C04FC964FF
```

Si existeix, ha de retornar `200`.

Si no existeix, ha de retornar:

```json
{
  "message": "Track not found"
}
```

amb estat `404`.

---
# Test `POST 

## /tracks`

Exemple amb `curl`:

```bash
curl -i -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Don'\''t Stop Me Now",
    "artistId": "ID_ARTISTA",
    "albumId": "ID_ALBUM",
    "durationSeconds": 209
  }'
```

Si no vols associar àlbum:

```bash
curl -i -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Track sense àlbum",
    "artistId": "ID_ARTISTA",
    "albumId": null,
    "durationSeconds": 240
  }'
```

La resposta hauria de ser `201 Created` i retornar el track creat.

---
### Obtenir un `artistId` i un `albumId`

Per crear un track necessitem `artistId`.

Podem consultar artistes directament amb `sqlcmd`:

```bash
docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P "Patata123!" \
  -No \
  -d MusicCloud \
  -Q "SELECT CONVERT(NVARCHAR(36), id) AS id, name FROM Artists;"
```

I àlbums:

```bash
docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P "Patata123!" \
  -No \
  -d MusicCloud \
  -Q "SELECT CONVERT(NVARCHAR(36), id) AS id, title FROM Albums;"
```
---

## Provar `PUT /tracks/:id`

Primer copia l'`id` del track que vols modificar.

Després:

```bash
curl -i -X PUT http://localhost:3000/tracks/ID_DEL_TRACK \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Don'\''t Stop Me Now - Remastered",
    "artistId": "ID_ARTISTA",
    "albumId": "ID_ALBUM",
    "durationSeconds": 210
  }'
```

La resposta hauria de ser `200 OK` amb el track modificat.

Si l'`id` no existeix, hauria de retornar `404`.

---
## Provar `DELETE /tracks/:id`

```bash
curl -i -X DELETE http://localhost:3000/tracks/ID_DEL_TRACK
```

Si s'ha eliminat correctament, hauria de retornar:

```text
204 No Content
```

Si tornes a consultar-lo:

```bash
curl -i http://localhost:3000/tracks/ID_DEL_TRACK
```

hauria de retornar `404`.

---
# Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
trackService.ts treballant amb SQL Server
controllers adaptats a async/await
src/data/tracks.ts eliminat o deixat de fer servir
GET /tracks funcionant amb dades SQL
GET /tracks/:id funcionant amb dades SQL
POST /tracks inserint dades a SQL Server
PUT /tracks/:id modificant dades a SQL Server
DELETE /tracks/:id eliminant dades de SQL Server
projecte compilant sense errors
```

També cal incloure evidències de funcionament:

```text
captura o sortida de GET /tracks
captura o sortida de GET /tracks/:id
captura o sortida de POST /tracks
captura o sortida de PUT /tracks/:id
captura o sortida de DELETE /tracks/:id
```


```


// Nom fitxer: Pràctiques/Part 4 - Persistència amb Microsoft SQL Server/P04.04. Connexió amb servidor de base de dades.md
```ts


# Pràctica

## Tasca

Connecta el projecte **MusicCloud** amb **Microsoft SQL Server** des de **Node.js + TypeScript**.

Has de crear una configuració de base de dades. Per fer-ho, has de llegir les dades de connexió des de variables d'entorn.

En aquesta pràctica encara no has de modificar els endpoints.

---
## Requisits

El projecte ha de complir aquests requisits:

```text
el contenidor SQL Server ha d'estar en execució
la base de dades MusicCloud ha d'existir
el paquet mssql ha d'estar instal·lat
el paquet dotenv ha d'estar instal·lat
el fitxer .env ha d'existir en local
el fitxer .env.example ha d'estar creat
.env ha d'estar ignorat per Git
src/config/database.ts ha d'exportar una funció per obtenir el pool
```
---
### Comprovacions prèvies

1. SQL Server està en execució
2. La base de dades MusicCloud està creada
## Instal·lació dependències

Des de l'arrel del projecte Node.js, instal·la:

```bash
npm install mssql dotenv
npm install -D @types/mssql
```

- El paquet `mssql` és el client que utilitzarem per connectar amb SQL Server. 
- El paquet `dotenv` ens permetrà carregar variables d'entorn des d'un fitxer `.env`.

---
## Fitxer `.env`

Crea un fitxer a l'arrel del projecte de nom `.env`

Contingut:

```env
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=Patata123!
DB_NAME=MusicCloud
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

Aquest fitxer conté dades locals de connexió.

No s'ha de pujar al repositori.

---
## Documenta les variables que necessita el projecte

Crea un fitxer `.env.example`

Contingut:

```env
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=change_me
DB_NAME=MusicCloud
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

Aquest fitxer cal que estigui en el repositori. Forma part de la documentació.

---
## Configuració connexió

En aquest fitxer apareixen `async`, `await` i `Promise`.

Aquests conceptes s'utilitzen perquè la connexió amb SQL Server és asíncrona: Node.js ha d'enviar una petició al servidor de base de dades i esperar-ne la resposta.

En aquest punt no aprofundirem en la programació asíncrona. Només cal observar que:

```text
async indica que la funció és asíncrona
await espera que la connexió acabi
Promise<sql.ConnectionPool> retorna una Promise, quan la connexió estigui preparada, que contindrà un ConnectionPool. Com que la funció és 'async', cal retornar el tipus desitjat dins una 'Promise'.
```

Crea el fitxer  `src/config/database.ts` amb el contingut:

```ts
import "dotenv/config";
import sql from "mssql";

const databaseConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 1433),
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true"
  }
};

let pool: sql.ConnectionPool | null = null;

export async function getConnectionPool(): Promise<sql.ConnectionPool> {
  if (pool) {
    return pool;
  }

  pool = await sql.connect(databaseConfig);
  return pool;
}

export async function closeConnectionPool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}

export { sql };
```


Aquest fitxer fa tres coses:
1. carrega les variables d'entorn
2. defineix la configuració de connexió
3. exporta una funció per obtenir el pool

La funció `getConnectionPool()` retorna el pool de connexions.
- Si el pool ja existeix, el reutilitza.
- Si encara no existeix, el crea.

---
## Versió amb validació bàsica de variables

La versió anterior funciona, però si falta una variable d'entorn, l'error pot ser poc clar. Sempre cal que els missatges d'error siguin clars i entenedors per tal  de facilitar-ne la seva resolució. 
```ts
import "dotenv/config";
import sql from "mssql";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const databaseConfig: sql.config = {
  user: getRequiredEnv("DB_USER"),
  password: getRequiredEnv("DB_PASSWORD"),
  server: getRequiredEnv("DB_HOST"),
  port: Number(process.env.DB_PORT ?? 1433),
  database: getRequiredEnv("DB_NAME"),
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true"
  }
};

let pool: sql.ConnectionPool | null = null;

export async function getConnectionPool(): Promise<sql.ConnectionPool> {
  if (pool) {
    return pool;
  }

  pool = await sql.connect(databaseConfig);
  return pool;
}

export async function closeConnectionPool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}

export { sql };
```

---
## Crear `testDatabaseConnection.ts`

En el fitxer  `src/scripts/testDatabaseConnection.ts` provarem que la connexió amb la base de dades s'estableix de forma correcte.

```ts
import { getConnectionPool, sql } from "../config/database";

async function main(): Promise<void> {
  try {
    const pool = await getConnectionPool();
    console.log("Connexió establerta.");
    // Exeució instruccions SQL
  } catch (error) {
    console.error("Error connecting to database:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await sql.close();
  }
}

main();
```

Aquest script:

```text
obre i tanca una connexió amb SQL Server
```

---
## Execució script

Afegeix al fitxer `package.json` el nou script. No eliminis el contingut actual.

```json
{
  "scripts": {
  
    "db:test": "tsx src/scripts/testDatabaseConnection.ts"
  }
}
```

i executa:

```bash
npm run db:test
```

---
# Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
paquet mssql instal·lat
paquet dotenv instal·lat
.env creat localment
.env afegit a .gitignore
.env.example creat
src/config/database.ts creat
src/scripts/testDatabaseConnection.ts creat
script db:test afegit al package.json
npm run db:test funcionant correctament
```



```


// Nom fitxer: Pràctiques/Part 4 - Persistència amb Microsoft SQL Server/P04.03 Model relacional de MusicCloud.md
```ts


# Pràctica

## Tasca

Crea el model relacional inicial de **MusicCloud** a la base de dades **MusicCloud**.

Has de crear les taules següents:

```text
Artists
Users
Albums
Tracks
Playlists
PlaylistTracks
```

També has d'inserir dades de prova creïbles i comprovar que les relacions funcionen correctament.

---
## Requisits

La pràctica ha de complir aquests requisits:

```text
la base de dades MusicCloud ha d'existir
les taules s'han de crear en l'ordre correcte
totes les taules principals han d'utilitzar UNIQUEIDENTIFIER com a id
les claus primàries han d'estar definides
les claus foranes han d'estar definides
Tracks ha de tenir relació amb Artists
Tracks pot tenir relació amb Albums
Albums ha de tenir relació amb Artists
Playlists ha de tenir relació amb Users
PlaylistTracks ha de relacionar Playlists i Tracks
s'han d'inserir dades creïbles
s'han d'executar consultes de comprovació
```

---
## 1. Entrar a `sqlcmd`

Amb el contenidor en funcionament:

```bash
docker ps
```

Connecta't a SQL Server:

```bash
docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P "Patata123!" \
  -No
```

---
## 2. Seleccionar la base de dades

Dins de `sqlcmd`, executa:

```sql
USE MusicCloud;
GO
```

---
## 3. Eliminar taules anteriors si cal

Si ja havies creat una taula `Tracks` simple en el punt anterior, ara la nova estructura pot entrar en conflicte.

Per a una pràctica neta, pots eliminar les taules existents.

L'ordre d'eliminació ha de respectar les dependències. Primer eliminem les taules que depenen d'altres.

```sql
DROP TABLE IF EXISTS PlaylistTracks;
DROP TABLE IF EXISTS Playlists;
DROP TABLE IF EXISTS Tracks;
DROP TABLE IF EXISTS Albums;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Artists;
GO
```

---
## 4. Crear la taula `Artists`

```sql
CREATE TABLE Artists (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
  name NVARCHAR(200) NOT NULL,
  createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

  CONSTRAINT PK_Artists PRIMARY KEY (id),
  CONSTRAINT UQ_Artists_Name UNIQUE (name)
);
GO
```

La restricció `UNIQUE` evita que inserim dues vegades exactament el mateix nom d'artista.

---
## 5. Crear la taula `Users`

```sql
CREATE TABLE Users (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
  username NVARCHAR(100) NOT NULL,
  email NVARCHAR(255) NOT NULL,
  password NVARCHAR(60) NOT NULL,
  createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

  CONSTRAINT PK_Users PRIMARY KEY (id),
  CONSTRAINT UQ_Users_Username UNIQUE (username),
  CONSTRAINT UQ_Users_Email UNIQUE (email)
);
GO
```

En aquesta fase guardem el `password` en text clar només per simplificar el model inicial i poder avançar amb les relacions entre taules.

Aquesta no és una pràctica segura.

En una aplicació real mai s'han de guardar contrasenyes en text clar. Més endavant substituirem aquesta columna per un sistema basat en hash de contrasenyes.

---
## 6. Crear la taula `Albums`

```sql
CREATE TABLE Albums (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
  title NVARCHAR(200) NOT NULL,
  artistId UNIQUEIDENTIFIER NOT NULL,
  releaseYear INT NULL,
  createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

  CONSTRAINT PK_Albums PRIMARY KEY (id),
  CONSTRAINT FK_Albums_Artists
    FOREIGN KEY (artistId) REFERENCES Artists(id),
  CONSTRAINT CK_Albums_ReleaseYear
    CHECK (releaseYear IS NULL OR releaseYear >= 1900)
);
GO
```

Cada àlbum pertany a un artista.

---
## 7. Crear la taula `Tracks`

```sql
CREATE TABLE Tracks (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
  title NVARCHAR(200) NOT NULL,
  artistId UNIQUEIDENTIFIER NOT NULL,
  albumId UNIQUEIDENTIFIER NULL,
  durationSeconds INT NOT NULL,
  createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

  CONSTRAINT PK_Tracks PRIMARY KEY (id),
  CONSTRAINT FK_Tracks_Artists
    FOREIGN KEY (artistId) REFERENCES Artists(id),
  CONSTRAINT FK_Tracks_Albums
    FOREIGN KEY (albumId) REFERENCES Albums(id),
  CONSTRAINT CK_Tracks_Duration_Positive
    CHECK (durationSeconds > 0)
);
GO
```

Aquesta taula guarda les cançons.

Cada track té un artista obligatori i un àlbum és opcional.

---
## 8. Crear la taula `Playlists`

```sql
CREATE TABLE Playlists (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
  name NVARCHAR(200) NOT NULL,
  description NVARCHAR(500) NULL,
  userId UNIQUEIDENTIFIER NOT NULL,
  createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

  CONSTRAINT PK_Playlists PRIMARY KEY (id),
  CONSTRAINT FK_Playlists_Users
    FOREIGN KEY (userId) REFERENCES Users(id)
    ON DELETE CASCADE
);
GO
```

Aquesta taula guarda playlists creades pels usuaris.

Si eliminem un usuari, s'eliminaran també les seves playlists.

Per a aquesta pràctica és acceptable. En una aplicació real, aquesta decisió s'hauria d'analitzar amb més cura.

---
## 9. Crear la taula `PlaylistTracks`

```sql
CREATE TABLE PlaylistTracks (
  playlistId UNIQUEIDENTIFIER NOT NULL,
  trackId UNIQUEIDENTIFIER NOT NULL,
  position INT NOT NULL,
  addedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

  CONSTRAINT PK_PlaylistTracks PRIMARY KEY (playlistId, trackId),

  CONSTRAINT FK_PlaylistTracks_Playlists
    FOREIGN KEY (playlistId) REFERENCES Playlists(id)
    ON DELETE CASCADE,

  CONSTRAINT FK_PlaylistTracks_Tracks
    FOREIGN KEY (trackId) REFERENCES Tracks(id),

  CONSTRAINT CK_PlaylistTracks_Position_Positive
    CHECK (position > 0)
);
GO
```

Aquesta taula representa la relació molts-a-molts entre playlists i tracks.

La clau primària està formada per:

```text
playlistId
trackId
```

Això evita que la mateixa cançó aparegui dues vegades a la mateixa playlist.

---
# Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
model relacional creat a la base de dades MusicCloud
taula Artists creada
taula Users creada
taula Albums creada
taula Tracks creada
taula Playlists creada
taula PlaylistTracks creada
claus primàries definides
claus foranes definides
dades creïbles inserides
consultes JOIN executades correctament
```

També cal incloure evidències de les consultes següents:

```sql
SELECT name
FROM sys.tables;
```

```sql
SELECT 
  Tracks.title,
  Artists.name AS artist,
  Albums.title AS album,
  Tracks.durationSeconds
FROM Tracks
INNER JOIN Artists ON Tracks.artistId = Artists.id
LEFT JOIN Albums ON Tracks.albumId = Albums.id;
```

```sql
SELECT 
  Playlists.name AS playlist,
  PlaylistTracks.position,
  Tracks.title,
  Artists.name AS artist
FROM PlaylistTracks
INNER JOIN Playlists ON PlaylistTracks.playlistId = Playlists.id
INNER JOIN Tracks ON PlaylistTracks.trackId = Tracks.id
INNER JOIN Artists ON Tracks.artistId = Artists.id
ORDER BY Playlists.name, PlaylistTracks.position;
```

---

```


// Nom fitxer: Pràctiques/Part 4 - Persistència amb Microsoft SQL Server/P04.06. DTO i transformació de dades.md
```ts


# 21. DTO i transformació de dades

# Pràctica

## Tasca

Modifica els serveis de tracks perquè l'API retorni un **DTO de sortida** amb informació més clara per al client.

Els endpoints han de continuar sent els mateixos:

```text
GET /tracks
GET /tracks/:id
POST /tracks
PUT /tracks/:id
DELETE /tracks/:id
```

Però les respostes de lectura, creació i actualització han de retornar:

```text
id
title
artist
album
durationSeconds
```

En lloc de retornar:

```text
id
title
artistId
albumId
durationSeconds
```

---
## Actualitzar els tipus de tracks

Afegeix el tipus TrackDto que retornarem com a resposta de la petició

```typescript
export interface TrackDto {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  durationSeconds: number;
}


```
---

## Revisar els controllers

Els controllers poden continuar gairebé igual.

Per exemple:

```ts
export async function getTracksController(
  _req: Request,
  res: Response
): Promise<Response> {
  try {
    const tracks = await getAllTracks();

    return res.status(200).json(tracks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

La diferència és que ara `getAllTracks()` retorna `TrackDto[]`.

El controller no necessita saber com es construeix aquest DTO.

Això és responsabilitat del servei.

---
# Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
TrackDto creat
Documentació sobre el funcionament correcte de tots els end points
```

---



```


// Nom fitxer: Pràctiques/Part 4 - Persistència amb Microsoft SQL Server/P04.02. Connexió a Microsoft SQL Server i execució de SQL.md
```ts



# Pràctica

## Tasca

Connecta't al contenidor de **Microsoft SQL Server** creat en la pràctica anterior i executa les primeres instruccions SQL del projecte MusicCloud.

Has de crear:

```text
base de dades MusicCloud
taula Tracks
registres inicials de prova
consultes SELECT
una modificació amb UPDATE
una eliminació amb DELETE
```

En aquesta pràctica encara no has de modificar el codi TypeScript del projecte.

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure evidències que s'ha fet correctament:

```text
contenidor SQL Server arrencat
connexió correcta amb sqlcmd
base de dades MusicCloud creada
taula Tracks creada
dades inicials inserides
consulta SELECT executada
consulta UPDATE executada
consulta DELETE executada
```

Pots entregar captures o sortides de terminal de:

```bash
docker ps
```

```bash
docker logs musiccloud-sqlserver
```

```sql
SELECT name FROM sys.databases;
```

```sql
SELECT id, title, artist, durationSeconds FROM Tracks;
```

---



```


// Nom fitxer: Pràctiques/Part 3 - TypeScript professional/P03.01.Configuració TypeScript.md
```ts


# Pràctica - Configuració TypeScript

## Tasca

Revisa i ajusta la configuració TypeScript del projecte MusicCloud.

El projecte ha de tenir un fitxer:

```text
tsconfig.json
```

amb una configuració adequada per compilar el codi de `src` cap a `dist`.

---
## Requisits

El fitxer `tsconfig.json` ha d’incloure:

```text
target ES2022
module Node16
moduleResolution Node16
rootDir src
outDir dist
strict true
esModuleInterop true
skipLibCheck true
forceConsistentCasingInFileNames true
include src
```

També cal comprovar que els scripts del `package.json` permeten:

```text
executar en desenvolupament
compilar el projecte
executar el projecte compilat
```

---
## Comprovació

Executa:

```bash
npm run build
```

Comprova que es genera la carpeta:

```text
dist/
```

Després executa:

```bash
npm start
```

I comprova algun endpoint:

```bash
curl http://localhost:3000/
curl http://localhost:3000/tracks
```

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d’incloure:

```text
tsconfig.json revisat
package.json revisat si cal
projecte compilant sense errors
API funcionant des de dist
```


```


// Nom fitxer: Pràctiques/Part 3 - TypeScript professional/P03.04.Separar configuració aplicació de l'execució.md
```ts


# Pràctica

## Tasca

Refactoritza el projecte MusicCloud separant l'aplicació Express del servidor.

Has de crear:

```text
src/app.ts
src/server.ts
```

I deixar de fer servir `src/index.ts` com a punt d'entrada principal.

---

## Requisits

El projecte ha de complir aquests requisits:

```text
app.ts ha de crear i exportar app
app.ts ha de configurar express.json()
app.ts ha de definir GET /
app.ts ha de registrar trackRouter amb app.use("/tracks", trackRouter)
server.ts ha d'importar app
server.ts ha d'arrencar el servidor amb app.listen()
package.json ha d'executar src/server.ts en desenvolupament
package.json ha d'executar dist/server.js en producció
```

No s'ha de canviar el comportament dels endpoints.

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
src/app.ts creat
src/server.ts creat
src/index.ts eliminat o deixat de fer servir
package.json actualitzat
projecte compilant sense errors
API funcionant igual que abans
```

---


```


// Nom fitxer: Pràctiques/Part 3 - TypeScript professional/P03.02.Tipus i interfaces.md
```ts


# Pràctica proposada

## Tasca

Refactoritza els tipus del projecte MusicCloud aplicant un criteri coherent entre `type` i `interface`.

No s'ha de canviar el comportament dels endpoints. Només s'ha de millorar la definició dels tipus.

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
fitxers de tipus revisats
projecte compilant sense errors
endpoints funcionant igual que abans
```



```


// Nom fitxer: Pràctiques/Part 3 - TypeScript professional/P03.05 Gestió de rutes creuades amb CORS.md
```ts


# Configuració del CORS a MusicCloud

## Objectiu

Instal·laràs el paquet `cors` al teu projecte i el configuraràs com a middleware global. Per a l'entorn de desenvolupament local, permetràs que qualsevol aplicació pugui consultar l'API, però aprendràs a aplicar una **llista blanca (whitelist)** per restringir l'accés només a dominis seleccionats en entorns de producció reals.

# Pas 1: Instal·lació de dependències

Executa la següent comanda a la terminal del teu projecte per descarregar la llibreria i els seus tipus de TypeScript:
```bash
npm install cors
npm install --save-dev @types/cors
```
# Pas 2: Crear la configuració de CORS

Crea un fitxer de configuració modular anomenat `src/config/cors.ts`. Farem servir una configuració flexible: en producció només acceptarem el domini oficial de la nostra aplicació, però en desenvolupament serem més permissius:

```ts
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
```
# Pas 3: Aplicar el middleware a `src/app.ts`

Obre el teu fitxer `src/app.ts`. Registra el mòdul de CORS. L'ordre és crucial: **CORS s'ha d'executar abans de processar les rutes** per poder respondre a les peticions `OPTIONS`.

```ts
import express from "express";
import cors from "cors"; // 1. Importem la llibreria
import { corsOptions } from "./config/cors"; // 2. Importem la configuració
import trackRouter from "./routes/trackRoutes";


const app = express();

app.use(cors(corsOptions)); 
app.use(express.json());
app.use("/tracks", trackRouter);

export default app;

```
# Com verificar el CORS a la teva API

La manera més eficient de veure el CORS en acció sense haver de programar tota una web de Front-end és fer una simulació de capçaleres a la terminal de com ho faria un navegador:
## Simular una petició legítima (Domini acceptat)

Farem una comanda `curl` enviant la capçalera `Origin` simulant que som l'aplicació de React a `http://localhost:5173`:

```bash
curl -i -X GET "http://localhost:3000/tracks" -H "Origin: http://localhost:5173"
```

**Què has de buscar a la resposta?** Veuràs que el servidor respon amb un `200 OK` i inclou la capçalera de permís:

`Access-Control-Allow-Origin: http://localhost:5173`

### 2. Simular un atac o un domini no autoritzat

Ara simularem que som una web estranya o atacant a `http://www.web-dolenta.com`:

```bash
curl -i -X GET "http://localhost:3000/tracks" -H "Origin: http://www.web-dolenta.com"

```

**Què has de buscar a la resposta?** Com que aquest domini no està a la nostra *whitelist*, l'API respondrà saltant directament al middleware d'errors, denegant el pas i no inclourà cap capçalera `Access-Control-Allow-Origin`. Si hagués estat un navegador real, hauria tallat el pas a les dades immediatament!

```


// Nom fitxer: Pràctiques/Part 3 - TypeScript professional/P03.03.Separació Rutes - Controllers - Services.md
```ts


# Pràctica

## Tasca

Refactoritza el projecte MusicCloud separant les rutes, els controladors i els serveis del recurs `tracks`.

S'aconsella fer primer els mètodes GET i PUT.

---
## Requisits

El projecte ha de tenir aquesta estructura nova:

```text
src/
├── controllers/
│   └── trackController.ts
├── routes/
│   └── trackRoutes.ts
├── services/
│   └── trackService.ts
├── ...

```

També s'ha d'actualitzar `src/index.ts` perquè registri les rutes de tracks amb:

```ts
app.use("/tracks", trackRouter);
```

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
src/routes/trackRoutes.ts
src/controllers/trackController.ts
src/services/trackService.ts
src/index.ts modificat
projecte compilant sense errors
endpoints funcionant igual que abans
```

---


```



// Nom fitxer: Teoria/Part 8 - Qualitat professional/T08.02 Protecció de l'API.md
```ts


# Protecció de l'API: Rate Limiting i Helmet (Seguretat)

Quan publiquem una API a Internet, aquesta queda exposada a milers de bots i usuaris maliciosos. Un atacant podria intentar tombar el nostre servidor:

- fent milions de peticions per segon (atacs DoS) 
- intentar esbrinar la contrasenya d'un usuari provant milers de combinacions (atacs de força bruta). 
- ...

Per blindar la nostra aplicació Express de manera senzilla i eficient, utilitzarem dues capes de seguretat essencials: **Helmet** i **Rate Limiting**.

---
# Fonaments Teòrics

## 1. Helmet: Ocultant i protegint les capçaleres HTTP

Per defecte, Express envia una capçalera a totes les respostes que diu `X-Powered-By: Express`. Això és un regal per als *hackers*, ja que els indica quina tecnologia utilitzem i els permet buscar vulnerabilitats específiques d'Express o Node.js.

**Helmet** és un middleware que, amb una sola línia de codi, configura automàticament un conjunt de 15 capçaleres HTTP de seguretat. Entre d'altres coses, Helmet:

* **Oculta la capçalera `X-Powered-By**` per no donar pistes de la nostra tecnologia.

* Protegeix contra atacs de **Clickjacking** (evita que la nostra web s'insereixi dins d'un `<iframe>` d'una web maliciosa).

* Imposa connexions segures a través de **HSTS** (HTTP Strict Transport Security).

## 2. Rate Limiting: Control de trànsit i prevenció d'abusos

El **Rate Limiting** (limitació de taxa) consisteix a establir un límit màxim de peticions que un mateix usuari (identificat per la seva adreça IP) pot fer a l'API durant un període de temps determinat.

Si un usuari supera aquest límit (per exemple, fa més de 100 peticions en 15 minuts), el servidor bloquejarà temporalment les seves següents peticions responent automàticament amb un codi d'estat **`429 Too Many Requests`**.

Això ens protegeix contra:

* Atacs de denegació de servei (DoS).

* *Scraping* massiu (bots intentant descarregar tota la nostra base de dades de cançons de cop).

* Atacs de força bruta als endpoints de login.

---
# L'Arquitectura del Codi (Middlewares globals)

Tant Helmet com Rate Limiting actuen com a **middlewares globals**. Això vol dir que es col·loquen a dalt de tot del fitxer `app.ts`, just després de crear la instància d'Express, per tal d'avaluar i filtrar qualsevol petició abans que arribi a les nostres rutes de `tracks`.


```


// Nom fitxer: Teoria/Part 8 - Qualitat professional/T08.05  Orquestració de l'entorn complet.md
```ts


En entorns professionals utilitzem **Docker Compose** per definir, en un sol fitxer de configuració, tota la nostra arquitectura de software (el servidor Node.js + la base de dades SQL Server). Amb una sola comanda, tot l'entorn s'aixeca interconnectat en qüestió de segons.

---
# Fonaments Teòrics

## 1. Què és Docker Compose?

Si Docker és l'eina que ens permet empaquetar la nostra aplicació en un "contenidor" aïllat, **Docker Compose** és l'orquestrador que ens permet gestionar **múltiples contenidors alhora**.

En lloc d'executar comandes de terminal llarguíssimes per a cada servei (`docker run ...`), creem un fitxer de configuració anomenat `docker-compose.yml` en format YAML. En aquest fitxer definim com conviuen i es comuniquen els nostres serveis.

## 2. Conceptes clau d'un fitxer Compose

Per orquestrar el MusicCloud, utilitzarem els següents blocs estructurals:

* **`services`:** Defineix els contenidors que volem aixecar (en el nostre cas: `api` i `database`).
* **`build`:** Indica a Docker que l'imatge del contenidor de l'API s'ha de construir utilitzant el nostre `Dockerfile` local.
* **`environment`:** Permet injectar les variables d'entorn (les mateixes del fitxer `.env`) a dins de cada contenidor de manera totalment aïllada.
* **`depends_on`:** Estableix un ordre d'arrencada. L'API no es pot engegar si la base de dades SQL Server no s'ha iniciat primer.
* **`volumes`:** Ens permet persistir les dades de SQL Server al nostre disc dur local. Si el contenidor s'elimina o es reinicia, la música i les taules no es perdran.

---
# Docker api

Fitxer: Dockerfile

```yaml
# 1. Descarrega un ordinador virtual buit amb Node.js ja instal·lat
FROM node:20

# 2. Crea una carpeta a dins d'aquest ordinador virtual per posar el projecte
WORKDIR /app

# 3. COPIA tots els fitxers de la teva carpeta real (.) a dins de la carpeta virtual (/app)
COPY package*.json ./
RUN npm install

COPY . .  # 👈 AQUÍ ES COPIA EL TEU CODI FONT (src, config, etc.)

# 4. Compila el codi de TypeScript a JavaScript pla
RUN npm run build

# 5. La comanda final que s'executarà quan el contenidor s'engegui
CMD ["node", "dist/app.js"]  # 👈 AQUÍ EXECUTA EL CODI COMPILAT
```

Aquest fitxer és el que indica on està ubicat el codi de l'api per a la seva execució. En el fitxer `docker-compose.yml`, utilitzem el nom del fitxer per a indicar quin contenidor ha d'executar per a executar l'api.

```yaml
  api:
    build:
      context: .
      dockerfile: Dockerfile
```

# L'Arquitectura de l'Entorn (`docker-compose.yml`)

A continuació, es mostra com es defineix l'ecosistema complet del nostre projecte. Aquest fitxer es col·loca a l'arrel de l'aplicació:

```yaml
version: '3.8'

services:
  # SERVEI 1: La Base de Dades SQL Server
  database:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: musiccloud-db
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "PasswordSecure123!"
    ports:
      - "1433:1433"
    volumes:
      - mssql_data:/var/opt/mssql
    networks:
      - musiccloud-network # 👈 Connectem la base de dades a la nostra xarxa

  # SERVEI 2: La nostra API en Node.js
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: musiccloud-api
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      DB_USER: sa
      DB_PASSWORD: "PasswordSecure123!"
      DB_SERVER: database # Fa referència al nom del servei de la base de dades
      DB_NAME: MusicCloud
      JWT_SECRET: "SuperSecretKeyMusicCloud2026"
    depends_on:
      - database
    networks:
      - musiccloud-network # 👈 Connectem l'API a la mateixa xarxa perquè parlin entre elles

volumes:
  mssql_data:

# DEFINICIÓ DE LA XARXA PROPIA
networks:
  musiccloud-network:
    driver: bridge # El driver estàndard per a contenidors que corren a la mateixa màquina
```

> ⚠️ **El gran secret de les Xarxes a Docker:** Fixa't en la variable `DB_SERVER: database`. Docker Compose crea una xarxa virtual interna automàticament. Dins d'aquesta xarxa, els contenidors es poden buscar entre ells fent servir el nom del servei com si fos un domini d'Internet. Per tant, l'API ja no es connectarà a `localhost`, sinó a `database`.

---

# Pràctica

Orquestració Multicontenidor del MusicCloud

# Objectiu

Crea el fitxer de configuració de Docker Compose per unificar l'API i la base de dades SQL Server en un sol entorn de microserveis. L'objectiu és que qualsevol desenvolupador pugui descarregar el teu projecte de GitHub i, sense instal·lar absolutament res més que Docker, aixecar la plataforma sencera al complet.

---

# Pas 1: Crear el fitxer `docker-compose.yml`

Crea un fitxer anomenat exactament **`docker-compose.yml`** a la carpeta arrel de la teva aplicació (al mateix nivell que el teu `package.json` i el teu `Dockerfile`).

Copia l'estructura que hem analitzat a la teoria. Recorda **respectar estrictament la indentació de 2 espais** (podes comprovar el sagnat dels blocs `services`, `database`, `api`, etc., ja que YAML és altament sensible).

---

# Pas 2: Control d'arrencada i comandes globals

Un cop tens el fitxer creat, obre la teva terminal a l'arrel del projecte. Utilitzarem les comandes de l'orquestrador:

### 1. Aixecar l'entorn complet

Executa la següent comanda per descarregar SQL Server, construir la teva API i engegar-ho tot alhora:

```bash
docker compose up --build

```

*(Si vols que s'aixequi en segon pla lliberant la teva terminal, pots afegir-li el flag `-d`: `docker compose up -d`).*

### 2. Aturar l'entorn sense perdre dades

Quan acabis de treballar, pots apagar absolutament tot el sistema de forma neta executant:

```bash
docker compose down

```

---

# Com verificar la pràctica

1. Executa `docker compose up`.
2. Obre l'aplicació **Docker Desktop** al teu ordinador. Veuràs que s'ha creat un grup anomenat com el teu projecte que conté a dins els dos contenidors en verd (`musiccloud-api` i `musiccloud-db`).
3. Obre el teu navegador o Swagger a **`http://localhost:3000/api-docs`**. L'API respondrà perfectament.
4. Per comprovar que les dades persisteixen gràcies al volum, crea una nova cançó fent un `POST`. Després executa `docker compose down` per apagar el servidor, torna'l a aixecar amb `docker compose up` i fes un `GET`. La cançó que havies creat continuarà existint a la base de dades de SQL Server!

```


// Nom fitxer: Teoria/Part 8 - Qualitat professional/T08.03 Traçabilitat del servidor.md
```ts


Passem a un punt crucial per a l'estabilitat i el manteniment d'una API en producció: **el Logging i la Traçabilitat**.

Quan una aplicació falla a l'ordinador d'un usuari o en un servidor al núvol, no tenim un `console.log` per mirar ni podem posar un punt de ruptura (*breakpoint*). Necessitem un sistema professional que guardi un historial detallat de tot el que passa.

---
# Traçabilitat del servidor: Logging professional (Winston/Morgan)

Fins ara hem fet servir `console.log()` i `console.error()` per veure què passa a la nostra aplicació. Tot i que serveix per al desenvolupament local, en un entorn professional és totalment insuficient. Els `console.log` són síncrons (alenteixen l'aplicació), no es guarden enlloc (si el servidor es reinicia, es perden) i no tenen estructura. Per resoldre-ho, integrarem una solució de traçabilitat combinant **Winston** i **Morgan**.

---
# Fonaments Teòrics

## Per què necessitem dues llibreries diferents?

Per cobrir la traçabilitat completa d'un servidor, dividim els logs en dues categories:

* **Morgan (HTTP Request Logger):** És un middleware especialitzat a registrar automàticament **cada petició HTTP** que arriba al servidor (quina URL es demana, quin mètode, quin codi d'estat respon i quants mil·lisegons ha trigat).

* **Winston (Application Logger):** És un motor de logs universal per a tota l'aplicació. El farem servir de manera manual dins dels nostres `catch` o serveis per registrar errors de la base de dades, avisos del sistema o fluxos de l'aplicació.
## Els nivells de Log (Log Levels)

Winston ens permet categoritzar la gravetat dels missatges mitjançant l'estàndard `npm`. Això és vital perquè, en producció, podem configurar el sistema perquè *només* guardi els errors greus i ignori els missatges informatius:

* `error` (0): Fallades crítiques (ex: la base de dades ha caigut).

* `warn` (1): Situacions inesperades que no tallen el flux (ex: un intent de login fallit).

* `info` (2): Missatges informatius generals (ex: "Servidor engegat a la ruta X").

* `debug` (5): Informació detallada exclusiva per al desenvolupador en local.

## Destins dels logs (Transports)

Winston utilitza el concepte de **Transports** (destins). Un sol log pot enviar-se a múltiples llocs alhora:

1. **Console Transport:** Mostra el log per la terminal (amb colors cridaners en mode desenvolupament).

2. **File Transport:** Guarda el log de manera asíncrona dins d'un fitxer text (ex: `logs/error.log`) que podrem consultar dies després.

 L'Arquitectura del Codi de Logging

El nostre objectiu és centralitzar la configuració de Winston en un fitxer, i després desviar el trànsit de Morgan cap a Winston, aconseguint que **absolutament tot** quedi registrat sota el mateix format professional.

## Instal·lació de llibreries
Les llibreries `winston` i `morgan` no estan incloses en el paquet estàndard de NodeJS. Les instal·lem mitjançant

```bash
npm install winston morgan
npm install --save-dev @types/morgan
```
## Configuració de Winston (`src/config/logger.ts`)

Definim com es veurà el nostre log (timestamp, format JSON o text personalitzat) i on es guardarà:

```ts
import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

// Customitzem com es pintarà el text pla a la consola o fitxer
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info", // Llegim de l'entorn la gravetat mínima
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Captura automàticament el Stack Trace si és un error
    format.json() // Per defecte, format JSON estructurat (ideal per a producció)
  ),
  transports: [
    // 1. Guardem tots els errors greus a un fitxer
    // La carpeta logs es crearà a l'arrel del projecte
    new transports.File({ filename: "logs/error.log", level: "error" }),
    // 2. Guardem l'historial complet d'informació a un altre fitxer
    new transports.File({ filename: "logs/combined.log" })
  ]
});

// Si estem en desenvolupament local, afegim també la sortida per pantalla ben acolorida
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        customFormat
      )
    })
  );
}

```

## Redirecció de Morgan cap a Winston a `src/app.ts`

Per defecte, Morgan escriu a la consola. Per canalitzar-ho a través del nostre fitxer de logs professional, hem de configurar el seu paràmetres `stream`:

```ts
import express from "express";
import morgan from "morgan";
import { logger } from "./config/logger";

const app = express();

// Configurar Morgan perquè utilitzi el format 'dev' o 'combined' i ho enviï a Winston
const morganStream = {
  write: (message: string) => logger.info(message.trim())
};

// Injectem Morgan com a middleware global
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream: morganStream }));2. 

```
## Actualitzar el middleware d'errors de l'API

El registre d'errors de l'aplicació s'ha de gestionar mitjançant `logger`. 

Fitxer `src/middlewares/errorHandler.ts`  
```ts
import { NextFunction, Request, Response } from "express";
import { ErrorCode, ErrorResponse } from "../types/error/errorResponse";
import { AppError } from "../types/error/custom/appError";
import { logger } from "../config/logger";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  // 1. Si és un error operacional nostre, responem amb les seves dades
  if (error instanceof AppError) {
    logger.warn(`Operational [${error.statusCode}] - ${error.code}: ${error.message}`);
    const response: ErrorResponse = {
      message: error.message,
      code: error.code
    };
    return res.status(error.statusCode).json(response);
  }

  // 2. Si l'error no és operational (bug, fallada de BD, etc.), fem log intern i responem 500
  logger.error(error);

  const response: ErrorResponse = {
    message: "Internal server error",
    code: ErrorCode.InternalServerError
  };

  return res.status(500).json(response);
}
```

La sentència 
```ts
logger.warn(`Operational [${error.statusCode}] - ${error.code}: ${error.message}`);` per a registar
```
és un registre d'errors de funcionament derivats de l'ús de l'aplicació. D'aquesta forma podem saber si hi ha usuaris intentant forçar la màquina (per exemple, buscant cançons amb IDs que no existeixen o enviant dades incorrectes de forma massiva).

Els errors de funcionament no operacional, es registren amb la línia
```ts
logger.error(error);
```


```


// Nom fitxer: Teoria/Part 8 - Qualitat professional/T08.01 Documentació interactiva amb OpenAPI i Swagger.md
```ts


# Documentació interactiva amb OpenAPI i Swagger

Fins ara, per provar la nostra API, hem hagut de fer servir comandes `curl` o recordar quins paràmetres acceptava cada endpoint. En entorns de treball reals, això és inviable. Els equips de desenvolupament necessiten un lloc centralitzat, actualitzat i interactiu on consultar com funciona l'API. Per aconseguir-ho, utilitzarem l'estàndard **OpenAPI** i l'eina **Swagger**.

---
# Fonaments Teòrics

## 1. Què són OpenAPI i Swagger?

* **OpenAPI:** És una especificació (un estàndard industrial) per descriure APIs REST. Defineix de manera formal (mitjançant codi JSON o YAML) quines rutes existeixen, quins paràmetres reben, quins codis de resposta retornen i quina seguretat utilitzen.
* **Swagger:** És el conjunt d'eines que agafa aquesta especificació OpenAPI i la converteix en una **interfície web interactiva i elegant**. Des d'aquesta web, qualsevol programador pot clicar un botó, omplir els camps i provar els endpoints directament contra el nostre servidor (*Try it out*).

## 2. Com s'integra Swagger a Node.js / Express?

Hi ha moltes maneres d'escriure la documentació de Swagger (com ara posar comentaris complexos a sobre de cada ruta). Tot i així, per mantenir el nostre codi net, modular i fàcil de mantenir, utilitzarem una de les pràctiques més recomanades en l'arquitectura de software: **separar la documentació en un fitxer JSON independent** i servir-lo mitjançant un middleware d'Express a la ruta `/api-docs`.

Utilitzarem dos paquets clau:

* `swagger-ui-express`: Permet a Express aixecar la interfície gràfica de Swagger.
* `@types/swagger-ui-express`: Els tipus de TypeScript necessaris per al paquet anterior.
* `swagger-jsdoc` : genera la documentació de l'`end point`

---
# L'Arquitectura de la Documentació

El flux és molt senzill: quan algú accedeix a `http://localhost:3000/api-docs` des del navegador, Express intercepta la petició mitjançant el middleware de Swagger, llegeix el nostre fitxer de configuració JSON i renderitza la web interactiva.

---
# Com es programa la configuració de Swagger?

## 1. Configurar el generador `src/config/swagger.ts`
Creem un fitxer centralitzat de configuració on definim les dades bàsiques de l'API i li indiquem a la llibreria on ha d'anar a buscar els comentaris de documentació (els nostres fitxers de rutes i controladors):

```ts
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
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT" 
        }
      }
    }
  },
  // Indiquem quins fitxers contenen els comentaris de documentació
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"] 
};

export const swaggerSpec = swaggerJSDoc(options);

```
## 2. El model de documentació YAML per a l'especificació de rutes

Per a cada end point afegim comentaris de `typescript` amb llenguatge `yaml` amb la documentació del `end point`.

```ts
import { Router } from "express";
import { getTracksController } from "../controllers/trackController";
import { validate } from "../middlewares/validationMiddleware";
import { searchTracksSchema } from "../middlewares/validators/tracks/searchTracksSchema";

const router = Router();

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
router.get("/", validate(searchTracksSchema, "query"), getTracksController);

...

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
 
router.post( "/", validate(createTrackSchema, "body"), createTrackController);

...

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
 
router.delete("/:id", validate(idParamSchema, "params"),deleteTrackController);
```

## 3. Connectar Swagger al fitxer `app.ts`

Al nostre fitxer principal de l'aplicació, importarem les llibreries i farem que Express serveixi la documentació en una ruta dedicada:

```ts
import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

// altres imports



export const app: Express = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Altres rutes

app.use(errorHandler);

```

---

# Pràctica

Creació de la Documentació Interactiva Swagger al MusicCloud per a l'`end point/tracks` .

# Objectiu

Has d'instal·lar les llibreries de Swagger i configurar la documentació interactiva de la teva API a la ruta `/api-docs`. 

```


// Nom fitxer: Teoria/Part 8 - Qualitat professional/T08.04 Modularització de Rutes.md
```ts


## Fat app.ts ( fitxer d'arrencada obès).

Si continues afegint mòduls (`/albums`, `/artists`, `/genres`, `/comments`, etc.), el teu fitxer `app.ts` es convertirà en un embolic de desenes de línies d'importacions i `app.use()`. Això trenca el **Principi de Responsabilitat Única**: `app.ts` hauria de servir només per arrancar el servidor i configurar els middlewares globals, no per conèixer el llistat complet de totes les rutes del sistema.

Separar aquesta responsabilitat en un mòdul extern és una **bona pràctica**. La forma més neta i professional de fer-ho a Express és creant un **Enrutador Centralitzador** (sovint anomenat `index.ts` de rutes).

---
# Modularització de Rutes: L'Enrutador Central (Router Centralizer)

Quan una API REST creix, gestionar totes les rutes directament al fitxer d'arrencada `app.ts` esdevé insostenible. Per mantenir el codi net, modular i escalable, apliquem el patró d'enrutament centralitzat, delegant la responsabilitat de registrar els endpoints a un fitxer exclusiu de rutes.
# Fonaments Teòrics

## L'Arquitectura de Rutes Escampades vs. Centralitzades

En lloc de connectar cada enrutador individual (`trackRouter`, `authRouter`, etc.) directament a l'aplicació principal, creem un sub-enrutador que actua com a **únic punt d'accés**. L'aplicació `app.ts` només farà un únic `app.use()` cap a aquest enrutador central, i aquest s'encarregarà de ramificar el trànsit cap a cada fitxer específic.
# Com es programa la centralització de rutes?

## Pas 1: Crear l'enrutador global (`src/routes/index.ts`)

Creem un fitxer centralitzat (normalment un `index.ts` dins de la carpeta `routes`). Aquest fitxer aglutina totes les rutes de la nostra aplicació sota un prefix comú (per exemple, si en un futur vols recuperar el prefix `/api` o deixar-ho a l'arrel):

```ts
import { Router } from "express";
import { trackRouter } from "./trackRoutes";
import { authRouter } from "./authRoutes";
import { playlistsRouter } from "./playlistsRoutes";

const apiRouter = Router();

// Centralitzem i ramifiquem totes les entitats del MusicCloud
apiRouter.use("/tracks", trackRouter);
apiRouter.use("/users", authRouter);
apiRouter.use("/playlists", playlistsRouter);

export default apiRouter;
```
## Pas 2: Simplificar el fitxer principal (`src/app.ts`)

Ara, el teu fitxer d'arrencada queda completament net d'importacions repetitives de rutes. Només necessita importar el teu enrutador global:

```ts
import express from "express";
import apiRouter from "./routes/index"; // 👈 Només importem el centralitzador
// ... la resta d'importacions (Winston, Morgan, Swagger...)

const app = express();

app.use(express.json());

// 💥 L'única línia necessària per a totes les teves rutes presents i futures
app.use("/", apiRouter); 

export { app };
```
# Quins avantatges aporta això a nivell de mantenibilitat?

1. **Aïllament de canvis:** Si una ruta canvia de nom o afegeixes un mòdul nou, el fitxer `app.ts` (que és el més delicat de l'aplicació) ni es toca.
2. **Versionat fàcil:** Si l'any vinent vols fer la versió 2 de l'API (`/api/v2`), només hauràs de crear un `apiV2Router` i injectar-lo, mantenint l'anterior intacte de forma senzilla.
3. **Més fàcil de llegir:** Qualsevol programador nou que entri al projecte sabrà exactament quines rutes té l'aplicació obrint només el fitxer `src/routes/index.ts`.

```


// Nom fitxer: Teoria/Part 1 - API Mínima/T01.00.API REST.md
```ts


# API REST
## Definició

Una **API REST** és una manera d'organitzar la comunicació entre aplicacions a través d'Internet, normalment utilitzant el protocol **HTTP**.

Una API permet que un programa demani informació o executi accions sobre un altre programa. REST defineix una sèrie de principis perquè aquesta comunicació sigui clara, ordenada i previsible.

Per exemple, una aplicació de música podria oferir una API REST per consultar cançons:

```http
GET /tracks
```

O per consultar una cançó concreta:

```http
GET /tracks/15
```

O per crear una nova playlist:

```http
POST /playlists
```

En una API REST, els elements importants del sistema es representen com a **recursos**. Per exemple:

```text
/users
/tracks
/artists
/playlists
```

Cada recurs es manipula utilitzant mètodes HTTP.

---
## Per què API REST

Una API REST resol el problema de la **comunicació entre sistemes diferents**.

Per exemple, imagina una aplicació tipus Spotify. Pot tenir:

* una aplicació web,
* una aplicació mòbil,
* un servidor,
* una base de dades,
* serveis externs de pagament,
* sistemes d'autenticació.

Sense una API, cada aplicació hauria de conèixer directament com funciona la base de dades o la lògica interna del servidor. Això seria perillós, rígid i difícil de mantenir.

Amb una API REST, el client no accedeix directament a la base de dades. Fa peticions al servidor:

```http
GET /users/7/playlists
```

I el servidor respon amb dades, habitualment en format JSON:

```json
[
  {
    "id": 1,
    "name": "Cançons preferides"
  },
  {
    "id": 2,
    "name": "Música per estudiar"
  }
]
```

Això separa clarament les responsabilitats:

```text
Client → demana dades o accions
API → controla què es pot fer
Servidor → aplica la lògica
Base de dades → desa la informació
```

---



```


// Nom fitxer: Teoria/Part 1 - API Mínima/T01.03 Entorns d'execució en una API NodeJS.md
```ts


# Entorns d'execució en una API NodeJS
## Entorns principals

Quan es desenvolupem una aplicació, ho fem en diferents entorns. Aquest fet afavoreix que l'usuari final no es trobi amb errors d'execució o de lògica de l'aplicació.

| Entorn                 | Nom habitual  | Funció                                                                                                                                                                                                                 |
| ---------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desenvolupament        | `development` | Entorn local on programem i provem manualment.<br>Característiques:<br>- Ús d'eines de desenvolupament.<br>- Missatges més detallats i tècnics.<br>- Configuració flexible i subjecta a canvis.                        |
| Proves                 | `test`        | Entorn pensat per executar tests automatitzats.<br>Característiques:<br>- Configuració estable i repetible.<br>- Dades controlades per evitar resultats imprevisibles.                                                 |
| Staging / preproducció | `staging`     | Entorn molt semblant a producció que serveix per validar canvis abans de publicar-los.<br>Característiques:<br>- Habitual en projectes professionals.<br>- Configuració estable i propera a producció.                 |
| Producció              | `production`  | Entorn real on s'executa l'aplicació per als usuaris finals.<br>Característiques:<br>- Configuració estable i segura.<br>- Missatges d'error menys detallats.<br>- Prioritat en rendiment, seguretat i disponibilitat. |
## Exemple senzill amb `NODE_ENV`

Per a indicar l'entorn, utilitzem la variable d'entorn `NODE_ENV` (node environment)

```ts
const environment = process.env.NODE_ENV || "development";
```
```text
si existeix NODE_ENV, fem servir aquest valor
si no existeix, assumim development
```

El problema és que qualsevol valor que contingui NODE_ENV serà considerat vàlid per al programa. Podem limitar els valors especificant els literals vàlids.
```ts
export type AppEnvironment = "development" | "test" | "production";

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
```
## Estructura de fitxers
```text
src/
├── config/
│   ├── api.ts
│   └── environment.ts
├── types/
│   ├── api.ts
│   └── environment.ts
└── index.ts
```
## Exemple

### `src/types/environment.ts`
```ts
export type AppEnvironment = "development" | "test" | "production";
```
### `src/config/environment.ts`
```ts
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
```
### `src/index.ts`
```ts
import express, { Express, Request, Response } from "express";
import { apiInfo } from "./config/api";
import { getEnvironment } from "./config/environment";

const app: Express = express();

const PORT: number = 3000;
const environment = getEnvironment();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    name: apiInfo.name,
    version: apiInfo.version,
    status: "OK",
    description: apiInfo.description,
    resources: apiInfo.resources,
    meta: {
      environment
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});
```
## Amb compte en producció

> En una API real, no sempre és bona idea exposar informació interna com l'entorn d'execució. En aquest projecte ho farem amb finalitat didàctica, per comprovar fàcilment quin entorn està actiu.
## Scripts del `package.json`

Aquí pots introduir:

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx src/index.ts",
    "test": "cross-env NODE_ENV=test echo \"Tests pendents\"",
    "build": "tsc",
    "start": "cross-env NODE_ENV=production node dist/index.js"
  }
}
```

I instal·lar:

```bash
npm install -D cross-env
```

Utilitzem `cross-env` per tal que funcioni amb totes les plataformes (Linux/Mac/Windows).




```


// Nom fitxer: Teoria/Part 1 - API Mínima/T01.01 Servidor EXPRESS.md
```ts


# Servidor Express amb TypeScript

Un **servidor Express** és una aplicació que queda en execució esperant peticions HTTP i que envia una resposta quan algú accedeix a una ruta concreta.

Express és un framework molt utilitzat sobre Node.js per crear servidors web i APIs.

En una API, el servidor normalment no retorna pàgines HTML, sinó dades en format **JSON**.

Per exemple, quan obrim al navegador:

```text
http://localhost:3000
```

el navegador fa una petició HTTP a un servidor que està escoltant al port `3000`.

El servidor rep la petició, comprova si té definida una ruta que coincideixi amb la URL demanada i retorna una resposta.

---

# Node.js, Express i TypeScript

Abans de crear el servidor, cal diferenciar tres elements.

## Node.js

**Node.js** és l’entorn que permet executar JavaScript fora del navegador.

Gràcies a Node.js podem crear programes de servidor.

## Express

**Express** és un framework que funciona sobre Node.js i facilita la creació de servidors HTTP.

Express ens permet:

```text
definir rutes
respondre peticions
gestionar mètodes HTTP
retornar JSON
afegir middleware
gestionar errors
```

Dit de manera simple:

```text
Node.js = motor que executa el programa
Express = eina que facilita crear el servidor
```

Sense Node.js, Express no pot funcionar.

## TypeScript

**TypeScript** és una extensió de JavaScript que permet utilitzar tipus.

Per exemple:

```ts
const port: number = 3000;
```

Això ajuda a detectar errors abans d’executar el programa i fa que el codi sigui més fàcil de mantenir.

---

# Estructura mínima del projecte

Una estructura bàsica del projecte podria ser:

```text
mini-api/
├── src/
│   └── index.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

El fitxer principal de l’aplicació serà:

```text
src/index.ts
```

---

# Instal·lació del projecte

Primer instal·lem les eines necessàries i creem el projecte:

```bash
sudo apt update -y
sudo apt install npm

mkdir mini-api
cd mini-api

npm init -y
```

Instal·lem Express:

```bash
npm install express
```

I instal·lem les dependències de desenvolupament per treballar amb TypeScript:

```bash
npm install -D typescript tsx @types/node @types/express
```

Creem el fitxer de configuració de TypeScript:

```bash
npx tsc --init
```

Creem la carpeta del codi font:

```bash
mkdir src
touch src/index.ts
```

Afegim els scripts al `package.json`:

```bash
npm pkg set scripts.dev="tsx src/index.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="node dist/index.js"
```

Aquests scripts serviran per executar el projecte en desenvolupament, compilar-lo i executar-ne la versió compilada.

---

# Configuració de TypeScript

Substituïm el contingut del fitxer `tsconfig.json` per:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "sourceMap": false,
    "declaration": false
  },
  "include": ["src"]
}
```

Els punts més importants són:

| Opció     | Significat                                           |
| --------- | ---------------------------------------------------- |
| `rootDir` | Indica on tenim el codi TypeScript original          |
| `outDir`  | Indica on es generarà el JavaScript compilat         |
| `strict`  | Activa comprovacions estrictes de tipus              |
| `module`  | Defineix el sistema de mòduls que utilitzarà Node.js |
| `target`  | Defineix la versió de JavaScript generada            |

---

# Codi mínim del servidor

Fitxer: `src/index.ts`

```ts
import express, { Express, Request, Response } from "express";

const port: number = 3000;

const app: Express = express();

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
  res.json({ message: "API funcionant correctament" });
});

app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});
```

Aquest és el servidor Express mínim per crear una API bàsica.

---

# Explicació del codi

## Importar Express

```ts
import express, { Express, Request, Response } from "express";
```

Aquesta línia importa dues coses diferents:

```ts
express
```

És la funció que permet crear una aplicació Express.

```ts
Express, Request, Response
```

Són tipus de TypeScript.

Serveixen per indicar quin tipus tenen les variables i els paràmetres.

Per això fem servir:

```ts
const app: Express = express();
```

Aquí:

```ts
express()
```

crea l’aplicació.

```ts
Express
```

indica el tipus de la variable `app`.

---

## Definir el port

```ts
const port: number = 3000;
```

El port és el número pel qual escoltarà el servidor.

En desenvolupament és habitual utilitzar ports com:

```text
3000
3001
8080
```

Si el servidor escolta al port `3000`, podrem accedir-hi amb:

```text
http://localhost:3000
```

---

## Crear l’aplicació Express

```ts
const app: Express = express();
```

Aquesta línia crea l’aplicació Express.

La variable `app` representa el nostre servidor web.

A partir d’aquesta variable podem:

```text
definir rutes
afegir middleware
configurar el servidor
posar-lo a escoltar
```

---

## Definir una ruta

```ts
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API funcionant correctament" });
});
```

Aquesta instrucció defineix una ruta.

Vol dir:

```text
Quan arribi una petició GET a la ruta /,
executa aquesta funció.
```

La ruta `/` és la ruta principal del servidor.

Per exemple:

```text
http://localhost:3000/
```

La funció rep dos objectes importants:

```ts
_req 
res
```

### `_req`

`_req` és un objecte de tipus Request.

Representa la petició que arriba del client.

Pot contenir informació com:

```text
la URL demanada
els paràmetres
el cos de la petició
les capçaleres HTTP
```
La funció reb una "request", tot i que el nostre programa no la fa servir. Per a indicar aquest fet, utilitzem subratllat (\_) en el nom de l'objecte.

Més endavant l'objecte de tipus "Request" serà útil per llegir dades enviades pel client.

### `res`

`res` vol dir **response**.

Representa la resposta que enviarem al client.

Amb `res` podem retornar diferents tipus de resposta:

```ts
res.json({ missatge: "Hola" });
res.status(404).send("No trobat");
```

En una API, normalment utilitzarem:

```ts
res.json(...)
```

per retornar dades en format JSON.

---

## Posar el servidor a escoltar

```ts
app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});
```

Aquesta instrucció arrenca el servidor.

Vol dir:

```text
El programa queda en execució.
El servidor escolta peticions al port indicat.
Quan arriba una petició, Express comprova si hi ha alguna ruta que encaixi.
Si la ruta existeix, executa la funció associada.
```

Això és el que habitualment anomenem **aixecar el servidor**.

---

# Executar el servidor en desenvolupament

Per executar el servidor mentre estem desenvolupant:

```bash
npm run dev
```

Si tot funciona correctament, veurem un missatge semblant a:

```text
Servidor escoltant a http://localhost:3000
```

Ara podem obrir el navegador i entrar a:

```text
http://localhost:3000
```

La resposta serà:

```json
{
  "message": "API funcionant correctament"
}
```

---

# Preparar el projecte per a producció

Quan el projecte ja funciona, podem compilar el codi TypeScript a JavaScript.

```bash
npm run build
```

Aquesta ordre genera la carpeta:

```text
dist/
```

La carpeta `dist` conté el codi JavaScript compilat.

Després podem executar el servidor compilat amb:

```bash
npm start
```

---

# Què cal copiar a producció?

Per portar el projecte a un servidor de producció, no n’hi ha prou amb copiar només la carpeta `dist`.

Cal copiar:

```text
dist/
package.json
package-lock.json
```

Després, al servidor de producció, cal instal·lar només les dependències necessàries per executar l’aplicació:

```bash
npm install --omit=dev
```

I finalment executar:

```bash
npm start
```

Això instal·la dependències com `express`, però no instal·la eines de desenvolupament com `typescript` o `tsx`.

---

# Resum visual del funcionament

```text
Navegador o client
        |
        | petició GET /
        v
Servidor Express
        |
        | app.get("/", ...)
        v
Funció de resposta
        |
        | res.json(...)
        v
Resposta JSON
```

---

# Conceptes clau

| Concepte       | Significat                                               |
| -------------- | -------------------------------------------------------- |
| Servidor       | Programa que espera peticions i retorna respostes        |
| Node.js        | Entorn que permet executar JavaScript fora del navegador |
| Express        | Framework de Node.js per crear servidors web i APIs      |
| TypeScript     | Llenguatge basat en JavaScript amb tipus                 |
| `app`          | Aplicació Express                                        |
| Port           | Número per on escolta el servidor                        |
| Ruta           | URL concreta que el servidor pot atendre                 |
| `GET`          | Mètode HTTP per demanar informació                       |
| `req`          | Objecte amb la informació de la petició                  |
| `res`          | Objecte per construir la resposta                        |
| `res.json()`   | Envia una resposta en format JSON                        |
| `app.listen()` | Posa el servidor en funcionament                         |

---
[1]: https://expressjs.com/en/starter/hello-world.html "Express \"Hello World\" example"


```


// Nom fitxer: Teoria/Part 1 - API Mínima/T01.02.Primer endpoint GET.md
```ts


# Primer endpoint `GET /`

## Objectiu

En el punt anterior ja hem creat un servidor Express funcional i hem definit una primera ruta `GET /`.

Ara millorarem aquest endpoint perquè deixi de ser una simple prova tècnica i passi a actuar com a **punt d'entrada informatiu de l'API**.

Aquest endpoint no retornarà encara tracks, artistes ni playlists. La seva funció serà informar sobre l'estat general de l'API i presentar algunes dades bàsiques del projecte.

En una API tipus Spotify, la ruta principal pot servir per indicar:

```text
nom de l'API
versió actual
estat del servei
recursos disponibles
autor o equip responsable
enllaços principals de l'API
```
---
# Per què millorar `GET /`?

Una resposta com aquesta és correcta però massa simple:

```ts
res.json({ message: "API funcionant correctament" });
```

Serveix per comprovar que el servidor respon, però aporta poca informació.

En una API una mica més cuidada, és preferible retornar un JSON més descriptiu:

```json
{
  "name": "Spotify API",
  "version": "1.0.0",
  "status": "OK",
  "description": "API REST per gestionar tracks, artistes i playlists"
}
```

Aquesta resposta continua sent senzilla, però ja comença a tenir forma de resposta professional.

---
# Separar informació en constants

Fins ara podem haver escrit la resposta directament dins de `res.json()`.

Això funciona, però té un problema: si el projecte creix, acabarem barrejant informació de configuració amb la lògica de les rutes.

Per evitar-ho, podem definir constants. Utilitzem la paraula clau `const` per a declarar una constant.

```ts
const API_VERSION: string = "1.0.0";
```

L'ús de constants aporta les següents avantatges:

1. Eviten repetir text dins del codi.
2. Fan que la informació important sigui fàcil de modificar

Per exemple, si més endavant volem passar de la versió `1.0.0` a la `1.1.0`, només haurem de modificar una línia.

Seguint les bones pràctiques, i preparant l'aplicació per a un futur, inclourem les constants en un fitxer extern. Utilitzem la paraula reservada `export` per tal que aquestes constants estiguin disponibles en altres fitxers de l'aplicació.

Fitxer: **`src/config/api.ts`**

```ts
export const API_NAME: string = "MusicCloud API";
export const API_VERSION: string = "1.0.0";
export const API_DESCRIPTION: string = "API REST per gestionar tracks, artistes i playlists";
```
---
# Què vol dir versionar una API?

La versió d'una API indica en quin estat es troba el projecte.

En aquest moment utilitzarem una versió simple:

```ts
const API_VERSION: string = "1.0.0";
```

Una forma habitual de llegir aquesta versió és:

```text
1.0.0
│ │ │
│ │ └── correccions petites
│ └──── canvis o millores compatibles
└────── canvis importants
```

Per exemple:

| Versió  | Significat possible                                      |
| ------- | -------------------------------------------------------- |
| `1.0.0` | Primera versió estable de l'API                          |
| `1.0.1` | Correcció petita sense canviar el funcionament principal |
| `1.1.0` | Nova funcionalitat compatible amb l'anterior             |
| `2.0.0` | Canvi important que pot trencar compatibilitat           |

En aquest projecte encara no cal aplicar versionat de manera estricta. Però introduir una constant per a la versió és una bona pràctica perquè prepara el projecte per créixer.

---
# JSON simple i JSON més complex

Un JSON pot contenir dades simples:

```json
{
  "message": "API funcionant correctament"
}
```

Però també pot contenir una estructura més rica:

```json
{
  "name": "MusicCloud API",
  "version": "1.0.0",
  "status": "OK",
  "resources": {
    "tracks": "/tracks",
    "artists": "/artists",
    "playlists": "/playlists"
  }
}
```

Aquí apareix un concepte important: un JSON pot contenir altres objectes.

En aquest cas, `resources` és un objecte que agrupa les rutes principals que tindrà l'API.

Això és útil perquè permet retornar informació més organitzada.

---
# Endpoint `GET /` millorat

Fitxer: **`src/config/api.ts`**

```ts
export const API_NAME: string = "MusicCloud API";
export const API_VERSION: string = "1.0.0";
export const API_DESCRIPTION: string = "API REST per gestionar tracks, artistes i playlists";
```
Fitxer: **`src/index.ts`**

```ts
import express, { Express, Request, Response } from "express";
import { API_DESCRIPTION, API_NAME, API_VERSION } from "./config/api";

const app: Express = express();

const PORT: number = 3000;

app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: API_NAME,
    version: API_VERSION,
    status: "OK",
    description: API_DESCRIPTION,
    resources: {
      tracks: "/tracks",
      artists: "/artists",
      playlists: "/playlists"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});
```

---

# Objecte de configuració

Podem millorar el codi anterior creant un objecte de configuració amb les propietats pròpies de la nostra API. Aquest tipus ens permet tenir un major control sobre l'estructura.

Fitxer: **`src/types/api.ts

```ts
type ApiInfo = {
  name: string;
  version: string;
  description: string;
  resources: {
    tracks: string;
    artists: string;
    playlists: string;
  };
};
```

I després podem utilitzar el tipus `ApiInfo` dins el nostre fitxer de definició de constants.

Fitxer: **`src/config/api.ts`**

```ts
export const apiInfo: ApiInfo = {
  name: "MusicCloud API",
  version: "1.0.0",
  description: "API REST per gestionar tracks, artistes i playlists",
  resources: {
    tracks: "/tracks",
    artists: "/artists",
    playlists: "/playlists"
  }
};
```
# Estructura API

La idea és:

```text
types → defineixen estructures
config → conté dades de configuració
index.ts → utilitza aquestes dades per respondre
```
Amb aquesta idea, i per tal que l'aplicació sigui més escalable creem la següent estructura per a definir la nostra aplicació inicial

```text
src/
├── config/
│   └── api.ts
├── types/
│   └── api.ts
└── index.ts

```

```


// Nom fitxer: Teoria/Part 2 - Recursos en memòria/T02.04.GET track by ID.md
```ts


# `GET /tracks/:id`

## Objectiu

En aquest punt crearem un endpoint per obtenir **un track concret** a partir del seu identificador.

Fins ara tenim aquest endpoint:

```http
GET /tracks
```

Aquest endpoint retorna tota la col·lecció de tracks.

Ara afegirem:

```http
GET /tracks/:id
```

Aquest endpoint retornarà només el track que coincideixi amb l’identificador indicat.

---

# Què vol dir `:id`?

En Express, una ruta pot tenir **paràmetres**.

En aquesta ruta:

```http
GET /tracks/:id
```

la part `:id` representa un valor variable.

Per exemple:

```http
GET /tracks/trk_001
```

Aquí, Express interpreta que:

```text
id = "trk_001"
```

Per tant, aquesta ruta es pot llegir així:

```text
Busca dins de la col·lecció tracks el track amb identificador trk_001.
```

---

# Exemple de petició

Si fem aquesta petició:

```http
GET http://localhost:3000/tracks/trk_001
```

l’API hauria de retornar:

```json
{
  "id": "trk_001",
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "duration": 200
}
```

En aquest cas la resposta és un **objecte**, no un array.

---

# Llegir el paràmetre de la ruta

Els paràmetres de la ruta es poden llegir des de:

```ts
req.params
```

En aquest cas, el paràmetre es diu `id`, perquè la ruta és:

```ts
"/tracks/:id"
```

Per tant, podem llegir-lo així:

```ts
const id:string = req.params.id as string;  // Tècnicament req.params.id podria ser undefined (no en el nostre cas!). Per aquest motiu especifiquem que es tracta d'un string.
```

Exemple:

```ts
app.get("/tracks/:id", (req: Request, res: Response) => {
  const id:string = req.params.id as string;
});
```

Aquí ja no fem servir `_req`, sinó `req`, perquè ara sí que necessitem llegir informació de la petició.

---

# Buscar un track dins l’array

Com que els tracks estan guardats en un array, podem utilitzar el mètode `.find()`.

```ts
const track = tracks.find((track) => track.id === id);
```

Aquesta instrucció busca dins de l’array `tracks` el primer element que compleixi aquesta condició:

```ts
track.id === id
```

Si el troba, retorna el track.

Si no el troba, retorna `undefined`.

---

# Controlar si el track no existeix

Aquest endpoint pot tenir dos resultats:

| Situació             | Resposta                           |
| -------------------- | ---------------------------------- |
| El track existeix    | `200 OK` + dades del track         |
| El track no existeix | `404 Not Found` + missatge d’error |

Per tant, ja no podem retornar sempre `200`.

Primer comprovarem si el track existeix:

```ts
if (!track) {
  return res.status(404).json({
    message: "Track not found"
  });
}
```

Aquest codi vol dir:

```text
Si no s’ha trobat cap track, respon amb estat 404 i acaba la funció.
```

El `return` és important perquè evita que el codi continuï i intenti enviar una segona resposta.

---

# Crear l’endpoint `GET /tracks/:id`

A sota de l’endpoint `GET /tracks`, afegim:

```ts
app.get("/tracks/:id", (req: Request, res: Response) => {
  const id:string = req.params.id as string;

  const track = tracks.find((track) => track.id === id);

  if (!track) {
    return res.status(404).json({
      message: "Track not found"
    });
  }

  res.status(200).json(track);
});
```

---

# Ordre de les rutes

És important definir primer:

```ts
app.get("/tracks", ...)
```

i després:

```ts
app.get("/tracks/:id", ...)
```

En aquest cas, Express pot diferenciar correctament les dues rutes:

| Ruta          | Coincideix amb                             |
| ------------- | ------------------------------------------ |
| `/tracks`     | Només `/tracks`                            |
| `/tracks/:id` | `/tracks/trk_001`, `/tracks/trk_002`, etc. |

Aquesta estructura serà la base de la resta d’operacions CRUD.

---

# Comprovar el funcionament

Executa el servidor:

```bash
npm run dev
```

## Cas correcte

Fes una petició a un identificador existent:

```bash
curl -i http://localhost:3000/tracks/trk_001
```

Resposta esperada:

```http
HTTP/1.1 200 OK
```

I un cos semblant a:

```json
{
  "id": "trk_001",
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "duration": 200
}
```

## Cas no trobat

Fes una petició a un identificador que no existeix:

```bash
curl -i http://localhost:3000/tracks/trk_999
```

Resposta esperada:

```http
HTTP/1.1 404 Not Found
```

I un cos semblant a:

```json
{
  "message": "Track not found"
}
```

---


```


// Nom fitxer: Teoria/Part 2 - Recursos en memòria/T02.05.PUT Track.md
```ts


# `PUT /tracks/:id`

## Objectiu

En aquest punt crearem un endpoint per **actualitzar un track existent**.

Fins ara l’API pot:

```http
GET /tracks
GET /tracks/:id
POST /tracks
```

Ara afegirem:

```http
PUT /tracks/:id
```

Aquest endpoint permetrà modificar les dades d’un track concret a partir del seu identificador.

---

# Què ha de fer `PUT /tracks/:id`?

L’endpoint `PUT /tracks/:id` ha de:

```text
1. Llegir l'identificador del track des de la URL.
2. Llegir les noves dades des del body de la petició.
3. Comprovar que el track existeix.
4. Validar que les dades rebudes són correctes.
5. Actualitzar el track dins de l'array.
6. Retornar el track actualitzat.
```

Per exemple, si tenim aquest track:

```json
{
  "id": "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "duration": 200
}
```

Podem enviar una petició:

```http
PUT http://localhost:3000/tracks/7823d5c2-f66e-46b0-bd8d-4d5b08852b8b
```

Amb aquest body:

```json
{
  "title": "Blinding Lights - Remastered",
  "artist": "The Weeknd",
  "duration": 205
}
```

I l’API hauria de retornar:

```json
{
  "id": "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
  "title": "Blinding Lights - Remastered",
  "artist": "The Weeknd",
  "duration": 205
}
```

---

# El client no modifica l’identificador

Igual que passava amb `POST /tracks`, el client no hauria d’enviar l’identificador dins del body.

L’identificador ja arriba a través de la URL:

```http
PUT /tracks/7823d5c2-f66e-46b0-bd8d-4d5b08852b8b
```

Per tant, el body correcte és:

```json
{
  "title": "Blinding Lights - Remastered",
  "artist": "The Weeknd",
  "duration": 205
}
```

No aquest:

```json
{
  "id": "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
  "title": "Blinding Lights - Remastered",
  "artist": "The Weeknd",
  "duration": 205
}
```

En aquest punt mantindrem una regla simple:

```text
L'id identifica el recurs i no es modifica.
```

---

# `PUT` com a actualització completa

En una API REST, `PUT` s’utilitza habitualment per actualitzar un recurs complet.

Això vol dir que el client ha d’enviar totes les dades necessàries del track:

```json
{
  "title": "Blinding Lights - Remastered",
  "artist": "The Weeknd",
  "duration": 205
}
```

No només una part:

```json
{
  "duration": 205
}
```

Per actualitzacions parcials existeix el mètode `PATCH`, però no el treballarem encara.

En aquest projecte farem servir `PUT` per substituir les dades principals del track, mantenint el mateix `id`.

---

# Reutilitzar `CreateTrackInput`

Per actualitzar un track necessitem les mateixes dades que per crear-lo:

```ts
title
artist
duration
```

Per tant, podem reutilitzar el tipus:

```ts
CreateTrackInput
```

Aquest tipus ja estava definit a:

```text
src/types/track.ts
```

```ts
export type CreateTrackInput = {
  title: string;
  artist: string;
  duration: number;
};
```

També podem reutilitzar la funció de validació:

```ts
isCreateTrackInput()
```

Això evita duplicar codi.

---

# Crear l’endpoint `PUT /tracks/:id`

Afegim l’endpoint després de `POST /tracks`:

```ts
app.put(
  "/tracks/:id",
  (
    req: Request<{ id: string }, TrackResponse, Partial<CreateTrackInput>>,
    res: Response<TrackResponse>
  ) => {
    const id:string = req.params.id as string;
    const trackInput: Partial<CreateTrackInput> = req.body;

    const trackIndex = tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    if (!isCreateTrackInput(trackInput)) {
      return res.status(400).json({
        message: "Invalid track data"
      });
    }

    const updatedTrack: Track = {
      id,
      ...trackInput
    };

    tracks[trackIndex] = updatedTrack;

    return res.status(200).json(updatedTrack);
  }
);
```

---

# Explicació del codi

## Ruta `PUT /tracks/:id`

```ts
app.put("/tracks/:id", ...)
```

Defineix una ruta que respon a peticions `PUT`.

La ruta conté un paràmetre:

```text
:id
```

Ho especifiquem a la ruta mitjançant

```ts
app.put(
  "/tracks/:id",
  (
    req: Request<{ id: string }, TrackResponse, Partial<CreateTrackInput>>,
    res: Response<TrackResponse>
  )
```

Aquest paràmetre representa l’identificador del track que volem actualitzar.

Per exemple:

```http
PUT /tracks/7823d5c2-f66e-46b0-bd8d-4d5b08852b8c
```

Vol dir:

```text
Actualitza el track amb id 7823d5c2-f66e-46b0-bd8d-4d5b08852b8c.
```

---

## Llegir l’identificador

```ts
const id:string = req.params.id as string;
```

Llegim l’identificador que arriba a la URL.

En aquest bloc utilitzem aquesta forma simple per mantenir el codi coherent amb els punts anteriors.

Més endavant es pot millorar tipant els paràmetres de ruta amb TypeScript.

---

## Llegir el body

```ts
const trackInput: Partial<CreateTrackInput> = req.body;
```

Guardem les dades enviades pel client dins d’un objecte.

Utilitzem:

```ts
Partial<CreateTrackInput>
```

perquè el client podria enviar dades incompletes o incorrectes.

Encara que esperem rebre un `CreateTrackInput`, no podem confiar directament en les dades enviades per HTTP. Per això les validem després.

---

## Buscar la posició del track

Per actualitzar un element dins d'un array, ens interessa saber la seva posició.

Per això utilitzem:

```ts
const trackIndex = tracks.findIndex((track) => track.id === id);
```

El mètode `findIndex()` retorna:

|            Resultat | Significat                        |
| ------------------: | --------------------------------- |
| `0`, `1`, `2`, etc. | Posició del track dins de l’array |
|                `-1` | No s’ha trobat cap track          |

---

## Retornar `404` si no existeix

```ts
if (trackIndex === -1) {
  return res.status(404).json({
    message: "Track not found"
  });
}
```

Si no existeix cap track amb aquest identificador, retornem:

```http
404 Not Found
```

Això vol dir que el recurs demanat no s’ha trobat.

---

## Validar les dades

```ts
if (!isCreateTrackInput(trackInput)) {
  return res.status(400).json({
    message: "Invalid track data"
  });
}
```

Si el body no té les dades correctes, retornem:

```http
400 Bad Request
```

Això pot passar si falta algun camp:

```json
{
  "title": "New title"
}
```

O si algun camp té un tipus incorrecte:

```json
{
  "title": "New title",
  "artist": "The Weeknd",
  "duration": "205"
}
```

En aquest segon cas, `duration` és un text, no un número.

---

## Crear el track actualitzat

```ts
const updatedTrack: Track = {
  id,
  ...trackInput
};
```

Creem un nou objecte `Track`.

Fem servir el mateix `id` que venia de la URL i copiem les dades validades del body.

Això permet actualitzar el contingut del track sense canviar-ne l’identificador.

---

## Substituir el track dins de l’array

```ts
tracks[trackIndex] = updatedTrack;
```

Aquesta línia substitueix el track antic pel nou track actualitzat.

Com que treballem en memòria, el canvi només es mantindrà mentre el servidor estigui en execució.

---

## Retornar `200 OK`

```ts
return res.status(200).json(updatedTrack);
```

Si l’actualització s’ha fet correctament, retornem:

```http
200 OK
```

amb el track actualitzat en format JSON.

En aquest endpoint utilitzem tres possibles codis d’estat:

|  Codi | Quan s’utilitza                                |
| ----: | ---------------------------------------------- |
| `200` | El track s’ha actualitzat correctament         |
| `400` | Les dades enviades no són vàlides              |
| `404` | No existeix cap track amb aquest identificador |

---
# Comprovar el funcionament

Executa el servidor:

```bash
npm run dev
```

## Cas correcte

Actualitza un track existent:

```bash
curl -i -X PUT http://localhost:3000/tracks/7823d5c2-f66e-46b0-bd8d-4d5b08852b8b \
  -H "Content-Type: application/json" \
  -d '{"title":"Blinding Lights - Remastered","artist":"The Weeknd","duration":205}'
```

Resposta esperada:

```http
HTTP/1.1 200 OK
```

Cos de la resposta:

```json
{
  "id": "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
  "title": "Blinding Lights - Remastered",
  "artist": "The Weeknd",
  "duration": 205
}
```

Després pots comprovar la llista completa:

```bash
curl http://localhost:3000/tracks
```

---

## Cas amb identificador inexistent

```bash
curl -i -X PUT http://localhost:3000/tracks/trk-9999 \
  -H "Content-Type: application/json" \
  -d '{"title":"Unknown","artist":"Unknown","duration":180}'
```

Resposta esperada:

```http
HTTP/1.1 404 Not Found
```

Cos de la resposta:

```json
{
  "message": "Track not found"
}
```

---

## Cas amb dades incorrectes

```bash
curl -i -X PUT http://localhost:3000/tracks/7823d5c2-f66e-46b0-bd8d-4d5b08852b8b \
  -H "Content-Type: application/json" \
  -d '{"title":"Only title"}'
```

Resposta esperada:

```http
HTTP/1.1 400 Bad Request
```

Cos de la resposta:

```json
{
  "message": "Invalid track data"
}
```

---



```


// Nom fitxer: Teoria/Part 2 - Recursos en memòria/T02.01.Tracks en memòria.md
```ts


# Tracks en memòria

## Objectiu

En aquest punt començarem a treballar amb el primer recurs real de l'API: els **tracks**.

Un `track` representarà una cançó dins de MusicCloud. Més endavant aquests tracks vindran d'una base de dades, però en aquesta primera fase els guardarem **en memòria**, dins d'un array de TypeScript.

---
## Què vol dir treballar “en memòria”?

Treballar en memòria vol dir que les dades existeixen només mentre el servidor està en execució.

Per exemple, podem tenir un array com aquest:

```ts
const tracks = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: 200
  }
];
```

Aquest array viu dins del programa. Si aturem el servidor i el tornem a executar, les dades tornen a l'estat inicial.

Per tant:

```text
les dades no es guarden en una base de dades
les dades es perden quan reiniciem el servidor
és útil per aprendre i fer prototips
no és adequat per a producció
```

---
## El recurs `Track`

Abans de crear endpoints com `GET /tracks` o `POST /tracks`, necessitem definir quina forma tindrà un track.

En aquesta API, un track tindrà aquesta informació mínima:

| Camp       | Tipus    | Significat                   |
| ---------- | -------- | ---------------------------- |
| `id`       | `string` | Identificador únic del track |
| `title`    | `string` | Títol de la cançó            |
| `artist`   | `string` | Nom de l'artista             |
| `duration` | `string` | Durada en segons             |

Exemple:

```json
{
  "id": "trk-0001",
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "duration": 200
}
```

---
## Crear el tipus `Track`

Com que el projecte ja comença a tenir estructura, definirem el tipus en un fitxer separat.

Crea el fitxer:

```text
src/types/track.ts
```

Amb aquest contingut:

```ts
export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
};
```

Aquest tipus indica que qualsevol track haurà de tenir obligatòriament aquestes propietats.

Per exemple, això seria correcte:

```ts
const track: Track = {
  id: "trk-0001",
  title: "Blinding Lights",
  artist: "The Weeknd",
  duration: 200
};
```

Però això donaria error de TypeScript perquè falta `duration`:

```ts
const track: Track = {
  id: "trk-0001",
  title: "Blinding Lights",
  artist: "The Weeknd"
};
```
En aquest cas, ens donaria error ja que la duració especificada ha de ser numèrica i s'ha introduït un "string".

```ts
const track: Track = {
  id: "trk-0001",
  title: "Blinding Lights",
  artist: "The Weeknd",
  duration: "200s"
};
```

---
## Crear dades inicials en memòria

Ara crearem un fitxer per guardar tracks inicials.

Crea el fitxer:

```text
src/data/tracks.ts
```

Amb aquest contingut:

```ts
import { Track } from "../types/track";

export const tracks: Track[] = [
  {
    id: "trk-0001",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: 200
  },
  {
    id: "trk-0002",
    title: "Shape of You",
    artist: "Ed Sheeran",
    duration: 233
  },
  {
    id: "trk-0003",
    title: "Levitating",
    artist: "Dua Lipa",
    duration: 203
  }
];
```

Aquí estem creant un array de tracks.

---
## Estructura del projecte

Després d'aquest punt, l'estructura del projecte és

```text
src/
├── config/
│   ├── api.ts
│   └── environment.ts
├── data/
│   └── tracks.ts
├── types/
│   ├── api.ts
│   └── track.ts
└── index.ts
```

El fitxer `index.ts` encara no necessita utilitzar els tracks. Això ho farem al punt següent, quan creem l'endpoint:

```text
GET /tracks
```

Separem els fitxers `types` i `data` perquè tenen responsabilitats diferents:

- src/types/track.ts -> defineix la informació/estructura d'un track.
- src/data/tracks -> conté dades concretes de tracks.

---
## Limitacions de treballar en memòria

Treballar en memòria és útil en aquesta fase, però té limitacions importants:

| Limitació                           | Explicació                                                  |
| ----------------------------------- | ----------------------------------------------------------- |
| Les dades no persisteixen           | Si el servidor es reinicia, es recuperen les dades inicials |
| No és adequat per a producció       | Una API real necessita una base de dades                    |
| No permet treball concurrent fiable | Diversos usuaris modificant dades podrien generar problemes |
| No escala bé                        | Les dades depenen de la memòria del servidor                |

Primer aprendrem a gestionar recursos amb arrays. Després substituirem aquests arrays per una base de dades.

---
## Pràctica proposada

### Tasca

Afegeix al projecte MusicCloud el recurs `Track` en memòria.

Has de crear:

```text
src/types/track.ts
src/data/tracks.ts
```

El tipus `Track` ha d'incloure:

```text
id
title
artist
duration
```

L'array `tracks` ha de contenir com a mínim tres cançons.

---
### Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
el fitxer src/types/track.ts
el fitxer src/data/tracks.ts
un commit amb els canvis realitzats
```


```


// Nom fitxer: Teoria/Part 2 - Recursos en memòria/T02.06.DELETE Track.md
```ts


# `DELETE /tracks/:id`

## Objectiu

En aquest punt crearem l'últim endpoint bàsic del bloc de recursos en memòria.

Fins ara l'API pot:

```http
GET /tracks
GET /tracks/:id
POST /tracks
PUT /tracks/:id
```

Ara afegirem:

```http
DELETE /tracks/:id
```

Aquest endpoint permetrà eliminar un track concret a partir del seu identificador.

---

# Què ha de fer `DELETE /tracks/:id`?

L'endpoint `DELETE /tracks/:id` ha de:

```text
1. Llegir l'identificador del track des de la URL.
2. Buscar si existeix un track amb aquest identificador.
3. Si no existeix, retornar 404.
4. Si existeix, eliminar-lo de l'array.
5. Retornar una resposta correcta.
```

Per exemple, si tenim aquest track:

```json
{
  "id": "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "duration": 200
}
```

Podem eliminar-lo amb:

```http
DELETE http://localhost:3000/tracks/7823d5c2-f66e-46b0-bd8d-4d5b08852b8b
```

---
# Eliminar un recurs

El mètode `DELETE` s'utilitza per eliminar un recurs existent.

En aquest cas, la ruta:

```http
DELETE /tracks/:id
```

es pot llegir així:

```text
Elimina el track amb aquest id dins de la col·lecció tracks.
```

Per exemple:

```http
DELETE /tracks/7823d5c2-f66e-46b0-bd8d-4d5b08852b8b
```

vol dir:

```text
Elimina el track 7823d5c2-f66e-46b0-bd8d-4d5b08852b8b.
```

---
# Buscar el track abans d'eliminar-lo

Abans d'eliminar el track, hem de comprovar si existeix.

Com que les dades estan guardades en un array, podem utilitzar `findIndex()`:

```ts
const trackIndex = tracks.findIndex((track) => track.id === id);
```

Aquesta instrucció retorna la posició del track dins l'array.

|            Resultat | Significat                                     |
| ------------------: | ---------------------------------------------- |
| `0`, `1`, `2`, etc. | El track existeix i aquesta és la seva posició |
|                `-1` | No s'ha trobat cap track amb aquest id         |

Si el resultat és `-1`, retornarem un error `404`.

---

# Retornar `404 Not Found`

Si el track no existeix, la resposta ha de ser:

```http
404 Not Found
```

Per exemple:

```ts
if (trackIndex === -1) {
  return res.status(404).json({
    message: "Track not found"
  });
}
```

Aquest codi indica que la ruta és correcta, però el recurs demanat no existeix.

---
# Eliminar el track de l'array

Per eliminar un element d'un array a partir de la seva posició podem utilitzar `splice()`:

```ts
tracks.splice(trackIndex, 1);
```

Això vol dir:

```text
A partir de la posició trackIndex, elimina 1 element.
```


---
# Quin codi d'estat ha de retornar `DELETE`?

Quan una eliminació funciona correctament, és habitual retornar:

```http
204 No Content
```

Aquest codi vol dir:

```text
La petició s'ha resolt correctament, però no es retorna cap contingut.
```

Per tant, la resposta no hauria d'incloure JSON.

La instrucció seria:

```ts
return res.status(204).send();
```

No farem això:

```ts
return res.status(204).json({
  message: "Track deleted"
});
```

Perquè `204 No Content` significa precisament que la resposta no té cos.

---
# Crear l'endpoint `DELETE /tracks/:id`

```ts
app.delete(
  "/tracks/:id",
  (req: Request<{ id: string }>, res: Response) => {
    const id: string = req.params.id as string;

    const trackIndex = tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    tracks.splice(trackIndex, 1);

    return res.status(204).send();
  }
);
```

---
# Explicació del codi

## Ruta `DELETE /tracks/:id`

```ts
app.delete("/tracks/:id", ...)
```

Defineix una ruta que respon a peticions `DELETE`.

La ruta conté un paràmetre:

```text
:id
```

Aquest paràmetre representa l'identificador del track que volem eliminar.

---
## Llegir l'identificador

```ts
const id: string = req.params.id;
```

Llegim l'identificador que arriba a la URL.

Per exemple, si la petició és:

```http
DELETE /tracks/7823d5c2-f66e-46b0-bd8d-4d5b08852b8b
```

llavors:

```ts
id === "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b"
```

---

## Buscar la posició del track

```ts
const trackIndex = tracks.findIndex((track) => track.id === id);
```

Busquem la posició del track dins de l'array.

Fem servir `findIndex()` perquè per eliminar un element amb `splice()` necessitem saber-ne la posició.

---

## Comprovar si existeix

```ts
if (trackIndex === -1) {
  return res.status(404).json({
    message: "Track not found"
  });
}
```

Si `findIndex()` retorna `-1`, vol dir que no existeix cap track amb aquest identificador.

En aquest cas, retornem:

```http
404 Not Found
```

---

## Eliminar el track

```ts
tracks.splice(trackIndex, 1);
```

Elimina un element de l'array a partir de la posició indicada.

Com que les dades estan en memòria, aquesta eliminació només es mantindrà mentre el servidor continuï en execució. Si reiniciem el servidor, els tracks tornaran a l'estat inicial definit a `src/data/tracks.ts`.

---

## Retornar `204 No Content`

```ts
return res.status(204).send();
```

Si el track s'ha eliminat correctament, retornem:

```http
204 No Content
```

Aquest codi indica que l'operació ha funcionat, però que no es retorna cap contingut.

En aquest endpoint utilitzem dos possibles codis d'estat:

|  Codi | Quan s'utilitza                                |
| ----: | ---------------------------------------------- |
| `204` | El track s'ha eliminat correctament            |
| `404` | No existeix cap track amb aquest identificador |

---
# Comprovar el funcionament

Executa el servidor:

```bash
npm run dev
```

## Cas correcte

Elimina un track existent:

```bash
curl -i -X DELETE http://localhost:3000/tracks/7823d5c2-f66e-46b0-bd8d-4d5b08852b8b
```

Resposta esperada:

```http
HTTP/1.1 204 No Content
```

En aquest cas no hi haurà cos de resposta.

---

## Cas amb identificador inexistent

```bash
curl -i -X DELETE http://localhost:3000/tracks/trk-9999
```

Resposta esperada:

```http
HTTP/1.1 404 Not Found
```

Cos de la resposta:

```json
{
  "message": "Track not found"
}
```

---
# Alternativa: retornar `200 OK`

També es podria retornar:

```ts
return res.status(200).json({
  message: "Track deleted"
});
```

Aquesta opció és més visible per a l'alumnat perquè mostra un missatge clar.

Però per una API més neta, en aquest projecte és millor utilitzar:

```ts
return res.status(204).send();
```

El motiu és que `DELETE` sovint no necessita retornar dades si l'eliminació ha funcionat correctament.

---


```


// Nom fitxer: Teoria/Part 2 - Recursos en memòria/T02.05.POST Track.md
```ts


# `POST /tracks`

## Objectiu

En aquest punt crearem el primer endpoint per **afegir dades** a l'API.

Fins ara hem treballat amb peticions `GET`, que serveixen per consultar informació:

```http
GET /tracks
GET /tracks/:id
```

Ara afegirem:

```http
POST /tracks
```

Aquest endpoint permetrà crear un nou track i afegir-lo a l'array `tracks` que tenim en memòria.

---
# Què ha de fer `POST /tracks`?

L'endpoint `POST /tracks` ha de rebre les dades d'un nou track i afegir-lo a la col·lecció.

El client enviarà una petició amb un cos en format JSON:

```json
{
  "title": "Bad Habits",
  "artist": "Ed Sheeran",
  "duration": 231
}
```

L'API haurà de crear un nou track amb aquestes dades i generar-ne l'identificador.

La resposta serà l'objecte `Track` creat:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Bad Habits",
  "artist": "Ed Sheeran",
  "duration": 231
}
```

---
# El client no ha d'enviar l'identificador

En aquest projecte, l'identificador del track el generarà el servidor.

Per tant, el client no hauria d'enviar això:

```json
{
  "id": "trk_004",
  "title": "Bad Habits",
  "artist": "Ed Sheeran",
  "duration": 231
}
```

Sinó només les dades necessàries per crear el track:

```json
{
  "title": "Bad Habits",
  "artist": "Ed Sheeran",
  "duration": 231
}
```

El control de les dades, en última instància, es fa des del servidor.

---
# Permetre llegir JSON en Express

Per defecte, Express no interpreta automàticament el cos JSON d'una petició.

Per poder llegir `req.body`, cal afegir aquest middleware:

```ts
app.use(express.json());
```

Aquest codi ha d'anar després de crear `app` i abans de definir les rutes:

```ts
const app: Express = express();

app.use(express.json());
```

Sense aquesta línia, `req.body` pot arribar com a `undefined`. No podrem obtenir les dades del JSON que envia el client en la petició.

---
# Actualitzar els tipus de `Track`

Ara ens interessa diferenciar dues coses:

1. Un track complet.
2. Les dades necessàries per crear un track.

## Track complet

```ts
export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
};
```

## Dades mínimes per crear track

```ts
export type CreateTrackInput = {
  title: string;
  artist: string;
  duration: number;
};
```

`Track` representa un track complet, amb identificador.

`CreateTrackInput` representa les dades que envia el client per crear un track nou.

| Tipus              | Inclou `id`? | Ús                               |
| ------------------ | -----------: | -------------------------------- |
| `Track`            |           Sí | Track complet dins l'API         |
| `CreateTrackInput` |           No | Dades rebudes per crear un track |

---

# Afegir un tipus d'error

Aquest endpoint no sempre retornarà un `Track`.

- Si les dades són correctes, retornarà un `Track`.
- Si les dades són incorrectes, retornarà un missatge d'error.

Per això crearem un tipus senzill per a les respostes d'error.

```ts
export type ErrorResponse = {
  message: string;
};
```

També podem definir un tipus per a la resposta de creació:

```ts
export type TrackResponse = Track | ErrorResponse;
```

Això ens permet indicar que l'endpoint pot retornar dos tipus de resposta diferents:

```text
Track          → si el track es crea correctament
ErrorResponse  → si les dades enviades no són vàlides
```

---

# Validar les dades rebudes

TypeScript ajuda mentre programem, però no pot garantir que el client enviï un JSON correcte.

El client podria enviar això:

```json
{
  "title": "Bad Habits"
}
```

O fins i tot això:

```json
{
  "title": 123,
  "artist": true,
  "duration": "llarga"
}
```

Per això hem de validar les dades en temps d'execució.

Crearem un fitxer nou:

```text
src/validators/track.ts
```

Amb aquest contingut:

```ts
// Importar tipus necessaris

export function isCreateTrackInput(
  data: Partial<CreateTrackInput>
): data is CreateTrackInput {
  return (
    typeof data.title === "string" &&
    typeof data.artist === "string" &&
    typeof data.duration === "number"
  );
}
```

Aquesta funció comprova si les dades tenen la forma correcta.

La part més important és aquesta:

```ts
data is CreateTrackInput
```

Això indica a TypeScript que, si la funció retorna `true`, `data` es pot tractar com un `CreateTrackInput`.

---
# Generar un identificador

Per generar l'identificador del nou track podem utilitzar `randomUUID`, disponible a Node.js.

A `src/index.ts`, afegim:

```ts
import { randomUUID } from "node:crypto";
```

Després podrem fer:

```ts
const newTrack: Track = {
  id: randomUUID(),
  ...trackInput
};
```

Això genera un identificador únic de tipus `string`.

---
# Crear l'endpoint `POST /tracks`

Primer importem els tipus i la funció de validació.

Després afegim l'endpoint:

```ts
app.post(
  "/tracks",
  (
    req: Request<{}, TrackResponse, Partial<CreateTrackInput>>,
    res: Response<TrackResponse>
  ) => {
    const trackInput: Partial<CreateTrackInput> = req.body;

    if (!isCreateTrackInput(trackInput)) {
      return res.status(400).json({
        message: "Invalid track data"
      });
    }

    const newTrack: Track = {
      id: randomUUID(),
      ...trackInput
    };

    tracks.push(newTrack);

    return res.status(201).json(newTrack);
  }
);
```

---
# Explicació del codi

## Ruta `POST /tracks`

```ts
app.post("/tracks", ...)
```

Defineix una ruta que respon a peticions `POST`.

Fem servir `POST` perquè volem crear un nou recurs dins de la col·lecció `tracks`.

---
## Tipar la petició

```ts
Request<{}, TrackResponse, Partial<CreateTrackInput>>
```

La forma general de `Request` és:

```ts
Request<Params, ResBody, ReqBody, ReqQuery>
```

En aquest cas:

| Posició | Valor                       | Què representa                               |
| ------- | --------------------------- | -------------------------------------------- |
| 1r      | `{}`                        | Paràmetres de ruta. Aquesta ruta no té `:id` |
| 2n      | `TrackResponse`       | Tipus de resposta possible                   |
| 3r      | `Partial<CreateTrackInput>` | Cos de la petició                            |
| 4t      | no indicat                  | Query params                                 |

El tercer tipus és el més important en aquest endpoint:

```ts
Partial<CreateTrackInput>
```

Això vol dir que `req.body` pot contenir només una part de les dades esperades.

Aquesta decisió és important perquè el client pot enviar dades incompletes. Per això no podem confiar directament en `req.body`.

---
## Llegir el cos de la petició com un objecte

```ts
const trackInput: Partial<CreateTrackInput> = req.body;
```

Aquí guardem les dades enviades pel client dins d'un objecte.

Això és més escalable que fer:

```ts
const { title, artist, duration } = req.body;
```

Amb tres propietats no sembla greu, però amb objectes més grans el codi seria difícil de mantenir.

---
## Validar les dades

```ts
if (!isCreateTrackInput(trackInput)) {
  return res.status(400).json({
    message: "Invalid track data"
  });
}
```

Aquest control comprova que les dades rebudes siguin correctes.

Si falta algun camp o algun tipus no és correcte, retornem:

```http
400 Bad Request
```

El codi `400` indica que la petició enviada pel client no és vàlida.

Exemple de resposta:

```json
{
  "message": "Invalid track data"
}
```

Aquesta validació encara és bàsica. Més endavant, quan treballem amb Zod, farem una validació més professional.

---
## Crear el nou track

```ts
const newTrack: Track = {
  id: randomUUID(),
  ...trackInput
};
```

Aquí construïm un objecte `Track` complet.

El client envia:

```text
title
artist
duration
```

I el servidor afegeix:

```text
id
```

L'operador `...trackInput` copia dins de `newTrack` les propietats de `trackInput`.

Després de la validació, TypeScript sap que `trackInput` ja té la forma correcta de `CreateTrackInput`.

---
## Afegir el track a l'array

```ts
tracks.push(newTrack);
```

Afegeix el nou track a l'array en memòria.

Recorda que aquestes dades no són persistents. Si reiniciem el servidor, el nou track desapareixerà.

---
## Retornar `201 Created`

```ts
return res.status(201).json(newTrack);
```

Quan es crea un nou recurs correctament, és millor retornar:

```http
201 Created
```

No `200 OK`.

|  Codi | Significat                                                     |
| ----: | -------------------------------------------------------------- |
| `200` | La petició s'ha resolt correctament                            |
| `201` | La petició s'ha resolt correctament i s'ha creat un nou recurs |
| `400` | La petició enviada pel client no és correcta                   |

En aquest endpoint utilitzem:

```text
201 → quan el track es crea correctament
400 → quan les dades rebudes no són vàlides
```

---
# Comprovar el funcionament

Executa el servidor:

```bash
npm run dev
```

Fes una petició `POST` amb `curl`:

```bash
curl -i -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d '{"title":"Bad Habits","artist":"Ed Sheeran","duration":231}'
```

Resposta esperada:

```http
HTTP/1.1 201 Created
```

Cos de la resposta:

```json
{
  "id": "identificador-generat",
  "title": "Bad Habits",
  "artist": "Ed Sheeran",
  "duration": 231
}
```

Després pots comprovar que s'ha afegit a l'array fent:

```bash
curl http://localhost:3000/tracks
```

---
# Cas amb dades incorrectes

Si enviem una petició incompleta:

```bash
curl -i -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d '{"title":"Bad Habits"}'
```

La resposta hauria de ser:

```http
HTTP/1.1 400 Bad Request
```

Amb un cos semblant a:

```json
{
  "message": "Invalid track data"
}
```

També seria incorrecte enviar un tipus no vàlid:

```bash
curl -i -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d '{"title":"Bad Habits","artist":"Ed Sheeran","duration":"231"}'
```

En aquest cas `duration` és un text, no un número, i també hauria de retornar `400`.

---


```


// Nom fitxer: Teoria/Part 2 - Recursos en memòria/T02.02.Nomenclatura endpoints.md
```ts


# Nomenclatura bàsica dels endpoints

Quan definim endpoints en una API REST, hem d'intentar que les rutes siguin clares, coherents i fàcils d'entendre.

Un endpoint combina:

```text
mètode HTTP + ruta
```

Per exemple:

```http
GET /tracks
```

Aquí:

```text
GET     → (mètode http) indica l'acció: obtenir dades
/tracks → (ruta) indica el recurs: tracks
```

La idea important és que **l'acció ja queda expressada pel mètode HTTP**. Per això, normalment no cal posar verbs dins la ruta.

## Evitar verbs a la ruta

No és recomanable fer això:

```http
GET /getTracks
POST /createTrack
DELETE /deleteTrack/trk_001
```

Aquestes rutes barregen accions i recursos.

És millor fer:

```http
GET /tracks
POST /tracks
DELETE /tracks/trk_001
```

Perquè el verb ja està representat pel mètode HTTP:

| Mètode   | Ruta          | Significat                                              |
| -------- | ------------- | ------------------------------------------------------- |
| `GET`    | `/tracks`     | Obtenir tots els tracks                                 |
| `GET`    | `/tracks/:id` | Obtenir un track concret de la col·lecció de tracks     |
| `POST`   | `/tracks`     | Crear un nou track en la col·lecció de tracks           |
| `PUT`    | `/tracks/:id` | Actualitzar un track concret de la col·lecció de tracks |
| `DELETE` | `/tracks/:id` | Eliminar un track concret  de la col·lecció de tracks   |

Aquesta taula és molt útil perquè ja anticipa tota la part 2 sense desenvolupar-la encara.

## Utilitzar noms de recursos

Les rutes haurien de representar **recursos**, no accions.

En MusicCloud, alguns recursos podrien ser:

```text
tracks
artists
playlists
users
```

Per això té sentit tenir endpoints com:

```http
GET /tracks
GET /artists
GET /playlists
```

No:

```http
GET /songsList
GET /showArtists
GET /getPlaylists
```

## Singular o plural?

En APIs REST utilitzem noms en plural per representar col·leccions.

Per això farem servir:

```http
/tracks
/artists
/playlists
```

i no:

```http
/track
/artist
/playlist
```

La raó és que `/tracks` representa la col·lecció completa de tracks.

Quan vulguem un track concret, afegirem l'identificador:

```http
/tracks/trk_001
```

Això es llegiria com:

```text
el track trk_001 dins de la col·lecció tracks
```

## Bones pràctiques bàsiques

Per aquest projecte seguirem aquestes normes:

| Norma                                  | Exemple correcte | Exemple a evitar |
| -------------------------------------- | ---------------- | ---------------- |
| Utilitzar noms descriptius             | `/tracks`        | `/data`          |
| Utilitzar recursos, no accions (verbs) | `GET /tracks`    | `GET /getTracks` |
| Utilitzar plural per col·leccions      | `/playlists`     | `/playlist`      |
| Escriure en minúscules                 | `/tracks`        | `/Tracks`        |
| Separar paraules amb guionet si cal    | `/top-tracks`    | `/topTracks`     |

De moment només necessitarem rutes simples com:

```http
/tracks
/tracks/:id
```

Més endavant, quan l'API creixi, podrem aplicar les mateixes normes a altres recursos.

---


```


// Nom fitxer: Teoria/Part 2 - Recursos en memòria/T02.03.GET Tracks.md
```ts


# `GET /tracks`

## Objectiu

En aquest punt crearem el primer endpoint relacionat amb un recurs real de l'API. Per a donar nom a aquest endpoint, hem de tenir en compte [T02.02.Nomenclatura endpoints](T02.02.Nomenclatura%20endpoints.md)

```http
GET /tracks
```

Aquest endpoint retornarà la llista de tracks que tenim guardada en memòria.

En el punt anterior ja hem creat:

```text
src/types/track.ts
src/data/tracks.ts
```

Ara utilitzarem aquestes dades per enviar una resposta JSON des del servidor al client.

També introduirem un concepte important de les respostes HTTP: el **codi d'estat**.

---

# Què ha de fer `GET /tracks`?

L'endpoint `GET /tracks` ha de respondre amb tots els tracks disponibles.

Per exemple, quan un client faci aquesta petició:

```http
GET http://localhost:3000/tracks
```

l'API retornarà una resposta semblant a aquesta:

```json
[
  {
    "id": "trk_001",
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "duration": 200
  },
  {
    "id": "trk_002",
    "title": "Shape of You",
    "artist": "Ed Sheeran",
    "duration": 233
  },
  {
    "id": "trk_003",
    "title": "Levitating",
    "artist": "Dua Lipa",
    "duration": 203
  }
]
```

Aquest endpoint encara no consulta cap base de dades. Simplement retorna l'array `tracks` que tenim en memòria.

---
# El codi d'estat de la resposta

Una resposta HTTP no només conté dades. També inclou un **codi d'estat**.

El codi d'estat indica si la petició s'ha resolt correctament o si hi ha hagut algun problema.

En aquest endpoint utilitzarem el codi:

```text
200 OK
```

El codi `200` indica que la petició s'ha processat correctament.

Per això escriurem la resposta així:

```ts
res.status(200).json(tracks);
```

Aquesta instrucció es pot llegir així:

```text
Respon amb estat 200 i envia l'array de tracks en format JSON.
```

Express retornaria `200` igualment si féssim només:

```ts
res.json(tracks);
```

Però en aquest projecte escriurem el codi d'estat de manera explícita perquè el funcionament de la resposta sigui més clar.

Més endavant utilitzarem altres codis d'estat, com ara `404` quan no es trobi un track o `201` quan es creï un nou recurs. En aquest punt, però, només necessitem `200`.

---
# Importar les dades dels tracks

Al fitxer principal del servidor, necessitem importar l'array de tracks.

Fitxer:

```text
src/index.ts
```

Afegim la importació:

```ts
import { tracks } from "./data/tracks";
```

Aquesta línia permet utilitzar dins de `index.ts` les dades exportades des de:

```text
src/data/tracks.ts
```

---

# Crear l'endpoint `GET /tracks`

Hem de definir els endpoints abans de que l'aplicació executi la comanda `listen`. En aquest cas, a sota de l'endpoint `GET /`, afegim una nova ruta:

```ts
app.get("/tracks", (_req: Request, res: Response) => {
  res.status(200).json(tracks);
});
```

Defineix una ruta que respon a peticions `GET` fetes a:

```text
/tracks
```

Aquesta ruta representa el conjunt de tracks de l'API.

```ts
res.status(200).json(tracks);
```

Aquesta instrucció envia al client l'array `tracks` en format JSON.

La resposta té dues parts importants:

| Part           | Funció                                         |
| -------------- | ---------------------------------------------- |
| `status(200)`  | Indica que la petició s'ha resolt correctament |
| `json(tracks)` | Envia l'array de tracks en format JSON         |

El codi d'estat `200` vol dir `OK`.

---
# Per què retornem un array?

Com que `/tracks` representa una col·lecció de recursos, la resposta natural és un array.

```json
[
  {
    "id": "trk_001",
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "duration": 200
  }
]
```

Això és diferent de l'endpoint `/`, que retorna informació general de l'API en forma d'objecte.

```json
{
  "name": "MusicCloud API",
  "version": "1.0.0",
  "status": "OK"
}
```

La diferència és important:

| Endpoint      | Què representa              | Tipus de resposta |
| ------------- | --------------------------- | ----------------- |
| `GET /`       | Informació general de l'API | Objecte           |
| `GET /tracks` | Llista de tracks            | Array             |

---
# Comprovar el funcionament

Executa el servidor:

```bash
npm run dev
```

Accedeix a l'URL que representa l'endpoint:

```bash
curl http://localhost:3000/tracks
```

La resposta hauria de ser un array amb els tracks definits a `src/data/tracks.ts`.

Per comprovar també el codi d'estat amb `curl`, pots utilitzar:

```bash
curl -i http://localhost:3000/tracks
```

Aquesta ordre mostra també les capçaleres de la resposta. Hauries de veure una línia semblant a:

```http
HTTP/1.1 200 OK
```

Això confirma que l'endpoint retorna correctament el codi d'estat `200`.

---


```


// Nom fitxer: Teoria/Part 7 - Funcionalitats avançades/T07.03 Paginació eficient i ordenació.md
```ts


# Paginació eficient i ordenació de resultats en l'API

Quan el volum de dades d'una plataforma creix, enviar milers de registres en una sola petició col·lapsa la xarxa i alenteix l'aplicació. Per resoldre-ho, les APIs professionals utilitzen dues tècniques combinades: l'**ordenació** (per decidir quins elements van primer) i la **paginació** (per trossejar els resultats en pàgines).

---
# Fonaments Teòrics

## 1. El gran repte de l'ordenació dinàmica en SQL Server

A diferència dels valors que posem a la clàusula `WHERE` (com el gènere o la durada), **SQL Server no permet passar el nom d'una columna com a paràmetre escalari dins d'un `ORDER BY**`.

Si intentessis fer això al teu codi:

```ts
request.input("columna", mssql.NVarChar, "title");
// Dins de la consulta: ORDER BY @columna ASC
```

El motor de la base de dades llançarà un error de sintaxi o, simplement, ignorarà l'ordenació.

La manera més elegant, directa i segura de resoldre-ho en l'arquitectura de la nostra API és fer la **validació i selecció de la columna directament a TypeScript** abans de construir la sentència SQL, utilitzant una estructura condicional o un diccionari de correspondències (*mapping*).

## 2. Paginació eficient: `OFFSET` i `FETCH`

Per demanar una pàgina concreta de dades, el client ens ha d'enviar dos paràmetres nous a la URL:

* **`page`**: El número de pàgina que vol veure (1, 2, 3...).
* **`limit`**: Quantes cançons es mostren per pàgina (ex: 10 cançons).

A l'hora de fer la consulta, no podem utilitzar `TOP`, ja que `TOP` només serveix per a la primera pàgina. Per poder "saltar" cançons i agafar les següents de forma eficient, SQL Server utilitza les clàusules **`OFFSET`** (quants registres saltem) i **`FETCH NEXT`** (quants registres agafem).

La fórmula matemàtica per calcular quantes cançons hem de saltar és:

$$\text{rowsToSkip} = (\text{page} - 1) \times \text{limit}$$

*Si demanem la pàgina 1 amb un límit de 10:* $(1 - 1) \times 10 = 0$ (Saltem 0 cançons, agafem les 10 primeres).

*Si demanem la pàgina 2 amb un límit de 10:* $(2 - 1) \times 10 = 10$ (Saltem les 10 primeres cançons, agafem les 10 següents).

> ⚠️ **Regla d'or de SQL Server:** Per poder utilitzar `OFFSET` i `FETCH`, la consulta **ha de tenir obligatòriament una clàusula `ORDER BY**`. Per aquest motiu, l'ordenació i la paginació van sempre agafades de la mà.

---
# L'Arquitectura del Codi

Afegirem els nous paràmetres opcionals de paginació i ordenació a la nostra interfície d'entrada (`SearchTracksInput`). Com que viatgen per la URL, el nostre middleware `validate` els recollirà de `req.query`, i Zod s'encarregarà de transformar els textos de la paginació en números reals.

## Estructura codi

El primer que hem de tenir en compte, és que tenim 4 nous paràmetres (2 per l'ordenació i 2 per la paginació) en el nostre `end point`. 

```ts
  sortBy?: string;    // Ex: "title" o "duration"
  sortOrder?: string; // Ex: "ASC" o "DESC"
  page?: number;      // Ex: 1
  limit?: number;     // Ex: 10
```

En el controlador obtenim aquests paràmetres llegint-los a través de l'objecte Request (`req.query`). 
### Gestió de l'ordenació i la paginació

El controlador envia la informació que ha extret de la URL al servei mitjançant un o varis paràmetres. En el nostre cas, hem definit un tipus que conté tots els paràmetres que s'han enviat amb la URL. 

> El servei assigna el nom d'`input` a l'objecte que reb del controlador.

#### Ordenació

```ts
  let orderByColumn = "Tracks.title"; // Valor per defecte
  if (input.sortBy === "duration") {
    orderByColumn = "Tracks.durationSeconds";
  }

  const orderDirection = input.sortOrder === "DESC" ? "DESC" : "ASC";
  queryText += ` ORDER BY ${orderByColumn} ${orderDirection}`;
```
#### Paginació (offset / fetch)

```ts
  const page = input.page || 1;
  const limit = input.limit || 10;
  const rowsToSkip = (page - 1) * limit;

  // Injectem els valors de la paginació com a paràmetres numèrics segurs
  request.input("offset", sql.Int, rowsToSkip);
  request.input("limit", sql.Int, limit);
  
  queryText += ` OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`;


}

```


```


// Nom fitxer: Teoria/Part 7 - Funcionalitats avançades/T07.02 Validació de Query Parameters.md
```ts


# Validació de Query Parameters: Cerca i Filtres a l'API

A mesura que la nostra base de dades creix, endpoints com "llistar totes les cançons" es tornen ineficients i poc útils per a l'usuari. Una API REST professional ha de permetre que els clients demanin un subconjunt de dades filtrat, per exemple, cançons d'un gènere concret o que continguin una paraula clau al títol. Per enviar aquests criteris de cerca sense modificar la ruta base, utilitzem els **Query Parameters**.

# Fonaments Teòrics

## Què són els `Query Parameters`?

Els *Query Parameters* (o paràmetres de consulta) són parelles de clau-valor que s'afegeixen al final d'una URL després d'un signe d'interrogació (`?`). Si hi ha més d'un paràmetre, se separen amb el símbol ampersand (`&`).

A diferència dels paràmetres de ruta (com `/tracks/:id`), els query parameters són **opcionals** i no defineixen el recurs, sinó que en modifiquen la manera com es mostra (filtrat, ordenació, paginació).

Exemple de URL amb filtres:
`http://localhost:3000/tracks?search=love&duration=60`

Entenem la clau `duration` com a durada màxima.
## El repte de la validació en GET

Fins ara hem utilitzat el `middleware` `validate(...)` per comprovar el cos de les peticions (`req.body`) en mètodes `POST` o `PUT`. Tanmateix, en les peticions `GET` **no existeix el cos de la petició**. Totes les dades viatgen a la URL i Express les recull automàticament a l'objecte **`req.query`**.

Això ens obliga a fer dues coses:

1. Adaptar el nostre `middleware` de validació genèric perquè sàpiga llegir de `req.query`.
2. Recordar que **tots els Query Parameters arriben inicialment com a cadenes de text (strings)**. Si necessitem un número (com per a la paginació), `zod` s'haurà d'encarregar de transformar-lo.

---
# L'Arquitectura de la Cerca i el Filtre

Seguint els nostres estàndards d'escalabilitat, definirem una interfície d'entrada específica per als filtres (`SearchTracksInput`).

El controlador rebrà `req.query`, el passarà pel filtre de validació i lliurarà aquest objecte mapejat al servei. El servei, de manera intel·ligent, construirà una consulta SQL **dinàmica** que s'adaptarà segons si l'usuari ha enviat un filtre, tots o cap.

---
# Com es programa la lògica de Filtres?

Per aquest apartat utilitzarem l'endpoint determinat per la URL d'exemple: `http://localhost:3000/tracks?search=love&duration=60` on `search` i `duration` són claus opcionals de la nostra` query string`.

## 1. El `middleware` de Validació Dinàmic

Si analitzem el fitxer de validació del nostre projecte, veurem que està dissenyat per ser completament flexible gràcies al paràmetre **`source`**:

```ts
type RequestSource = "body" | "params" | "query";

export function validate(schema: ZodType, source: RequestSource) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    
    // 1. Anem a buscar les dades dinàmicament segons el 'source' triat (body, params o query)
    const validationResult = schema.safeParse(req[source]);

    // 2. Si Zod detecta que les dades no compleixen l'esquema, tallem la petició amb un HTTP 400
    if (!validationResult.success) {
      const response: ErrorResponse = {
        message: "Invalid request data",
        code: ErrorCode.ValidationError,
        errors: formatZodErrors(validationResult.error)
      };
      return res.status(400).json(response);
    }

    // 3. SI TOT ÉS CORRECTE: Sobreescriure l'objecte original amb les dades netes i parsejades per Zod
    if (source === "body") {
      req.body = validationResult.data;
    }

    if (source === "params") {
      req.params = validationResult.data as Request["params"];
    }

    if (source === "query") {
	    req.query = validationResult.data as Request["query"];
    }

    // 4. Permetem el pas cap al controlador
    next();
  };
}
```

Segons el text que li passem a `source`, el `middleware` inspeccionarà una part de la petició HTTP o una altra, i si passa el filtre de seguretat de Zod, actualitzarà exactament aquella mateixa propietat amb les dades netes abans de cridar a `next()`.

El codi anterior té un problema! La sentència `req.query = validationResult.data as Request["query"];` no funciona perquè no hi ha definit un mètode setter per a l'objecte `req.query`. 

Per a guardar totes les propietats a req.query, primer hem de borrr el seu contingut i després assignar les noves propietats. 

Substitueix el codi 
```ts
if (source === "query") {
	req.query = validationResult.data as Request["query"];
}
```
  per
```ts
if (source === "query") {
  for (const key in req.query) {
	delete req.query[key];
  }

  Object.assign(req.query, validationResult.data);
}
```

## 2. Com es tradueix això en la construcció de les rutes?

Gràcies a aquesta arquitectura, com a programadors podem triar on ha de mirar el `middleware` `validate` simplement canviant el segon paràmetre de la ruta en funció de la necessitat del nostre endpoint:

* **Cas A: Quan volem rebre dades d'un formulari (Crear una Carpeta)**
Com que les dades viatgen ocultes al cos, passem `"body"`. El `middleware` executarà l'esquema contra `req.body`.
```ts
router.post("/", validate(createPlaylistSchema, "body"), createFolderController);

```
* **Cas B: Quan volem rebre filtres de cerca opcinals a la URL (Cercar Cançons)**
Com que no hi ha cos i els filtres van a la URL (`?search=love&duration=320`), passem `"query"`. El `middleware` farà la màgia d'executar l'esquema contra `req.query`.

```ts
router.get("/", validate(searchTracksSchema, "query"), getTracksController);
```
## 3. Definició de Tipus d'Entrada

Utilitzarem una `interface` estructurada per recollir i tipar de forma segura les dades que provenen del `querystring`:

```ts
export interface SearchTracksInput {
  search?: string;
  duration?: number;
}
```
## 4. La Consulta SQL Dinàmica i el Servei

A la base de dades, per fer cerques parcials (que continguin un text) utilitzem l'operador `LIKE` combinat amb el comodí `%`. El servei rep l'objecte d'entrada tipat i s'encarrega de construir la consulta de manera ramificada i lligar els paràmetres només si existeixen:

```ts
import { getConnectionPool, sql } from "../config/database";

export async function searchTracksConcept(input: SearchTracksInput) {
  const pool:ConnectionPool = await getConnectionPool();
  const request:sql.Request = pool.request();
  
  let queryText:string = `SELECT id, title, durationSeconds as duration FROM Tracks WHERE 1=1`;

  if (query.search) {
    request.input("search", sql.NVarChar(200), `%${query.search}%`);
    queryText += ` AND title LIKE @search`; // Cerca parcial
  }

  if (query.duration) {
    request.input("duration", sql.NVarChar(100), query.duration);
    queryText += ` AND durationSeconds <= @duration`;     // Filtre exacte
  }

  const result = await request.query(queryText);
  return result.recordset; // Retorna la llista filtrada
}
```

# Pràctica

Validació de Filtres i Cerca de Cançons al MusicCloud

# Objectiu

Has d'implementar la funcionalitat de cerca i filtrat a l'endpoint de llistar cançons (`GET /tracks`) de la teva aplicació **MusicCloud**. L'endpoint ha de permetre filtrar de manera opcional pel títol de la cançó (`search`) i per la duració (`duration`). Les dades de la URL s'han de validar estrictament amb `zod` fent servir el mètode configurat per a la `query` abans d'arribar al controlador.

# Validació de dades `query string`

Per a validar les dades, utilitza el següent esquema

```ts
import { z } from "zod";

export const searchTracksSchema = z.object({
  search: z.string().trim().optional(),
  // z.coerce.number() agafarà el string "180", el transformarà al número 180 
  // i finalment comprovarà si és un número vàlid.
  duration: z.coerce.number().optional()
});
```

```


// Nom fitxer: Teoria/Part 7 - Funcionalitats avançades/T07.01 Relacions molts a molts.md
```ts


# Relacions Many-to-Many 

## Afegir i treure cançons de les llistes de reproducció

Fins ara hem treballat amb relacions d'un a molts (1 a N), com ara que una llista de reproducció pertany a un sol usuari. No obstant això, en una plataforma d'streaming de música com MusicCloud, la relació entre les **llistes de reproduccions** i les **cançons (tracks)** és diferent: una llista de reproducció pot contenir moltes cançons, i al mateix temps, una mateixa cançó pot estar guardada en moltes llistes de reproducció diferents. 

---
# Fonaments Teòrics

## Com es dissenya una relació Many-to-Many a la Base de Dades?

Els motors de bases de dades relacionals no permeten connectar dues taules directament en una relació de molts a molts. Per resoldre-ho, és imprescindible crear una tercera taula entremig, anomenada **Taula Intermèdia o de Unió (Junction Table)**.

En el nostre sistema, aquesta taula s'anomenarà `PlaylistTracks` i la seva única funció serà enllaçar l'ID d'una llista de reproducció amb l'ID d'una cançó.

D'aquesta manera:

* **Afegir una cançó a una llista de reproducció** equival a fer un `INSERT` a la taula intermèdia.
* **Treure una cançó d'una llista de reproducció** equival a fer un `DELETE` a la taula intermèdia.

## Seguretat: Qui pot modificar una llista de reproducció?

A l'especificació d'empresa vam determinar que **les llistes de reproducció són privades**. Per tant, abans de permetre que s'afegeixi o es tregui una cançó, el servidor ha de fer una comprovació crucial: **L'usuari que fa la petició ha de ser el propietari de la llista de reproducció**.

No podem permetre que un usuari manipuli el contingut de les llistes de reproducció d'altres persones. L'ID de l'usuari el recuperarem, com sempre, del token JWT (`req.user.id`).

---
# L'Arquitectura de la Petició

Seguint els nostres estàndards d'escalabilitat, per a aquestes operacions definirem objectes d'entrada específics (`ManagePlaylistTrackInput`).

A nivell de rutes, dissenyarem dos endpoints molt clars:

* `POST /playlists/tracks` -> Per afegir la cançó.
* `DELETE /playlists/tracks` -> Per treure la cançó.

El controlador actuarà com a filtre: validarà la sessió de l'usuari, rebrà l'input del body i delegarà tota la validació de propietat i la persistència al servei.

---
# Com es programa la lògica Many-to-Many?

## Les Consultes SQL

Per afegir una cançó de manera segura (evitant duplicats si la base de dades no té una clau primària composta): [T04.03. Model relacional de MusicCloud](../Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server%201/T04.03.%20Model%20relacional%20de%20MusicCloud.md)

```sql
INSERT INTO PlaylistTracks (PlaylistId, trackId, position) 
VALUES (@PlaylistId, @trackId, @position);
```

Per treure-la:

```sql
DELETE FROM PlaylistTracks 
WHERE PlaylistId = @PlaylistId AND trackId = @trackId;
```
---
## El Servei Conceptual

El servei:
- Rebrà l'objecte d'entrada mapejat
- comprovarà que l'usuari en sigui el propietari
- modificarà la taula intermèdia
- retornarà la llista amb totes les seves cançons

```ts
import { getConnectionPool, sql } from "../config/database";
import { ForbiddenError } from "../types/error/custom/forbiddenError";
import { NotFoundError } from "../types/error/custom/notFoundError";

export interface ManagePlaylistTrackInput {
  PlaylistId: string;
  trackId: string;
}

async function verifyPlaylistOwnership(PlaylistId: string, userId: string): Promise<void> {
  // Si no existeix la llista de reproducció => NOTFOUND
  // Si la llista de reproducció no pertany a l'usuari => FORBIDDEN
}

// 1. AFEGIR CANÇÓ
export async function addTrackToPlaylistConcept(input: ManagePlaylistTrackInput, userId: string): Promise<PlaylistTrackDto> {

  await verifyPlaylistOwnership(input.PlaylistId, userId); // Si hi ha un error => passa control d'execució al controller
  // Inserir a base de dades
  // Retornar dades mapejades (veure següent punt)
}

// 2. TREURE CANÇÓ
export async function removeTrackFromPlaylistConcept(input: ManagePlaylistTrackInput, userId: string): Promise<PlaylistTrackDto> {
  
}
```

# Retornar llista de distribució amb cançons

Per a retornar la llista amb totes les seves cançons, hem d'executar una consulta semblant a:

```sql
SELECT  P.id as PlaylistId, P.Name as PlaylistName,   
		T.id as Trackid, T.title as TrackTitle, PT.position as position  
	FROM PlayLists as P inner join PlaylistTracks as PT on PT.playlistId = P.id 
			inner join Tracks as T on T.id = PT.trackId 
	ORDER BY position
```
---
Aquesta consulta ens retorna unes dades planes, tal i com es mostra a mode d'exemple en la següent taula.

| playlistId                               | playlistName       | trackId                              | trackTitle              | position |
| ---------------------------------------- | ------------------ | ------------------------------------ | ----------------------- | -------- |
| **EB00DFFC-236D-4731-B175-EDCA615877BD** | **Música d'estiu** | 50AD955C-DA0E-4BB5-A509-1B0EBC91F750 | One More Time           | 1        |
| **EB00DFFC-236D-4731-B175-EDCA615877BD** | **Música d'estiu** | 30D1A058-992A-4FD1-9AAD-56F5AC0422D1 | Smells Like Teen Spirit | 2        |
Fixa't en el problema: Les dades de la carpeta (playlistId, playlistName) es repeteixen a cada fila.

El client de la nostra API (per exemple, una aplicació mòbil) no vol rebre una llista de files repetides. Espera un format jeràrquic net (un DTO), on la carpeta sigui un únic objecte i les cançons estiguin agrupades a dins en un array

```JSON
{
  "id": "EB00DFFC-236D-4731-B175-EDCA615877BD",
  "name": "Música d'estiu",
  "tracks": [
    { 
	    "id": "50AD955C-DA0E-4BB5-A509-1B0EBC91F750", 
	    "title": "One More Time", 
	    "position": 1 
	},
    { 
	    "id": "30D1A058-992A-4FD1-9AAD-56F5AC0422D1", 
	    "title": "Smells Like Teen Spirit", 
	    "position": 2 
	}
  ]
}
```

## Mapeig de dades

### Definir DTOs (Data Transfer Objects)
Hem de definir una interface o tipus per a emmagatzemar les dades en el format desitjat. 

```ts
export interface PlaylistTrackDto {
  playlistId: string;
  playlistName: string;
  playlistTracks: TrackInPlaylistDto[];
}

export interface TrackInPlaylistDto {
  id: string;
  title: string;
  position: number;
}
```

### Crear un mapper
El mapper té la responsabilitat de convertir les dades que rebem de la base de dades a una altra estructura, `PlaylistTrackDto` en el nostre cas.

Fitxer: `src/mappers/playlistTrackMapper.ts`

```ts
export function mapSqlRowsToPlaylistTrackDto(rows: any[]): PlaylistTrackDto {
  if (!rows || rows.length === 0) {
    throw new Error("No data available to map");
  }

  const firstRow = rows[0];

  // Construïm l'objecte arrel del DTO amb les dades de la carpeta
  const playlistTrackDto: PlaylistTrackDto = {
    playlistId: firstRow.playlistName,
    playlistName: firstRow.playlistName,
    // Mapegem l'array de files per extreure i transformar NOMÉS les cançons
    playlistTracks: rows.map((row): TrackInPlaylistDto => ({
      id: row.trackId,
      title: row.trackTitle,
      position: row.position
    }))
  };

  return playlistTrackDto;
}
```

# Pràctica

Implementació de la Gestió de Cançons en llistes de reproducció al MusicCloud

# Objectiu

Has d'implementar els mecanismes per **afegir** i **eliminar** cançons de les llistes de reproducció a **MusicCloud**. Els endpoints han d'estar completament protegits: un usuari només podrà modificar les llistes de reproducció que hagi creat ell mateix. Si ho intenta amb una llista de reproducció d'un altre usuari, el sistema llançarà un error `ForbiddenError` (HTTP 403).

La cançó que s'afegeix sempre s'ubicarà al final de la llista.

---

# Tipat i Validació de Dades (Zod)

Crea la interfície unificada d'entrada i el seu esquema de validació. Com que tant per afegir com per treure necessitem les mateixes dades (saber quina cançó va a quina llista de reproducció), farem servir el mateix esquema per a ambdues accions.

## Crea el fitxer `src/types/playlist/managePlaylistTrack.ts`

```ts
export interface ManagePlaylistTrackInput {
  PlaylistId: string;
  trackId: string;
}

```

## Validació de dades d'entrada

Crea el fitxer `src/middlewares/validators/playlists/manageTrackSchema.ts`. Fent servir `zod`, assegura't que tant `PlaylistId` como `trackId` siguin texts obligatoris (i si utilitzes GUIDs/UUIDs a la base de dades, pots validar-ho amb `.uuid()`).

---

# Desenvolupament del Controlador

Modifica o afegeix al teu `src/controllers/playlistController.ts` les dues funcions per gestionar el flux. Fixa't com mapegem el `req.body` cap al nostre tipus fort i escalable:

```ts
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../types/error/custom/unauthorizedError";
import { ManagePlaylistTrackInput } from "../types/playlist/managePlaylistTrack";
import { addTrackToPlaylist, removeTrackFromPlaylist } from "../services/playlistService";

// CONTROLADOR PER AFEGIR
export async function addTrackToPlaylistController(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user || !req.user.id) throw new UnauthorizedError("Session not found");
    
    const userId = req.user.id as string;
    const input: ManagePlaylistTrackInput = req.body;

    await addTrackToPlaylist(input, userId);
    
    return res.status(200).json({ message: "Track added to Playlist successfully" });
  } catch (error) {
    next(error);
  }
}

// CONTROLADOR PER TREURE
export async function removeTrackFromPlaylistController(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user || !req.user.id) throw new UnauthorizedError("Session not found");
    
    const userId = req.user.id as string;
    const input: ManagePlaylistTrackInput = req.body;

    await removeTrackFromPlaylist(input, userId);
    
    return res.status(200).json({ message: "Track removed from Playlist successfully" });
  } catch (error) {
    next(error);
  }
}

```

---

# Registrar les Rutes Protegides

Afegeix els nous endpoints al teu fitxer de rutes general de llistes de reproducció (`src/routes/playlists.ts`). Recorda aplicar sempre el "peatge" de l'autenticació i la validació del body:

```ts
import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { manageTrackSchema } from "../middlewares/validators/playlists/manageTrackSchema";
import { addTrackToPlaylistController, removeTrackFromPlaylistController } from "../controllers/playlistController";

const router = Router();

// Ruta per afegir cançó a la llista de reproducció
router.post(
  "/tracks", 
  authenticateJWT, 
  validate(manageTrackSchema), 
  addTrackToPlaylistController
);

// Ruta per treure cançó de la llista de reproducció
router.delete(
  "/tracks", 
  authenticateJWT, 
  validate(manageTrackSchema), 
  removeTrackFromPlaylistController
);

export default router;

```

---

# Com provar-ho amb `curl`

### 1. Afegir la cançó

Substitueix els IDs d'exemple i el teu token de l'usuari amo de la llista de reproducció:

```bash
curl -X POST http://localhost:3000/playlists/tracks \
  -H "Authorization: Bearer EL_TEU_JWT_AQUÍ" \
  -H "Content-Type: application/json" \
  -d '{"PlaylistId": "11111111-2222-3333-4444-555555555555", "trackId": "99999999-8888-7777-6666-555555555555"}'

```

### 2. Eliminar la cançó

Fes servir exactament el mateix JSON d'entrada però canviant el mètode HTTP a `DELETE`:

```bash
curl -X DELETE http://localhost:3000/playlists/tracks \
  -H "Authorization: Bearer EL_TEU_JWT_AQUÍ" \
  -H "Content-Type: application/json" \
  -d '{"PlaylistId": "11111111-2222-3333-4444-555555555555", "trackId": "99999999-8888-7777-6666-555555555555"}'

```

```


// Nom fitxer: Teoria/Part 4 - Persistència amb Microsoft SQL Server 1/T04.06. DTO i transformació de dades.md
```ts


# DTO i transformació de dades

## Objectiu

En aquest punt introduirem el concepte de **DTO** (Data Transfer Object) per separar la forma interna de les dades de la forma que retorna l'API.

Fins ara hem substituït els arrays per consultes SQL.

Ara els tracks ja no surten d'una estructura en memòria, sinó de la taula `Tracks` de SQL Server.

La taula `Tracks` té una estructura semblant a aquesta:

```text
id
title
artistId
albumId
durationSeconds
createdAt
```

Aquesta estructura és correcta per a la base de dades, perquè manté les relacions amb altres taules mitjançant identificadors.

Però potser no és la millor resposta per retornar al client de l'API.

En aquest punt aprendrem a transformar les dades internes en una resposta més clara.

---
# Problema actual

Després de substituir els arrays per SQL, un track pot tenir aquesta forma:

```json
{
  "id": "0F8F9D3A-40C4-4A6E-88D2-6D91F10B8C13",
  "title": "Bohemian Rhapsody",
  "artistId": "A33C1E18-4A20-45A9-9F0A-20F118D47191",
  "albumId": "DF842020-2E51-48F0-A70A-B03A1CEB84D2",
  "durationSeconds": 354
}
```

Aquesta resposta és tècnicament correcta.

Però per a un client de l'API no és gaire còmoda.

Si una aplicació web o mòbil vol mostrar una llista de cançons, normalment li interessa veure:

```text
títol de la cançó
nom de l'artista
nom de l'àlbum
durada
```

No li resulta gaire útil rebre només `artistId` i `albumId`, perquè llavors hauria de fer més peticions per saber quin artista o quin àlbum corresponen a aquells identificadors.

Una resposta més útil seria:

```json
{
  "id": "0F8F9D3A-40C4-4A6E-88D2-6D91F10B8C13",
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "durationSeconds": 354
}
```

Això és més clar per al consumidor de l'API.

---
# Model intern i resposta pública

Una idea important en el desenvolupament d'APIs és que les dades internes no sempre han de tenir la mateixa forma que les dades públiques.

Podem distingir entre:

```text
model intern
resposta pública de l'API
```

El **model intern** representa com guardem o manipulem les dades dins de l'aplicació.

La **resposta pública** representa què enviem al client.

En el nostre cas, internament un track pot tenir:

```ts
export interface Track {
  id: string;
  title: string;
  artistId: string;
  albumId?: string | null;
  durationSeconds: number;
}
```

Aquesta estructura s'assembla molt a la taula `Tracks`.

Però la resposta pública pot ser diferent:

```ts
export interface TrackDto {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  durationSeconds: number;
}
```

Aquesta estructura està pensada per retornar dades més útils al client.

---
# Què és un DTO?

Un DTO és un objecte que defineix la forma de les dades que es transfereixen entre parts del sistema.

En una API, normalment fem servir DTOs per definir:

```text
què rep l'API
què retorna l'API
```

Per exemple, per crear un track podem tenir:

```ts
export interface CreateTrackInput {
  title: string;
  artistId: string;
  albumId?: string | null;
  durationSeconds: number;
}
```

Aquest objecte representa les dades que el client envia quan fa un `POST /tracks`.

En canvi, per retornar un track al client podem tenir:

```ts
export interface TrackDto {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  durationSeconds: number;
}
```

Aquest objecte representa les dades que l'API retorna quan el client fa un `GET /tracks`.

La diferència és important:

```text
CreateTrackInput → dades d'entrada
TrackDto         → dades de sortida
```

---
# Per què no retornem directament la taula?

Podríem retornar directament les columnes de la taula `Tracks`.

Per exemple:

```json
{
  "id": "...",
  "title": "Billie Jean",
  "artistId": "...",
  "albumId": "...",
  "durationSeconds": 294
}
```

Això és simple, però té inconvenients:

```text
exposa massa l'estructura interna de la base de dades
obliga el client a interpretar identificadors
fa que la resposta sigui menys útil
fa més difícil canviar la base de dades sense afectar l'API
```

Una API no hauria d'estar obligada a retornar exactament la mateixa estructura que té la base de dades.

La base de dades està pensada per guardar dades de manera coherent.

L'API està pensada per oferir dades útils als clients.

Són responsabilitats diferents.

---
# Exemple amb MusicCloud

A la base de dades tenim tres taules relacionades:

```text
Artists
Albums
Tracks
```

La taula `Tracks` no guarda el nom de l'artista.

Guarda:

```text
artistId
```

La taula `Albums` no es guarda com a text dins de `Tracks`.

Guarda:

```text
albumId
```

Això és correcte en un model relacional.

Però quan retornem un track al client, podem voler mostrar:

```text
artist
album
```

Per aconseguir-ho, necessitem consultar diverses taules.

Aquí és on apareix `JOIN`.

---
---
# Tipus actuals del projecte

Fins ara podem tenir una estructura semblant a aquesta:

```ts
import { ErrorResponse } from "./error";

export interface CreateTrackInput {
  title: string;
  artistId: string;
  albumId?: string | null;
  durationSeconds: number;
}

export interface Track extends CreateTrackInput {
  id: string;
}

export type TrackResponse = Track | ErrorResponse;
```

Aquesta estructura és correcta per al punt anterior.

Però ara volem introduir una resposta de sortida més clara.

Afegirem un nou tipus:

```ts
export interface TrackDto {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  durationSeconds: number;
}
```

I podrem ajustar la resposta:

```ts
export type TrackResponse = TrackDto | ErrorResponse;
```

Això vol dir que l'API pot retornar:

```text
un TrackDto si tot va bé
un ErrorResponse si hi ha un error
```

---
# Entrada i sortida no són el mateix

Aquest és un punt important.

Per crear un track, el client ha d'enviar identificadors:

```json
{
  "title": "Don't Stop Me Now",
  "artistId": "A33C1E18-4A20-45A9-9F0A-20F118D47191",
  "albumId": "DF842020-2E51-48F0-A70A-B03A1CEB84D2",
  "durationSeconds": 209
}
```

Això té sentit perquè la base de dades necessita saber quin artista i quin àlbum ha de relacionar.

Però quan l'API respon, pot retornar una resposta més expressiva:

```json
{
  "id": "C35F289A-1C4A-4B36-9F8A-551A244D45CC",
  "title": "Don't Stop Me Now",
  "artist": "Queen",
  "album": "Jazz",
  "durationSeconds": 209
}
```

Això vol dir:

```text
entrada → identificadors
sortida → dades preparades per al client
```

Aquesta separació és habitual en APIs.

---
# Transformació de dades

La transformació de dades consisteix a convertir una estructura en una altra.

En aquest punt no farem una funció de transformació complexa.

La transformació principal la farà la mateixa consulta SQL amb `JOIN` i amb àlies.

Per exemple:

```sql
SELECT
  Tracks.id,
  Tracks.title,
  Artists.name AS artist,
  Albums.title AS album,
  Tracks.durationSeconds
FROM Tracks
INNER JOIN Artists ON Tracks.artistId = Artists.id
LEFT JOIN Albums ON Tracks.albumId = Albums.id;
```

Aquests àlies fan que el resultat SQL ja tingui els noms de propietats que volem retornar.

Així, TypeScript rebrà un objecte amb aquesta forma:

```ts
{
  id: "...",
  title: "...",
  artist: "...",
  album: "...",
  durationSeconds: 354
}
```

que encaixa amb `TrackDto`.

---
# Què canvia en el servei?

En el punt anterior el servei podia retornar `Track`.

Ara farem que les funcions de lectura retornin `TrackDto`.

Per exemple:

```ts
export async function getAllTracks(): Promise<TrackDto[]> {
  // ...
}
```

I:

```ts
export async function findTrackById(id: string): Promise<TrackDto | null> {
  // ...
}
```
---


```


// Nom fitxer: Teoria/Part 4 - Persistència amb Microsoft SQL Server 1/T04.05. Substituir arrays per sentències SQL.md
```ts


# Substituir arrays per sentències SQL

## Objectiu

En aquest punt substituirem les dades en memòria per consultes SQL contra **Microsoft SQL Server**.
# Què canvia en l'arquitectura?


Fins ara teníem l'estructura

```text
routes
  ↓
controllers
  ↓
services
  ↓
arrays en memòria
```

Ara passarem a:

```text
routes
  ↓
controllers
  ↓
services
  ↓
SQL Server
```

Les rutes no haurien de saber si les dades venen d'un array o d'una base de dades.

Els controllers tampoc haurien de contenir SQL.

La responsabilitat de parlar amb la base de dades ha d'estar dins dels serveis o, més endavant, dins d'una capa específica de repositoris.

En aquest tutorial ho farem directament des dels serveis per no afegir una capa nova encara.

---
# Funcions síncrones i asíncrones
## Abans: servei amb arrays (Síncrones)

Un servei basat en arrays podia tenir una funció com aquesta:

```ts
export function getAllTracks(): Track[] {
  return tracks;
}
```

I una altra com aquesta:

```ts
export function getTrackById(id: string): Track | undefined {
  return tracks.find((track) => track.id === id);
}
```

Aquestes funcions són síncrones. 

Retornen el resultat immediatament perquè només treballen amb dades que ja són dins la memòria de Node.js.

---
## Ara: servei amb SQL Server (Asíncrones)

Quan treballem amb SQL Server, la funció ja no pot retornar les dades immediatament.

Ha de fer una operació externa:

```text
Node.js envia una consulta a SQL Server
SQL Server processa la consulta
SQL Server retorna el resultat
Node.js transforma el resultat en JSON
```

Això és una operació asíncrona.

Per això les funcions del servei passaran a ser `async`.

Per exemple:

```ts
export async function getAllTracks(): Promise<Track[]> {
  const pool = await getConnectionPool();

  const result = await pool.request().query(`
    SELECT ...
  `);

  return result.recordset;
}
```

La diferència és important:

```text
abans: Track[]
ara: Promise<Track[]>
```

---
# Operacions asíncrones i no bloquejants

Quan consultem SQL Server, l'aplicació ha d'esperar una resposta de la base de dades.

Aquesta resposta no és immediata, perquè depèn d'un servei extern:

```text
API Node.js
   ↓
consulta SQL
   ↓
SQL Server
   ↓
resposta
````

Si Node.js quedés completament bloquejat mentre espera la resposta, l'API no podria atendre altres peticions durant aquest temps.

Això seria un problema greu.

Per exemple:

```text
usuari A demana GET /tracks
Node.js envia una consulta a SQL Server
SQL Server triga uns mil·lisegons a respondre
mentrestant, usuari B demana GET /
```

En un model bloquejant, l'usuari B hauria d'esperar encara que la seva petició no depengués de la consulta de l'usuari A.

Node.js evita aquest problema treballant amb operacions **asíncrones i no bloquejants**.

Això vol dir que, mentre una consulta SQL està pendent, Node.js pot continuar gestionant altres operacions.

---
# `Promise`, `async` i `await`

Per treballar amb operacions asíncrones utilitzem:

```text
Promise
async
await
```

Una `Promise` representa una operació que encara no ha acabat.

Per exemple, una consulta SQL no retorna el resultat immediatament. Primer s'ha d'enviar al servidor, SQL Server l'ha d'executar i després ha de retornar les dades.

La funció queda pendent fins que la `Promise` es resol.

La paraula `async` indica que una funció és asíncrona.

La paraula `await` permet esperar el resultat d'una operació asíncrona sense bloquejar tot el servidor Node.js.

Per exemple:

```ts
const pool = await getConnectionPool();

const result = await pool.request().query(`
  SELECT id, title
  FROM Tracks;
`);
```

Això vol dir:

```text
espera que el pool estigui disponible
envia la consulta SQL
espera la resposta d'aquesta consulta
continua amb el resultat quan SQL Server respongui
```

Però mentre aquesta consulta està pendent, Node.js pot continuar gestionant altres tasques.

---
# Diferència entre esperar i bloquejar

És important distingir dues idees:

```text
esperar una resposta
bloquejar tot el procés
```

Amb `await`, la funció actual espera el resultat de la consulta.

Però això no vol dir que tot Node.js quedi aturat.

La funció queda pausada fins que la `Promise` es resol, però el motor de Node.js pot continuar atenent altres operacions.

Per això diem que les operacions de base de dades són:

```text
asíncrones
no bloquejants
```

Aquesta és una de les raons per les quals Node.js funciona bé en aplicacions web amb moltes peticions d'entrada i sortida.

---
## Exemple conceptual

Imaginem aquest controller:

```ts
export async function getTracksController(req: Request, res: Response) {
  const tracks = await getAllTracks();

  return res.status(200).json(tracks);
}
```

Quan s'executa aquesta línia:

```ts
const tracks = await getAllTracks();
```

aquest controller queda esperant les dades.

Però el servidor no queda completament aturat.

Si arriba una altra petició, Express pot començar a processar-la mentre la consulta anterior continua pendent.

Això és diferent d'un codi bloquejant, on tot el procés hauria d'esperar abans de fer qualsevol altra cosa.

---
# Què passa amb els controllers?

- Si els serveis passen a ser asíncrons, retornaran una `Promise`.

- Per obtenir el resultat real dins del controller, haurem d'utilitzar `await`.

- Com que `await` només es pot utilitzar dins d'una funció `async`, els controllers que cridin serveis asíncrons també hauran de definir-se com a funcions asíncrones.

Abans podíem tenir:

```ts
const tracks = getAllTracks();
```

Ara haurem de fer:

```ts
const tracks = await getAllTracks();
```

Això vol dir que els handlers d'Express també hauran de ser `async`.

Per exemple:

```ts
export async function getTracksController(
  _req: Request,
  res: Response
): Promise<Response> {
  const tracks = await getAllTracks();

  return res.status(200).json(tracks);
}
```

---
# Consultes SQL amb paràmetres

Quan un endpoint rep dades de fora, no hem de construir SQL concatenant strings.

Això és incorrecte:

```ts
const query = `
  SELECT *
  FROM Tracks
  WHERE id = '${id}'
`;
```

Aquest codi és perillós 

- el valor `id` ve de la petició HTTP.
- un usuari podria enviar un valor inesperat i alterar la consulta.

La forma correcta és utilitzar paràmetres:

```ts
const result = await pool
  .request()
  .input("id", sql.UniqueIdentifier, id)
  .query(`
    SELECT ...
    FROM Tracks
    WHERE Tracks.id = @id;
  `);
```

La part important és:

```ts
.input("id", sql.UniqueIdentifier, id)
```

Això indica a la llibreria `mssql`:

```text
aquest valor és un paràmetre
el seu nom és id
el seu tipus és UniqueIdentifier
el seu valor ve de la variable id
```

I dins de la consulta SQL fem servir:

```sql
@id
```

Aquesta alternativa és més segura.

---
# Relació entre endpoints i consultes SQL

Els endpoints que ja tenim es poden relacionar amb consultes SQL.

| Endpoint             | Consulta SQL principal                  |
| -------------------- | --------------------------------------- |
| `GET /tracks`        | `SELECT ... FROM Tracks`                |
| `GET /tracks/:id`    | `SELECT ... FROM Tracks WHERE id = @id` |
| `POST /tracks`       | `INSERT INTO Tracks ...`                |
| `PUT /tracks/:id`    | `UPDATE Tracks SET ... WHERE id = @id`  |
| `DELETE /tracks/:id` | `DELETE FROM Tracks WHERE id = @id`     |

La idea és que la interfície HTTP es manté igual, però la font de dades canvia.

---
# Retornar la mateixa estructura de `Track`

En aquest punt volem canviar la font de dades, però no volem canviar encara la forma dels objectes que retorna l'API.

Fins ara el projecte treballava amb un tipus semblant a aquest:

```ts
export interface CreateTrackInput {
  title: string;
  artistId: string;
  albumId?: string | null;
  durationSeconds: number;
}

export interface Track extends CreateTrackInput {
  id: string;
}
```

Per tant, les consultes SQL retornaran aquesta mateixa estructura:

id
title
artistId
albumId
durationSeconds

La diferència és que ara aquestes dades vindran de SQL Server i no d'un array en memòria.

Més endavant podrem millorar la resposta de l'API perquè retorni també dades relacionades, com el nom de l'artista o el títol de l'àlbum. 

---
# Crear tracks

Per crear un track, el client podria enviar:

```json
{
  "title": "Don't Stop Me Now",
  "artistId": "....",
  "albumId": "....",
  "durationSeconds": 209
}
```

La consulta SQL serà un `INSERT`.

En SQL Server, si volem obtenir el registre creat, podem fer servir:

```sql
OUTPUT INSERTED.id
```

Per exemple:

```sql
INSERT INTO Tracks (title, artistId, albumId, durationSeconds)
OUTPUT INSERTED.id
VALUES (@title, @artistId, @albumId, @durationSeconds);
```

Això permet recuperar l'identificador generat automàticament amb `NEWID()`.

---
# Actualitzar tracks

Per modificar un track utilitzarem `UPDATE`.

Per exemple:

```sql
UPDATE Tracks
SET
  title = @title,
  artistId = @artistId,
  albumId = @albumId,
  durationSeconds = @durationSeconds
WHERE id = @id;
```

---
# Eliminar tracks

Per eliminar un track utilitzarem `DELETE`.

```sql
DELETE FROM Tracks
WHERE id = @id;
```

En aquesta primera versió farem un esborrat real de la fila.

Més endavant, en aplicacions professionals, també existeix el concepte de **soft delete**, que consisteix a no eliminar realment la fila, sinó marcar-la com a eliminada.


---
# Què passa si un track no existeix?

Quan consultem per `id`, pot ser que no hi hagi cap resultat.

Per exemple:

```text
GET /tracks/id-inexistent
```

En aquest cas, el servei pot retornar `null`.

El controller convertirà això en una resposta HTTP:

```text
404 Not Found
```

Aquest patró és millor que retornar un objecte buit.

---
# Què passa si una operació falla?

Les consultes SQL poden fallar per diferents motius:

```text
la base de dades no està disponible
l'id no té format correcte
una clau forana no existeix
hi ha dades obligatòries que falten
hi ha un error SQL
```

En aquest punt encara no crearem un sistema professional d'errors.

De moment farem servir `try/catch` als controllers per retornar un error `500`.

Més endavant millorarem això amb un **error handler global**.

---

# Què hem aconseguit?

En aquest punt farem que els endpoints de tracks deixin de dependre d'un array en memòria i passin a treballar amb SQL Server.

Això ens permetrà tenir:

```text
dades persistents
consultes SQL reals
serveis asíncrons
consultes amb paràmetres
respostes obtingudes amb JOIN
millor separació entre API i base de dades
```

Aquest és el pas que converteix el projecte en una API real amb persistència.

---


```


// Nom fitxer: Teoria/Part 4 - Persistència amb Microsoft SQL Server 1/T04.02. Connexió a Microsoft SQL Server i execució de SQL.md
```ts


# Connexió a Microsoft SQL Server i execució de SQL

## Objectiu

En aquest punt aprendrem a connectar-nos al servidor **Microsoft SQL Server** que vam preparar amb Docker i executarem les primeres instruccions SQL.

En el punt anterior només vam deixar preparada la infraestructura:

```text
contenidor Docker
SQL Server en execució
port 1433 exposat
volum per conservar les dades
```

Ara farem el següent pas:

```text
entrar al servidor SQL Server
crear una base de dades
crear una taula
inserir dades
consultar dades
modificar dades
eliminar dades
```

Encara no connectarem Node.js amb SQL Server.

En aquest punt treballarem directament amb SQL per entendre què passa dins de la base de dades abans de fer-ho des del codi TypeScript.

---
# Què és una connexió a SQL Server?

SQL Server és un servidor de base de dades.

Això vol dir que no treballem directament amb un fitxer, sinó amb un servei que està escoltant connexions.

En el nostre cas, SQL Server s'executa dins d'un contenidor Docker:

```text
Docker
└── musiccloud-sqlserver
    └── SQL Server
```

Per poder treballar amb aquest servidor necessitem connectar-nos-hi amb algun client.

Un client pot ser:

```text
sqlcmd
Azure Data Studio
DBeaver
SQL Server Management Studio
extensió SQL Server per Visual Studio Code
```

En aquesta pràctica utilitzarem **sqlcmd**, perquè és una eina de terminal i encaixa bé amb Docker.

Microsoft documenta `sqlcmd` com una utilitat per introduir instruccions Transact-SQL, procediments i fitxers de script contra SQL Server i altres serveis SQL. ([Microsoft Learn][1])

---
# Què és `sqlcmd`?

`sqlcmd` és una eina de línia d'ordres que permet connectar-se a SQL Server i executar instruccions SQL.

Amb `sqlcmd` podem escriure consultes com:

```sql
SELECT name
FROM sys.databases;
```

o crear una base de dades:

```sql
CREATE DATABASE MusicCloud;
```

Quan estem dins de `sqlcmd`, normalment veurem un prompt semblant a aquest:

```text
1>
```

Això indica que `sqlcmd` està esperant instruccions.

---
# Què és Transact-SQL?

SQL Server utilitza una variant de SQL anomenada **Transact-SQL**, sovint abreujada com **T-SQL**.

T-SQL inclou les instruccions SQL habituals:

```text
SELECT
INSERT
UPDATE
DELETE
CREATE TABLE
CREATE DATABASE
DROP TABLE
```

Però també inclou funcionalitats pròpies de SQL Server.

En aquest tutorial començarem amb SQL molt bàsic.

No ens interessa encara aprendre totes les particularitats de SQL Server. Ens interessa entendre les operacions mínimes que després necessitarem des de l'API.

---
# El port 1433

SQL Server escolta habitualment pel port:

```text
1433
```

Per això, en el nostre `docker-compose.yaml` tenim una configuració semblant a aquesta:

```yaml
ports:
  - "1433:1433"
```

Això vol dir:

```text
port 1433 del nostre equip
connectat al port 1433 del contenidor
```

Gràcies a això, des del nostre ordinador podem connectar-nos a SQL Server utilitzant:

```text
localhost,1433
```

El format amb coma és propi de SQL Server:

```text
servidor,port
```

Per exemple:

```text
localhost,1433
```

---
# L'usuari `sa`

Quan vam crear el contenidor vam definir una contrasenya per a l'usuari administrador.

Aquest usuari es diu:

```text
sa
```

Vol dir **system administrator**.

És un usuari amb molts permisos dins de SQL Server.

Per a un entorn de pràctiques és acceptable utilitzar-lo, però en un projecte real no és una bona pràctica treballar sempre amb `sa`.

Més endavant seria millor crear un usuari específic per a l'aplicació.

Per exemple:

```text
musiccloud_user
```

amb permisos només sobre la base de dades del projecte.

En aquest punt utilitzarem `sa` perquè encara estem aprenent a treballar amb el servidor.

---
# Connexió amb sqlcmd

Per connectar-nos al nostre SGBD utilitzarem la següent comanda

```bash
docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -p 1433 \
  -U sa \
  -P "Patata123!" \
  -No
```
-S : servidor que ens volem connectar
-p: port on establim la connexió
-U: usuari que fa la connexió
-P: password usuari connexió (pràctica no segura!!)
-No : l'encriptació per a connectar-nos a la base de dades no precisa d'encriptació.

---
# Crear una base de dades

Una base de dades és un contenidor lògic on guardarem les taules del projecte. 

En el nostre cas crearem una base de dades anomenada:

```text
MusicCloud
```

Aquesta base de dades serà l'espai on més endavant guardarem:

```text
tracks
artists
albums
users
playlists
```

Per crear-la primer establim la connexió amb la comanda

```bash
docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -p 1433 \
  -U sa \
  -P "Patata123!" \
  -No
```

i després executem
```sql
CREATE DATABASE MusicCloud;
GO
```

Després podrem veure les bases de dades existents amb:

```sql
SELECT name FROM sys.databases;
GO
```

Podem eliminar la base de dades amb

```sql
DROP DATABASE MusicCloud;
GO
```
Utilitzem la comanda `GO` per tal d'enviar el bloc de comandes al sistema gestor de base de dades. Les comandes `SQL` que introduïm executen després de la instrucció `GO`

# Seleccionar una base de dades

Un cop creada la base de dades, hem d'indicar que volem treballar-hi.

Per això fem servir:

```sql
USE MusicCloud;
GO
```

Aquesta instrucció canvia el context actual.

A partir d'aquell moment, les taules que creem es crearan dins de `MusicCloud`.

---
# Crear una taula

Una taula és una estructura formada per columnes i files.

Per començar, crearem una taula simple anomenada:

```text
Tracks
```

Aquesta taula representarà cançons.

Podria tenir aquestes columnes:

```text
id
title
artist
durationSeconds
```

En SQL Server la podríem crear així:

```sql
CREATE TABLE Tracks (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
  title NVARCHAR(200) NOT NULL,
  artist NVARCHAR(100) NOT NULL,
  durationSeconds INT NOT NULL,
  CONSTRAINT PK_Tracks PRIMARY KEY (id)
);
GO
```

Aquesta taula defineix quatre columnes.

---
# La columna `id`

```sql
id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
```

Aquesta columna es crearà de forma automàtica amb identificadors de l'estil

```text
ED6DAF43-0FB1-4A03-A4BB-A3EB09DD7EBC
```

La columna id és l'identificador principal de la taula `Tracks`

```sql
CONSTRAINT PK_Tracks PRIMARY KEY (id)
```
# La columna `title`

```sql
title NVARCHAR(200) NOT NULL
```
Aquesta columna guardarà el títol de la cançó.

La part:

```sql
NVARCHAR(200)
```

indica que serà text Unicode amb una llargada màxima de 200 caràcters. És important donar una dimensió correcte a la longitud de les columnes.

Fem servir `NVARCHAR` perquè permet guardar correctament accents i caràcters especials.

La part:

```sql
NOT NULL
```

indica que aquest camp és obligatori.

---
# La columna `artist`

```sql
artist NVARCHAR(100) NOT NULL
```

Aquesta columna guardarà el nom de l'artista.

En aquest primer model encara no crearem una taula separada d'artistes.

Més endavant podrem millorar el model relacional separant:

```text
Tracks
Artists
Albums
```
---
# La columna `durationSeconds`

```sql
durationSeconds INT NOT NULL
```

Aquesta columna guardarà la durada de la cançó en segons.

Per exemple:

```text
354 segons
294 segons
320 segons
```

És millor guardar la durada com a número enter que com a text.

Això ens permetrà fer consultes com:

```text
cançons de més de 5 minuts
cançons ordenades per durada
durada mitjana de les cançons
```

---
# Inserir dades

Per afegir dades a una taula utilitzem `INSERT`.

Exemple:

```sql
INSERT INTO Tracks (title, artist, durationSeconds)
VALUES ('Bohemian Rhapsody', 'Queen', 354);
GO
```

SQL Server el generarà la columna `id` automàticament. No l'hem d'indicar en la nostra comanda insert.

```sql
id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
```

Podem inserir diverses cançons:

```sql
INSERT INTO Tracks (title, artist, durationSeconds)
VALUES 
  ('Bohemian Rhapsody', 'Queen', 354),
  ('Billie Jean', 'Michael Jackson', 294),
  ('One More Time', 'Daft Punk', 320);
GO
```

Sempre que treballeu amb dades, feu-ho amb dades reals o almenys creïbles.

L’ús de dades creïbles ajuda a detectar errors que amb dades massa artificials poden passar desapercebuts.

Per exemple, no és recomanable inserir dades com aquestes:

```sql
INSERT INTO Tracks (title, artist, durationSeconds)
VALUES
  ('Cançó 1', 'Artista 1', 100),
  ('Cançó 2', 'Artista 2', 200),
  ('Prova', 'Test', 300);
GO
```

Aquestes dades no representen cap cas real. A més, fan que sigui més difícil comprovar si l’API retorna informació coherent.

És millor utilitzar dades semblants a les que podria tenir una aplicació real:

```sql
INSERT INTO Tracks (title, artist, durationSeconds)
VALUES
  ('Bohemian Rhapsody', 'Queen', 354),
  ('Billie Jean', 'Michael Jackson', 294),
  ('One More Time', 'Daft Punk', 320),
  ('Smells Like Teen Spirit', 'Nirvana', 301),
  ('Get Lucky', 'Daft Punk', 369);
GO
```

Aquestes dades són més útils perquè permeten comprovar millor:

```text
si els títols es mostren correctament
si els artistes es repeteixen en diferents cançons
si les durades tenen valors realistes
si les cerques i filtres funcionen millor
si les respostes de l'API són més fàcils d'interpretar
```

Per exemple, tenir dues cançons de Daft Punk pot ser útil més endavant quan vulguem fer filtres per artista:

També és important evitar dades massa perfectes.

En una aplicació real podem trobar:

títols amb espais
noms amb accents
artistes amb més d'una paraula
durades diferents
valors repetits en algunes columnes

Per això, treballar amb dades creïbles fa que les proves siguin més útils i ajuda a detectar problemes abans.

---
# Consultar dades

Per consultar dades fem servir `SELECT`.

Per veure una cançó específica:

```sql
SELECT * FROM Tracks WHERE id = "ED6DAF43-0FB1-4A03-A4BB-A3EB09DD7EBC";
GO
```
Una bona pràctica és seleccionar la informació que necessitem de la query enlloc de retornar totes les dades (*)

```sql
SELECT id, title, artist, durationSeconds
FROM Tracks
WHERE id = "ED6DAF43-0FB1-4A03-A4BB-A3EB09DD7EBC";
GO
```

---
# Modificar dades

Per modificar dades fem servir `UPDATE`.

Exemple:

```sql
UPDATE Tracks
SET durationSeconds = 355
WHERE id = "ED6DAF43-0FB1-4A03-A4BB-A3EB09DD7EBC";
GO
```
---
# Eliminar dades

Per eliminar dades fem servir `DELETE`.

Exemple:

```sql
DELETE FROM Tracks
WHERE id = "ED6DAF43-0FB1-4A03-A4BB-A3EB09DD7EBC";
GO
```

---
# Relació amb l'API MusicCloud

Fins ara, el servei de tracks podia treballar amb un array:

```ts
const tracks = [
  {
    id: "ED6DAF43-0FB1-4A03-A4BB-A3EB09DD7EBC",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    durationSeconds: 354
  }
];
```

Quan volíem consultar tots els tracks, fèiem servir TypeScript:

```ts
return tracks;
```

Amb SQL Server, més endavant això es convertirà en una consulta SQL:

```sql
SELECT id, title, artist, durationSeconds
FROM Tracks;
```

Però l'endpoint podrà continuar sent el mateix:

```text
GET /tracks
```

Aquest és el canvi important:

```text
abans: dades en memòria
després: dades en SQL Server
```

Però no volem canviar la forma com el client consumeix l'API.

---


```


// Nom fitxer: Teoria/Part 4 - Persistència amb Microsoft SQL Server 1/T04.01.Microsoft SQL Server amb Docker.md
```ts


# Microsoft SQL Server amb Docker

## Objectiu

En aquest punt prepararem una base de dades **Microsoft SQL Server** utilitzant **Docker**.

Fins ara, el projecte MusicCloud ha treballat amb dades guardades directament en memòria (arrays).

Però les dades en memòria tenen una limitació molt important:

```text
quan reiniciem el servidor, les dades es perden
```

Per això, a partir d'ara començarem a preparar el projecte perquè pugui treballar amb una base de dades real.

En aquest punt encara no connectarem Node.js amb SQL Server. Primer deixarem preparat el servidor de base de dades dins d'un contenidor Docker.

---
---
# Què és Microsoft SQL Server?

**Microsoft SQL Server** és un sistema gestor de bases de dades relacionals.

Això vol dir que permet guardar informació en forma de taules relacionades entre elles.

Per exemple, en el projecte MusicCloud podríem tenir taules com:

```text
Tracks
Artists
Albums
Users
Playlists
PlaylistTracks
```

Cada taula tindrà columnes.

Per exemple, una taula `Tracks` podria tenir:

```text
id
title
artist
durationSeconds
createdAt
```

I cada fila representaria una cançó concreta.

Exemple conceptual:

```text
Tracks
------------------------------------------------
id | title              | artist          | duration
------------------------------------------------
1  | Bohemian Rhapsody  | Queen           | 354
2  | Billie Jean        | Michael Jackson | 294
3  | One More Time      | Daft Punk       | 320
```

SQL Server permet consultar, inserir, modificar i eliminar aquestes dades utilitzant SQL.

---
# Què és SQL?

**SQL** significa **Structured Query Language**.

És el llenguatge que utilitzem per treballar amb bases de dades relacionals.

Amb SQL podem fer operacions com:

```text
crear taules
consultar dades
inserir registres
modificar registres
eliminar registres
relacionar taules
filtrar resultats
ordenar dades
```

Per exemple, per consultar totes les cançons podríem fer:

```sql
SELECT *
FROM Tracks;
```

Per consultar només una cançó concreta:

```sql
SELECT *
FROM Tracks
WHERE id = 1;
```

Per inserir una nova cançó:

```sql
INSERT INTO Tracks (title, artist, durationSeconds)
VALUES ('One More Time', 'Daft Punk', 320);
```
---

# Per què utilitzarem Docker?

Podríem instal·lar SQL Server directament a l'ordinador, però això té alguns inconvenients:

```text
la instal·lació pot ser diferent segons el sistema operatiu
pot deixar serveis instal·lats permanentment
pot generar conflictes amb altres versions
pot ser més difícil de desinstal·lar
pot complicar la configuració de l'alumnat
```

Docker ens permet evitar aquests problemes.

Amb Docker podem executar SQL Server dins d'un contenidor.

Un contenidor és un entorn aïllat que conté tot el que necessita una aplicació per funcionar.

En aquest cas, el contenidor tindrà:

```text
Microsoft SQL Server
la seva configuració
el port de connexió
el sistema de fitxers intern
les dades de la base de dades
```

Això ens permet tenir una base de dades funcional sense instal·lar SQL Server directament al sistema.

---
# Què és un contenidor?

Un contenidor és com una petita màquina aïllada, però més lleugera que una màquina virtual.

No és exactament una màquina virtual completa, perquè comparteix el nucli del sistema operatiu amb l'equip amfitrió.

Però, des del punt de vista del desenvolupador, ens permet tenir un servei separat i controlat.

En el nostre cas:

```text
el nostre ordinador executa Docker
Docker executa un contenidor
el contenidor executa SQL Server
la nostra API Node.js es podrà connectar a SQL Server
```

Visualment:

```text
Ordinador
│
├── Projecte Node.js + Express + TypeScript
│
└── Docker
    └── Contenidor SQL Server
```

Més endavant, Node.js es connectarà al contenidor de SQL Server.

---
# Per què no instal·lem SQL Server directament?

```text
tots els alumnes tenen el mateix entorn
la configuració es guarda en un fitxer
el servidor es pot arrencar i aturar fàcilment
es pot eliminar sense embrutar el sistema
és més fàcil de documentar
entorn professional modern
```

El fitxer clau serà:

```text
docker-compose.yml
```

Aquest fitxer descriu quin servei volem crear i amb quina configuració.

Això és molt millor que donar instruccions manuals diferents per a Windows, Linux i macOS.

---
# Què és Docker Compose?

**Docker Compose** és una eina que permet definir contenidors amb un fitxer YAML.

En lloc d'escriure un comandament llarg com aquest:

```bash
docker run ...
```

podem escriure la configuració en un fitxer:

```text
docker-compose.yml
```

I després arrencar-ho tot amb:

```bash
docker compose up -d
```

Això és especialment útil quan un projecte té diversos serveis.

Per exemple, més endavant podríem tenir:

```text
API Node.js
SQL Server
altres serveis auxiliars
```

En aquest punt només tindrem SQL Server, però ja comencem amb una estructura adequada.

---
# El servei de SQL Server

El nostre `docker-compose.yml` definirà un servei anomenat:

```text
sqlserver
```

Aquest servei representarà la base de dades del projecte MusicCloud.

Un servei de Docker Compose és una definició d'un contenidor.

Per exemple:

```yaml
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
```

Això indica que volem crear un servei anomenat `sqlserver` utilitzant una imatge de Microsoft SQL Server.

---
# Què és una imatge Docker?

Una imatge Docker és una plantilla a partir de la qual es crea un contenidor.

En aquest cas utilitzarem una imatge de SQL Server.

```text
imatge Docker     → plantilla
contenidor        → instància en execució d'aquesta plantilla
```

La imatge conté tot el necessari per executar SQL Server.

El contenidor és el procés real que s'executa.

---
# Imatge de Microsoft SQL Server

Utilitzarem l'última imatge disponible (2022-latest). En un projecte professional, és millor utilitzar una versió concreta per evitar problemes en versions futures.

```yaml
image: mcr.microsoft.com/mssql/server:2022-latest
```

---
# Variables d'entorn

SQL Server necessita algunes variables d'entorn per arrencar correctament.

Les més importants són:

```text
ACCEPT_EULA
SA_PASSWORD
MSSQL_PID
```

Exemple:

```yaml
environment:
  ACCEPT_EULA: "Y"
  MSSQL_SA_PASSWORD: "YourStrongPassword123!"
  MSSQL_PID: "Developer"
```

Aquestes variables configuren el contenidor en el moment d'arrencar.

---
## ACCEPT_EULA

La variable:

```yaml
ACCEPT_EULA: "Y"
```

indica que acceptem la llicència d'ús de Microsoft SQL Server.

Sense aquesta variable, el contenidor no arrencarà correctament.

És una condició necessària per utilitzar la imatge oficial de SQL Server.

---
## SA_PASSWORD

La variable:

```yaml
SA_PASSWORD: "YourStrongPassword123!"
```

defineix la contrasenya de l'usuari administrador de SQL Server.

L'usuari administrador s'anomena:

```text
sa
```

Aquest usuari té permisos elevats dins del servidor de base de dades.

La contrasenya ha de ser forta.

Normalment ha d'incloure:

```text
majúscules
minúscules
números
símbols
una longitud mínima suficient
```

Un error habitual és posar una contrasenya massa senzilla.

Per exemple, això pot fallar:

```text
password
1234
admin
Sql123
```

Una contrasenya més adequada per a desenvolupament podria ser:

```text
YourStrongPassword123!
```

En un projecte real, aquesta contrasenya no s'hauria d'escriure directament al fitxer `docker-compose.yml`.

Més endavant es podria moure a un fitxer `.env`.

---
# MSSQL_PID

La variable:

```yaml
MSSQL_PID: "Developer"
```

indica l'edició de SQL Server que volem utilitzar.

L'edició **Developer** està pensada per desenvolupament i proves.

És adequada per a aquest tutorial perquè no estem muntant una base de dades de producció, sinó un entorn local d'aprenentatge.

---
# El port 1433

SQL Server utilitza habitualment el port:

```text
1433
```

Per això, al fitxer Docker Compose veurem:

```yaml
ports:
  - "1433:1433"
```

Aquesta línia vol dir:

```text
port 1433 de l'ordinador → port 1433 del contenidor
```

Això permet que eines externes o la nostra API Node.js es puguin connectar a SQL Server.

Sense aquesta configuració, el servidor podria estar funcionant dins del contenidor, però no seria accessible des de fora.

---
# Volums de dades

Els contenidors Docker són fàcils de crear i eliminar.

Això és molt pràctic, però també té un risc:

```text
si eliminem el contenidor, podem perdre les dades
```

Per evitar-ho, utilitzem un volum.

Exemple:

```yaml
volumes:
  - /data/mssql:/var/opt/mssql
```

I```

Aquest volum permet guardar les dades de SQL Server fora del cicle de vida del contenidor.

Això vol dir que podem aturar o recrear el contenidor sense perdre la base de dades.

---
# Fitxer `docker-compose.yml`

El fitxer complet podria ser aquest:

```yaml
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: musiccloud-sqlserver
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Patata123!"
      MSSQL_PID: "Developer"
    ports:
      - "1433:1433"
    volumes:
      - /data/mssql:/var/opt/mssql
    restart: unless-stopped

volumes:
  sqlserver_data
```

Aquest fitxer defineix:

```text
un servei anomenat sqlserver
una imatge de SQL Server
un nom de contenidor
variables d'entorn
el port 1433
un volum persistent
una política de reinici
```

---
# Arrencar el servidor de base de dades

Per arrencar SQL Server, executarem:

```bash
docker compose up -d
```

La part:

```text
up
```

indica que volem crear i arrencar els serveis definits al fitxer.

La part:

```text
-d
```

vol dir que s'executarà en segon pla.

Després podem comprovar que el contenidor està funcionant amb:

```bash
docker ps
```

Si tot va bé, veurem un contenidor anomenat:

```text
musiccloud-sqlserver
```

---
# Consultar els logs

SQL Server pot trigar una mica a arrencar.

Per això, encara que el contenidor aparegui amb `docker ps`, pot ser que la base de dades encara no estigui preparada per acceptar connexions.

Podem consultar els logs amb:

```bash
docker logs musiccloud-sqlserver
```

Hem d'esperar un missatge semblant a:

```text
SQL Server is now ready for client connections
```

Aquest missatge indica que el servidor ja està preparat.

---
# Aturar el servidor

Per aturar el servidor podem fer:

```bash
docker compose down
```

Aquest comandament atura i elimina el contenidor, però conserva el volum.

Això vol dir que les dades no es perden.

Per tornar-lo a arrencar:

```bash
docker compose up -d
```

---
# Què hem aconseguit?

En aquest punt hem preparat un servidor Microsoft SQL Server dins d'un contenidor Docker.

Ara tenim:

```text
un docker-compose.yml
un servei sqlserver
un contenidor musiccloud-sqlserver
el port 1433 exposat
un volum per conservar les dades
una base preparada per als següents punts
```

Encara no hem connectat Node.js amb SQL Server.

Encara no hem creat el model relacional de MusicCloud.

Encara no hem substituït els arrays per consultes SQL.

Però hem fet el primer pas necessari: tenir un servidor de base de dades real disponible per al projecte.

A partir d'aquí podrem avançar cap a una API amb dades persistents.


```


// Nom fitxer: Teoria/Part 4 - Persistència amb Microsoft SQL Server 1/T04.04. Connexió amb servidor de base de dades.md
```ts


# Connexió de Node.js amb Microsoft SQL Server

# Objectiu

En aquest punt connectarem l'aplicació **Node.js + TypeScript** amb **Microsoft SQL Server**.

Fins ara ja tenim:

```text
un servidor SQL Server funcionant amb Docker
una base de dades MusicCloud
un model relacional amb taules
dades de prova inserides
consultes SQL executades manualment amb sqlcmd
```

Ara farem el següent pas: que el nostre projecte Node.js pugui connectar-se a SQL Server i executar consultes.

En aquest punt encara no substituirem tota la lògica dels serveis. Primer deixarem preparada una connexió estable i comprovarem que podem fer una consulta des de TypeScript.

---
# De `sqlcmd` a Node.js

Fins ara hem executat consultes SQL manualment amb `sqlcmd`.

Per exemple:

```sql
SELECT id, title, durationSeconds
FROM Tracks;
```

Això ens ha servit per comprovar que la base de dades funciona.

Però una API real no executa consultes manualment des de terminal.

El flux real serà aquest:

```text
Client HTTP
   ↓
Endpoint Express
   ↓
Controller
   ↓
Service
   ↓
SQL Server
```

Per exemple, quan un client faci:

```text
GET /tracks
```

l'API haurà d'executar una consulta contra SQL Server i retornar els resultats en format JSON.

En aquest punt només comprovarem la connexió. Més endavant substituirem els arrays en memòria per consultes SQL dins dels serveis.

---
# Què necessitem per connectar Node.js amb SQL Server?

Node.js no sap connectar-se a SQL Server per defecte.

Necessitem instal·lar una llibreria que faci de client de base de dades.

En aquest tutorial utilitzarem:

```text
mssql
```

La llibreria `mssql` és un client de Microsoft SQL Server per Node.js. Internament utilitza habitualment `tedious`, que és una implementació en JavaScript del protocol TDS, el protocol que utilitza SQL Server per comunicar-se amb clients. Microsoft documenta `tedious` com a driver de Node.js per connectar amb SQL Server en Windows, Linux o macOS. ([Microsoft Learn][1])

També podríem utilitzar `tedious` directament, però `mssql` ens dona una API més còmoda per treballar amb consultes, paràmetres i pools de connexions. La documentació del projecte `node-mssql` indica que `tedious` és el driver per defecte i que és mantingut activament. ([GitHub][2])

---
# Què és un driver de base de dades?

Un **driver** és una peça de programari que permet que una aplicació es comuniqui amb una base de dades.

En aquest cas:

```text
Node.js no parla directament amb SQL Server
Node.js utilitza mssql
mssql utilitza un driver com tedious
tedious parla amb SQL Server mitjançant el protocol TDS
```

De manera simplificada:

```text
API Node.js
   ↓
mssql
   ↓
tedious
   ↓
SQL Server
```

Nosaltres treballarem principalment amb `mssql`.

---
# Què és un `pool` de connexions?

Quan una aplicació necessita parlar amb una base de dades, ha d'obrir una connexió.

Obrir una connexió té un cost.

No seria eficient fer això per a cada petició:

```text
arriba una petició HTTP
obrim connexió amb SQL Server
executem consulta
tanquem connexió
arriba una altra petició HTTP
tornem a obrir connexió
executem consulta
tanquem connexió
```

És millor mantenir un **conjunt de connexions reutilitzables**.

Això s'anomena:

```text
pool de connexions
```

Un pool permet que l'aplicació reutilitzi connexions obertes i treballi de manera més eficient.

La idea és aquesta:

```text
l'aplicació crea un pool
el pool manté connexions disponibles
les consultes utilitzen el pool
les connexions es reutilitzen
```

En aquest tutorial crearem un únic pool compartit per tota l'aplicació.

---
# Per què no hem de crear una connexió nova a cada consulta?

Crear connexions noves constantment és una mala pràctica.

Pot provocar:

```text
pitjor rendiment
massa connexions obertes
errors quan hi ha moltes peticions
codi repetit
més dificultat per gestionar errors
```

Per això crearem un fitxer específic per a la base de dades.

Per exemple:

```text
src/config/database.ts
```

Aquest fitxer tindrà la configuració i la funció per obtenir el pool de connexions.

---
# Variables d'entorn

Les dades de connexió a la base de dades no haurien d'estar escrites directament al codi.

No és bona idea fer això:

```ts
const config = {
  user: "sa",
  password: "Patata123!",
  server: "localhost",
  database: "MusicCloud"
};
```

Funciona, però és una mala pràctica.

El codi queda lligat a una configuració concreta i pot exposar informació sensible.

És millor utilitzar variables d'entorn.

Per exemple:

```text
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=Patata123!
DB_NAME=MusicCloud
```

D'aquesta manera, el codi TypeScript no depèn d'una contrasenya concreta.

La configuració queda fora del codi.

---
# Fitxer `.env`

Un fitxer `.env` permet definir variables d'entorn en un projecte local.

Per exemple:

```env
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=Patata123!
DB_NAME=MusicCloud
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

Aquest fitxer no s'hauria de pujar al repositori si conté contrasenyes reals.

Per això normalment s'afegeix a `.gitignore`:

```text
.env
```

I es crea un fitxer d'exemple sense secrets reals:

```text
.env.example
```

Aquest fitxer sí que es pot pujar al repositori perquè només documenta quines variables fan falta.

---
# `dotenv`

Node.js no carrega automàticament fitxers `.env`.

Per llegir-los podem utilitzar la llibreria:

```text
dotenv
```

Aquesta llibreria carrega les variables definides al fitxer `.env` i les posa dins de:

```ts
process.env
```

Per exemple, si al `.env` tenim:

```env
DB_NAME=MusicCloud
```

al codi podrem llegir:

```ts
process.env.DB_NAME
```

---
# Configuració de connexió

La configuració bàsica per connectar amb SQL Server tindrà aquest aspecte:

```ts
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};
```

Cada camp té una funció:

| Camp                             | Funció                               |
| -------------------------------- | ------------------------------------ |
| `user`                           | Usuari de SQL Server                 |
| `password`                       | Contrasenya                          |
| `server`                         | Servidor on està SQL Server          |
| `port`                           | Port de connexió                     |
| `database`                       | Base de dades                        |
| `options.encrypt`                | Indica si s'utilitza xifratge        |
| `options.trustServerCertificate` | Permet confiar en certificats locals |

En un entorn Docker local, sovint utilitzarem:

```ts
encrypt: false
trustServerCertificate: true
```

Això simplifica la connexió en desenvolupament.

En producció, aquesta configuració s'hauria de revisar.

---
# Desenvolupament i producció

És important distingir entre:

```text
entorn local de desenvolupament
entorn real de producció
```

En desenvolupament podem tenir:

```text
usuari sa
contrasenya simple de pràctiques
trustServerCertificate: true
encrypt: false
```

Però això no és una configuració adequada per a producció.

En una aplicació real caldria:

```text
crear un usuari específic per a l'aplicació
limitar els permisos d'aquest usuari
utilitzar secrets gestionats de manera segura
configurar correctament el xifratge
no pujar contrasenyes al repositori
```

En aquest tutorial començarem amb una configuració local perquè l'objectiu és aprendre la connexió i les consultes.

---
# Què farem en aquest punt?

En aquest punt veurem per primera vegada codi asíncron amb `async`, `await` i `Promise`, perquè la connexió amb SQL Server no és immediata.

No aprofundirem encara en aquests conceptes.

De moment només cal entendre que connectar-se a una base de dades és una operació que pot trigar i que, per tant, Node.js l'ha d'esperar.

Treballarem aquests conceptes amb més detall quan substituïm els arrays per consultes SQL dins dels serveis.

---
# Estructura del projecte

Després d'aquest punt, el projecte podria quedar així:

```text
src/
├── app.ts
├── server.ts
├── config/
│   ├── api.ts
│   ├── environment.ts
│   └── database.ts
├── controllers/
│   └── trackController.ts
├── data/
│   └── tracks.ts
├── routes/
│   └── trackRoutes.ts
├── scripts/
│   └── testDatabaseConnection.ts
├── services/
│   └── trackService.ts
└── types/
    └── ...
```

La carpeta `scripts` servirà per tenir petits fitxers d'execució manual.

No són endpoints.

No formen part de la lògica principal de l'API.

Serveixen per comprovar coses concretes durant el desenvolupament.

---

```


// Nom fitxer: Teoria/Part 4 - Persistència amb Microsoft SQL Server 1/T04.03. Model relacional de MusicCloud.md
```ts


# Model relacional de MusicCloud

## Objectiu

En aquest punt definirem el **model relacional** de la base de dades del projecte **MusicCloud**.

Fins ara hem creat una taula senzilla:

```sql
CREATE TABLE Tracks (
  id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  title NVARCHAR(200) NOT NULL,
  artist NVARCHAR(200) NOT NULL,
  durationSeconds INT NOT NULL
);
```

Aquesta taula ens ha anat bé per començar, però té un problema important: **barreja informació de diferents conceptes dins d'una sola taula**.

Ara volem fer un pas més professional i separar les dades en taules relacionades.

El model relacional ens permetrà representar millor una aplicació semblant a Spotify, amb:

```text
artistes
àlbums
cançons
usuaris
playlists
cançons dins de playlists
```

---
# Taules del model MusicCloud

El model inicial serà aquest:

```text
Artists
Albums
Tracks
Users
Playlists
PlaylistTracks
```

Cada taula tindrà una responsabilitat clara.

| Taula            | Responsabilitat                           |
| ---------------- | ----------------------------------------- |
| `Artists`'       | Guarda els artistes                       |
| `Albums`         | Guarda els àlbums                         |
| `Tracks`         | Guarda les cançons                        |
| `Users`          | Guarda els usuaris                        |
| `Playlists`      | Guarda les playlists creades pels usuaris |
| `PlaylistTracks` | Relaciona playlists amb tracks            |

Aquesta separació és important perquè evita duplicar informació i ens prepara per fer consultes més útils.

---
# Identificadors amb `UNIQUEIDENTIFIER`

En aquest projecte estem treballant amb UID. Per mantenir coherència, les claus primàries de les taules utilitzaran el tipus:

```sql
UNIQUEIDENTIFIER
```

A SQL Server, podem generar un identificador automàticament amb:

```sql
NEWID()
```

Per exemple:

```sql
id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID()
```

---
# Relació entre artistes i àlbums

Un artista pot tenir molts àlbums.

Per exemple:

```text
Queen
├── A Night at the Opera
└── Jazz
```

Això és una relació:

```text
un artista → molts àlbums
```

En model relacional ho representem posant `artistId` dins de la taula `Albums`.

```text
Artists
  id

Albums
  id
  artistId
```

Relació:

```text
Albums.artistId → Artists.id
```

---
# Relació entre artistes i tracks

Una cançó també tindrà un artista.

Per exemple:

```text
Bohemian Rhapsody → Queen
Billie Jean       → Michael Jackson
```

A la taula `Tracks` tindrem:

```text
artistId
```

Això ens permet consultar totes les cançons d'un artista concret.

---
# Relació entre àlbums i tracks

Una cançó pot pertànyer a un àlbum.

Per exemple:

```text
Thriller
├── Billie Jean
└── Beat It
```

A la taula `Tracks` tindrem:

```text
albumId
```

Però no totes les cançons han d'estar obligatòriament associades a un àlbum.

Podem tenir singles, demos o cançons sense àlbum.

Per això `albumId` pot ser nullable:

```sql
albumId UNIQUEIDENTIFIER NULL
```

Per tant, no necessàriament una  cançó haurà de tenir un àlbum.

---
# Relació entre usuaris i playlists

Un usuari pot crear moltes playlists.

Per exemple:

```text
user1
├── Rock clàssic
├── Música per estudiar
└── Favorits
```

Això és una relació:

```text
un usuari → moltes playlists
```

A la taula `Playlists` tindrem:

```sql
userId UNIQUEIDENTIFIER NOT NULL
```

I la relació serà:

```text
Playlists.userId → Users.id
```

---
# Relació entre playlists i tracks

Una playlist pot tenir moltes cançons.

Però una mateixa cançó també pot aparèixer en moltes playlists.

Per exemple:

```text
Playlist: Rock clàssic
├── Bohemian Rhapsody
└── Smells Like Teen Spirit

Playlist: Favorits
├── Bohemian Rhapsody
└── Billie Jean
```

La cançó **Bohemian Rhapsody** apareix en més d'una playlist.

Això és una relació:

```text
moltes playlists ↔ moltes tracks
```

És un tipus de relació **molts-a-molts**.

En una base de dades relacional creem una nova taula intermèdia:

```text
PlaylistTracks
```

Aquesta taula tindrà:

```text
playlistId
trackId
position
addedAt
```

Cada fila representa una cançó dins d'una playlist.

---
# Taula `PlaylistTracks`

La taula `PlaylistTracks` relaciona playlists i tracks.

Exemple conceptual:

```text
playlistId | trackId | position
--------------------------------
playlist1  | track1  | 1
playlist1  | track2  | 2
playlist2  | track1  | 1
```

Això vol dir:

```text
playlist1 conté track1 i track2
playlist2 també conté track1
```

Aquesta estructura és molt més flexible.

Ens permet:

```text
afegir una cançó a moltes playlists
ordenar les cançons dins d'una playlist
saber quan es va afegir una cançó
evitar duplicats dins de la mateixa playlist
```

---

# Diagrama conceptual

El model inicial queda així:

```text
Artists
  └── Albums
  └── Tracks

Albums
  └── Tracks

Users
  └── Playlists
        └── PlaylistTracks
              └── Tracks
```

Una altra manera de veure-ho:

```text
Artists 1 ──── * Albums
Artists 1 ──── * Tracks
Albums  1 ──── * Tracks

Users   1 ──── * Playlists

Playlists * ──── * Tracks
       mitjançant PlaylistTracks
```

---

# Model relacional proposat

El model que crearem serà:

```text
Artists
- id
- name
- createdAt

Albums
- id
- title
- artistId
- releaseYear
- createdAt

Tracks
- id
- title
- artistId
- albumId
- durationSeconds
- createdAt

Users
- id
- username
- email
- password
- createdAt

Playlists
- id
- name
- description
- userId
- createdAt

PlaylistTracks
- playlistId
- trackId
- position
- addedAt
```
---
# Restriccions `UNIQUE`

Una restricció `UNIQUE` impedeix valors duplicats.

Per exemple, a la taula `Users` és raonable que no hi hagi dos usuaris amb el mateix email:

```sql
CONSTRAINT UQ_Users_Email UNIQUE (email)
```

També podem fer que `username` sigui únic:

```sql
CONSTRAINT UQ_Users_Username UNIQUE (username)
```

Això evitarà inconsistències.

---
# Restriccions `CHECK`

Una restricció `CHECK` permet validar valors.

Per exemple, una cançó no hauria de tenir una durada negativa:

```sql
CONSTRAINT CK_Tracks_Duration_Positive CHECK (durationSeconds > 0)
```

Això protegeix la base de dades.

Encara que l'API tingui validacions, la base de dades també hauria de protegir les regles importants.

---
# Esborrat en cascada

Quan hi ha relacions entre taules, cal decidir què passa si eliminem una fila relacionada.

Per exemple:

```text
què passa si eliminem una playlist?
```

En aquest cas, té sentit eliminar automàticament les files de `PlaylistTracks` associades a aquella playlist.

Això es pot fer amb:

```sql
ON DELETE CASCADE
```

Però cal utilitzar-ho amb prudència.

No sempre és correcte.

Per exemple, si eliminem un artista, potser no volem eliminar automàticament totes les seves cançons sense pensar-hi.

En aquest model aplicarem cascada només on sigui clar:

```text
si s'elimina una playlist, s'eliminen les relacions amb tracks
si s'elimina un usuari, s'eliminen les seves playlists
```

---
# Ordre de creació de taules

Les taules amb claus foranes depenen d'altres taules.

Per això, no podem crear-les en qualsevol ordre.

Primer hem de crear les taules que no depenen de ningú:

```text
Artists
Users
```

Després:

```text
Albums
Tracks
Playlists
```

I finalment:

```text
PlaylistTracks
```

---

# Dades creïbles

Quan inserim dades de prova, no farem servir:

```text
Cançó 1
Artista 1
Prova
Test
```

Aquestes dades són massa artificials i no ajuden a detectar errors.

És millor utilitzar dades reals o almenys creïbles:

```text
Queen
Michael Jackson
Daft Punk
Nirvana
```

Això permet comprovar millor:

```text
consultes per artista
consultes per àlbum
playlists amb cançons variades
durades realistes
relacions entre taules
```

Les dades de prova han d'ajudar a detectar problemes, no només omplir la taula.

---

```


// Nom fitxer: Teoria/Part 5 - Validació i errors/T05.03. Error handler global.md
```ts


# Error handler global

# Teoria

## Objectiu

En aquest punt introduirem un **error handler global**.

Fins ara, cada controller capturava els errors inesperats amb un bloc `try/catch`.

Per exemple:

```ts
try {
  const tracks = await getAllTracks();

  return res.status(200).json(tracks);
} catch (error) {
  console.error(error);

  return res.status(500).json({
    message: "Internal server error"
  });
}
```

Aquest codi funciona, però té un problema: es repeteix a tots els controllers.

Si tenim molts endpoints, acabarem repetint moltes vegades:

```ts
console.error(error);

return res.status(500).json({
  message: "Internal server error"
});
```

L'objectiu d'aquest punt és centralitzar aquesta gestió en un sol lloc.

---
# El problema actual

Ara mateix, cada controller és responsable de dues coses:

```text
gestionar la petició concreta
gestionar errors inesperats
```

Per exemple, un controller pot haver de:

```text
buscar un track
comprovar si existeix
retornar 404 si no existeix
retornar 200 si existeix
retornar 500 si hi ha un error inesperat
```

Això fa que els controllers tinguin massa responsabilitats.

El controller hauria de centrar-se en el cas concret de la petició.

La gestió dels errors inesperats hauria d'estar centralitzada.

---
# Errors esperats i errors inesperats

És important distingir dos tipus d'errors.

## Errors esperats

Són situacions normals dins del funcionament de l'API.

Per exemple:

```text
el track no existeix
l'id no té un format vàlid
el body no és correcte
```

Aquests errors formen part del comportament normal de l'API.

Per exemple:

```ts
if (!track) {
  return res.status(404).json({
    message: "Track not found"
  });
}
```

Aquest `404` no és un error inesperat.

És una resposta normal quan el recurs no existeix.

---

## Errors inesperats

Són problemes que no formen part del flux normal.

Per exemple:

```text
la base de dades no està disponible
la consulta SQL falla
hi ha un error de connexió
hi ha una excepció no prevista
```

Aquests errors normalment s'han de convertir en:

```text
500 Internal Server Error
```

En lloc de gestionar aquest `500` a cada controller, el gestionarem en un middleware global.

---
# Què és un error handler global?

Un **error handler global** és un middleware especial d'Express que captura errors.

Té una diferència important respecte d'un middleware normal.

Un middleware normal rep:

```ts
req
res
next
```

Un middleware d'error rep quatre paràmetres:

```ts
error
req
res
next
```

Per exemple:

```ts
export function errorHandler(
  error,
  req,
  res,
  next
) {
  // ...
}
```

La presència del primer paràmetre `error` fa que Express el tracti com un middleware d'errors.

---
# `next(error)`

Fins ara hem utilitzat `next()` per deixar continuar una petició.

Per exemple, en un middleware de validació:

```ts
next();
```

Això significa:

```text
La petició és correcta i pot continuar.
```

Però també podem fer:

```ts
next(error);
```

Això significa:

```text
Hi ha hagut un error. Envia'l al middleware d'errors.
```

A partir d'aquest moment, Express saltarà al middleware d'errors global.

---
# Abans i després

Abans, el controller feia això:

```ts
catch (error) {
  console.error(error);

  return res.status(500).json({
    message: "Internal server error"
  });
}
```

Després, el controller farà això:

```ts
catch (error) {
  next(error);
}
```

La resposta `500` ja no la construirà el controller.

La construirà l'error handler global.

---
# Canvi important en el tipus de retorn

Fins ara els controllers retornaven:

```ts
Promise<Response>
```

Però ara, quan fem servir `next(error)`, pot passar que el controller no retorni directament una resposta.

Per això és més correcte utilitzar:

```ts
Promise<Response | void>
```

Per exemple:

```ts
export async function getTracksController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  // ...
}
```

Això vol dir:

```text
El controller pot retornar una Response
o pot delegar l'error amb next(error)
```

Aquest canvi és normal quan comencem a treballar amb middlewares d'error.

---
# On es registra l'error handler?

L'error handler global s'ha de registrar al final de l'aplicació.

Per exemple:

```ts
app.use("/tracks", trackRouter);

app.use(errorHandler);
```

És important que estigui després de les rutes.

Express executa els middlewares en ordre.

Per tant, si posem l'error handler abans de les rutes, no capturarà correctament els errors que es produeixin als controllers.

L'ordre correcte és:

```text
middlewares generals
rutes
error handler global
```

En el nostre projecte:

```text
express.json()
GET /
/tracks
errorHandler
```

---
# Què farà l'error handler en aquest punt?

En aquest punt farem una primera versió senzilla.

L'error handler:

```text
rebrà l'error
el mostrarà per consola
retornarà 500 Internal Server Error
```

Per exemple:

```json
{
  "message": "Internal server error"
}
```

Encara no distingirem tots els tipus d'error.

Això ho treballarem al punt següent, quan parlem de:

```text
400
401
403
404
409
500
```

Ara només volem centralitzar els errors inesperats.

---
# Què passa amb la validació?

El middleware `validate` que hem creat al punt anterior pot continuar retornant directament:

```ts
return res.status(400).json({
  message: "Invalid request data"
});
```

Això és acceptable en aquest moment.

El `400` de validació és un error controlat.

En aquest punt ens centrarem sobretot en els errors inesperats que ara mateix es repeteixen als `catch` dels controllers.

Més endavant podrem fer que també els errors de validació passin per l'error handler global.

---
# Què no farem encara?

En aquest punt no crearem encara una classe `AppError`.

Tampoc gestionarem encara de manera fina codis com:

```text
401 Unauthorized
403 Forbidden
409 Conflict
```

Això vindrà al punt següent.

Ara només volem entendre la idea principal:

```text
els controllers deleguen els errors inesperats
l'error handler global construeix la resposta 500
```

---

# Què hem aconseguit?

Amb aquest punt aconseguirem:

```text
eliminar respostes 500 repetides dels controllers
centralitzar els errors inesperats
utilitzar next(error)
crear un middleware d'errors global
deixar els controllers més nets
preparar el projecte per gestionar errors HTTP de manera professional
```

---

```


// Nom fitxer: Teoria/Part 5 - Validació i errors/T05.04. Codificació resposta HTTP.md
```ts


# Codificació de la resposta HTTP

# Teoria

## Objectiu

En aquest punt estudiarem alguns dels codis de resposta HTTP més habituals en una API REST.

Fins ara ja hem utilitzat alguns codis com:

```text
200 OK
201 Created
204 No Content
400 Bad Request
404 Not Found
500 Internal Server Error
```

Però encara no hem explicat amb detall quan s’ha d’utilitzar cada codi.

Aquest punt té com a objectiu establir un criteri clar per retornar respostes HTTP de manera coherent a tota l’API.

Treballarem especialment aquests codis:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

---
# Per què són importants els codis HTTP?

Una API no només retorna dades.

També comunica el resultat de cada petició mitjançant un **codi d’estat HTTP**.

Aquest codi permet saber si la petició:

```text
s’ha executat correctament
ha creat un recurs
ha eliminat un recurs sense retornar contingut
té dades incorrectes
demana un recurs que no existeix
requereix autenticació
requereix permisos
provoca un conflicte amb dades existents
ha fallat per un error intern del servidor
```

Per tant, el codi HTTP forma part de la resposta de l’API.

No és un detall secundari.

És una manera estàndard d’explicar què ha passat.

---
# Famílies de codis HTTP

Els codis HTTP s’agrupen per famílies.

En aquest projecte treballarem sobretot amb tres grups:

```text
2xx → respostes correctes
4xx → errors provocats per la petició del client
5xx → errors del servidor
```

Per exemple:

```text
200 → la petició s’ha resolt correctament
201 → s’ha creat un recurs
204 → s’ha executat correctament, però no hi ha contingut
400 → la petició està mal formada
404 → el recurs no existeix
500 → hi ha hagut un error inesperat al servidor
```

Aquesta classificació ajuda a entendre la responsabilitat de cada situació.

---
# Codis 2xx: respostes correctes

Els codis `2xx` indiquen que la petició s’ha processat correctament.

Això no vol dir sempre que la resposta contingui dades.

Segons el tipus d’operació, podem retornar un codi o un altre.

En aquest projecte utilitzarem principalment:

```text
200 OK
201 Created
204 No Content
```

Aquests codis són habituals en APIs REST.

---
# 200 OK

El codi `200 OK` indica que la petició s’ha completat correctament.

Normalment s’utilitza quan el servidor retorna dades al client.

En el nostre projecte, utilitzem `200 OK` en operacions de consulta.

Per exemple:

```http
GET /tracks
```

Si la consulta funciona correctament, l’API retorna:

```http
200 OK
```

amb una resposta semblant a:

```json
[
  {
    "id": "2F6B5A8E-93B2-4A3B-92B1-53E4D0F6A123",
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "durationSeconds": 354
  }
]
```

També utilitzem `200 OK` quan consultem un track concret:

```http
GET /tracks/:id
```

Si el track existeix, la resposta és:

```http
200 OK
```

amb el track demanat.

---
# 200 OK en actualitzacions

També podem utilitzar `200 OK` en una operació d’actualització si retornem el recurs actualitzat.

Per exemple:

```http
PUT /tracks/:id
```

Si el track s’actualitza correctament i l’API retorna el track modificat, és correcte respondre:

```http
200 OK
```

amb una resposta semblant a:

```json
{
  "id": "2F6B5A8E-93B2-4A3B-92B1-53E4D0F6A123",
  "title": "Don't Stop Me Now - Remastered",
  "artist": "Queen",
  "album": "Jazz",
  "durationSeconds": 210
}
```

En aquest cas, `200 OK` és adequat perquè:

```text
la petició s’ha completat correctament
la resposta conté dades
el client rep el recurs actualitzat
```

---
# Quan fem servir 200 OK?

En el nostre projecte, fem servir `200 OK` quan una operació s’ha completat correctament i volem retornar dades.

Exemples:

```text
GET /tracks
GET /tracks/:id
PUT /tracks/:id
```

Per tant:

```text
consulta correcta           → 200 OK
consulta d’un recurs trobat → 200 OK
actualització correcta      → 200 OK
```

---
# 201 Created

El codi `201 Created` indica que la petició s’ha completat correctament i que s’ha creat un nou recurs.

És el codi habitual per a operacions `POST` que creen dades noves.

En el nostre projecte, l’utilitzem quan creem un track:

```http
POST /tracks
```

El client envia les dades necessàries:

```json
{
  "title": "Don't Stop Me Now",
  "artistId": "2F6B5A8E-93B2-4A3B-92B1-53E4D0F6A123",
  "albumId": null,
  "durationSeconds": 209
}
```

Si la creació funciona correctament, l’API retorna:

```http
201 Created
```

amb el track creat:

```json
{
  "id": "9B7B0D7D-2F95-47C7-AF7A-99C9E3F4F123",
  "title": "Don't Stop Me Now",
  "artist": "Queen",
  "album": null,
  "durationSeconds": 209
}
```

La diferència amb `200 OK` és que aquí no només hem consultat o modificat una dada existent.

Hem creat un recurs nou.

---
# Per què no retornem 200 en un POST de creació?

Podríem retornar `200 OK` i tècnicament la resposta funcionaria.

Però en una API REST és més expressiu retornar:

```http
201 Created
```

perquè comunica millor què ha passat.

El codi `201` indica clarament que:

```text
la petició s’ha processat correctament
s’ha creat un nou recurs
la resposta pot incloure el recurs creat
```

Això és útil per al client de l’API.

---
# Quan fem servir 201 Created?

En el nostre projecte, fem servir `201 Created` quan una petició crea un nou recurs.

Exemple:

```text
POST /tracks → 201 Created
```

Més endavant també el podrem utilitzar en altres recursos:

```text
POST /users
POST /playlists
POST /artists
```

Sempre que la petició creï un nou registre, `201 Created` és una bona opció.

---

# 204 No Content

El codi `204 No Content` indica que la petició s’ha completat correctament, però que la resposta no té cos.

És molt habitual en operacions `DELETE`.

Per exemple:

```http
DELETE /tracks/:id
```

Si el track existeix i s’elimina correctament, l’API pot retornar:

```http
204 No Content
```

En aquest cas, no retornem cap JSON.

No fem això:

```json
{
  "message": "Track deleted"
}
```

Simplement indiquem que l’operació ha anat bé i que no hi ha contingut per retornar.

---

# Per què 204 no retorna cos?

El nom del codi ja ho indica:

```text
No Content
```

Això vol dir que la resposta no hauria de tenir cos.

Per tant, en Express fem:

```ts
return res.status(204).send();
```

No fem:

```ts
return res.status(204).json({
  message: "Track deleted"
});
```

Si volem retornar un missatge JSON, seria més coherent utilitzar `200 OK`.

Però en aquest projecte utilitzarem `204 No Content` per a eliminacions correctes.

---

# Quan fem servir 204 No Content?

En el nostre projecte, fem servir `204 No Content` quan una operació s’ha completat correctament però no cal retornar dades.

Exemple:

```text
DELETE /tracks/:id → 204 No Content
```

Això vol dir:

```text
el track existia
s’ha eliminat correctament
no retornem cap cos de resposta
```

---
# Estructura bàsica d’un error

Quan la petició no es pot completar correctament, retornarem un error.

De moment, utilitzarem una estructura senzilla:

```json
{
  "message": "Track not found"
}
```

Aquesta estructura encaixa amb el tipus:

```ts
export interface ErrorResponse {
  message: string;
}
```

Més endavant podríem enriquir aquesta resposta amb més informació:

```json
{
  "message": "Invalid request data",
  "errors": [
    {
      "field": "durationSeconds",
      "message": "Duration must be greater than 0"
    }
  ]
}
```

Però en aquest punt mantindrem una resposta simple.

L’objectiu principal ara és entendre quin codi HTTP correspon a cada situació.

---
# Codis 4xx: errors del client

Els codis `4xx` indiquen que la petició no s’ha pogut completar per algun problema relacionat amb la petició del client.

Això no vol dir necessàriament que el client sigui una persona.

Pot ser:

```text
una aplicació web
una aplicació mòbil
un script
una altra API
```

Els errors `4xx` indiquen que la petició hauria de canviar perquè l’API la pugui acceptar.

En aquest projecte treballarem principalment amb:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
```

---
# 400 Bad Request

El codi `400 Bad Request` indica que la petició enviada pel client no és correcta.

Normalment passa quan les dades tenen un format incorrecte o no compleixen les regles esperades.

Per exemple:

```http
POST /tracks
```

amb aquest body:

```json
{
  "title": "",
  "artistId": "queen",
  "durationSeconds": -20
}
```

Aquesta petició és incorrecta perquè:

```text
title està buit
artistId no és un UUID vàlid
durationSeconds és negatiu
```

En aquest cas, la resposta hauria de ser:

```http
400 Bad Request
```

amb un cos semblant a:

```json
{
  "message": "Invalid request data"
}
```

En el nostre projecte, aquest error el retorna principalment el middleware `validate`.

Per exemple:

```ts
trackRouter.post(
  "/",
  validate(createTrackSchema, "body"),
  createTrackController
);
```

Si el body no compleix `createTrackSchema`, la petició no arriba al controller.

El middleware retorna directament el `400`.

---
# Quan fem servir 400?

Fem servir `400 Bad Request` quan el problema és responsabilitat de la petició enviada pel client.

Exemples:

```text
body amb camps obligatoris que falten
body amb tipus incorrectes
id amb format incorrecte
durationSeconds negatiu
email amb format incorrecte
JSON mal format
query params incorrectes
```

En el nostre cas:

```text
GET /tracks/abc
```

hauria de retornar `400`, perquè `abc` no és un UUID vàlid.

No és un `404`, perquè encara no estem preguntant per un track concret vàlid.

La petició ja és incorrecta pel format de l’identificador.

---
# 404 Not Found

El codi `404 Not Found` indica que el recurs demanat no existeix.

Per exemple:

```http
GET /tracks/5F954D7A-1E1B-4D88-87F5-620D68F54E54
```

Si aquest identificador té un format vàlid, però no hi ha cap track amb aquest `id`, llavors la resposta ha de ser:

```http
404 Not Found
```

amb:

```json
{
  "message": "Track not found"
}
```

Aquest cas és diferent d’un `400`.

La petició té una forma correcta, però el recurs no existeix.

---
# Diferència entre 400 i 404

Aquest cas és `400`:

```http
GET /tracks/abc
```

Perquè `abc` no és un identificador vàlid.

Aquest cas és `404`:

```http
GET /tracks/5F954D7A-1E1B-4D88-87F5-620D68F54E54
```

si l’identificador té format correcte però no existeix cap track amb aquest `id`.

Per tant:

```text
400 → la petició està mal formada
404 → la petició és correcta, però el recurs no existeix
```

---
# 409 Conflict

El codi `409 Conflict` indica que la petició és correcta, però entra en conflicte amb l’estat actual del sistema.

És habitual quan intentem crear una dada que hauria de ser única però ja existeix.

Per exemple, més endavant podríem tenir:

```http
POST /users
```

amb:

```json
{
  "username": "maria",
  "email": "maria@example.com",
  "password": "Patata123!"
}
```

Si ja existeix un usuari amb aquest `username`, la resposta podria ser:

```http
409 Conflict
```

amb:

```json
{
  "message": "Username already exists"
}
```

També pot passar amb altres restriccions úniques.

Per exemple:

```text
nom d’artista duplicat
email duplicat
username duplicat
playlist amb nom repetit per al mateix usuari
```

---
# Diferència entre 400 i 409

Un `400` indica que la petició és incorrecta.

Un `409` indica que la petició té una forma correcta, però no es pot aplicar perquè entra en conflicte amb l’estat actual del sistema.

Per exemple:

```json
{
  "username": ""
}
```

Això seria `400`, perquè el valor no és vàlid.

En canvi:

```json
{
  "username": "maria"
}
```

si el valor és correcte però ja existeix, seria `409`.

Per tant:

```text
400 → la dada enviada no és vàlida
409 → la dada és vàlida, però entra en conflicte amb dades existents
```

---
# 401 Unauthorized

El codi `401 Unauthorized` indica que el client no està autenticat.

El nom pot confondre, perquè diu “Unauthorized”, però en la pràctica vol dir que falta autenticació o que l’autenticació no és vàlida.

Per exemple, més endavant tindrem endpoints protegits.

```http
POST /playlists
```

Si aquest endpoint requereix un token JWT i el client no l’envia, la resposta hauria de ser:

```http
401 Unauthorized
```

amb:

```json
{
  "message": "Authentication required"
}
```

També seria `401` si el token és invàlid o ha caducat.

---
# Quan fem servir 401?

Fem servir `401 Unauthorized` quan el client no ha demostrat qui és.

Exemples:

```text
no envia token
envia un token invàlid
envia un token caducat
no ha iniciat sessió
```

Aquest error serà més important a la Part 6, quan introduïm autenticació amb JWT.

---
# 403 Forbidden

El codi `403 Forbidden` indica que el client està autenticat, però no té permís per fer aquella acció.

És diferent del `401`.

En un `401`, el sistema no sap qui és el client o no pot confiar en la seva autenticació.

En un `403`, el sistema sí que sap qui és el client, però no li permet fer aquella operació.

Per exemple:

```http
DELETE /playlists/ID_PLAYLIST
```

Si l’usuari està autenticat però intenta eliminar una playlist que pertany a un altre usuari, la resposta podria ser:

```http
403 Forbidden
```

amb:

```json
{
  "message": "Forbidden"
}
```

---
# Diferència entre 401 i 403

La diferència és aquesta:

```text
401 → no sabem qui ets o la teva autenticació no és vàlida
403 → sabem qui ets, però no tens permís
```

Exemple:

```text
no envies token                         → 401
envies un token invàlid                 → 401
envies un token vàlid però no ets l’amo  → 403
```

Aquesta distinció serà especialment important quan treballem playlists d’usuari autenticat.

---
# Codis 5xx: errors del servidor

Els codis `5xx` indiquen que hi ha hagut un error al servidor.

A diferència dels codis `4xx`, aquí el problema no és que el client hagi enviat una petició mal formada.

El problema és que el servidor no ha pogut completar una operació que hauria de poder executar.

En aquest projecte treballarem principalment amb:

```text
500 Internal Server Error
```

---
# 500 Internal Server Error

El codi `500 Internal Server Error` indica que hi ha hagut un error inesperat al servidor.

Aquest error no és responsabilitat directa del client.

Per exemple:

```text
SQL Server està aturat
la connexió a la base de dades falla
la consulta SQL té un error
hi ha una excepció inesperada
una variable necessària no existeix
```

En aquest cas, l’API hauria de respondre:

```http
500 Internal Server Error
```

amb un missatge genèric:

```json
{
  "message": "Internal server error"
}
```

No hauríem de retornar detalls interns al client.

Per exemple, no seria bona idea retornar:

```json
{
  "message": "Violation of FOREIGN KEY constraint FK_Tracks_Artists on table Tracks..."
}
```

Aquests detalls poden donar informació interna del sistema.

Els detalls s’han de registrar al servidor, per exemple amb:

```ts
console.error(error);
```

Però el client només ha de rebre un missatge genèric.

---
# Quan fem servir 500?

Fem servir `500 Internal Server Error` quan passa un error inesperat que no podem atribuir directament a una petició mal formada.

Per exemple:

```text
fallada de connexió amb SQL Server
error inesperat dins d’un service
error SQL no controlat
problema de configuració del servidor
```

El `500` no s’hauria d’utilitzar per errors previsibles.

Per exemple, aquests casos no són `500`:

```text
body incorrecte        → 400
track no trobat        → 404
usuari no autenticat   → 401
sense permisos         → 403
conflicte de dades     → 409
```

---
# Taula general de criteris

| Codi | Nom                   | Quan l’utilitzem                                    |
| ---: | --------------------- | --------------------------------------------------- |
|  200 | OK                    | Operació correcta amb resposta de dades             |
|  201 | Created               | Recurs creat correctament                           |
|  204 | No Content            | Operació correcta sense cos de resposta             |
|  400 | Bad Request           | Dades incorrectes, id mal format, validació fallida |
|  401 | Unauthorized          | Falta autenticació o token invàlid                  |
|  403 | Forbidden             | Usuari autenticat sense permisos                    |
|  404 | Not Found             | Recurs no existent                                  |
|  409 | Conflict              | Dada vàlida però en conflicte amb l’estat actual    |
|  500 | Internal Server Error | Error inesperat del servidor                        |

---


```


// Nom fitxer: Teoria/Part 5 - Validació i errors/T05.01.Validació amb Zod.md
```ts


# Validació amb Zod

# Teoria

## Objectiu

Fins ara ja hem treballat amb:

```text
dades en memòria
dades persistents a SQL Server
tipus TypeScript
DTO i transformació de dades
```

Ara el següent problema és aquest:

```text
No podem confiar cegament en les dades que arriben dins de req.body.
```

Quan un client fa una petició com:

```http
POST /tracks
```

pot enviar dades correctes:

```json
{
  "title": "Don't Stop Me Now",
  "artistId": "2F6B5A8E-93B2-4A3B-92B1-53E4D0F6A123",
  "albumId": "45D1CE89-7A4B-4FD4-A4B2-0EC4AC90C123",
  "durationSeconds": 209
}
```

Però també pot enviar dades incompletes, mal formades o directament absurdes:

```json
{
  "title": "",
  "artistId": "queen",
  "durationSeconds": -20
}
```

TypeScript ens ajuda mentre escrivim codi, però **no valida automàticament les dades que arriben en temps d'execució**.

Per això necessitem validar-les.

---
# El problema de confiar en `req.body`

Quan fem servir Express, les dades del cos de la petició arriben a:

```ts
req.body
```

Per exemple:

```ts
const createdTrack = await createTrack(req.body);
```

Això funciona, però és perillós.

`req.body` pot contenir qualsevol cosa:

```text
un objecte correcte
un objecte incomplet
un objecte amb tipus incorrectes
un string
un array
null
dades inesperades
```

El client podria enviar:

```json
{
  "title": 123,
  "artistId": true,
  "albumId": ["incorrecte"],
  "durationSeconds": "dos-cents"
}
```

Això no encaixa amb el nostre tipus:

```ts
export interface CreateTrackInput {
  title: string;
  artistId: string;
  albumId?: string | null;
  durationSeconds: number;
}
```

Però TypeScript no pot garantir que `req.body` compleixi aquesta interface.

---
# TypeScript no valida en temps d'execució

Aquesta és una idea molt important.

TypeScript comprova tipus durant el desenvolupament i la compilació.

Però quan l'aplicació s'executa, el codi final és JavaScript.

Les interfaces de TypeScript desapareixen en temps d'execució.

Per tant, això:

```ts
export interface CreateTrackInput {
  title: string;
  artistId: string;
  albumId?: string | null;
  durationSeconds: number;
}
```

serveix per ajudar-nos mentre programem, però no comprova automàticament que una petició HTTP tingui aquesta forma.

Per això necessitem una eina de validació en temps d'execució.

---
# Què és Zod?

**Zod** és una llibreria de validació pensada per treballar amb TypeScript.

Amb Zod podem definir un **schema**.

Un schema descriu quina forma han de tenir unes dades.

La documentació oficial descriu Zod com una llibreria de validació “TypeScript-first” que permet definir schemas per validar dades, des de strings simples fins a objectes complexos. ([Zod][1])

Per exemple:

```ts
import { z } from "zod";

const userSchema = z.object({
  username: z.string(),
  email: z.string().email()
});
```

Aquest schema indica que un usuari ha de tenir:

```text
username com a string
email com a string amb format d'email
```

Zod permet validar dades reals en temps d'execució.

---
# Què és un schema?

Un **schema** és una definició formal de la forma que han de tenir unes dades.

En el nostre cas volem validar les dades necessàries per crear un track.

El nostre tipus TypeScript és:

```ts
export interface CreateTrackInput {
  title: string;
  artistId: string;
  albumId?: string | null;
  durationSeconds: number;
}
```

El schema Zod equivalent pot ser:

```ts
import { z } from "zod";

export const createTrackSchema = z.object({
  title: z.string().trim().min(1),
  artistId: z.uuid(),
  albumId: z.uuid().nullable().optional(),
  durationSeconds: z.number().int().positive()
});
```

Aquest schema diu:

```text
title ha de ser un string no buit
artistId ha de ser un UUID
albumId pot ser un UUID, null o no existir
durationSeconds ha de ser un número enter positiu
```

---
# `parse` i `safeParse`

Zod ofereix diferents maneres de validar dades.

Una opció és:

```ts
createTrackSchema.parse(req.body);
```

Si les dades són correctes, `parse` retorna les dades validades.

Si són incorrectes, llença un error.

La documentació oficial indica que `.parse()` valida l'entrada i, si és vàlida, retorna una còpia tipada de les dades. ([Zod][2])

Però en un controller Express, inicialment és més còmode utilitzar:

```ts
const result = createTrackSchema.safeParse(req.body);
```

`safeParse` no llença una excepció.

Retorna un resultat amb dues possibilitats:

```text
success: true   → dades vàlides
success: false  → dades no vàlides
```

Això ens permet retornar un `400 Bad Request` de manera controlada.

---
# Per què utilitzarem `safeParse`?

Si fem servir `parse`, haurem de capturar errors amb `try/catch`.

En canvi, amb `safeParse` podem fer:

```ts
const validationResult = createTrackSchema.safeParse(req.body);

if (!validationResult.success) {
  return res.status(400).json({
    message: "Invalid track data"
  });
}

const input = validationResult.data;
```

---
# Validar dades d'entrada

La validació s'ha d'aplicar sobretot a les dades que arriben de fora.

Per exemple:

```text
req.body
req.params
req.query
```

En aquest primer punt validarem:

```text
body de POST /tracks
body de PUT /tracks/:id
id de GET /tracks/:id
id de PUT /tracks/:id
id de DELETE /tracks/:id
```

No validarem encara tot de manera abstracta.

Ho farem directament als controllers.

Això no és la solució més elegant, però és una bona primera aproximació.

El següent punt serà crear un middleware per evitar repetir codi.

---
# Validació del body

Per crear o modificar un track, el client envia aquest tipus de dades:

```json
{
  "title": "Don't Stop Me Now",
  "artistId": "2F6B5A8E-93B2-4A3B-92B1-53E4D0F6A123",
  "albumId": null,
  "durationSeconds": 209
}
```

El schema Zod comprovarà que:

```text
title és un text no buit
artistId és un UUID
albumId és un UUID, null o undefined
durationSeconds és un enter positiu
```

Això evita que arribin al service dades incorrectes.

---
# Validació dels paràmetres de ruta

També hem de validar el paràmetre `id`.

Per exemple:

```http
GET /tracks/abc
```

Ara `abc` no és un `UNIQUEIDENTIFIER` vàlid.

Si no ho validem, la consulta SQL pot fallar quan intenti convertir aquest valor a `UniqueIdentifier`.

Per això crearem un schema específic:

```ts
export const trackIdParamsSchema = z.object({
  id: z.uuid()
});
```

Aquest schema valida l'objecte:

```ts
req.params
```

que tindrà una forma semblant a:

```ts
{
  id: "2F6B5A8E-93B2-4A3B-92B1-53E4D0F6A123"
}
```

---
# Què retorna l'API si la validació falla?

Quan les dades no són vàlides, retornarem:

```text
400 Bad Request
```

Per exemple:

```json
{
  "message": "Invalid track data"
}
```

O bé:

```json
{
  "message": "Invalid track id"
}
```

Encara no retornarem un detall complet de tots els errors de validació.

Això ho podrem millorar més endavant.

En aquest punt només volem introduir Zod i substituir la validació manual.

---
# Diferència entre validació i errors de base de dades

La validació evita errors previs.

Per exemple, si `artistId` no té format d'UUID, podem retornar `400 Bad Request` abans d'arribar al service.

Però hi ha errors que Zod no pot resoldre.

Per exemple:

```text
artistId té format correcte, però no existeix a la taula Artists
```

Això no és un problema de format.

És un problema de coherència amb la base de dades.

SQL Server ho detectarà amb la clau forana.

En aquest punt encara pot acabar en un `500 Internal server error`.

Més endavant millorarem això per retornar errors més precisos, com `409 Conflict` o `400 Bad Request`, segons el cas.

---
[1]: https://zod.dev/?utm_source=chatgpt.com "Zod: Intro"
[2]: https://zod.dev/basics?utm_source=chatgpt.com "Basic usage"




```


// Nom fitxer: Teoria/Part 5 - Validació i errors/T05.06 Classes d'errors personalitzades.md
```ts


# Classes d'errors personalitzades (Custom Errors)

## Objectiu

En aquest punt farem un salt de qualitat en la gestió d'errors de l'API utilitzant la **Programació Orientada a Objectes (POO)**.

Fins ara, quan un recurs no existia, l'error es gestionava manualment des del propi controlador retornant un `404`:

```ts
if (!track) {
  return res.status(404).json({
    message: "Track not found",
    code: ErrorCode.TrackNotFound
  });
}

```

Aquest enfocament té dos problemes a mesura que l'aplicació creix:

1. **Repetició de codi:** Cada vegada que busquem un element (tracks, artistes, usuaris), hem de repetir la mateixa estructura `if` i construir la resposta HTTP.
2. **Manca de centralització:** El controlador s'ha d'encarregar de decidir quin codi d'estat HTTP correspon a cada situació del negoci.

L'objectiu d'aquest punt és poder delegar qualsevol error esperat de l'aplicació al nostre `errorHandler` global de manera elegant fent un simple `throw`:

```ts
throw new NotFoundError("Track not found", ErrorCode.TrackNotFound);

```
---
# El concepte d'Error Operacional vs Error de Programació

Abans de crear les nostres classes, hem de diferenciar dos tipus d'errors en un servidor:

```text
Errors Operacionals → Errors coneguts i esperats (Recurs no trobat, dades invàlides, falta de permisos).
Errors de Programació → Errors inesperats o bugs (Falta de connexió a la BD, variables undefined, errors de sintaxi).

```
Els **errors operacionals** són provocats per l'ús de l'aplicació. Per tant, els podem preveure, tenen un codi HTTP associat ($400$, $401$, $404$) i podem enviar un missatge clar a l'usuari.

---
# Arquitectura de classes d'error

Crearem una jerarquia de classes heretant de la classe nativa `Error` de JavaScript.

```text
       [ Error ]  (Classe nativa de JS)
           ↓
      [ AppError ]  (Classe base conceptual: abstracta/operacional)
     /     |      \
[NotFound] [BadRequest] [Unauthorized]  (Classes específiques per codi HTTP)

```
1. **`AppError`**: Serà la classe mare de tots els nostres errors personalitzats. Guardarà el missatge, el codi HTTP, el codi intern de l'API i marcarà l'error com a operational (`isOperational = true`).
2. **Classes especialitzades**: Crearem classes com `NotFoundError` o `BadRequestError` que simplement estendran d'`AppError` i fixaran el codi HTTP corresponent ($404$ o $400$ respectivament).

Gràcies a això, l' `errorHandler` global podrà saber instantàniament si l'error és un dels nostres (operacional) o un error inesperat ($500$).

---
# Com canvia el flux de control

Actualment, el controlador ha de comprovar si el servei respon un `null` per tallar la petició. Amb els Custom Errors, el propi servei o el controlador poden llançar l'error i deixar que "esgoti" cap avall fins al middleware d'errors.

```text
Request → Controller → Service (Si falla, throw NotFoundError)
                           ↓
errorHandler Global (Detecta instància de AppError → envia status automàtic)
```
Això netejarà els nostres controladors i deixarà les rutes molt més lliures de lògica de control HTTP.

---
# Beneficis 

* **Separació de conceptes (Separation of Concerns):** El controlador sap *què* fer si el track existeix, però si no existeix, simplement "aixeca la mà" (`throw`) i diu *"tenim un problema de tipus Recursos No Trobat"*. Qui decideix que això es tradueix en un $404$ i en un JSON amb una estructura concreta és, exclusivament, l' `errorHandler`.
* **Codi llegible a primer cop d'ull:** Qualsevol programador que entri al controlador veurà immediatament què retorna l'API quan funciona. Els `res.status(4XX)` o `res.status(5XX)` desapareixen dels controladors per sempre.
* **Preparat per al futur:** Quan en la següent part d'autenticació hagin de denegar l'accés perquè un usuari no té permisos, en lloc d'embrutar el controlador amb respostes $403$, faran un `throw new ForbiddenError(...)` i el controlador continuarà sent impecable, mantenint només els seus codis $20X$.

---
# Pràctica

## Tasca

Crear la infraestructura de classes d'error personalitzades, modificar el middleware `errorHandler` perquè les sàpiga gestionar i refactoritzar els controladors de *Tracks* per utilitzar-les.

---

## Requisits

El projecte ha de complir aquests requisits:

```text
Crear una classe base AppError que hereti d'Error
Crear les classes derivades NotFoundError i BadRequestError
Actualitzar l'enum ErrorCode amb codis nous si cal
Modificar l'errorHandler per respondre dinàmicament segons la classe d'error
Refactoritzar els mètodes de trackController

```
---
## Crear la classe base `AppError` i derivades

Pel nostre projecte necessitarem les següents classes personalitzades de gestió d'errors.

```ts
import { ErrorCode } from "../types/error/errorCode";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, code: ErrorCode) {
    super(message);
    
    // Assignem el prototip explícitament (requerit en algunes versions de TS en estendre Error)
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // Tots els Custom Errors de l'aplicació seran operacionals

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.InternalServerError) {
    super(message, 404, code);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.ValidationError) {
    super(message, 400, code);
  }
}

```
---
## Actualitzar l'enum de codis d'error

A la teva codificació d'errors afegeix un codi genèric de "RESOURCE_NOT_FOUND" (recurs no trobat)

---
## Actualitzar el middleware `errorHandler` global

Obre el fitxer `src/middlewares/errorHandler.ts`. Ara farem servir l'operador `instanceof` per comprovar si l'error rebut prové de la nostra família d'errors `AppError`:

```ts

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  // 1. Si és un error operacional nostre, responem amb les seves dades
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      message: error.message,
      code: error.code
    };
    return res.status(error.statusCode).json(response);
  }

  // 2. Si l'error no és operational (bug, fallada de BD, etc.), fem log intern i responem 500
  console.error("💥 ERROR INESPERAT:", error);

  const response: ErrorResponse = {
    message: "Internal server error",
    code: ErrorCode.InternalServerError
  };

  return res.status(500).json(response);
}

```
---
## Refactoritzar el controlador `trackController.ts`

Obre el fitxer `src/controllers/trackController.ts`. En lloc de fer un `return res.status(404).json(...)` manual, instanciaciarem un `NotFoundError` i el passarem a la funció `next(error)` per fer-lo viatjar cap a l'error handler.

### `getTrackByIdController`

```ts

export async function getTrackByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
     
    const id : string = req.params.id as string;
  
    try {
      const track: TrackDto | null = await findTrackById(id);

      if (!track) {
        // En lloc de respondre directament, llencem l'error cap al catch
        throw new NotFoundError("Track not found", ErrorCode.TrackNotFound);
      }

      return res.status(200).json(track);
      
    } catch (error) {
        next(error); // L'errorHandler capturarà el NotFoundError de forma automàtica
    }
}

```
---
# Entrega

La pràctica ha d'incloure:

```text
- El fitxer appError.ts creat correctament.
- El controlador trackController.ts lliure de respostes estructurades 404 manuals.
- Evidència de proves realitzades.
```


```


// Nom fitxer: Teoria/Part 5 - Validació i errors/T05.05. Respostes d’error detallades.md
```ts


# Respostes d'error detallades

---
# Teoria

## Objectiu

En aquest punt millorarem les respostes d'error de l'API.

Fins ara, quan hi havia un error, l'API retornava una resposta molt simple:

```json
{
  "message": "Invalid request data"
}
```

Aquesta resposta és correcta, però és poc informativa.

Si el client envia dades incorrectes, és útil saber:

```text
quin tipus d'error s'ha produït
quin camp és incorrecte
quin missatge d'error correspon a aquest camp
```

Per exemple, si el client envia aquest body:

```json
{
  "title": "",
  "artistId": "queen",
  "durationSeconds": -20
}
```

una resposta més professional seria:

```json
{
  "message": "Invalid request data",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    },
    {
      "field": "artistId",
      "message": "Artist id must be a valid UUID"
    },
    {
      "field": "durationSeconds",
      "message": "Duration must be greater than 0"
    }
  ]
}
```

Aquesta resposta permet que el client de l'API pugui saber exactament què ha de corregir.

---
# Estat actual del projecte

El flux actual és:

```text
request
  ↓
middleware validate
  ↓
controller
  ↓
service
  ↓
SQL Server
```

Per tant, si una petició no supera la validació, el controller no s'executa.

---
# Responsabilitats actuals

En aquest punt ja tenim separades diverses responsabilitats:

```text
schema Zod      → defineix la forma esperada de les dades
validate        → aplica la validació a body, params o query
controller      → gestiona el cas d'ús i els casos esperats
service         → accedeix a la base de dades
errorHandler    → gestiona errors inesperats
```

Per exemple, en una petició:

```http
POST /tracks
```

la ruta aplica:

```ts
validate(createTrackSchema, "body")
```

Això vol dir que el controller `createTrackController` només s'executarà si `req.body` compleix el schema `createTrackSchema`.

---
# El paper de `safeParse`

Tot i que els controllers ja no fan servir `safeParse`, aquest mètode continua sent necessari.

Ara `safeParse` s'utilitza dins del middleware `validate`.

El middleware rep:

```text
schema
source
```

Per exemple:

```ts
validate(createTrackSchema, "body")
```

Això vol dir:

```text
valida req.body amb createTrackSchema
```

Internament, el middleware executa una operació equivalent a:

```ts
const validationResult = schema.safeParse(req[source]);
```

Si la validació falla, el middleware retorna un `400 Bad Request`.

Si la validació és correcta, el middleware crida:

```ts
next();
```

i la petició continua cap al controller.

Per tant, el flux és:

```text
schema.safeParse(req[source])
  ↓
success false → 400 Bad Request
success true  → next()
```

---

# Resposta d'error general i errors de camp

A partir d'ara diferenciarem dues parts en una resposta d'error:

```text
informació general de l'error
detalls opcionals per camp
```

La informació general inclourà:

```text
message
code
```

Els detalls de camp, quan existeixin, aniran dins de:

```text
errors
```

Per exemple:

```json
{
  "message": "Invalid request data",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "durationSeconds",
      "message": "Duration must be greater than 0"
    }
  ]
}
```

El camp `errors` només apareixerà quan tingui sentit.

Normalment apareixerà en errors de validació.

---
# Afegir un codi intern d'error

A més del codi HTTP, podem afegir un codi intern d'error.

Per exemple:

```text
VALIDATION_ERROR
TRACK_NOT_FOUND
INTERNAL_SERVER_ERROR
```

Això no substitueix el codi HTTP.

Són dues coses diferents.

El codi HTTP indica el tipus de resposta a nivell de protocol:

```text
400 Bad Request
404 Not Found
500 Internal Server Error
```

El codi intern identifica millor l'error dins de la nostra API:

```text
VALIDATION_ERROR
TRACK_NOT_FOUND
INTERNAL_SERVER_ERROR
```

Per exemple:

```json
{
  "message": "Track not found",
  "code": "TRACK_NOT_FOUND"
}
```

Aquesta resposta continua tenint codi HTTP `404`, però el client també pot llegir el camp `code`.

---
# Nova estructura d'error

La nova estructura serà:

```ts
export enum ErrorCode {
  ValidationError = "VALIDATION_ERROR",
  TrackNotFound = "TRACK_NOT_FOUND",
  InternalServerError = "INTERNAL_SERVER_ERROR"
}

export interface ErrorDetail {
  field: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  code: ErrorCode;
  errors?: ErrorDetail[];
}
```

El camp `errors` és opcional perquè no tots els errors tenen detalls per camp.

Un error de validació pot tenir detalls:

```json
{
  "message": "Invalid request data",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

Un error `404` pot ser més simple:

```json
{
  "message": "Track not found",
  "code": "TRACK_NOT_FOUND"
}
```

I un error `500` també ha de ser genèric:

```json
{
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

---

# Errors de validació amb Zod

Els schemas de Zod ja contenen missatges específics.

Per exemple:

```ts
export const createTrackSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required"
  }),
  artistId: z.uuid({
    message: "Artist id must be a valid UUID"
  }),
  albumId: z
    .uuid({
      message: "Album id must be a valid UUID"
    })
    .nullable()
    .optional(),
  durationSeconds: z
    .number({
      message: "Duration must be a number"
    })
    .int({
      message: "Duration must be an integer"
    })
    .positive({
      message: "Duration must be greater than 0"
    })
});
```

Quan el middleware `validate` executa la validació i aquesta falla, Zod genera una llista d'errors.

Aquesta llista està disponible a:

```ts
validationResult.error.issues
```

Cada `issue` conté informació com:

```text
path    → camp que ha fallat
message → missatge d'error
```

Per exemple, si falla `durationSeconds`, podem obtenir:

```text
field: durationSeconds
message: Duration must be greater than 0
```

---
# Transformar errors de Zod

No retornarem directament l'objecte intern de Zod.

En lloc d'això, transformarem els errors de Zod al nostre format.

Per exemple:

```ts
const errors = validationResult.error.issues.map((issue) => {
  return {
    field: issue.path.join("."),
    message: issue.message
  };
});
```

Així convertim els errors interns de Zod en una resposta clara i pròpia de la nostra API.

---
# Validació al middleware, no al controller

És important mantenir clara aquesta idea:

```text
els controllers no construeixen errors de validació
```

Els errors de validació els construeix el middleware `validate`.

Per exemple, el controller de creació pot quedar així:

```ts
export async function createTrackController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const createdTrack: TrackDto = await createTrack(req.body);

    return res.status(201).json(createdTrack);
  } catch (error) {
    next(error);
  }
}
```

Aquest controller no coneix `createTrackSchema`.

Això és responsabilitat de la ruta i del middleware.

---
# Errors esperats i errors inesperats

No tots els errors es gestionen al mateix lloc.

En aquest projecte seguirem aquest criteri:

```text
validate middleware → errors de validació → 400
controller          → casos esperats del cas d'ús → 404
errorHandler        → errors inesperats → 500
```

Per exemple, un `Track not found` no és un error inesperat.

És un resultat possible d'una consulta.

Per això el controller pot retornar:

```json
{
  "message": "Track not found",
  "code": "TRACK_NOT_FOUND"
}
```

En canvi, una fallada de connexió amb SQL Server sí que és un error inesperat.

Aquest error es passa amb:

```ts
next(error);
```

i el middleware global d'errors retorna:

```json
{
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

---

# Per què no donem detalls interns en un 500?

Els errors de validació són responsabilitat del client.

Per això podem explicar què ha fallat.

En canvi, un error `500 Internal Server Error` és un error inesperat del servidor.

Per exemple:

```text
SQL Server aturat
error SQL no controlat
fallada de connexió
error de configuració
```

En aquests casos no convé retornar detalls interns al client.

No hauríem de retornar una resposta com aquesta:

```json
{
  "message": "Violation of FOREIGN KEY constraint FK_Tracks_Artists..."
}
```

Això exposa informació interna de la base de dades.

El servidor sí que pot registrar l'error:

```ts
console.error(error);
```

Però el client només hauria de rebre:

```json
{
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

---
# Què canvia en aquest punt?

En aquest punt millorarem:

```text
ErrorResponse
middleware validate
respostes 404 dels controllers
errorHandler global
```

L'objectiu és que totes les respostes d'error siguin més homogènies.

Passarem de:

```json
{
  "message": "Invalid request data"
}
```

a:

```json
{
  "message": "Invalid request data",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

I passarem de:

```json
{
  "message": "Track not found"
}
```

a:

```json
{
  "message": "Track not found",
  "code": "TRACK_NOT_FOUND"
}
```

---


```


// Nom fitxer: Teoria/Part 5 - Validació i errors/T05.02. Middleware validate.md
```ts


# Middleware validate

# Teoria

## Objectiu

En aquest punt millorarem la validació amb Zod que hem introduït anteriorment.

Fins ara, la validació es feia directament dins dels controllers.

Per exemple:

```ts
const bodyValidation = createTrackSchema.safeParse(req.body);

if (!bodyValidation.success) {
  return res.status(400).json({
    message: "Invalid track data"
  });
}
```

Aquest codi funciona, però té un problema: es repetirà en molts controllers.

A mesura que l'API creixi, haurem de validar:

```text
body
params
query
```

i no volem repetir sempre la mateixa estructura.

En aquest punt crearem un middleware `validate` per centralitzar aquesta feina.

---
# Què és un middleware?

Un **middleware** és una funció que s'executa entre la petició del client i el controller final.

En Express, una petició segueix un flux semblant a aquest:

```text
client
  ↓
middleware
  ↓
controller
  ↓
resposta
```

Ja hem utilitzat un middleware abans:

```ts
app.use(express.json());
```

Aquest middleware llegeix el cos de la petició i el converteix en un objecte JavaScript disponible a:

```ts
req.body
```

Ara crearem el nostre propi middleware per validar dades.

---
# Per què volem un middleware de validació?

Actualment, si validem dins del controller, el codi queda així:

```ts
export async function createTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  const bodyValidation = createTrackSchema.safeParse(req.body);

  if (!bodyValidation.success) {
    return res.status(400).json({
      message: "Invalid track data"
    });
  }

  try {
    const createdTrack = await createTrack(bodyValidation.data);

    return res.status(201).json(createdTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

Aquesta validació embruta el controller.

El controller hauria de centrar-se en la lògica de la petició:

```text
crear un track
buscar un track
actualitzar un track
eliminar un track
```

La validació és una responsabilitat diferent.

Per tant, la mourem a un middleware.

---
# Responsabilitats del middleware `validate`

El middleware `validate` tindrà una responsabilitat clara:

```text
Comprovar si una part de la request compleix un schema de Zod.
```

Per exemple:

```text
req.body   → createTrackSchema
req.params → idParamSchema
```

Si les dades són correctes, el middleware deixarà continuar la petició.

Si les dades no són correctes, retornarà:

```text
400 Bad Request
```

Això evita que el controller s'executi amb dades invàlides.

---
# `next()`

En Express, els middlewares reben tres paràmetres:

```ts
req
res
next
```

El paràmetre `next` és una funció.

Serveix per indicar que la petició pot continuar cap al següent middleware o cap al controller.

Per exemple:

```ts
next();
```

Si el middleware detecta un error i retorna una resposta, no crida `next()`.

Això atura el flux de la petició.

---
# Validar diferents parts de la request

Una petició HTTP pot tenir dades en llocs diferents.

Per exemple, en aquesta ruta:

```http
PUT /tracks/:id
```

tenim dades a `req.params`:

```ts
req.params.id
```

I també tenim dades a `req.body`:

```ts
req.body.title
req.body.artistId
req.body.albumId
req.body.durationSeconds
```

Per això el middleware ha de poder validar diferents parts de la request.

En aquest punt validarem:

```text
body
params
query
```

Encara que ara només utilitzarem `body` i `params`.

---
# Tipus de dades que validarà el middleware

Volem poder escriure una cosa així a les rutes:

```ts
trackRouter.post(
  "/",
  validate(createTrackSchema, "body"),
  createTrackController
);
```

Això vol dir:

```text
Abans d'executar createTrackController, valida req.body amb createTrackSchema.
```

I també:

```ts
trackRouter.get(
  "/:id",
  validate(idParamSchema, "params"),
  getTrackByIdController
);
```

Això vol dir:

```text
Abans d'executar getTrackByIdController, valida req.params amb idParamSchema.
```

Així, els controllers ja no necessiten fer `safeParse`.

---
# Què passa amb les dades validades?

En aquest punt farem una versió senzilla del middleware.

El middleware comprovarà si les dades són vàlides.

Si són vàlides, deixarà continuar la petició.

Per tant, el controller podrà continuar utilitzant:

```ts
req.body
req.params
```

Aquesta decisió és didàcticament simple.

Més endavant, si volem, podem fer que el middleware substitueixi:

```ts
req.body
```

per les dades validades de Zod.

Però de moment l'objectiu principal és eliminar la repetició de validació dels controllers.

---
# Relació amb Zod

El middleware rebrà un schema de Zod.

Per exemple:

```ts
export const createTrackSchema = z.object({
  title: z.string().trim().min(1),
  artistId: z.string().uuid(),
  albumId: z.string().uuid().nullable().optional(),
  durationSeconds: z.number().int().positive()
});
```

El middleware farà:

```ts
const result = schema.safeParse(req[source]);
```

On `source` pot ser:

```text
body
params
query
```

Si `result.success` és `false`, retornarem un error `400`.

---
# Abans i després

Abans, el controller validava:

```ts
const bodyValidation = createTrackSchema.safeParse(req.body);

if (!bodyValidation.success) {
  return res.status(400).json({
    message: "Invalid track data"
  });
}
```

Després, aquesta validació es mourà a la ruta:

```ts
trackRouter.post(
  "/",
  validate(createTrackSchema, "body"),
  createTrackController
);
```

I el controller quedarà més net:

```ts
export async function createTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const createdTrack = await createTrack(req.body);

    return res.status(201).json(createdTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

---
# Què no farem encara?

En aquest punt encara no crearem un error handler global.

El middleware `validate` retornarà directament el `400 Bad Request`.

Més endavant millorarem la gestió d'errors perquè tots els errors passin per un únic lloc.

Tampoc farem encara respostes d'error molt detallades.

De moment retornarem una resposta simple:

```json
{
  "message": "Invalid request data"
}
```

---
# Què hem aconseguit?

Amb aquest punt aconseguirem:

```text
evitar repetir validacions dins dels controllers
centralitzar la validació amb Zod
netejar els controllers
preparar el projecte per a un error handler global
```

El controller tornarà a centrar-se en la seva responsabilitat principal.

La ruta decidirà quines validacions cal aplicar abans d'arribar al controller.

---

# Pràctica

## Tasca

Crea un middleware `validate` que permeti validar dades amb Zod abans d'executar un controller.

L'aplicarem a les rutes de tracks.

---

## Requisits

El projecte ha de complir aquests requisits:

```text
s'ha de crear un middleware validate
el middleware ha de rebre un schema de Zod
el middleware ha de poder validar body, params o query
les rutes han d'utilitzar validate
els controllers ja no han de fer safeParse
POST /tracks ha de validar req.body
PUT /tracks/:id ha de validar req.params i req.body
GET /tracks/:id ha de validar req.params
DELETE /tracks/:id ha de validar req.params
el projecte ha de compilar sense errors
```

---

## 1. Crear la carpeta de middlewares

Crea la carpeta:

```text
src/middlewares
```

Dins d'aquesta carpeta crea el fitxer:

```text
src/middlewares/validate.ts
```

---

## 2. Crear el middleware `validate`

Afegeix aquest codi:

```ts
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

type RequestSource = "body" | "params" | "query";

export function validate(
  schema: ZodSchema,
  source: RequestSource
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const validationResult = schema.safeParse(req[source]);

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid request data"
      });
    }

    next();
  };
}
```

Aquest middleware rep dos paràmetres:

```text
schema → schema de Zod
source → part de la request que volem validar
```

Per exemple:

```ts
validate(createTrackSchema, "body")
```

valida:

```ts
req.body
```

I:

```ts
validate(idParamSchema, "params")
```

valida:

```ts
req.params
```

---

## 3. Revisar els schemas

Has de tenir els schemas separats.

Per exemple:

```text
src/validators/track/createTrackSchema.ts
src/validators/params/idParamSchema.ts
```

El schema per crear tracks:

```ts
import { z } from "zod";

export const createTrackSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required"
  }),

  artistId: z.string().uuid({
    message: "Artist id must be a valid UUID"
  }),

  albumId: z
    .string()
    .uuid({
      message: "Album id must be a valid UUID"
    })
    .nullable()
    .optional(),

  durationSeconds: z
    .number({
      message: "Duration must be a number"
    })
    .int({
      message: "Duration must be an integer"
    })
    .positive({
      message: "Duration must be greater than 0"
    })
});
```

El schema genèric per validar `/:id`:

```ts
import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().uuid({
    message: "Id must be a valid UUID"
  })
});
```

---

## 4. Aplicar el middleware a les rutes

Obre el fitxer:

```text
src/routes/trackRoutes.ts
```

Importa el middleware i els schemas:

```ts
import { Router } from "express";
import {
  getTracksController,
  getTrackByIdController,
  createTrackController,
  updateTrackController,
  deleteTrackController
} from "../controllers/trackController";
import { validate } from "../middlewares/validate";
import { createTrackSchema } from "../validators/track/createTrackSchema";
import { idParamSchema } from "../validators/params/idParamSchema";
```

Ara modifica les rutes:

```ts
export const trackRouter = Router();

trackRouter.get("/", getTracksController);

trackRouter.get(
  "/:id",
  validate(idParamSchema, "params"),
  getTrackByIdController
);

trackRouter.post(
  "/",
  validate(createTrackSchema, "body"),
  createTrackController
);

trackRouter.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(createTrackSchema, "body"),
  updateTrackController
);

trackRouter.delete(
  "/:id",
  validate(idParamSchema, "params"),
  deleteTrackController
);
```

Ara la validació es fa abans d'arribar al controller.

---

## 5. Netejar `getTrackByIdController`

Abans el controller feia:

```ts
const paramsValidation = idParamSchema.safeParse(req.params);

if (!paramsValidation.success) {
  return res.status(400).json({
    message: "Invalid track id"
  });
}

const id: string = paramsValidation.data.id;
```

Ara ja no cal.

La ruta ja ha validat `req.params`.

El controller pot quedar així:

```ts
export async function getTrackByIdController(
  req: Request,
  res: Response
): Promise<Response> {
  const id: string = req.params.id;

  try {
    const track: TrackDto | null = await findTrackById(id);

    if (!track) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(200).json(track);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

---

## 6. Netejar `createTrackController`

Abans el controller feia:

```ts
const bodyValidation = createTrackSchema.safeParse(req.body);

if (!bodyValidation.success) {
  return res.status(400).json({
    message: "Invalid track data"
  });
}
```

Ara ja no cal.

La ruta ja valida `req.body`.

El controller pot quedar així:

```ts
export async function createTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const createdTrack: TrackDto = await createTrack(req.body);

    return res.status(201).json(createdTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

---

## 7. Netejar `updateTrackController`

Ara `PUT /tracks/:id` té dues validacions a la ruta:

```ts
validate(idParamSchema, "params"),
validate(createTrackSchema, "body"),
```

Per tant, el controller pot quedar així:

```ts
export async function updateTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  const id: string = req.params.id;

  try {
    const updatedTrack: TrackDto | null = await updateTrack(id, req.body);

    if (!updatedTrack) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(200).json(updatedTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

---

## 8. Netejar `deleteTrackController`

```ts
export async function deleteTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  const id: string = req.params.id;

  try {
    const deleted: boolean = await deleteTrack(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

---

## 9. Controller complet orientatiu

El controller queda més net perquè ja no importa schemas ni fa `safeParse`.

```ts
import { Request, Response } from "express";
import {
  createTrack,
  deleteTrack,
  findTrackById,
  getAllTracks,
  updateTrack
} from "../services/trackService";
import { TrackDto } from "../types/track/trackDTO";

export async function getTracksController(
  _req: Request,
  res: Response
): Promise<Response> {
  try {
    const tracks: TrackDto[] = await getAllTracks();

    return res.status(200).json(tracks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function getTrackByIdController(
  req: Request,
  res: Response
): Promise<Response> {
  const id: string = req.params.id;

  try {
    const track: TrackDto | null = await findTrackById(id);

    if (!track) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(200).json(track);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function createTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const createdTrack: TrackDto = await createTrack(req.body);

    return res.status(201).json(createdTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function updateTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  const id: string = req.params.id;

  try {
    const updatedTrack: TrackDto | null = await updateTrack(id, req.body);

    if (!updatedTrack) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(200).json(updatedTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function deleteTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  const id: string = req.params.id;

  try {
    const deleted: boolean = await deleteTrack(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
```

---

## 10. Provar `GET /tracks/:id` amb id incorrecte

Executa:

```bash
curl http://localhost:3000/tracks/abc
```

Resposta esperada:

```json
{
  "message": "Invalid request data"
}
```

Codi HTTP esperat:

```text
400 Bad Request
```

Aquesta resposta ara la retorna el middleware, no el controller.

---

## 11. Provar `POST /tracks` amb body incorrecte

```bash
curl -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "",
    "artistId": "queen",
    "durationSeconds": -20
  }'
```

Resposta esperada:

```json
{
  "message": "Invalid request data"
}
```

---

## 12. Provar `POST /tracks` amb body correcte

```bash
curl -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Don'\''t Stop Me Now",
    "artistId": "ID_ARTISTA_VALID",
    "albumId": null,
    "durationSeconds": 209
  }'
```

Resposta esperada:

```text
201 Created
```

I el track creat en format `TrackDto`.

---

## 13. Provar `PUT /tracks/:id`

Amb id incorrecte:

```bash
curl -X PUT http://localhost:3000/tracks/abc \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Don'\''t Stop Me Now",
    "artistId": "ID_ARTISTA_VALID",
    "albumId": null,
    "durationSeconds": 209
  }'
```

Resposta esperada:

```json
{
  "message": "Invalid request data"
}
```

Amb body incorrecte:

```bash
curl -X PUT http://localhost:3000/tracks/ID_TRACK_VALID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "",
    "artistId": "incorrecte",
    "durationSeconds": 0
  }'
```

Resposta esperada:

```json
{
  "message": "Invalid request data"
}
```

---

## 14. Provar `DELETE /tracks/:id`

```bash
curl -X DELETE http://localhost:3000/tracks/abc
```

Resposta esperada:

```json
{
  "message": "Invalid request data"
}
```

---

## 15. Compilar

Executa:

```bash
npm run build
```

Si apareixen errors, revisa especialment:

```text
import de validate
import de ZodSchema
import de createTrackSchema
import de idParamSchema
controllers que encara importen schemas
controllers que encara fan safeParse
```

---

# Errors habituals

## Error 1: el controller encara fa `safeParse`

Després d'aquest punt, la validació ja no hauria d'estar dins del controller.

El controller no hauria de tenir imports com:

```ts
import { createTrackSchema } from "../validators/track/createTrackSchema";
import { idParamSchema } from "../validators/params/idParamSchema";
```

Aquests imports ara han d'estar a les rutes.

---

## Error 2: s'ha oblidat `next()`

Si el middleware valida correctament però no crida `next()`, la petició quedarà aturada.

El middleware ha d'acabar així:

```ts
next();
```

quan la validació és correcta.

---

## Error 3: s'ha aplicat el schema al lloc incorrecte

Aquesta ruta és correcta:

```ts
trackRouter.post(
  "/",
  validate(createTrackSchema, "body"),
  createTrackController
);
```

Aquesta no:

```ts
trackRouter.post(
  "/",
  validate(createTrackSchema, "params"),
  createTrackController
);
```

`createTrackSchema` valida el body, no els params.

---

## Error 4: l'ordre dels middlewares a `PUT`

En aquesta ruta:

```ts
trackRouter.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(createTrackSchema, "body"),
  updateTrackController
);
```

primer validem l'id i després el body.

També podria funcionar en ordre invers, però aquest ordre és més natural perquè l'id forma part de la URL.

---

# Entrega

La pràctica ha d'incloure:

```text
middleware validate creat
validació de params amb idParamSchema
validació de body amb createTrackSchema
rutes actualitzades
controllers sense safeParse
POST /tracks validat pel middleware
PUT /tracks/:id validat pel middleware
GET /tracks/:id validat pel middleware
DELETE /tracks/:id validat pel middleware
projecte compilant sense errors
```

---

# Comprovació final

Executa:

```bash
npm run build
```

Després:

```bash
npm run dev
```

I prova:

```text
GET /tracks/abc
POST /tracks amb body incorrecte
PUT /tracks/abc
DELETE /tracks/abc
```

Totes aquestes peticions han de retornar:

```text
400 Bad Request
```

amb una resposta semblant a:

```json
{
  "message": "Invalid request data"
}
```

També comprova que les peticions correctes continuen funcionant.

---

# Resultat esperat

Al final d'aquest punt, la validació ja no estarà repartida dins dels controllers.

Ara les rutes indiquen clarament quines dades s'han de validar abans d'arribar al controller.

Per exemple:

```ts
trackRouter.post(
  "/",
  validate(createTrackSchema, "body"),
  createTrackController
);
```

Aquesta lectura és molt clara:

```text
per crear un track, primer valida el body i després executa el controller
```

Aquest és un pas important cap a una arquitectura més professional.

El següent pas serà millorar encara més la gestió dels errors amb un error handler global.


```


// Nom fitxer: Teoria/Part 6 - Autenticació i Seguretat de l'Usuari/T06.01 Registre d'usuaris i hashing de contrasenyes (bcrypt).md
```ts


# Registre d'usuaris i hashing de contrasenyes (bcrypt)

# Teoria

## Objectiu

En aquest punt iniciarem el bloc d'autenticació creant el sistema de registre d'usuaris. Aprendrem a desar els usuaris a la base de dades de forma segura, entenent per què **mai** s'han de guardar les contrasenyes en text pla i com utilitzar l'algorisme `bcrypt` per protegir-les.

---
# Per què és perillós desar contrasenyes en text pla?

Si guardem la contrasenya tal com l'escriu l'usuari (per exemple, `123456`), qualsevol persona amb accés a la base de dades (administradors, programadors o un atacant que hagi aconseguit una còpia de la BD) podria veure les contrasenyes de tothom.

A més, hi ha el perill de la **reutilització de contrasenyes**: molts usuaris fan servir la mateixa contrasenya a diferents webs. Si la nostra base de dades es filtra, posaríem en perill els seus comptes de correu, xarxes socials, etc.

---
# Què és el Hashing i com funciona Bcrypt?

Una funció de hash és un algorisme matemàtic que agafa una entrada (la contrasenya) i en genera una cadena de caràcters de longitud fixa que és **impossible de desxifrar en sentit invers**.

```text
Contrasenya en text pla ("123456") ───> [ Funció Hash ] ───> Cadena xifrada ("$2b$10$X...")

```
Per fer-ho encara més segur, `bcrypt` utilitza una tècnica anomenada **Salt** (sal). Abans de calcular el hash, afegeix uns caràcters aleatoris a la contrasenya. Això fa que, encara que dos usuaris tinguin la mateixa contrasenya (`123456`), els seus hashes guardats a la base de dades seran completament diferents.

---
# El model de dades de l'Usuari

A la base de dades Microsoft SQL Server, la taula `Users` tindrà la següent estructura bàsica:

* `id`: `UNIQUEIDENTIFIER` (Generat automàticament com a clau primària).
* `email`: `NVARCHAR(256)` (Únic, no es poden repetir correus).
* `passwordHash`: `NVARCHAR(60)` (L'espai exacte que necessita un hash de `bcrypt`).
* `createdAt`: `DATETIME` (Data de registre).

A nivell d'API, quan un usuari es registri, ens enviarà un `CreateUserInput`:

```json
{
  "email": "alumne@musiccloud.com",
  "password": "ContrasenyaSegura123"
}
```
El servidor agafarà la `password`, en calcularà el `passwordHash` amb `bcrypt`, i desarà a la base de dades l'`email` i el `passwordHash`. **La contrasenya original es destrueix immediatament de la memòria del servidor.**

---
# Flux de control amb gestió d'errors operacionals

Si un usuari es vol registrar amb un correu que ja existeix a la base de dades, el servei ho detectarà i llançarà un `BadRequestError`. El controlador no s'haurà de preocupar de res més que de respondre un codi `210 Created` si tot va bé.

```text
Petició POST /auth/register 
      ↓
Validació Zod (Email vàlid i contrasenya segura)
      ↓
Controller (Crida al servei)
      ↓
Service (Comprova si l'email existeix. Si existeix ──> throw BadRequestError)
      ↓
Generació del Hash amb bcrypt i INSERT a SQL Server
      ↓
Resposta 201 Created (Sense retornar mai el passwordHash!)
```
---

# Pràctica

## Tasca

Instal·lar la llibreria `bcrypt`, crear les rutes, els esquemes de validació de Zod, el servei i el controlador per permetre el registre d'usuaris a l'API de MusicCloud.

---
## Requisits

```text
Instal·lar bcrypt i els seus corresponents tipus per a TypeScript.
Crear el fitxer d'esquema de validació per a l'usuari amb Zod.
Crear UserDto per evitar retornar el hash de la contrasenya en la resposta.
Crear userService.ts amb la lògica de comprovació de duplicats i hashing.
Crear authController.ts i la seva ruta /auth/register.
```
---
## Instal·lar Bcrypt

Executa a la terminal del projecte per instal·lar la llibreria i els tipus de TypeScript:

```bash
npm install bcrypt
npm install --save-dev @types/bcrypt

```
---
## Crear els Types i DTO d'Usuari

La nostra base de dades ja conté una taula Users amb la següent estructura

```sql
  id UNIQUEIDENTIFIER
  username NVARCHAR(100)
  email NVARCHAR(255)
  password NVARCHAR(30)
  createdAt DATETIME2
```
Necessitem crear 
Crea el fitxer `src/types/user/user.ts` per definir les estructures de dades:

```ts
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  email: string;
}

```

---

## 3. Crear l'esquema de validació amb Zod

Crea el fitxer `src/middlewares/validators/user/userSchema.ts`. Validarem que l'email sigui correcte i que la contrasenya tingui una longitud mínima de seguretat (per exemple, 6 caràcters).

```ts
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email({
    message: "Must be a valid email address"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long"
  })
});

```

---

## 4. Crear el Servei d'Usuaris (`userService.ts`)

Crea el fitxer `src/services/userService.ts`. Aquí comprovarem si el correu ja està registrat fent una consulta SQL. Si ja existeix, utilitzarem el nostre `BadRequestError`. Si és lliure, encriptarem la contrasenya amb `bcrypt.hash()` utilitzant un factor de cost de 10 rutes (recomanat).

```ts
import { getConnectionPool, sql } from "../config/database";
import { CreateUserInput, UserDto } from "../types/user/user";
import { BadRequestError } from "../errors/appError";
import bcrypt from "bcrypt";
import { ConnectionPool, IResult } from "mssql";

import { getConnectionPool, sql } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import bcrypt from "bcrypt";
import { CreateUserInput } from "../types/user/createUser";
import { UserDto } from "../types/user/userDTO";
import { BadRequestError } from "../types/error/custom/notFoundError";


export async function registerUser(input: CreateUserInput): Promise<UserDto> {
  const pool: ConnectionPool = await getConnectionPool();

  // Comprovar si l'username ja existeix
    const userCheckUsername: IResult<{ id: string }> = await pool
    .request()
    .input("username", sql.NVarChar(256), input.username)
    .query<{ id: string }>("SELECT id FROM Users WHERE username = @username");

  if (userCheckUsername.recordset.length > 0) {
    throw new BadRequestError("An account with this username already exists");
  }

  // Generar el Hash de la contrasenya de forma asíncrona
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(input.password, saltRounds);

  // 3. Insertar l'usuari a la Base de Dades
  const insertResult: IResult<{ id: string, email: string }> = await pool
    .request()
    .input("username", sql.NVarChar(100), input.username)
    .input("email", sql.NVarChar(255), input.email)
    .input("passwordHash", sql.NVarChar(60), hashedPassword)
    .query<{ id: string, email: string }>(`
      INSERT INTO Users (username, email, password)
      OUTPUT CONVERT(NVARCHAR(36), INSERTED.id) AS id, INSERTED.email
      VALUES (@username, @email, @passwordHash);
    `);


  const createdId:string = insertResult.recordset[0].id;

  const createdUser:UserDto | null = await findUserById(createdId);

  if (!createdUser) {
    throw new Error("User was created but could not be retrieved.");
  }

  return createdUser;
}
}

```

Un dels requisits de l'aplicació és que l'email és únic per a cada usuari.

---

## 5. Crear el Controlador (`authController.ts`)

Crea el fitxer `src/controllers/authController.ts`. Com pots veure, el controlador és netíssim. Només té el camí feliç ($201$) i delega qualsevol error al `next(error)`.

```ts
import { NextFunction, Request, Response } from "express";
import { registerUser } from "../services/userService";
import { UserDto } from "../types/user/user";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const newUser: UserDto = await registerUser(req.body);
    
    // Retornem 201 Created amb les dades de l'usuari (sense contrasenya)
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

```

---

## 6. Crear les rutes d'Autenticació i connectar-les a l'App

Crea el fitxer `src/routes/authRoutes.ts`:

```ts
import { Router } from "express";
import { registerController } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../middlewares/validators/user/userSchema";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema, "body"), registerController);

```

Finalment, obre `src/app.ts` i afegeix la nova ruta base per a l'autenticació:

```ts
import { authRouter } from "./routes/authRoutes";

// ... sota de la ruta de tracks
app.use("/auth", authRouter);

```

---

# Entrega

La pràctica ha d'incloure:

```text
- Taula 'Users' creada a la base de dades SQL Server mitjançant un script de migració o consulta.
- Prova amb Postman o cURL enviant un registre vàlid (Comprovar que respon 201 i el JSON no té contrasenya).
- Prova enviant el mateix correu per segona vegada (Comprovar que l'errorHandler respon automàticament un 400 Bad Request amb el codi intern VALIDATION_ERROR o el missatge de correu duplicat).
- Captura de pantalla de la base de dades comprovant que el camp passwordHash conté el text encriptat (comença per $2b$...) i no la contrasenya original.

```

```


// Nom fitxer: Teoria/Part 6 - Autenticació i Seguretat de l'Usuari/T06.04 Creació de playlists per l'usuari autenticat.md
```ts


# Creació de carpetes de cançons per a l'usuari autenticat

Un com tenim el nostre sistema de rutes protegit i sabem exactament quin usuari està interactuant amb l'API gràcies a `req.user`, podem començar a desenvolupar funcionalitats privades complexes.

En aquest punt, crearem l'endpoint per permetre que un usuari registrat i autenticat pugui **crear les seves pròpies carpetes de cançons** a MusicCloud per organitzar la seva música.

---
# Fonaments Teòrics

## Relacions a la Base de Dades: Qui és el propietari?

Quan un usuari crea una carpeta, aquesta no neix del no-res; ha d'estar vinculada obligatòriament a l'usuari que l'ha generat. A la base de dades, això es tradueix en una relació **1 a N** (Un usuari pot tenir moltes carpetes, però una carpeta pertany a un sol usuari).

Per aconseguir-ho, la taula `Playlists` (que a nivell de base de dades actua com el contenidor de la carpeta) té una columna anomenada **`userId`** que funciona com a **Clau Estrangera (Foreign Key)** apuntant directament a la taula `Users`.

## El paper del JWT en les accions de l'usuari

Un error habitual quan es comença a dissenyar APIs REST és demanar l'ID de l'usuari directament al cos de la petició JSON (`req.body`). Per exemple, enviar: `{"name": "Rock 80s", "userId": "4abc..."}`.

**Això és un greu problema de seguretat.** Si ho fessim així, un usuari malintencionat podria manipular la petició i posar-hi l'ID d'una altra persona, creant carpetes en el seu nom o robant-li espai.

La regla d'or de la seguretat en APIs REST és: **Mai confiïs en l'ID que enviï el client de forma explícita al body si l'acció és privada**. L'ID de l'usuari s'ha d'extreure **sempre** del token JWT desxifrat que el nostre middleware d'autenticació ha injectat de manera segura a `req.user`.

---
# L'Arquitectura: Com es connecten les peces?

Per tal de dissenyar un codi net, modular i segur, hem de tenir molt clara la divisió de tasques entre el **Controlador** (Capa d'Express / HTTP) i el **Servei** (Capa de Lògica de Negoci / Base de dades).

### 1. El Servei no ha de saber res d'Express

Un servei representa la lògica pura del teu negoci. No s'hauria de passar mai l'objecte `req` (Request) sencer d'Express al servei. El servei només ha de rebre les dades estrictament necessàries per operar (en aquest cas, les dades de la carpeta i un text amb l'ID de l'usuari). D'aquesta manera, si en un futur canviem de framework web, la lògica de base de dades seguirà intacta.

### 2. El Controlador actua com a "Traductor" i Filtre

La responsabilitat del Controlador és agafar la petició d'Express (`req`), desmuntar-la, separar el gra de la palla i passar-li les dades netes al servei:

* Rescata el **nom** i la **descripció** que viatgen de forma pública des del formulari (`req.body`).
* Rescata el **`userId`** que viatja protegit i invisible dins del token (`req.user.id`).

---
# Com es programa la Lògica de Carpetes?

## L'esquema de dades a la Base de Dades

La taula on guardarem les carpetes disposa dels següents camps:

```text
- id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
- name NVARCHAR(200) NOT NULL,
- description NVARCHAR(500) NULL,
- userId UNIQUEIDENTIFIER NOT NULL,
- createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

```

La nostra consulta d'inserció a la base de dades SQL necessitarà tant les dades del formulari com l'ID extret del token:

```sql
INSERT INTO Playlists (name, description, userId) 
VALUES (@name, @description, @userId);

```

> Les columnes `id` i `createdAt` les genera el propi motor de la base de dades automàticament gràcies als valors `DEFAULT` configurats.

---
## El Servei Conceptual

Al servei recollirem únicament els paràmetres nets que el controlador li enviï, aïllant-nos completament del protocol HTTP:

```ts
import { getConnectionPool, sql } from "../config/database";

// El servei rep l'input estructurat i l'ID del propietari
export async function createFolderConcept(input: CreateFolderInput, userId: string) {
  const pool = await getConnectionPool();
  
  // Inserim la carpeta vinculant-la al userId que prové del JWT desxifrat
  const result = await pool
    .request()
    ...
    .query(`
      INSERT INTO Playlists ....
    `);

  return result.recordset[0]; // Retorna l'objecte de la carpeta acabat de crear
}
```

---
## El Controlador: Unint les peces de forma segura

Aquí veiem com el controlador rep el `req` d'Express, extreu el `userId` que ha injectat el middleware d'autenticació i invoca el servei passant les dades correctament encapsulades:

```ts
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../types/error/custom/unauthorizedError";
import { CreateFolderInput, createFolderConcept } from "../services/playlistService";

export async function createFolderControllerConcept(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {

  try {
    // 1. Seguretat activa: El middleware d'autenticació ha d'haver injectat l'usuari
    if (!req.user || !req.user.id) {
      throw new UnauthorizedError("User session not found or invalid token");
    }

    // 2. Extreure l'ID de l'usuari del token i mapejar el body al tipus d'entrada escalable
    const userId = req.user.id as string;
    const input: CreateFolderInput = req.body; 

    // 3. Cridar al servei passant l'objecte d'entrada i l'ID de l'usuari
    const createdFolder = await createFolderConcept(input, userId);
    
    // 4. Respondre amb el codi d'èxit 201 Created i l'objecte resultant
    return res.status(201).json(createdFolder);
  } catch (error) {
      // Qualsevol error detectat es desvia al gestor d'errors d'Express
      next(error);
  }
}
```

---

```


// Nom fitxer: Teoria/Part 6 - Autenticació i Seguretat de l'Usuari/T06.02 Login i generació de JSON Web Tokens (JWT).md
```ts


# Login i generació de JSON Web Tokens (JWT)

En una API REST, el servidor no té memòria (stateless). Això vol dir que no guarda sessions a la memòria del servidor per saber qui ets. En lloc d'això, quan fas un Login correcte, el servidor et dona una "tarjeta d'identitat" digital anomenada JWT. A partir d'aquell moment, el client enviarà aquesta targeta a cada petició.

---
# Fonaments Teòrics

## El flux d'autenticació

1. El client envia les seves credencials (usuari/contrasenya) a un endpoint públic de l'API.

2. Si les credencials són vàlides, el servidor genera una "targeta d'identitat" digital xifrada (el **JWT**) i la retorna al client.

3. El client l'emmagatzema i **envia aquesta targeta en la capçalera de cada petició subsegüent**.

4. Si el JWT és correcte i vigent, el servidor executa el codi de l'endpoint sol·licitat.

## Anatomia d'un JWT

Un JSON Web Token és un text compacte codificat en **Base64** format per tres parts separades per un punt (`.`):

1. **Header (Capçalera):** Especifica el tipus de token (`JWT`) i l'algorisme de xifratge/signatura utilitzat (ex: `HS256`).

2. **Payload (Cos):** Conté la informació de l'usuari que volem transmetre (anomenada *claims*), com ara el seu `id` o `role`. **Mai s'hi han d'incloure dades sensibles com la contrasenya**.

3. **Signature (Signatura):** És el mecanisme de seguretat. Es calcula agafant el *Header*, el *Payload* i una **clau secreta** allotjada exclusivament al servidor, passant-ho tot per l'algorisme de xifratge. Si algú manipula el Payload en el client, la signatura quedarà invalidada immediatament.

---

# Teoria en Codi: Com es programa un Login?

## Instal·lació de dependències

Per treballar amb JWT a Node.js necessitem la llibreria core i els seus tipus de desenvolupament:

```bash
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken

```

> Utilitzem l'argument `--save-dev` perquè `@types/jsonwebtoken` no conté codi d'execució en producció; només serveix perquè l'editor de codi sàpiga validar els tipus de dades durant el desenvolupament.

---
## La lògica del Servei (Exemple base per *Username*)

Quan dissenyem un servei d'autenticació, la base de dades s'ha de consultar utilitzant l'identificador triat i cal verificar la contrasenya de forma segura asíncrona amb `bcrypt`:

```ts
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getConnectionPool, sql } from "../config/database";
import { BadRequestError } from "../types/error/custom/badRequestError";

// Exemple conceptual buscant per USERNAME:
export async function loginUserConcept(input: any) {
  const pool:ConnectionPool = await getConnectionPool();
  
  // 1. Obtenir l'usuari i el seu password xifrat
  const result:IResult<User> = await pool
    .request()
    .input("email", sql.NVarChar(256), input.email)
    .query(`SELECT id, username, email, password FROM Users WHERE email = @email`);
    
  const userRow:User | undefined = result.recordset[0];
  if (!userRow) {
    throw new UnauthorizedError("Invalid credentials"); // Error genèric per seguretat
  }

  // 2. Comparar contrasenyes (No xifrada vs Xifrada en BD)
  const isPasswordValid:boolean = await bcrypt.compare(input.password, userRow.passwordHash);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  // 3. Generar el Token utilitzant les variables d'entorn
  const jwtSecret:string | undefined = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET missing");

  const expiresIn: string = process.env.JWT_EXPIRES_IN || "1h"; // Si no s'especifica JWT_EXPIRES_IN, s'estableix la caducitat en 1 hora

  const payload: JwtPayload = { id: userRow.id as string, username: userRow.username as string,  email: userRow.email as string };
  
  // La funció jwt.sign() s'encarrega d'ajuntar el payload, el secret i les opcions
  const token = jwt.sign(
    payload, jwtSecret as string, { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }
  );

  const user:UserDto = await findUserById(userRow.id as string) as UserDto;

  return { token, user: user };
}
```

---
## Gestió d'Errors en Autenticació (HTTP 401)

Fins ara hem utilitzat BadRequestError (HTTP 400) quan les dades enviades pel client estaven mal formades o eren incorrectes. No obstant això, l'estàndard HTTP especifica que quan un usuari no es pot autenticar de forma vàlida (com fallar el login o passar un token caducat), l'API ha de respondre amb un codi 401 Unauthorized.

Això ens obliga a estendre la nostra arquitectura d'errors creant una nova classe específica (UnauthorizedError) associada a un nou codi de l'enum d'errors del sistema.

```


// Nom fitxer: Teoria/Part 6 - Autenticació i Seguretat de l'Usuari/T06.03. Middleware d'autenticació.md
```ts


# Middleware d'autenticació (JWT Middleware)

Un cop tenim el sistema de Login que genera tokens JWT, necessitem una manera de **protegir les nostres rutes privades** (per exemple, pujar una cançó o veure el perfil de l'usuari). Com que l'API és *stateless*, el servidor ha de comprovar en cada petició si el client està enviant un token vàlid abans de deixar-lo passar al controlador. Per fer aquesta verificació automàtica abans d'arribar a la lògica de negoci, utilitzem un **Middleware d'Express**.

---
# Fonaments Teòrics

## El flux de protecció de rutes

1. El client fa una petició a una ruta protegida (ex: `GET /users/me`).

2. Per demostrar la seva identitat, el client ha d'adjuntar el JWT a la capçalera de la petició HTTP, concretament a la capçalera anomenada **`Authorization`**.

3. El format gratuït i estàndard d'aquesta capçalera és: `Authorization: Bearer <TOKEN>`. La paraula *Bearer* significa literalment "portador".

4. El **JWT Middleware** s'interposa en la petició, intercepta la capçalera, extreu el token, en verifica la validesa i la signatura utilitzant la clau secreta del servidor (`JWT_SECRET`).

5. **Si el token és vàlid**, el middleware "injecta" les dades de l'usuari (el *payload*) dins de l'objecte de petició d'Express (`req.user`) i executa la funció `next()`. Així, el controlador final ja sap exactament quin usuari està operant.

6. **Si el token no és vàlid** (ha caducat, està manipulat o no existeix), el middleware talla la petició immediatament i respon amb un error **401 Unauthorized**.

---
# Com es programa el Middleware?

## Extensió dels tipus d'Express (Declaration Merging)

Per defecte, l'objecte `Request` d'Express conté propietats estàndard com `body` o `params`, però no sap què és `req.user`. Per evitar errors de TypeScript, hem d'ampliar la interfície d'Express.

En lloc de crear un tipus nou, utilitzarem una tècnica de TypeScript anomenada **Declaration Merging** (Fusió de Declaracions). Això ens permet injectar una nova propietat dins d'una interfície que ja existeix, utilitzant exactament el mateix tipus `JwtPayload` de `jsonwebtoken` 

```ts
const payload:JwtPayload = { id: userRow.id as string, username: userRow.username as string, email: userRow.email as string };` 
```

que vam fer servir per empaquetar les dades al Login:

```ts
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// Estenem globalment la interfície Request d'Express que ja existeix a node_modules
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Afegim la propietat de forma opcional
    }
  }
}
```

---
## La lògica del Middleware d'autenticació

El middleware és una funció estàndard d'Express amb els paràmetres `(req, res, next)`. S'encarrega d'aixecar la catifa, mirar si hi ha token, validar-lo i descodificar-ne el contingut:

```ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../types/error/custom/unauthorizedError";

export function authenticateJWTConcept(req: Request, res: Response, next: NextFunction) {
  // 1. Obtenir la capçalera Authorization
  const authHeader = req.headers.authorization;

  // 2. Validar que la capçalera existeixi i comenci per 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Access denied. No token provided.");
  }

  // 3. Extreure el token (separant el text per l'espai en blanc)
  const token = authHeader.split(" ")[1];

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET missing in environment variables");

    // 4. Verificar el token amb la clau secreta
    // Si ha expirat o s'ha manipulat, jwt.verify llançarà un error directament
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // 5. Injectar el payload desxifrat a la petició perquè el controlador el pugui fer servir
    req.user = decoded;

    // 6. Permetre el pas al següent middleware o controlador
    next();
  } catch (error) {
    // Si jwt.verify falla (per caducitat o manipulació), passem el nostre UnauthorizedError (401)
    next(new UnauthorizedError("Invalid or expired token."));
  }
}

```

---
# Pràctica

Implementació del Middleware d'Autenticació al MusicCloud

# Objectiu

Has d'implementar el mecanisme de protecció de rutes de la teva aplicació **MusicCloud**. Crearàs el middleware de verificació de tokens i l'aplicaràs per protegir un nou endpoint de l'usuari: `GET /users/me`, que retornarà el perfil de l'usuari autenticat actualment.

Hauràs de completar els següents fitxers seguint l'arquitectura del teu projecte.

---
# Declaració de Tipus Global

Crea el fitxer `src/types/express-user-extension.d.ts` per tal que TypeScript reconegui la propietat `user` de tipus `JwtPayload` dins de l'objecte `req` de les teves peticions. 

```ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

```

Per tal que el compilador sàpiga on localitzar aquest fitxer, li hem d'especificar en la configuració de TypeScript.

Fitxer: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "sourceMap": false,
    "declaration": false
  },
  "include": ["src","src/types/express-user-extension.d.ts"]
}

```


---
# Desenvolupament del Middleware

Crea el fitxer `src/middlewares/authMiddleware.ts` i implementa la funció `authenticateJWT`.

* Ha d'extreure el token de la capçalera `Authorization` de manera segura.
* Ha de verificar la signatura usant `process.env.JWT_SECRET`.
* En cas que el token sigui correcte, l'ha de desar a `req.user` (que ara estarà tipat com a `JwtPayload`) i cridar a `next()`.
* En cas de fallada (token absent, mal formatat o caducat), ha de passar un `UnauthorizedError` (HTTP 401) mitjançant la funció `next(error)` per tal que el teu gestor d'errors global es faci càrrec de la resposta.

---
# Controladors i Enrutament Protegit

Per provar que el middleware funciona correctament, crearem la ruta "El meu perfil".
## Endpoint al controlador (`src/controllers/userController.ts`)

Afegeix o crea la funció `getMeController`. Aquesta funció ha de:

1. Recuperar el `id` de l'usuari que el middleware ha hagut d'injectar prèviament a `req.user`. Com que `req.user` és un `JwtPayload`, pots accedir directament a `req.user.id`.
2. Si per alguna raó `req.user` no existeix, llançar un `UnauthorizedError`.
3. Invocar la funció `findUserById(req.user.id)` que ja tens programada al teu `userService`.
4. Respondre amb un status **200 OK** enviant les dades de l'usuari (`UserDto`).

## Registrar la ruta protegida (`src/routes/userRoutes.ts`)

Registra la ruta de tipus `GET` apuntant a `/me`. Aplica-li el middleware que acabes de crear com a pas intermediari abans d'arribar al controlador.

```ts
import { Router } from "express";
import { getMeController } from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

// L'usuari ha de passar primer pel "peatge" de l'authenticateJWT
router.get("/me", authenticateJWT, getMeController);

export default router;

```

## Comprovar codi

Quan cridem a una ruta privada, cal enviar el token en la petició. Utilitzem l'argument `-H` de la comanda curl per a especificar el Token. 

```bash
curl -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer EL_TEU_JWT_AQUÍ"
``` 



```


// Nom fitxer: Teoria/Part 6 - Autenticació i Seguretat de l'Usuari/T06.05 Protecció de recursos i control d'accés.md
```ts


Hem d'assegurar-nos que **només el propietari d'un recurs pugui modificar-lo o esborrar-lo**. En alguns casos, es voldrà limitar també la lectura.
# Protecció de recursos i control d'accés (Ownership)

Fins ara hem aconseguit que només els usuaris registrats puguin crear carpetes de cançons. Però, què passa si un usuari autenticat intenta modificar o esborrar una carpeta que pertany a un **altre** usuari?

Si l'únic que comprovem és que el token JWT sigui vàlid, qualsevol usuari del sistema podria esborrar les llistes de reproducció de la resta de companys simplement endevinant-ne l'ID a la ruta (ex: `DELETE /playlists/5`). Per evitar-ho, hem d'implementar el control de **Propietat (Ownership)**.

---
# Fonaments Teòrics

## Autenticació vs. Autorització

És molt important no confondre aquests dos conceptes clau en seguretat informàtica:

* **Autenticació (Qui ets?):** El middleware `authenticateJWT` comprova que el token és vàlid i ens diu: *"Sí, aquest usuari és en Joan"*.

* **Autorització (Què pots fer?):** Un cop sabem que és en Joan, el sistema ha de comprovar si en Joan té permís per fer l'acció que demana. En el nostre cas: *"Té permís en Joan per esborrar la carpeta X?"*.

## El principi de control d'accés basat en la propietat

En una plataforma com MusicCloud, les carpetes de cançons són privades i personals. Per tant, l'autorització es regeix per una norma molt senzilla: **El `userId` de l'usuari que fa la petició ha de coincidir exactament amb el `userId` que hi ha guardat a la base de dades com a propietari d'aquella carpeta.**

El flux de control d'accés quan es demana modificar o eliminar un recurs segueix aquests passos:

1. El client demana una acció (ex: `DELETE /playlists/:id`).
2. El middleware d'autenticació extreu el `req.user.id` del token.
3. El sistema fa una consulta prèvia a la base de dades per buscar la carpeta sol·licitada.
4. **Es comparen els IDs:** * Si `carpeta.userId === req.user.id` $\rightarrow$ Es permet l'acció.
* Si `carpeta.userId !== req.user.id` $\rightarrow$ Es denega l'acció immediatament amb un error **403 Forbidden** (Prohibit).

---
# L'Arquitectura: On posem aquesta comprovació?

Hi ha dues maneres clàssiques de programar aquest control: a la consulta SQL o a la capa de negoci (Servei).

### Opció A: Directament a la consulta SQL

Podem fer que la sentència `UPDATE` o `DELETE` inclogui el `userId` a la clàusula `WHERE`.

```sql
DELETE FROM Playlists WHERE id = @id AND userId = @userId;

```

* **Avantatge:** És molt ràpid i eficient.

* **Inconvenient:** Si la fila no s'esborra, el gestor de base de dades simplement et dirà "0 files afectades". No sabràs si és perquè la carpeta no existia o perquè l'usuari no n'era l'amo, cosa que fa difícil retornar un error descriptiu al client.

### Opció B: Comprovació lògica al Servei 

Primer busquem la carpeta pel seu ID. Si existeix, comprovem si el `userId` coincideix.

* **Avantatge:** Ens permet gestionar els errors de forma impecable. Si la carpeta no existeix, llançem un `NotFoundError` (404). Si existeix però no és seva, llancem un `ForbiddenError` (403).

---
# Com es programa el Control de Propietat?

## El Nou Error Personalitzat: 403 Forbidden

A diferència del 401 (que significa que no sabem qui ets), el codi **403 Forbidden** significa: *"Sé perfectament qui ets, però no tens permís per tocar aquest recurs"*.


```


// Nom fitxer: Teoria/Part 3 - TypeScript professional/T03.04.Exportar app i separar server.ts.md
```ts


# Exportar `app` i separar `server.ts`

## Objectiu

En aquest punt separarem dues responsabilitats que fins ara estaven juntes dins del mateix fitxer:

```text
crear i configurar l'aplicació Express
arrencar el servidor amb app.listen()
```

Fins ara teníem una estructura semblant a aquesta:

```ts
const app: Express = express();

app.use(express.json());

app.get("/", ...);

app.use("/tracks", trackRouter);

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});
```

Això funciona, però no és l'estructura més adequada si volem fer créixer l'API, afegir tests o reutilitzar l'aplicació en altres contextos.

La millora consisteix a separar:

```text
app.ts      → crea i configura l'aplicació Express
server.ts   → arrenca el servidor
```

---
# Per què separar `app` i `server`?

Una API Express té dues parts diferents.
## L'aplicació Express

És l'objecte que conté la configuració de l'API:

```text
middlewares
rutes
endpoint GET /
trackRouter
configuració general
```

Això és l'`app`.
## El servidor

És el procés que posa l'aplicació a escoltar en un port concret:

```ts
app.listen(PORT, ...)
```

Això és el `server`.

Separar aquestes dues parts és útil perquè permet:

```text
tenir un codi més ordenat
reutilitzar app en tests
evitar que el servidor s'arrenqui automàticament quan importem app
separar configuració de l'API i execució del servidor
preparar millor el projecte per a una estructura professional
```

---
# Problema del fitxer únic

Si `index.ts` crea l'`app` i també fa `app.listen()`, passa això:

```text
cada vegada que importem aquest fitxer, el servidor s'arrenca
```

Això és un problema quan més endavant vulguem fer tests amb eines com Supertest.

En un test, ens interessarà importar l'aplicació:

```ts
import { app } from "../src/app";
```

però no volem que s'arrenqui un servidor real cada vegada.

Per això és millor exportar `app` sense fer `listen()` en el mateix fitxer.

---
# Nova estructura del projecte

Després d'aquest punt, l'estructura pot quedar així:

```text
src/
├── app.ts
├── server.ts
├── config/
│   ├── api.ts
│   └── environment.ts
├── controllers/
│   └── trackController.ts
├── data/
│   └── tracks.ts
├── routes/
│   └── trackRoutes.ts
├── services/
│   └── trackService.ts
└── types/
    └── ...
```

El fitxer `index.ts` ja no és necessari en aquesta estructura. Podem substituir-lo per:

```text
app.ts
server.ts
```

---

# Crear `app.ts`

El fitxer `app.ts` crearà i configurarà l'aplicació Express.

Fitxer:

```text
src/app.ts
```

```ts
import express, { Express, Request, Response } from "express";
import { apiInfo } from "./config/api";
import { getEnvironment } from "./config/environment";
import { trackRouter } from "./routes/trackRoutes";

export const app: Express = express();

app.use(express.json());

const environment = getEnvironment();

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    name: apiInfo.name,
    version: apiInfo.version,
    status: "OK",
    description: apiInfo.description,
    resources: apiInfo.resources,
    meta: {
      environment
    }
  });
});

app.use("/tracks", trackRouter);
```

Aquest fitxer fa tres coses:

```text
crea l'aplicació Express
configura els middlewares
registra les rutes
```

Però no arrenca el servidor.

Això és important.

---
# Exportar `app`

La línia clau és aquesta:

```ts
export const app: Express = express();
```

Això permet que altres fitxers puguin importar l'aplicació.

Per exemple, `server.ts` podrà fer:

```ts
import { app } from "./app";
```

Més endavant, els tests també podran importar-la:

```ts
import { app } from "../src/app";
```

Aquesta és la raó principal per exportar `app`.

---
# Crear `server.ts`

El fitxer `server.ts` només s'encarregarà d'arrencar el servidor.

Fitxer:

```text
src/server.ts
```

```ts
import { app } from "./app";

const PORT: number = 3000;

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});
```

Aquest fitxer té una responsabilitat molt clara:

```text
posar l'API a escoltar en un port
```

No defineix rutes.
No configura middlewares.
No conté lògica de negoci.

Només arrenca el servidor.

---
# Diferència entre `app.ts` i `server.ts`

| Fitxer      | Responsabilitat                         |
| ----------- | --------------------------------------- |
| `app.ts`    | Crear i configurar l'aplicació Express  |
| `server.ts` | Arrencar el servidor amb `app.listen()` |

Aquesta separació és petita, però molt important.

---
# Actualitzar els scripts del `package.json`

Com que ara el punt d'entrada ja no serà `src/index.ts`, hem d'actualitzar els scripts.

Abans podíem tenir:

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx src/index.ts",
    "dev:test": "cross-env NODE_ENV=test tsx src/index.ts",
    "build": "tsc",
    "start": "cross-env NODE_ENV=production node dist/index.js"
  }
}
```

Ara haurien de quedar així:

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx src/server.ts",
    "dev:test": "cross-env NODE_ENV=test tsx src/server.ts",
    "build": "tsc",
    "start": "cross-env NODE_ENV=production node dist/server.js"
  }
}
```

El canvi important és aquest:

```text
src/index.ts     → src/server.ts
dist/index.js    → dist/server.js
```

Un cop fet aquest canvi, el fitxer `index.ts` ja no és necessari.

---
# Codi abans i després

## Abans

```text
index.ts
  crea app
  configura express.json()
  defineix GET /
  registra trackRouter
  fa app.listen()
```

## Després

```text
app.ts
  crea app
  configura express.json()
  defineix GET /
  registra trackRouter

server.ts
  importa app
  fa app.listen()
```

El comportament extern de l'API no canvia.

---

# Per què això ajuda als tests?

Més endavant, quan fem tests amb Jest i Supertest, ens interessarà provar l'API sense arrencar manualment el servidor.

Amb aquesta estructura podrem fer una cosa semblant a:

```ts
import request from "supertest";
import { app } from "../src/app";

test("GET /tracks retorna la llista de tracks", async () => {
  const response = await request(app).get("/tracks");

  expect(response.status).toBe(200);
});
```

Això és possible perquè `app.ts` exporta l'aplicació sense fer `listen()`.

Si `app.listen()` estigués dins del mateix fitxer que importem, els tests podrien arrencar servidors de manera no controlada.

Encara no farem tests en aquest punt, però preparem el projecte per poder-ne fer més endavant.

---
# Què hem aconseguit?

En aquest punt hem separat la configuració de l'aplicació de l'arrencada del servidor.

Ara tenim:

```text
app.ts      → defineix i exporta l'aplicació Express
server.ts   → importa app i arrenca el servidor
```

Aquesta separació fa que el projecte sigui:

```text
més ordenat
més fàcil de provar
més escalable
més proper a una estructura professional
```

---


```


// Nom fitxer: Teoria/Part 3 - TypeScript professional/T03.02.Tipus i interfaces.md
```ts


# Tipus i interfaces

## Objectiu

En aquest punt revisarem com definir millor les estructures de dades amb TypeScript.

Fins ara ja hem utilitzat tipus com:

```ts
export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
};
```

Aquest codi és correcte, però ara el projecte comença a créixer i necessitem aplicar un criteri més clar.

L'objectiu d'aquest punt és entendre:

```text
què és un type
què és una interface
quan convé utilitzar cada opció
com podem ampliar una interface amb extends
per què els tipus no substitueixen la validació del JSON rebut
```

Aquest apartat no afegeix endpoints nous. És una refactorització del codi per fer-lo més coherent i més fàcil de mantenir.

---
# Per què són importants els tipus?

En una API treballem constantment amb dades:

```text
tracks
peticions
respostes
errors
configuració
paràmetres de ruta
```

TypeScript ens permet descriure quina forma han de tenir aquestes dades.

Per exemple, un track complet ha de tenir:

```text
id
title
artist
duration
```

Si intentem crear un track sense `duration`, TypeScript ens avisarà abans d'executar el servidor:

```ts
const track: Track = {
  id: "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
  title: "Blinding Lights",
  artist: "The Weeknd"
};
```

Aquest codi és incorrecte perquè falta la propietat `duration`.

Això ens ajuda a detectar errors durant el desenvolupament.

---
# `type`

Un `type` permet definir un nom per a un tipus de dada.

Pot servir per descriure objectes:

```ts
export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
};
```

Però també és molt útil per definir unions de valors:

```ts
export type AppEnvironment = "development" | "test" | "production";
```

Això vol dir que una variable de tipus `AppEnvironment` només pot tenir un d'aquests tres valors:

```ts
const environment: AppEnvironment = "development";
```

Aquest valor seria incorrecte:

```ts
const environment: AppEnvironment = "local";
```

En aquest cas, `type` és l'opció adequada perquè no estem descrivint un objecte, sinó un conjunt tancat de valors possibles.

---
# `interface`

Una `interface` serveix per descriure la forma d'un objecte.

Per exemple:

```ts
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}
```

Aquesta interface indica que qualsevol objecte `Track` ha de tenir aquestes propietats:

```text
id       string
title    string
artist   string
duration number
```

Per exemple:

```ts
const track: Track = {
  id: "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
  title: "Blinding Lights",
  artist: "The Weeknd",
  duration: 200
};
```

Això és correcte perquè l'objecte respecta l'estructura definida per la interface.

---
# `type` i `interface` poden semblar iguals

Quan només descrivim un objecte simple, aquestes dues opcions són molt semblants:

```ts
export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
};
```

```ts
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}
```

En aquest cas, totes dues versions funcionen.

En TypeScript, type i interface poden resoldre alguns casos de manera equivalent, sobretot quan descrivim objectes simples. Per això, en un projecte real és habitual establir una convenció. Aquesta convenció no existeix perquè una opció sigui sempre millor que l'altra, sinó per mantenir coherència i facilitar el manteniment del codi.

---
# Criteri del projecte

En aquest projecte utilitzarem aquest criteri:

```text
interface → objectes principals i estructures que poden créixer
type      → unions, valors limitats i combinacions de tipus
```

Això vol dir:

| Cas                                        | Opció recomanada | Motiu                                   |
| ------------------------------------------ | ---------------- | --------------------------------------- |
| Entitats principals com `Track`            | `interface`      | Són objectes del domini i poden créixer |
| Dades d'entrada com `CreateTrackInput`     | `interface`      | Representen una estructura d'objecte    |
| Errors com `ErrorResponse`                 | `interface`      | Representen una estructura d'objecte    |
| Configuració com `ApiInfo`                 | `interface`      | Representa un objecte amb propietats    |
| Entorns com `AppEnvironment`               | `type`           | És una unió de valors possibles         |
| Respostes alternatives com `TrackResponse` | `type`           | Pot ser una unió de diferents tipus     |

Aquest criteri no és una norma universal de TypeScript. És una decisió de projecte.

El motiu és que `interface` comunica millor la idea d'objecte estructurat i extensible, mentre que `type` és més adequat per expressar alternatives, unions o restriccions de valors.

---
# Exemple amb `Track`

`Track` representa una entitat principal de l'aplicació.

Per això la definirem com una `interface`:

```ts
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}
```

Això comunica que `Track` és un objecte del domini de MusicCloud.

Més endavant, aquest objecte podria créixer amb noves propietats:

```text
album
genre
releaseYear
artistId
```

---
# Exemple amb `CreateTrackInput`

`CreateTrackInput` representa les dades que el client envia per crear un track.

També és una estructura d'objecte, per tant la podem definir com una `interface`:

```ts
export interface CreateTrackInput {
  title: string;
  artist: string;
  duration: number;
}
```

La diferència amb `Track` és que no inclou `id`.

| Interface          | Inclou `id`? | Ús                        |
| ------------------ | -----------: | ------------------------- |
| `Track`            |           Sí | Track complet dins l'API  |
| `CreateTrackInput` |           No | Dades que envia el client |

El client no ha d'enviar l'identificador perquè el servidor el genera.

---
# Exemple amb `AppEnvironment`

`AppEnvironment` no representa un objecte. Representa una llista tancada de valors possibles:

```ts
export type AppEnvironment = "development" | "test" | "production";
```

Aquí `interface` no encaixa, perquè no estem descrivint propietats.

Aquest tipus ens permet evitar valors no previstos:

```ts
const environment: AppEnvironment = "production";
```

Això seria incorrecte:

```ts
const environment: AppEnvironment = "demo";
```

Per tant, aquí `type` és l'opció adequada.

---
# Exemple amb `TrackResponse`

Alguns endpoints poden retornar més d'un tipus de resposta.

Per exemple, `GET /tracks/:id` pot retornar un track:

```json
{
  "id": "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "duration": 200
}
```

Però també pot retornar un error:

```json
{
  "message": "Track not found"
}
```

Per representar aquesta situació fem servir una unió:

```ts
export type TrackResponse = Track | ErrorResponse;
```

Això vol dir:

```text
TrackResponse pot ser un Track o un ErrorResponse.
```

Aquesta unió s'ha de definir amb `type`.

---
# `extends` en una interface

Una de les característiques útils de les interfaces és que es poden ampliar amb `extends`.

Això permet crear una nova interface a partir d'una altra.

Per exemple, tenim un `Track` bàsic:

```ts
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}
```

Podem crear una interface més completa:

```ts
export interface TrackWithAlbum extends Track {
  album: string;
}
```

Això vol dir que `TrackWithAlbum` té totes les propietats de `Track` i, a més, una propietat nova:

```text
album
```

Per tant, aquest objecte és correcte:

```ts
const track: TrackWithAlbum = {
  id: "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
  title: "Blinding Lights",
  artist: "The Weeknd",
  duration: 200,
  album: "After Hours"
};
```

No cal repetir totes les propietats de `Track`.

---
# Per què és útil `extends`?

`extends` és útil quan tenim estructures que comparteixen propietats.

Per exemple, ara tenim:

```ts
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}
```

Més endavant podríem tenir tracks amb informació extra:

```ts
export interface TrackWithDetails extends Track {
  album: string;
  genre: string;
  releaseYear: number;
}
```

Això permet reutilitzar el tipus base i afegir informació específica.

També podríem tenir una resposta amb dades relacionades:

```ts
export interface TrackWithArtist extends Track {
  artistInfo: {
    id: string;
    name: string;
  };
}
```

Aquest patró serà més útil quan l'API treballi amb base de dades i relacions entre models.

---
# Exemple amb una interface base

Una altra opció és crear una interface base per als objectes que tenen identificador.

```ts
export interface Entity {
  id: string;
}
```

Després podem fer que `Track` ampliï aquesta interface:

```ts
export interface Track extends Entity {
  title: string;
  artist: string;
  duration: number;
}
```

Ara `Track` té:

```text
id
title
artist
duration
```

perquè hereta `id` d'`Entity`.

Això pot ser útil si més endavant tenim altres entitats:

```ts
export interface Artist extends Entity {
  name: string;
}

export interface Playlist extends Entity {
  name: string;
}
```

Així totes comparteixen una estructura comuna.

---
# Fitxer recomanat `src/types/error.ts`

Creem un fitxer per als errors simples:

```ts
export interface ErrorResponse {
  message: string;
}
```

Aquesta estructura ens serveix per retornar errors com:

```json
{
  "message": "Track not found"
}
```

o:

```json
{
  "message": "Invalid track data"
}
```

Més endavant podrem ampliar aquest tipus amb més informació:

```ts
export interface ErrorResponse {
  code: string;
  message: string;
}
```

Tot i que estem definint una interface, mantenim el nom types per a la carpeta. Una interface també forma part del sistema de tipus de TypeScript, ja que descriu l’estructura d’una dada. Per tant, el nom de la carpeta és correcte. Crear carpetes separades per type, interface o altres formes de definició només afegiria complexitat al projecte sense aportar valor real.

---
# Fitxer recomanat `src/types/track.ts`

```ts
import { ErrorResponse } from "./error";

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}

export interface CreateTrackInput {
  title: string;
  artist: string;
  duration: number;
}

export type TrackResponse = Track | ErrorResponse;
```

Aquí fem servir:

```text
interface per Track
interface per CreateTrackInput
type per TrackResponse
```

Perquè `TrackResponse` és una unió.

---

# Fitxer recomanat `src/types/environment.ts`

```ts
export type AppEnvironment = "development" | "test" | "production";
```

Aquí fem servir `type` perquè limitem els valors possibles.

---

# Fitxer recomanat `src/types/api.ts`

```ts
export interface ApiResources {
  tracks: string;
  artists: string;
  playlists: string;
}

export interface ApiInfo {
  name: string;
  version: string;
  description: string;
  resources: ApiResources;
}
```

Aquí fem servir `interface` perquè descrivim objectes de configuració.

Separem `ApiResources` perquè fa el codi més clar i evita tenir un objecte intern massa gran dins d'`ApiInfo`.

---

# Exemple d'ús a `config/api.ts`

```ts
import { ApiInfo } from "../types/api";

export const apiInfo: ApiInfo = {
  name: "MusicCloud API",
  version: "1.0.0",
  description: "API REST per gestionar tracks, artistes i playlists",
  resources: {
    tracks: "/tracks",
    artists: "/artists",
    playlists: "/playlists"
  }
};
```

Aquest codi no canvia la lògica de l'aplicació. Només utilitza una interface per assegurar que `apiInfo` té l'estructura correcta.

---

# Exemple d'ús a `data/tracks.ts`

```ts
import { Track } from "../types/track";

export const tracks: Track[] = [
  {
    id: "7823d5c2-f66e-46b0-bd8d-4d5b08852b8b",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: 200
  },
  {
    id: "trk-0002",
    title: "Shape of You",
    artist: "Ed Sheeran",
    duration: 233
  },
  {
    id: "trk-0003",
    title: "Levitating",
    artist: "Dua Lipa",
    duration: 203
  }
];
```

L'array `tracks` només podrà contenir objectes que compleixin la interface `Track`.

---

# Important: TypeScript no valida el JSON del client

Definir aquesta interface:

```ts
export interface CreateTrackInput {
  title: string;
  artist: string;
  duration: number;
}
```

no garanteix que el client enviï realment aquest JSON:

```json
{
  "title": "Bad Habits",
  "artist": "Ed Sheeran",
  "duration": 231
}
```

El client pot enviar dades incorrectes:

```json
{
  "title": "Bad Habits"
}
```

o:

```json
{
  "title": 123,
  "artist": true,
  "duration": "231"
}
```

Per això encara necessitem validar en temps d'execució:

```ts
function isCreateTrackInput(
  data: Partial<CreateTrackInput>
): data is CreateTrackInput {
  return (
    typeof data.title === "string" &&
    typeof data.artist === "string" &&
    typeof data.duration === "number"
  );
}
```

Els tipus ajuden durant el desenvolupament, però no substitueixen la validació de les dades que arriben per HTTP.

---

# Què hem aconseguit?

En aquest punt hem revisat com definir millor les estructures de dades del projecte.

Ara tenim un criteri més justificat:

```text
interface → objectes estructurats que poden créixer
type      → unions, valors limitats i combinacions
```

També hem vist que les interfaces es poden ampliar amb `extends`, cosa que serà útil quan el projecte tingui més recursos i relacions entre dades.

---


```


// Nom fitxer: Teoria/Part 3 - TypeScript professional/T03.01.Configuració TypeScript.md
```ts


# Configuració TypeScript

## Objectiu

En aquest punt revisarem la configuració de TypeScript del projecte.

Fins ara hem escrit codi TypeScript, hem creat tipus propis i hem utilitzat Express amb `Request` i `Response`. Però encara no hem analitzat amb detall el fitxer que controla com TypeScript comprova i compila el projecte:

```text
tsconfig.json
```

Aquest fitxer és important perquè defineix normes com:

```text
quina versió de JavaScript es genera
on està el codi TypeScript original
on es guarda el codi compilat
si TypeScript ha de ser estricte amb els tipus
com es resolen els imports
```

---
# Per què cal configurar TypeScript?

TypeScript no només serveix per escriure tipus. També actua com una eina de comprovació del projecte.

Per exemple, pot detectar errors com:

```ts
const duration: number = "200";
```

Aquest codi és incorrecte perquè `"200"` és un text, no un número.

També pot detectar problemes quan treballem amb objectes:

```ts
const track: Track = {
  id: "trk-0001",
  title: "Blinding Lights",
  artist: "The Weeknd"
};
```

Aquest objecte és incorrecte si el tipus `Track` exigeix també la propietat:

```ts
duration: number;
```

Per tant, una bona configuració de TypeScript ajuda a detectar errors abans d’executar l’API.

---
# El fitxer `tsconfig.json`

El fitxer principal de configuració és:

```text
tsconfig.json
```

Aquest fitxer normalment es troba a l’arrel del projecte:

```text
mini-api/
├── src/
├── package.json
├── package-lock.json
└── tsconfig.json
```

---
# Configuració recomanada

Per aquest projecte podem utilitzar aquesta configuració:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}

```

Aquesta configuració és suficient per a una API Express amb TypeScript.

---
# Explicació de les opcions principals

## `target`

```json
"target": "ES2022"
```

Indica quina versió de JavaScript generarà TypeScript.

En aquest projecte utilitzem `ES2022` perquè és una versió moderna i adequada per treballar amb versions actuals de Node.js.

---
## `module`

```json
"module": "Node16"
```

Defineix com TypeScript ha de generar i interpretar els mòduls. En el nostre cas, volem utilitzar NodeJS i concretament utilitzar la llibreria `express`

```ts
import express from "express";
```

---
## `moduleResolution`

```json
"moduleResolution": "Node16"
```

Indica com TypeScript ha de buscar els fitxers importats.

Per exemple, quan escrivim:

```ts
import { tracks } from "./data/tracks";
```

TypeScript ha de saber com localitzar aquest fitxer dins del projecte.

---

## `rootDir`

```json
"rootDir": "src"
```

Indica on es troba el codi TypeScript original.

En aquest projecte, tot el codi font està dins de:

```text
src/
```

Per això fem servir:

```json
"rootDir": "src"
```

---
## `outDir`

```json
"outDir": "dist"
```

Indica on es generarà el codi JavaScript compilat.

Quan executem:

```bash
npm run build
```

TypeScript generarà una carpeta:

```text
dist/
```

Aquesta carpeta contindrà el JavaScript equivalent al codi TypeScript de `src`.

---
## `strict`

```json
"strict": true
```

Activa les comprovacions estrictes de TypeScript.

Aquesta és una de les opcions més importants.

Amb `strict: true`, TypeScript és més exigent i detecta més errors. Per exemple, obliga a vigilar millor els valors que poden ser `undefined`.

Això pot semblar incòmode al principi, però és una bona pràctica perquè evita molts errors habituals.

---
## `esModuleInterop`

```json
"esModuleInterop": true
```

Aquesta opció facilita importar algunes llibreries de JavaScript des de TypeScript.

Per exemple, ens permet fer:

```ts
import express from "express";
```

Sense aquesta opció, alguns imports de paquets JavaScript poden donar problemes o requerir una sintaxi menys clara.

---

## `skipLibCheck`

```json
"skipLibCheck": true
```

Evita que TypeScript revisi internament tots els fitxers de tipus de les llibreries instal·lades.

Això fa que la compilació sigui més ràpida.

No vol dir que TypeScript deixi de comprovar el nostre codi. El nostre codi continua sent revisat.

---
## `forceConsistentCasingInFileNames`

```json
"forceConsistentCasingInFileNames": true
```

Aquesta opció evita problemes amb majúscules i minúscules en noms de fitxer.

Per exemple, si el fitxer es diu:

```text
tracks.ts
```

però fem:

```ts
import { tracks } from "./data/Tracks";
```

pot funcionar en alguns sistemes, però fallar en altres.

Aquesta opció ajuda a detectar aquest problema.

---
## `include`

```json
"include": ["src"]
```

Indica quins fitxers ha de tenir en compte TypeScript.

En aquest cas, només volem compilar el codi que hi ha dins de:

```text
src/
```

No volem compilar `node_modules`, `dist` ni altres carpetes.

---
# Scripts del `package.json`

Per treballar correctament amb TypeScript, podem tenir aquests scripts:

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx src/index.ts",
    "dev:test": "cross-env NODE_ENV=test tsx src/index.ts",
    "build": "tsc",
    "start": "cross-env NODE_ENV=production node dist/index.js"
  }
}
```

## `npm run dev`

```bash
npm run dev
```

Executa el projecte en desenvolupament amb `tsx`.

No genera la carpeta `dist`.

## `npm run build`

```bash
npm run build
```

Compila el projecte TypeScript.

Genera la carpeta:

```text
dist/
```

---
## `npm start`

```bash
npm start
```

Executa el projecte compilat.

És a dir, executa:

```text
dist/index.js
```

---
# Comprovar la configuració

Després de revisar el `tsconfig.json`, podem comprovar si el projecte compila correctament:

```bash
npm run build
```

Si tot va bé, no veurem errors i es crearà la carpeta:

```text
dist/
```

Després podem executar:

```bash
npm start
```

I comprovar que l’API continua funcionant:

```bash
curl http://localhost:3000/tracks
```

---


```


// Nom fitxer: Teoria/Part 3 - TypeScript professional/T03.03.Separació routes - controllers i serveis.md
```ts


# Separació `routes/controllers/services`

## Objectiu

En aquest punt reorganitzarem el codi de l'API per separar responsabilitats.

Fins ara tenim molts endpoints dins de `src/index.ts`. Això ha estat útil per aprendre el funcionament bàsic de l'API, però no és una bona estructura si el projecte ha de créixer.

Ara separarem el codi en tres parts:

```text
routes       → defineixen les rutes de l'API
controllers  → gestionen la petició i la resposta HTTP
services     → contenen la lògica de negoci
```

L'objectiu és que l'API continuï funcionant igual, però amb una estructura més clara i escalable.

---

# El problema actual

Ara mateix `index.ts` pot acabar contenint massa responsabilitats:

```text
crear l'aplicació Express
configurar middlewares
definir endpoints
llegir req.params
llegir req.body
validar dades
buscar tracks
crear tracks
actualitzar tracks
eliminar tracks
retornar respostes HTTP
arrencar el servidor
```

Això funciona en una API petita, però és difícil de mantenir.

Si més endavant afegim:

```text
artists
playlists
users
login
register
base de dades
validació professional
tests
```

`index.ts` es convertirà en un fitxer massa gran.

Per això cal separar el codi.

---

# Nova estructura del projecte

A partir d'aquest punt, podem organitzar el projecte així:

```text
src/
├── config/
│   ├── api.ts
│   └── environment.ts
├── controllers/
│   └── trackController.ts
├── data/
│   └── tracks.ts
├── routes/
│   └── trackRoutes.ts
├── services/
│   └── trackService.ts
├── types/
│   └── ...
└── index.ts
```

Aquesta estructura encara és senzilla, però ja separa millor les responsabilitats.

---
# Què és una ruta?

Una ruta indica quin endpoint existeix i quin controlador s'ha d'executar.

Per exemple:

```http
GET /tracks
```

o:

```http
POST /tracks
```

El fitxer de rutes no hauria de contenir gaire lògica. La seva funció principal és connectar una ruta amb una funció controladora.

Exemple:

```ts
router.get("/", getTracksController);
router.get("/:id", getTrackByIdController);
router.put("/:id", updateTrackController);
```

Això es pot llegir així:

```text
Quan arribi GET /tracks, executa getTracksController.
Quan arribi GET /tracks/:id, executa getTrackByIdController.
Quan arribi PUT /tracks/:id, executa updateTrackController.
```

---
# Què és un controlador?

Un controlador és la funció que rep la petició HTTP i envia la resposta.

El controlador treballa amb:

```text
req
res
status codes
JSON de resposta
```

Per exemple:

```ts
export function getTracksController(_req: Request, res: Response): Response {
  const allTracks = getAllTracks();

  return res.status(200).json(allTracks);
}
```

El controlador no hauria de contenir massa lògica de negoci. Hauria de limitar-se a:

```text
llegir dades de la petició
cridar el servei corresponent
decidir el codi HTTP
retornar la resposta
```

---
# Què és un servei?

Un servei conté la lògica de negoci.

En aquest projecte, el servei de tracks s'encarregarà de:

```text
obtenir tots els tracks
buscar un track per id
crear un track
actualitzar un track
eliminar un track
```

El servei no hauria de treballar directament amb `req` ni amb `res`.

Això és important.

Un servei no ha de saber si la petició ve d'Express, d'un test o d'una altra part del programa. Només ha de rebre dades i retornar resultats.

Exemple:

```ts
export function getAllTracks(): Track[] {
  return tracks;
}
```

Aquest servei retorna dades. No envia cap resposta HTTP.

---
# Diferència entre route, controller i service

| Capa          | Responsabilitat                                | Treballa amb          |
| ------------- | ---------------------------------------------- | --------------------- |
| `routes`      | Defineix endpoints i connecta amb controladors | `Router`              |
| `controllers` | Gestiona peticions i respostes HTTP            | `Request`, `Response` |
| `services`    | Aplica la lògica de negoci                     | dades i tipus propis  |

Exemple pràctic:

```text
GET /tracks/trk-0001
        |
        v
route: /tracks/:id
        |
        v
controller: getTrackByIdController()
        |
        v
service: findTrackById()
        |
        v
array tracks
```

---

# Crear el servei de tracks

Creem el fitxer:

```text
src/services/trackService.ts
```

Amb aquest contingut:

```ts
import { randomUUID } from "node:crypto";
import { tracks } from "../data/tracks";
import { CreateTrackInput, Track } from "../types/track";

export function getAllTracks(): Track[] {
  return tracks;
}

export function findTrackById(id: string): Track | undefined {
  return tracks.find((track) => track.id === id);
}

export function updateTrackController(
  id: string,
  trackInput: CreateTrackInput
): Track | undefined {
  const trackIndex = tracks.findIndex((track) => track.id === id);

  if (trackIndex === -1) {
    return undefined;
  }

  const updatedTrack: Track = {
    id,
    ...trackInput
  };

  tracks[trackIndex] = updatedTrack;

  return updatedTrack;
}
```

---

# Explicació del servei

## `getAllTracks()`

```ts
export function getAllTracks(): Track[] {
  return tracks;
}
```

Retorna tots els tracks guardats en memòria.

---

## `findTrackById()`

```ts
export function findTrackById(id: string): Track | undefined {
  return tracks.find((track) => track.id === id);
}
```

Busca un track per identificador.

Pot retornar:

```text
Track      → si existeix
undefined  → si no existeix
```

---

## `createTrack()`


Crea un nou track, genera l'identificador i l'afegeix a l'array. 
La validació de les dades es fa en el controlador. 
Retorna el nou track creat.

---

## `updateTrack()`

```ts
export function updateTrack(
  id: string,
  trackInput: CreateTrackInput
): Track | undefined {
  const trackIndex = tracks.findIndex((track) => track.id === id);

  if (trackIndex === -1) {
    return undefined;
  }

  const updatedTrack: Track = {
    id,
    ...trackInput
  };

  tracks[trackIndex] = updatedTrack;

  return updatedTrack;
}
```

Actualitza un track existent.

Si no troba el track, retorna `undefined`.

---

## `deleteTrack()`

Si existeix el track => l'elimina.

Retorna:

```text
true   → si s'ha eliminat correctament
false  → si no existia cap track amb aquest id
```

---
# Crear el controlador de tracks

Creem el fitxer:

```text
src/controllers/trackController.ts
```

Amb aquest contingut:

```ts
import { Request, Response } from "express";
import {
  findTrackById,
  getAllTracks,
  updateTrack
} from "../services/trackService";
import { CreateTrackInput, TrackResponse } from "../types/track";

export function getTracksController(_req: Request, res: Response) {
  const allTracks = getAllTracks();

  return res.status(200).json(allTracks);
}

export function getTrackByIdController(req: Request, res: Response<TrackResponse>) {
  const id = req.params.id as string;

  const track = findTrackById(id);

  if (!track) {
    return res.status(404).json({
      message: "Track not found"
    });
  }

  return res.status(200).json(track);
}

export function updateTrackController(
  req: Request<{ id: string }, TrackResponse, Partial<CreateTrackInput>>,
  res: Response<TrackResponse>
) {
  const id: string = req.params.id;
  const trackInput: Partial<CreateTrackInput> = req.body;

  if (!isCreateTrackInput(trackInput)) {  // Cal importar aquesta funció!!
    return res.status(400).json({
      message: "Invalid track data"
    });
  }

  const updatedTrack = updateTrack(id, trackInput);

  if (!updatedTrack) {
    return res.status(404).json({
      message: "Track not found"
    });
  }

  return res.status(200).json(updatedTrack);
}

```

---

# Explicació del controlador

El controlador ara conté la part HTTP.

Per exemple, en `getTrackByIdController()`:

```ts
const id = req.params.id as string;
const track = findTrackById(id);
```

El controlador llegeix l'id de la URL i crida el servei.

Després decideix la resposta:

```ts
if (!track) {
  return res.status(404).json({
    message: "Track not found"
  });
}

return res.status(200).json(track);
```

Això és correcte perquè els codis HTTP formen part de la capa del controlador.

---
# Crear el fitxer de rutes

Creem el fitxer:

```text
src/routes/trackRoutes.ts
```

Amb aquest contingut:

```ts
import { Router } from "express";
import {
  getTrackByIdController,
  getTracksController,
  updateTrackController
} from "../controllers/trackController";

export const trackRouter = Router();

trackRouter.get("/", getTracksController);
trackRouter.get("/:id", getTrackByIdController);
trackRouter.put("/:id", updateTrackController);
```

---
# Explicació de les rutes

El fitxer de rutes defineix les rutes relatives al recurs `tracks`.

Aquí no escrivim:

```ts
trackRouter.get("/tracks", getTracksController);
```

sinó:

```ts
trackRouter.get("/", getTracksController);
```

Perquè més endavant, a `index.ts`, direm que totes aquestes rutes pengen de:

```text
/tracks
```

Això vol dir:

| A `trackRoutes.ts` | A `index.ts` | Ruta final           |
| ------------------ | ------------ | -------------------- |
| `get("/")`         | `/tracks`    | `GET /tracks`        |
| `get("/:id")`      | `/tracks`    | `GET /tracks/:id`    |
| `post("/")`        | `/tracks`    | `POST /tracks`       |
| `put("/:id")`      | `/tracks`    | `PUT /tracks/:id`    |
| `delete("/:id")`   | `/tracks`    | `DELETE /tracks/:id` |

---
# Actualitzar `index.ts`

Ara `index.ts` ja no hauria de contenir tots els endpoints de tracks.

El deixarem més net:

```ts
import express, { Express, Request, Response } from "express";
import { apiInfo } from "./config/api";
import { getEnvironment } from "./config/environment";
import { trackRouter } from "./routes/trackRoutes";

const app: Express = express();

app.use(express.json());

const PORT: number = 3000;
const environment = getEnvironment();

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    name: apiInfo.name,
    version: apiInfo.version,
    status: "OK",
    description: apiInfo.description,
    resources: apiInfo.resources,
    meta: {
      environment
    }
  });
});

app.use("/tracks", trackRouter);

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});
```

---
# Explicació d'`app.use("/tracks", trackRouter)`

Aquesta línia:

```ts
app.use("/tracks", trackRouter);
```

indica que totes les rutes definides dins de `trackRouter` començaran per:

```text
/tracks
```

Per exemple:

```ts
trackRouter.get("/", getTracksController);
```

es converteix en:

```http
GET /tracks
```

I:

```ts
trackRouter.get("/:id", getTrackByIdController);
```

es converteix en:

```http
GET /tracks/:id
```

Això permet tenir les rutes agrupades per recurs.

---

# Abans i després

## Abans

`index.ts` contenia:

```text
configuració d'Express
endpoint GET /
endpoint GET /tracks
endpoint GET /tracks/:id
endpoint POST /tracks
endpoint PUT /tracks/:id
endpoint DELETE /tracks/:id
lògica de cerca
lògica de creació
lògica d'actualització
lògica d'eliminació
```

## Després

```text
index.ts
  crea app
  configura express.json()
  defineix GET /
  registra trackRouter
  arrenca servidor

routes/trackRoutes.ts
  defineix les rutes de tracks

controllers/trackController.ts
  gestiona req, res i codis HTTP

services/trackService.ts
  conté la lògica amb l'array tracks
```

Aquesta separació fa que cada fitxer tingui una responsabilitat més clara.

---
# El comportament és el mateix

Aquest punt és una refactorització.

Això vol dir que el comportament extern de l'API ha de continuar sent el mateix.

Aquests endpoints han de funcionar igual que abans:

```http
GET /tracks
GET /tracks/:id
PUT /tracks/:id
```

El que ha canviat és l'organització interna del codi.

---

# Què hem aconseguit?

En aquest punt hem separat el projecte en capes:

```text
routes
controllers
services
```

Ara el projecte és més fàcil de mantenir i prepararà millor els passos següents.

Hem aconseguit:

```text
reduir la mida d'index.ts
agrupar les rutes de tracks
separar la lògica HTTP de la lògica de negoci
preparar el projecte per a nous recursos
facilitar futurs tests
```

---
# Pràctica

## Tasca

Refactoritza el projecte MusicCloud separant les rutes, els controladors i els serveis del recurs `tracks`.

No s'ha de canviar el comportament de l'API.

---
## Requisits

El projecte ha de tenir aquesta estructura nova:

```text
src/
├── controllers/
│   └── trackController.ts
├── routes/
│   └── trackRoutes.ts
├── services/
│   └── trackService.ts
```

També s'ha d'actualitzar `src/index.ts` perquè registri les rutes de tracks amb:

```ts
app.use("/tracks", trackRouter);
```

---
## Entrega

Modifica el repositori de GitHub utilitzat en les pràctiques anteriors.

La pràctica ha d'incloure:

```text
src/routes/trackRoutes.ts
src/controllers/trackController.ts
src/services/trackService.ts
src/index.ts modificat
projecte compilant sense errors
endpoints funcionant igual que abans
```

---


```


// Nom fitxer: Teoria/Part 3 - TypeScript professional/T03.05 Gestió de rutes creuades amb CORS.md
```ts


# Gestió de rutes creuades amb CORS
# Fonaments Teòrics

## 1. Què és el CORS?

**CORS** significa *Cross-Origin Resource Sharing* (Compartició de Recursos d'Orígens Creuats). És un mecanisme de seguretat implementat obligatòriament pels **navigadors web** per evitar que una web maliciosa faci peticions de fons contra una altra API sense permís.

Un **Origen** està definit per tres elements: **Protocol + Domini + Port**.
Si algun d'aquests tres elements canvia entre el client i l'API, estem davant d'una petició d'orígens creuats.

Per defecte, per seguretat, els navegadors bloquegen qualsevol petició d'origen creuat a menys que el servidor (la nostra API) digui de manera explícita: *"Sí, jo conec aquesta web de Front-end i li dono permís per llegir les meves dades"*.

## 2. El mecanisme de Preflight (`OPTIONS`)

Quan una aplicació de Front-end intenta fer una petició "complexa" (com un `POST`, `PUT` o `DELETE`  el navegador no envia la petició directament.

Primer fa una petició secreta automàtica anomenada **Preflight request** utilitzant el mètode HTTP **`OPTIONS`**. És com si el navegador truqués a la porta de l'API i preguntés: *"Tens permís per rebre un POST des de http://localhost:5173?"*.

* Si l'API respon que **sí** (enviant les capçaleres de CORS adequades), el navegador envia la petició real (`POST`).

* Si l'API diu que **no** o no respon correctament, el navegador cancel·la l'operació immediatament.
---
# L'Arquitectura de la Solució amb el paquet `cors`

A Node.js podríem afegir les capçaleres de seguretat `Access-Control-Allow-Origin` manualment, però la manera estàndard i professional de fer-ho en Express és utilitzar el middleware oficial **`cors`**.

Aquest paquet s'encarrega de respondre automàticament a les peticions `OPTIONS` de *Preflight* i d'injectar les capçaleres adequades a les respostes.

# Pràctica

Configuració del CORS al MusicCloud

# Objectiu

Instal·laràs el paquet `cors` al teu projecte i el configuraràs com a middleware global. Per a l'entorn de desenvolupament local, permetràs que qualsevol aplicació pugui consultar l'API, però aprendràs a aplicar una **llista blanca (whitelist)** per restringir l'accés només a dominis seleccionats en entorns de producció reals.

---

# Pas 1: Instal·lació de dependències

Executa la següent comanda a la terminal del teu projecte per descarregar la llibreria i els seus tipus de TypeScript:

```bash
npm install cors
npm install --save-dev @types/cors

```

---

# Pas 2: Crear la configuració de CORS

Crea un fitxer de configuració modular anomenat `src/config/cors.ts`. Farem servir una configuració flexible: en producció només acceptarem el domini oficial de la nostra aplicació, però en desenvolupament serem més permissius:

```ts
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

```

---

# Pas 3: Aplicar el middleware a `src/app.ts`

Obre el teu fitxer `src/app.ts`. Registra el mòdul de CORS just a sota de `helmet` i del `rateLimiter`. L'ordre és crucial: **CORS s'ha d'executar abans de processar les rutes** per poder respondre a les peticions `OPTIONS`.

```ts
import express from "express";
import helmet from "helmet";
import cors from "cors"; // 1. Importem la llibreria
import { corsOptions } from "./config/cors"; // 2. Importem la configuració
import { apiLimiter } from "./config/rateLimiter";
import trackRouter from "./routes/trackRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

// CAPA DE SEGURETAT GLOBAL
app.use(helmet());
app.use(cors(corsOptions)); // 3. Activem el CORS amb la nostra política de seguretat
app.use(apiLimiter);

// MIDDLEWARES DE PARSING i RUTES...
app.use(express.json());
app.use("/tracks", trackRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

```

---

# Com verificar el CORS a la teva API

La manera més eficient de veure el CORS en acció sense haver de programar tota una web de Front-end és fer una simulació de capçaleres a la terminal de com ho faria un navegador:

### 1. Simular una petició legítima (Domini acceptat)

Farem una comanda `curl` enviant la capçalera `Origin` simulant que som l'aplicació de React a `http://localhost:5173`:

```bash
curl -i -X GET "http://localhost:3000/tracks" -H "Origin: http://localhost:5173"

```

**Què has de buscar a la resposta?** Veuràs que el servidor respon amb un `200 OK` i inclou la capçalera de permís:

`Access-Control-Allow-Origin: http://localhost:5173`

### 2. Simular un atac o un domini no autoritzat

Ara simularem que som una web estranya o atacant a `http://www.web-dolenta.com`:

```bash
curl -i -X GET "http://localhost:3000/tracks" -H "Origin: http://www.web-dolenta.com"

```

**Què has de buscar a la resposta?** Com que aquest domini no està a la nostra *whitelist*, l'API respondrà saltant directament al middleware d'errors, denegant el pas i no inclourà cap capçalera `Access-Control-Allow-Origin`. Si hagués estat un navegador real, hauria tallat el pas a les dades immediatament!

```


# Índex

## Part 1 — API mínima

1. Què és una API REST  
	1. Teoria: [T01.00.API REST](Teoria/Part%201%20-%20API%20Mínima/T01.00.API%20REST.md) 
	
2. Primer servidor Express  
	1. Teoria: [T01.01 Servidor EXPRESS](Teoria/Part%201%20-%20API%20Mínima/T01.01%20Servidor%20EXPRESS.md) 
	2. Pràctica: [P01.01 Creació  mini Web API](Pràctiques/Part%201%20-%20API%20Mínima/P01.01%20Creació%20%20mini%20Web%20API.md)
	
3. Primer endpoint GET / 
	1. Teoria: [T01.02.Primer endpoint GET](Teoria/Part%201%20-%20API%20Mínima/T01.02.Primer%20endpoint%20GET.md)
	2. Pràctica: [P01.02 Primer endpoint](Pràctiques/Part%201%20-%20API%20Mínima/P01.02%20Primer%20endpoint.md)

4. Entorns d'execució  
	1. Teoria: [T01.03 Entorns d'execució en una API NodeJS](Teoria/Part%201%20-%20API%20Mínima/T01.03%20Entorns%20d'execució%20en%20una%20API%20NodeJS.md)
	2. Pràctica: [P01.03 Entorns d'execució](Pràctiques/Part%201%20-%20API%20Mínima/P01.03%20Entorns%20d'execució.md)
## Part 2 — Recursos en memòria

5. Tracks en memòria  
	1. Teoria: [T02.01.Tracks en memòria](Teoria/Part%202%20-%20Recursos%20en%20memòria/T02.01.Tracks%20en%20memòria.md)
	2. Pràctica: [P02.01.Tracks en memòria](Pràctiques/Part%202%20-%20Recursos%20en%20memòria/P02.01.Tracks%20en%20memòria.md)
	
6. Nomenclatura bàsica dels endpoints  
	1. Teoria: [T02.02.Nomenclatura endpoints](Teoria/Part%202%20-%20Recursos%20en%20memòria/T02.02.Nomenclatura%20endpoints.md)
	
7. GET /tracks  
	1. Teoria: [T02.03.GET Tracks](Teoria/Part%202%20-%20Recursos%20en%20memòria/T02.03.GET%20Tracks.md)
	2. Pràctica: [P02.02.GET tracks](Pràctiques/Part%202%20-%20Recursos%20en%20memòria/P02.02.GET%20tracks.md)
	
8. GET /tracks/:id  
	1. Teoria: [T02.04.GET track by ID](Teoria/Part%202%20-%20Recursos%20en%20memòria/T02.04.GET%20track%20by%20ID.md)
	2. Pràctica: [P02.03.GET track by ID](Pràctiques/Part%202%20-%20Recursos%20en%20memòria/P02.03.GET%20track%20by%20ID.md)
	
9. POST /tracks  
	1. Teoria: [T02.05.POST Track](Teoria/Part%202%20-%20Recursos%20en%20memòria/T02.05.POST%20Track.md)
	2. Pràctica: [P02.04.POST Tracks](Pràctiques/Part%202%20-%20Recursos%20en%20memòria/P02.04.POST%20Tracks.md)
	
10. PUT /tracks/:id  
	1. Teoria: [T02.05.PUT Track](Teoria/Part%202%20-%20Recursos%20en%20memòria/T02.05.PUT%20Track.md)
	2. Pràctica: [P02.05.PUT tracks](Pràctiques/Part%202%20-%20Recursos%20en%20memòria/P02.05.PUT%20tracks.md)
	
11. DELETE /tracks/:id  
   - Teoria: [T02.05.PUT Track](Teoria/Part%202%20-%20Recursos%20en%20memòria/T02.05.PUT%20Track.md)
   - Pràctica: [P02.05.PUT tracks](Pràctiques/Part%202%20-%20Recursos%20en%20memòria/P02.05.PUT%20tracks.md)
## Part 3 — TypeScript professional

12. Configuració TypeScript  
	1. Teoria: [T03.01.Configuració TypeScript](Teoria/Part%203%20-%20TypeScript%20professional/T03.01.Configuració%20TypeScript.md)
	2. Pràctica: [P03.01.Configuració TypeScript](Pràctiques/Part%203%20-%20TypeScript%20professional/P03.01.Configuració%20TypeScript.md)
	
13. Tipus i interfaces  
	1. Teoria: [T03.02.Tipus i interfaces](Teoria/Part%203%20-%20TypeScript%20professional/T03.02.Tipus%20i%20interfaces.md)
	2. Pràctica: [P03.02.Tipus i interfaces](Pràctiques/Part%203%20-%20TypeScript%20professional/P03.02.Tipus%20i%20interfaces.md)
	 
14. Separació routes/controllers/services  
	1. Teoria: [T03.03.Separació routes - controllers i serveis](Teoria/Part%203%20-%20TypeScript%20professional/T03.03.Separació%20routes%20-%20controllers%20i%20serveis.md)
	2. Pràctica: [P03.03.Separació Rutes - Controllers - Services](Pràctiques/Part%203%20-%20TypeScript%20professional/P03.03.Separació%20Rutes%20-%20Controllers%20-%20Services.md)
	
15. Exportar app i separar server.ts  
	1. Teoria: [T03.04.Exportar app i separar server.ts](Teoria/Part%203%20-%20TypeScript%20professional/T03.04.Exportar%20app%20i%20separar%20server.ts.md)
	2. Pràctica: [P03.04.Separar configuració aplicació de l'execució](Pràctiques/Part%203%20-%20TypeScript%20professional/P03.04.Separar%20configuració%20aplicació%20de%20l'execució.md)
	
16. Gestió de rutes creuades amb CORS
	1. Teoria: [T03.05 Gestió de rutes creuades amb CORS](Teoria/Part%203%20-%20TypeScript%20professional/T03.05%20Gestió%20de%20rutes%20creuades%20amb%20CORS.md)
	2. Pràctica: [P03.05 Gestió de rutes creuades amb CORS](Pràctiques/Part%203%20-%20TypeScript%20professional/P03.05%20Gestió%20de%20rutes%20creuades%20amb%20CORS.md)
## Part 4 — Persistència amb Microsoft SQL Server

17. Microsoft SQL Server amb Docker  
	1. Teoria:  [T04.01.Microsoft SQL Server amb Docker](Teoria/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server%201/T04.01.Microsoft%20SQL%20Server%20amb%20Docker.md)
	2. Pràctica: [P04.01.Microsoft SQL Server amb Docker](Pràctiques/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server/P04.01.Microsoft%20SQL%20Server%20amb%20Docker.md) 
	
18. Connexió a Microsoft SQL Server i execució de SQL  
	1. Teoria:  [T04.02. Connexió a Microsoft SQL Server i execució de SQL](Teoria/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server%201/T04.02.%20Connexió%20a%20Microsoft%20SQL%20Server%20i%20execució%20de%20SQL.md)
	2. Pràctica:  [P04.02. Connexió a Microsoft SQL Server i execució de SQL](Pràctiques/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server/P04.02.%20Connexió%20a%20Microsoft%20SQL%20Server%20i%20execució%20de%20SQL.md)
	
19. Model relacional de MusicCloud  
	1. Teoria: [T04.03. Model relacional de MusicCloud](Teoria/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server%201/T04.03.%20Model%20relacional%20de%20MusicCloud.md)
	2. Pràctica: [P04.03 Model relacional de MusicCloud](Pràctiques/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server/P04.03%20Model%20relacional%20de%20MusicCloud.md)
	
20. Connexió de Node.js amb Microsoft SQL Server  
	1. Teoria: [T04.04. Connexió amb servidor de base de dades](Teoria/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server%201/T04.04.%20Connexió%20amb%20servidor%20de%20base%20de%20dades.md)
	2. Pràctica: [P04.04. Connexió amb servidor de base de dades](Pràctiques/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server/P04.04.%20Connexió%20amb%20servidor%20de%20base%20de%20dades.md)
21. Substituir arrays per consultes SQL  
	1. Teoria: [T04.05. Substituir arrays per sentències SQL](Teoria/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server%201/T04.05.%20Substituir%20arrays%20per%20sentències%20SQL.md)
	2. Pràctica: [P04.05. Substituir arrays per consultes SQL](Pràctiques/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server/P04.05.%20Substituir%20arrays%20per%20consultes%20SQL.md)
	
22. DTO i transformació de dades  
	1. Teoria:[T04.06. DTO i transformació de dades](Teoria/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server%201/T04.06.%20DTO%20i%20transformació%20de%20dades.md)
	2. Pràctica:[P04.06. DTO i transformació de dades](Pràctiques/Part%204%20-%20Persistència%20amb%20Microsoft%20SQL%20Server/P04.06.%20DTO%20i%20transformació%20de%20dades.md)
## Part 5 — Validació i errors

23. Validació amb Zod
	1. Teoria: [T05.01.Validació amb Zod](Teoria/Part%205%20-%20Validació%20i%20errors/T05.01.Validació%20amb%20Zod.md)
	2. Pràctica: [P05.01.Validació amb Zod](Pràctiques/Part%205%20-%20Validació%20i%20errors/P05.01.Validació%20amb%20Zod.md)

24. Middleware validate
	1. Teoria: [T05.02. Middleware validate](Teoria/Part%205%20-%20Validació%20i%20errors/T05.02.%20Middleware%20validate.md)
	2. Pràctica: [P05.02. Middleware validate](Pràctiques/Part%205%20-%20Validació%20i%20errors/P05.02.%20Middleware%20validate.md)

25. Error handler global
	1. Teoria:[T05.03. Error handler global](Teoria/Part%205%20-%20Validació%20i%20errors/T05.03.%20Error%20handler%20global.md)
	2. Pràctica: [P05.03. Error handler global](Pràctiques/Part%205%20-%20Validació%20i%20errors/P05.03.%20Error%20handler%20global.md)

26. Codificació de la resposta HTTP
	1. Teoria: [T05.04. Codificació resposta HTTP](Teoria/Part%205%20-%20Validació%20i%20errors/T05.04.%20Codificació%20resposta%20HTTP.md)
	2. Pràctica: [P05.04 Codificació resposta HTTP](Pràctiques/Part%205%20-%20Validació%20i%20errors/P05.04%20Codificació%20resposta%20HTTP.md)

27. Respostes d'error detallades
	1. Teoria:[T05.05. Respostes d’error detallades](Teoria/Part%205%20-%20Validació%20i%20errors/T05.05.%20Respostes%20d’error%20detallades.md)
	2. Pràctica:[P05.05 Respostes d'error detallades](Pràctiques/Part%205%20-%20Validació%20i%20errors/P05.05%20Respostes%20d'error%20detallades.md)

28. Classes d'errors personalitzades (Custom Errors)
	1. Teoria:[T05.06 Classes d'errors personalitzades](Teoria/Part%205%20-%20Validació%20i%20errors/T05.06%20Classes%20d'errors%20personalitzades.md)
	2. Pràctica:[P05.06 Classes d'errors personalitzades](Pràctiques/Part%205%20-%20Validació%20i%20errors/P05.06%20Classes%20d'errors%20personalitzades.md)
## Part 6 — Autenticació i Seguretat de l'Usuari

29. Registre d'usuaris i hashing de contrasenyes (bcrypt)
	1. Teoria: [T06.01 Registre d'usuaris i hashing de contrasenyes (bcrypt)](Teoria/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari/T06.01%20Registre%20d'usuaris%20i%20hashing%20de%20contrasenyes%20(bcrypt).md)
	2. Pràctica: [P06.01 Registre d'usuaris i hashing de contrasenyes (bcrypt)](Pràctiques/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari%201/P06.01%20Registre%20d'usuaris%20i%20hashing%20de%20contrasenyes%20(bcrypt).md)
30. Login i generació de JSON Web Tokens (JWT)
	1. Teoria: [T06.02 Login i generació de JSON Web Tokens (JWT)](Teoria/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari/T06.02%20Login%20i%20generació%20de%20JSON%20Web%20Tokens%20(JWT).md)
	2. Pràctica: [P06.02 Login i generació de JSON Web Tokens (JWT)](Pràctiques/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari%201/P06.02%20Login%20i%20generació%20de%20JSON%20Web%20Tokens%20(JWT).md)
31. Middleware d'autenticació (JWT Middleware)
	1. Teoria: [T06.03. Middleware d'autenticació](Teoria/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari/T06.03.%20Middleware%20d'autenticació.md)
	2. Pràctica: [P06.03. Middleware d'autenticació](Pràctiques/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari%201/P06.03.%20Middleware%20d'autenticació.md)
32. Creació de playlists per a l'usuari autenticat
	1. Teoria: [T06.04 Creació de playlists per l'usuari autenticat](Teoria/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari/T06.04%20Creació%20de%20playlists%20per%20l'usuari%20autenticat.md)
	2. Pràctica: [P06.04 Creació de playlists per l'usuari autenticat](Pràctiques/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari%201/P06.04%20Creació%20de%20playlists%20per%20l'usuari%20autenticat.md)
		1. Especificació funcional: [P-ESP.06.04 Especificació funcional](Pràctiques/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari%201/P-ESP.06.04%20Especificació%20funcional.md)
			1. Solució guiada: [SOL-P06.04 Creació de playlists per l'usuari autenticat 1](Pràctiques/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari%201/Solució%20guiada/SOL-P06.04%20Creació%20de%20playlists%20per%20l'usuari%20autenticat%201.md)
33. Protecció de recursos i control d'accés (Ownership)
	1. Teoria: [T06.05 Protecció de recursos i control d'accés](Teoria/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari/T06.05%20Protecció%20de%20recursos%20i%20control%20d'accés.md)
	2. Pràctica: [P06.05 Protecció de recursos i control d'accés](Pràctiques/Part%206%20-%20Autenticació%20i%20Seguretat%20de%20l'Usuari%201/P06.05%20Protecció%20de%20recursos%20i%20control%20d'accés.md)
## Part 7 — Funcionalitats Avançades (Spotify-like)

34. Relacions Many-to-Many: Afegir i treure tracks de playlists
	1. Teoria: [T07.01 Relacions molts a molts](Teoria/Part%207%20-%20Funcionalitats%20avançades/T07.01%20Relacions%20molts%20a%20molts.md)
	2. Pràctica: [P07.01 Relacions molts a molts](Pràctiques/Part%207%20-%20Funcionalitats%20avançades/P07.01%20Relacions%20molts%20a%20molts.md)
35. Validació de Query Parameters: Cerca i Filtres a l'API
	1. Teoria: [T07.02 Validació de Query Parameters](Teoria/Part%207%20-%20Funcionalitats%20avançades/T07.02%20Validació%20de%20Query%20Parameters.md)
	2. Pràctica: [P07.02 Validació de Query Parameters](Pràctiques/Part%207%20-%20Funcionalitats%20avançades/P07.02%20Validació%20de%20Query%20Parameters.md)
36. Paginació eficient i ordenació de resultats en l'API
	1. Teoria: [T07.03 Paginació eficient i ordenació](Teoria/Part%207%20-%20Funcionalitats%20avançades/T07.03%20Paginació%20eficient%20i%20ordenació.md)
	2. Pràctica: [P07.03 Paginació eficient i ordenació](Pràctiques/Part%207%20-%20Funcionalitats%20avançades/P07.03%20Paginació%20eficient%20i%20ordenació.md)
## Part 8 — Qualitat Professional i Desplegament

37. Documentació interactiva amb OpenAPI i Swagger
	1. Teoria: [T08.01 Documentació interactiva amb OpenAPI i Swagger](Teoria/Part%208%20-%20Qualitat%20professional/T08.01%20Documentació%20interactiva%20amb%20OpenAPI%20i%20Swagger.md)
	2. Pràctica: [P08.01 Documentació interactiva amb OpenAPI i Swagger](Pràctiques/Part%208%20-%20Qualitat%20professional/P08.01%20Documentació%20interactiva%20amb%20OpenAPI%20i%20Swagger.md)
38. Protecció de l'API: Rate Limiting i Helmet (Seguretat)
	1. Teoria: [T08.02 Protecció de l'API](Teoria/Part%208%20-%20Qualitat%20professional/T08.02%20Protecció%20de%20l'API.md)
	2. Pràctica: [P08.02 Protecció de l'API](Pràctiques/Part%208%20-%20Qualitat%20professional/P08.02%20Protecció%20de%20l'API.md)
		1. Solució: [SOL-P08.02 Protecció de l'API](Pràctiques/Part%208%20-%20Qualitat%20professional/Solució/SOL-P08.02%20Protecció%20de%20l'API.md)
39. Traçabilitat del servidor: Logging professional (Winston/Morgan)
	1. Teoria:  [T08.03 Traçabilitat del servidor](Teoria/Part%208%20-%20Qualitat%20professional/T08.03%20Traçabilitat%20del%20servidor.md)
	2. Pràctica: [P08.03 Traçabilitat del servidor](Pràctiques/Part%208%20-%20Qualitat%20professional/P08.03%20Traçabilitat%20del%20servidor.md)
		1. Exemples de log: [Mostra de registre de logs](Pràctiques/Part%208%20-%20Qualitat%20professional/Solució/Mostra%20de%20registre%20de%20logs.md)
			1. combined.log: [combined.log](Pràctiques/Part%208%20-%20Qualitat%20professional/Solució/logs/combined.log.md)
			2. error.log: [error.log](Pràctiques/Part%208%20-%20Qualitat%20professional/Solució/logs/error.log.md)
40. Modularització de Rutes: L'Enrutador Central (Router Centralizer)
	1. Teoria: [T08.04 Modularització de Rutes](Teoria/Part%208%20-%20Qualitat%20professional/T08.04%20Modularització%20de%20Rutes.md)
	2. Pràctica: 
41. Orquestració de l'entorn complet amb Docker Compose
	1. Teoria - Pendent de fer [T08.05  Orquestració de l'entorn complet](Teoria/Part%208%20-%20Qualitat%20professional/T08.05%20%20Orquestració%20de%20l'entorn%20complet.md)
	2. Pràctica