echo "GET ALL tracks"
curl -i http://localhost:3000/tracks

echo "====================================================================================================================="

echo "GET track by ID: FE3C4F2A-B094-4908-B4D8-AFD5C9989656"
curl -i http://localhost:3000/tracks/FE3C4F2A-B094-4908-B4D8-AFD5C9989656

echo "====================================================================================================================="

echo "GET track by ID => NOT FOUND: FE3C4F2A-1111-4908-B4D8-AFD5C9989656"
curl -i http://localhost:3000/tracks/FE3C4F2A-1111-4908-B4D8-AFD5C9989656


echo "====================================================================================================================="

echo "POST /tracks"
IDALBUM="B66D3E63-30B5-4273-BB6A-778E94E9FDA9"
IDARTIST="4A512A1D-3D1D-4E17-A144-5BBEF500717C"
DATATRACK=$(cat <<EOF
{
  "title": "Don't Stop Me Now",
  "artistId": "$IDARTIST",
  "albumId": "$IDALBUM",
  "durationSeconds": 209
}
EOF
)

IDCREATED=$(curl -X POST http://localhost:3000/tracks   -H "Content-Type: application/json"   -d "$DATATRACK" | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)

curl -i http://localhost:3000/tracks/$IDCREATED


echo "====================================================================================================================="

echo "PUT /tracks/{id} - Modificar cançó"
curl -i -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Don'\''t Stop Me Now - Remastered",
    "artistId": "4A512A1D-3D1D-4E17-A144-5BBEF500717C",
    "albumId": "B66D3E63-30B5-4273-BB6A-778E94E9FDA9",
    "durationSeconds": 210
  }'

curl -i http://localhost:3000/tracks/$IDCREATED

# echo "====================================================================================================================="

# echo "DELETE /tracks/{id} - Eliminar cançó"
# curl -i -X DELETE http://localhost:3000/tracks/$IDCREATED 

IDCREATED="784E36C8-465F-4B5C-AEE8-81E508AA9487"
curl -i -X DELETE http://localhost:3000/tracks/$IDCREATED 
