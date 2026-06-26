# Índex 

## Fonaments i Lògica de Programació (JavaScript pur)

*L'objectiu és que l'alumne aprengui a programar sense la pressió de la interfície gràfica. Tot s'executa a la consola.*

* **Unitat 1: Sintaxi bàsica i entorn d'execució**
* Diferència entre client i servidor (molt bàsica, sense entrar en detalls de seguretat complexos).
* Variables (`let`, `const`), tipus de dades i conversions.
* Estructures de control: `if`, `switch`, bucles (`for`, `while`).
* *Pràctica:* Crear un petit script de consola que simuli el flux de login d'un usuari (usuari correcte/incorrecte).


* **Unitat 2: Estructures de dades i funcions (El motor de Spotify)**
* Definició de funcions (funcionals i *arrow functions*).
* Matrius (Arrays) i operacions de col·leccions modernes: `map()`, `filter()`, `reduce()`.
* Introducció als Objectes en JS i format JSON.
* *Pràctica:* Crear una llista de cançons (un array d'objectes amb títol, artista, durada) i fer servir `.filter()` per buscar cançons d'un artista o `.map()` per llistar-les per consola.
## La interfície nativa (El DOM i els Esdeveniments)

*Ara que saben manipular dades, aprenen com fer que aquestes dades es vegin a una pàgina web clàssica.*

* **Unitat 3: El model d'objectes del document (DOM)**
* Què és el DOM i com s'hi accedeix des de JavaScript.
* Modificar textos, imatges i estils CSS des de codi.
* Generació dinàmica d'elements HTML (crear les targetes de les cançons a la pantalla).

* **Unitat 4: Interacció amb l'usuari (Esdeveniments i Formularis)**
* Què és un esdeveniment? Escuitar el fons del botó (`click`, `submit`).
* Validació de formularis de forma nativa (ús d'Expressions Regulars per validar correus o contrasenyes).
* *Pràctica:* Crear una pàgina web amb una llista visual de cançons on, en fer clic al botó "Play", canviï el text del reproductor inferior de la pantalla.
## React i Components

*Un cop l'alumne s'ha barallat amb el DOM natiu i veu com és de feixuc gestionar-ho a mà, introduïm React. Entendran perfectament per què és útil.*

* **Unitat 5: Introducció a React i JSX**
* El concepte de SPA i per què serveix React en aplicacions grans com Spotify.
* Instal·lació de l'entorn (Vite) i creació de components.
* Estructura visual de Spotify en components: `Sidebar`, `Navbar`, `MainContent`, `PlayerBar`.


* **Unitat 6: Estat (`useState`) i Esdeveniments a React**
* Com reacciona React als clics (reproduir, pausar, passar de cançó).
* Gestió de l'estat local: saber quina cançó està sonant en cada moment.
* Pintar llistes de cançons amb JSX fent servir el `.map()` que van aprendre a la Unitat 2.
## Seguretat i Connexió Total (Asincronia i l'API)

*El final del camí. La interfície ja és maca i interactiva, ara toca connectar-la al backend real.*

* **Unitat 7: El Temps Real i l'Asincronia**
* Conceptes de promeses i `async/await`.
* La comanda `fetch()` per demanar dades.
* El cicle de vida amb `useEffect` (portar les cançons de la base de dades en obrir la web).


* **Unitat 8: L'Arquitectura de Seguretat (La unitat que estàvem fent)**
* **Aquí és on introduïm el Sandbox, la Política de Mateix Origen (SOP) i els errors de CORS.**
* Ara l'alumne ho entendrà perfectament perquè s'hi trobarà de cop en intentar fer un `fetch()` des del seu React (`:5173`) cap al vostre Backend (`:3000`). L'error de CORS tindrà un sentit pràctic immediat.
* Mecanismes d'emmagatzematge (`localStorage`) per desar el token d'autenticació de la sessió.
