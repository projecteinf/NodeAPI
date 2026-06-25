# Índex 

## UD01 Arquitectures de Programació Web i Sintaxi Essencial (JS)

*En aquesta unitat es cobreixen els fonaments de l'entorn client i es repassa la sintaxi nativa utilitzant la consola i scripts bàsics.*

* **1.1. Arquitectura Client/Servidor:** Models d'execució. Capacitats, seguretat i limitacions del navegador web.
	* Teoria: [UD01.01 Client - Servidor](Teoria/UD01%20-%20Arquitectures%20de%20programació/UD01.01%20Client%20-%20Servidor.md)
	* Pràctica: [UD01.01 Client - Servidor](Pràctica/UD01%20-%20Arquitectures%20de%20programació/UD01.01%20Client%20-%20Servidor.md)
		* Solució (IA): [UD01.01 Client - Servidor](Solucionari/UD01.01%20Client%20-%20Servidor.md)
* **1.2. Integració en l'ecosistema web:** Com es vincula el codi (scripts) amb les etiquetes HTML.
* **1.3. Eines de desenvolupament:** Ús de la consola del navegador, editors de codi (VS Code) i l'entorn Node.js/npm.
* **1.4. Sintaxi fonamental de JavaScript (ES6+):**
	* Variables, àmbits (`var`, `let`, `const`) i tipus de dades.
	* Operadors, assignacions i conversions de tipus (coerció).
	* Estructures de control: Decisions (`if/else`, `switch`) i bucles (`for`, `while`, `forEach`).
	* Bones pràctiques: Comentaris i documentació del codi.
	


## Unitat Didàctica 2: Programació Estructurada: Funcions, Col·leccions i Objectes

*Es preparen els conceptes avançats de JavaScript que són indispensables per entendre com React gestiona les dades (estat, llistes de cançons, usuaris).*

* **2.1. Funcions en JavaScript:** Declaració, expressions, funcions fletxa (*arrow functions*) i funcions predefinides.
* **2.2. Gestió de Col·leccions (Matrius/Arrays):** * Creació i manipulació d'arrays.
* Operacions agregades modernes: `map`, `filter`, `reduce` (claus per renderitzar llistes a React).


* **2.3. Programació Orientada a Objectes en JS:**
* Objectes definits per l'usuari: Propietats i mètodes.
* Estructures de dades complexes (JSON) aplicades a objectes musicals (cançó, àlbum, artista).


* **2.4. Introducció als Patrons de Disseny** en l'entorn client.
* **2.5. Objectes predefinits del llenguatge (Natius):** `Math`, `Date`, etc.

## Unitat Didàctica 3: El Navegador (BOM), Emmagatzematge i Validació de Formularis

*Gestió de l'entorn de la finestra i recollida de dades de l'usuari abans de passar al model de components.*

* **3.1. El Browser Object Model (BOM):** Objectes de finestra (`window`), historial, i interacció nativa amb l'usuari.
* **3.2. Mecanismes d'emmagatzematge web (Web Storage):** * `LocalStorage` i `SessionStorage` (es farà servir per desar el token d'autenticació de Spotify o la llista de reproducció recent).
* **3.3. Formularis Web i Validació:**
* Gestió i modificació d'aparença des de codi.
* Ús d'**Expressions Regulars (RegEx)** per a la validació (registre d'usuaris, login).



## Unitat Didàctica 4: El Model d'Objectes del Document (DOM) i Esdeveniments (JS Natiu)

*Abans d'entrar a React, l'alumne ha d'entendre com funciona el DOM natiu per valorar l'abstracció (Virtual DOM) que ofereix el framework.*

* **4.1. El Model d'Objectes del Document (DOM):** Estructura de l'arbre, propietats i mètodes d'accés (selectors).
* **4.2. Manipulació del DOM:** Creació, modificació i eliminació dinàmica d'elements HTML i estils CSS des de JS.
* **4.3. Gestió d'Esdeveniments:** Captura, propagació (*bubbling/capturing*) i associació d'accions.
* **4.4. Arquitectura de tres capes:** Separació estricta de contingut (HTML), aspecte (CSS) i comportament (JS).
* **4.5. Problemes de compatibilitat:** Diferències d'implementació entre navegadors històrics i estàndards moderns.

## Unitat Didàctica 5: Introducció a React i Arquitectura basada en Components

*Inici del bloc pràctic del projecte de la interfície de Spotify.*

* **5.1. Què és React?** El concepte de SPA (*Single Page Application*) i el *Virtual DOM*.
* **5.2. Configuració de l'entorn de treball:** Creació del projecte (Vite + React) i integració de llibreries/frameworks de disseny (Tailwind CSS o Bootstrap).
* **5.3. Sintaxi JSX:** Integració definitiva de lògica de programació i marcatge.
* **5.4. Components a React:** Creació de components funcionals (reutilització de la interfície: `Sidebar`, `Navbar`, `PlayerBar`, `SongCard`).
* **5.5. Props:** Pas de propietats entre components (enviar informació de la cançó al component targeta).

## Unitat Did’actica 6: Gestió de l'Estat i Esdeveniments a React (La Interfície Dinàmica)

*Evolució de la interfície de Spotify per fer-la interactiva.*

* **6.1. Esdeveniments a React:** Captura d'esdeveniments d'usuari dins de l'ecosistema de React (fer clic a "Play", passar de cançó).
* **6.2. L'Estat amb el Hook `useState`:** Com fer que la interfície reaccioni als canvis (cançó actual sonant, llista de reproducció activa, volum).
* **6.3. Renderitzat condicional i de llistes:** Ús de `.map()` per llistar àlbums o cançons dinàmicament a la pantalla principal.

## Unitat Didàctica 7: Comunicació Asíncrona i Connexió amb la l'API (Backend)

*Connexió de la interfície amb el backend de tipus Spotify creat a l'altre mòdul.*

* **7.1. Conceptes d'Asincronia en JS:** Promeses i la sintaxi `async/await`.
* **7.2. Consum de serveis web (APIs REST):** Ús de l'objecte natiu `fetch` (o la llibreria `axios`) per comunicar client i servidor.
* **7.3. El Hook `useEffect`:** Gestió del cicle de vida del component per realitzar peticions asíncrones al carregar la pàgina (portar les cançons de la base de dades).
* **7.4. Gestió de diferents formats de dades:** Enviament i recepció d'informació (JSON, capçaleres d'autenticació Bearer Token).
* **7.5. Tractament d'errors:** Control d'errors en les comunicacions i càrregues asíncrones en la interfície (estats de *Loading* i *Error*).

## Unitat Didàctica 8: Encapsulament, Eines de Prova i Desplegament

*Tancament del mòdul enfocat a la qualitat del programari, documentació i publicació.*

* **8.1. Depuració de codi (Debugging):** Ús de React Developer Tools i punts de ruptura (*breakpoints*) al navegador.
* **8.2. Proves unitiàries bàsiques:** Introducció a les eines de proves en entorn client.
* **8.3. Documentació del codi:** Eines de generació de documentació i bones pràctiques.
* **8.4. Producció i Desplegament (Build):** Optimització de l'aplicació client per a producció i desplegament en servidors estàtics (Vercel, Netlify, etc.).

---

### Per què funciona aquesta estructura?

1. **Compleix la normativa:** Totes les referències curriculars textuals que m'has donat (com ara "conversions", "expressions regulars", "diverses finestres/pestanyes", "operacions agregades", "formats d'enviament") estan integrades en el moment lògic del seu aprenentatge.
2. **Projecte Tractor (Spotify):** Des de la Unitat 5, els alumnes ja no fan exercicis solts, sinó que comencen a maquetar el reproductor, la barra lateral i les llistes, aplicant de cop tot el que han après de JavaScript a les unitats anteriors.
3. **Sinergia amb el Backend:** La Unitat 7 serà el punt àlgid del curs, on l'aplicació "cobrarà vida" connectant el reproductor de React amb l'API real que estan desenvolupant en l'altre mòdul.