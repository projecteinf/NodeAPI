IDTRACK=$(curl http://localhost:3000/tracks   -H "Content-Type: application/json"   -d '{"title":"Bad Habits","artist":"Ed Sheeran","duration":231}' )
IDTRACK=$(echo $IDTRACK | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
echo "Identificador nou element $IDTRACK"
echo "**********************************************Obtenir"
curl -i http://localhost:3000/tracks/$IDTRACK
echo "**********************************************Modificar"
curl -i -X PUT http://localhost:3000/tracks/$IDTRACK   -H "Content-Type: application/json"   -d '{"title":"Good Habits","artist":"Ed Sheeran","duration":240}'
echo "**********************************************Obtenir"
curl -i http://localhost:3000/tracks/$IDTRACK

echo "**********************************************Eliminar NO CONTENT"
curl -i -X DELETE http://localhost:3000/tracks/$IDTRACK
echo "**********************************************Obtenir - NOT FOUND"
curl -i http://localhost:3000/tracks/$IDTRACK
