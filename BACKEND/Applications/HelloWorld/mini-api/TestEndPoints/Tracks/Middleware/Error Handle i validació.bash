#!/bin/bash
# ====================================================================================================================== TEST GET
echo -e  "GET ALL tracks"
curl -i http://localhost:3000/tracks

echo -e  "\n=====================================================================================================================\n"

echo -e  "GET track by ID: FE3C4F2A-B094-4908-B4D8-AFD5C9989656"
curl -i http://localhost:3000/tracks/FE3C4F2A-B094-4908-B4D8-AFD5C9989656

echo -e  "\n=====================================================================================================================\n"

echo -e  "GET track by ID => NOT FOUND: FE3C4F2A-1111-4908-B4D8-AFD5C9989656"
curl -i http://localhost:3000/tracks/FE3C4F2A-1111-4908-B4D8-AFD5C9989656

echo -e  "\n=====================================================================================================================\n"

echo -e  "GET track by ID => INVALID ID: 12345"
curl -i http://localhost:3000/tracks/12345

# ===================================================================================================================== TEST POST

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /tracks"
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

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /tracks => ALBUM ID NULL"
IDALBUM="B66D3E63-30B5-4273-BB6A-778E94E9FDA9"
IDARTIST="4A512A1D-3D1D-4E17-A144-5BBEF500717C"
DATATRACK=$(cat <<EOF
{
  "title": "Don't Stop Me Now",
  "artistId": "$IDARTIST",
  "albumId": null,
  "durationSeconds": 209
}
EOF
)
curl -i -X POST http://localhost:3000/tracks   -H "Content-Type: application/json"   -d "$DATATRACK"

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /tracks => ALBUM ID REMOVED"
IDALBUM="B66D3E63-30B5-4273-BB6A-778E94E9FDA9"
IDARTIST="4A512A1D-3D1D-4E17-A144-5BBEF500717C"
DATATRACK=$(cat <<EOF
{
  "title": "Don't Stop Me Now",
  "artistId": "$IDARTIST",
  "durationSeconds": 209
}
EOF
)
curl -i -X POST http://localhost:3000/tracks   -H "Content-Type: application/json"   -d "$DATATRACK"

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /tracks => INVALID BODY -> TITLE EMPTY"
IDALBUM="B66D3E63-30B5-4273-BB6A-778E94E9FDA9"
IDARTIST="4A512A1D-3D1D-4E17-A144-5BBEF500717C"
DATATRACK=$(cat <<EOF
{
  "title": "",
  "artistId": "$IDARTIST",
  "durationSeconds": 209
}
EOF
)
curl -i -X POST http://localhost:3000/tracks   -H "Content-Type: application/json"   -d "$DATATRACK"

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /tracks => INVALID BODY -> DURATION INVALID"
IDALBUM="B66D3E63-30B5-4273-BB6A-778E94E9FDA9"
IDARTIST="4A512A1D-3D1D-4E17-A144-5BBEF500717C"
DATATRACK=$(cat <<EOF
{
  "title": "Don't Stop Me Now",
  "artistId": "$IDARTIST",
  "durationSeconds": 0
}
EOF
)
curl -i -X POST http://localhost:3000/tracks   -H "Content-Type: application/json"   -d "$DATATRACK"

# ===================================================================================================================== TEST PUT

echo -e  "\n=====================================================================================================================\n"

echo -e  "PUT /tracks/{id} - Modificar cançó"
curl -i -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Don'\''t Stop Me Now - Remastered",
    "artistId": "4A512A1D-3D1D-4E17-A144-5BBEF500717C",
    "albumId": "B66D3E63-30B5-4273-BB6A-778E94E9FDA9",
    "durationSeconds": 210
  }'

curl -i http://localhost:3000/tracks/$IDCREATED

echo -e  "\n=====================================================================================================================\n"

echo -e  "PUT /tracks => ALBUM ID NULL"
IDALBUM="B66D3E63-30B5-4273-BB6A-778E94E9FDA9"
IDARTIST="4A512A1D-3D1D-4E17-A144-5BBEF500717C"
DATATRACK=$(cat <<EOF
{
  "title": "Don't Stop Me Now",
  "artistId": "$IDARTIST",
  "albumId": null,
  "durationSeconds": 209
}
EOF
)
curl -i -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d "$DATATRACK"

echo -e  "\n=====================================================================================================================\n"

echo -e  "PUT /tracks => ALBUM ID REMOVED"
IDALBUM="B66D3E63-30B5-4273-BB6A-778E94E9FDA9"
IDARTIST="4A512A1D-3D1D-4E17-A144-5BBEF500717C"
DATATRACK=$(cat <<EOF
{
  "title": "Don't Stop Me Now",
  "artistId": "$IDARTIST",
  "durationSeconds": 209
}
EOF
)
curl -i -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d  "$DATATRACK"

echo -e  "\n=====================================================================================================================\n"

echo -e  "PUT /tracks => INVALID BODY -> TITLE EMPTY"
IDALBUM="B66D3E63-30B5-4273-BB6A-778E94E9FDA9"
IDARTIST="4A512A1D-3D1D-4E17-A144-5BBEF500717C"
DATATRACK=$(cat <<EOF
{
  "title": "",
  "artistId": "$IDARTIST",
  "durationSeconds": 209
}
EOF
)
curl -i -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d  "$DATATRACK"

echo -e  "\n=====================================================================================================================\n"

echo -e  "PUT /tracks => INVALID BODY -> DURATION INVALID"
IDALBUM="B66D3E63-30B5-4273-BB6A-778E94E9FDA9"
IDARTIST="4A512A1D-3D1D-4E17-A144-5BBEF500717C"
DATATRACK=$(cat <<EOF
{
  "title": "Don't Stop Me Now",
  "artistId": "$IDARTIST",
  "durationSeconds": 0
}
EOF
)
curl -i -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d  "$DATATRACK"



# ===================================================================================================================== TEST DELETE

echo -e  "\n=====================================================================================================================\n"

echo -e  "DELETE /tracks/{id} - Eliminar cançó"
curl -i -X DELETE http://localhost:3000/tracks/$IDCREATED 

echo -e  "\n=====================================================================================================================\n"

echo -e  "DELETE track by ID => NOT FOUND: $IDCREATED"
curl -i -X DELETE http://localhost:3000/tracks/$IDCREATED 

echo -e  "\n=====================================================================================================================\n"

echo -e  "DELETE track by ID => INVALID ID: 12345"
curl -i -X DELETE http://localhost:3000/tracks/12345




# ===================================================================================================================== NETEJA de dades

echo -e  "\n=====================================================================================================================\n"
echo -e  "Neteja de dades: Eliminar cançó creada i d'execucions anteriors"

docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd   -S localhost   -U sa   -P "Patata123!"   -No  \
   -d MusicCloud   -Q "DELETE FROM Tracks WHERE title like '%Stop%';"


# ===================================================================================================================== ERROR HANDLE

CONTID=$(docker ps | tail -n1 | cut -c 1-12)

echo -e  "\n=====================================================================================================================\n"
echo -e  "STOP API CONTAINER TO SIMULATE ERROR 500"
docker stop $CONTID > /dev/null

echo -e  "GET ALL tracks => SIMULATE ERROR 500"
curl -i http://localhost:3000/tracks

echo -e  "\n=====================================================================================================================\n"

echo -e  "START API CONTAINER"
docker start $CONTID  > /dev/null

