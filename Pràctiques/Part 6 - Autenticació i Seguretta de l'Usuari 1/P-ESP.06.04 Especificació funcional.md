
# **Especificació Funcional

## Gestió de Carpetes de Cançons**

### Descripció de la necessitat

El sistema ha de permetre que els usuaris organitzin i personalitzin la seva experiència musical mitjançant la creació de **carpetes** virtuals. Una carpeta és un contenidor privat on l'usuari pot agrupar les seves cançons preferides segons els seus propis criteris (estat d'ànim, gènere, activitat, etc.).

### Requeriments detallats:

1. **Creació il·limitada i identificació:** Cada usuari autenticat podrà crear tantes carpetes com desitgi. Per diferenciar-les, cada carpeta tindrà un **nom obligatori** triat per l'usuari (ex: *"Música per a córrer"*, *"Clàssics dels 80"*). L'usuari també podrà associar una descripció adicional a la carpeta. Un usuari no podrà donar el mateix nom a dues llistes de reproducció.

2. **Gestió del contingut (Afegir / Treure):** L'usuari tindrà el control total sobre el contingut de les seves carpetes. Des de la interfície de reproducció o el cercador, es podrà "afegir a una carpeta" qualsevol cançó de la plataforma. De la mateixa manera, des de dins de la carpeta, l'usuari podrà eliminar qualsevol cançó que ja no hi vulgui tenir.

3. **Reproducció seqüencial:** Una carpeta actuarà com una unitat de reproducció. L'usuari ha de poder iniciar la reproducció de la carpeta, i el sistema enllaçarà totes les cançons contingudes en un **ordre seqüencial** (de la primera a l'última segons l'ordre en què es van afegir).

4. **Propietat i Privacitat (Seguretat):** Les carpetes són d'àmbit privat. Un usuari només pot veure, modificar i reproduir les carpetes que ell mateix ha creat. Cap usuari pot accedir a les carpetes d'altres membres de la plataforma.

