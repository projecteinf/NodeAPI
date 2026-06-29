# Índex 

## Fonaments i Lògica de Programació 

* **Sintaxi bàsica i entorn d'execució**

		* Diferència entre client i servidor.	
		* Variables (`let`, `const`), tipus de dades i conversions.
		* Estructures de control: `if`,  bucles (`for`).
		* Depurador
	
	* Teoria: [T01.01 Sintaxi bàsica i entorn d'execució](Teoria/T01%20Fonaments%20i%20Lògica%20de%20Programació/T01.01%20Sintaxi%20bàsica%20i%20entorn%20d'execució.md) 
	* Pràctica: [P01.01 Sintaxi bàsica i entorn d'execució](Pràctica/P01%20Fonaments%20i%20Lògica%20de%20Programació%201/P01.01%20Sintaxi%20bàsica%20i%20entorn%20d'execució.md)
		* Solució: [S01.01 Sintaxi bàsica i entorn d'execució](Solucionari/SOL01%20Fonaments%20i%20Lògica%20de%20Programació/S01.01%20Sintaxi%20bàsica%20i%20entorn%20d'execució.md)
	
	* Planificació
		* Teoria: 30 minuts
		* Pràctica: 30 minuts

* **Estructures de dades i funcions** 

		* Definició de funcions (funcionals i *arrow functions*).
		* Matrius (Arrays) i operacions de col·leccions modernes: `map()`, `filter()`, `reduce()`.
		* Introducció als Objectes en JS i format JSON.

	* Teoria: [T01.02 Funcions, Arrays d'Objectes i Operacions Agregades](Teoria/T01%20Fonaments%20i%20Lògica%20de%20Programació/T01.02%20Funcions,%20Arrays%20d'Objectes%20i%20Operacions%20Agregades.md)
	* Pràctica: [P01.02 Funcions, Arrays d'Objectes i Operacions Agregades](Pràctica/P01%20Fonaments%20i%20Lògica%20de%20Programació%201/P01.02%20Funcions,%20Arrays%20d'Objectes%20i%20Operacions%20Agregades.md)
		* Solució: [S01.02 Funcions, Arrays d'Objectes i Operacions Agregades](Solucionari/SOL01%20Fonaments%20i%20Lògica%20de%20Programació/S01.02%20Funcions,%20Arrays%20d'Objectes%20i%20Operacions%20Agregades.md)
	
	* Planificació
		* Teoria: 30 minuts
		* Pràctica: 30 minuts
	
## La interfície nativa (El DOM i els Esdeveniments)

* **El model d'objectes del document (DOM)**
		
		* Què és el DOM i com s'hi accedeix des de JavaScript.
		* Modificar textos des de codi.
		* Generació dinàmica d'elements HTML.
		
	* Teoria: [T02.01 Manipulació dinàmica DOM](Teoria/T02%20La%20interfície%20nativa/T02.01%20Manipulació%20dinàmica%20DOM.md)
	* Pràctica: [P02.01 Manipulació dinàmica DOM](Pràctica/P02%20La%20interfície%20nativa/P02.01%20Manipulació%20dinàmica%20DOM.md)
		* Solució: [S02.01 Manipulació dinàmica DOM](Solucionari/SOL02%20La%20interficie%20nativa/S02.01%20Manipulació%20dinàmica%20DOM.md)
	
	* Planificació
		* Teoria: 30 minuts
		* Pràctica: 30 minuts

* **Interacció amb l'usuari (Esdeveniments i Formularis)**
	
		* Què és un esdeveniment? (`click`, `submit`).
		* Validació de formularis de forma nativa (ús d'Expressions Regulars per validar correus o contrasenyes).
		
	* Teoria: [T02.02 Esdeveniments del DOM](Teoria/T02%20La%20interfície%20nativa/T02.02%20Esdeveniments%20del%20DOM.md)
	* Pràctica: [P02.02 Esdeveniments del DOM](Pràctica/P02%20La%20interfície%20nativa/P02.02%20Esdeveniments%20del%20DOM.md)
		* Solució: [S02.02 Esdeveniments del DOM](Solucionari/SOL02%20La%20interficie%20nativa/S02.02%20Esdeveniments%20del%20DOM.md)
	
	* Planificació
		* Teoria: 30 minuts
		* Pràctica: 60 minuts

		
## React i Components

* **Introducció a React i JSX**

		* El concepte de SPA i per què serveix React en aplicacions grans.
		* Funcionament React.
		* Llenguatge JSX.
		* Copmponents.
		
	* Teoria: [T03.01 Introducció a React i JSX](Teoria/T03%20React%20i%20components/T03.01%20Introducció%20a%20React%20i%20JSX.md)
	* Pràctica: [P03.01 Introducció a React i JSX](Pràctica/P03%20React%20i%20components/P03.01%20Introducció%20a%20React%20i%20JSX.md)
		* Solució: [S03.01 Introducció a React i JSX](Solucionari/SOL03%20React%20i%20components/S03.01%20Introducció%20a%20React%20i%20JSX.md)
	
	* Planificació
		* Teoria: 30 minuts
		* Pràctica: 30 minuts

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
