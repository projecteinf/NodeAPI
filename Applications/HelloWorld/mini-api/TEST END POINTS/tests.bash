echo "**********************************************Obtenir tots els tracks"
curl -i http://localhost:3000/tracks

echo -e "\n**********************************************Obtenir un track segons ID\n"
ATRACK=$(curl http://localhost:3000/tracks)
IDT=$(echo $ATRACK | cut -d":" -f 2 | cut -d"," -f 1 | cut -d '"' -f2)
echo -e "\nIDENTIFICADOR DEL TRACK A BUSCAR:'$IDT'"
curl -i "http://localhost:3000/tracks/$IDT"

echo -e "\n**********************************************Crear un nou track"
IDTRACK=$(curl http://localhost:3000/tracks   -H "Content-Type: application/json"   -d '{"title":"Bad Habits","artist":"Ed Sheeran","duration":231}' )
IDTRACK=$(echo $IDTRACK | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
echo -e "\nIdentificador nou element $IDTRACK"
echo -e "\n**********************************************Obtenir"
curl -i http://localhost:3000/tracks/$IDTRACK

echo -e "\n**********************************************Modificar"
curl -i -X PUT http://localhost:3000/tracks/$IDTRACK   -H "Content-Type: application/json"   -d '{"title":"Good Habits","artist":"Ed Sheeran","duration":240}'
echo -e "\n**********************************************Obtenir"
curl -i http://localhost:3000/tracks/$IDTRACK

echo -e "\n*********************************************Eliminar NO CONTENT"
curl -i -X DELETE http://localhost:3000/tracks/$IDTRACK
echo -e "\n**********************************************Obtenir - NOT FOUND"
curl -i http://localhost:3000/tracks/$IDTRACK
