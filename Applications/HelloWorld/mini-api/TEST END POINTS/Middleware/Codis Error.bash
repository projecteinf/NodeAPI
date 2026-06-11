#!/bin/bash

function print_result {
  local test="$1"
  local expected="$2"
  local obtained="$3"
  if [ "$expected" == "$obtained" ]; then
    correct="Yes"
  else
    correct="No"
  fi
  local observations="$4"
  
  echo "| $test | $expected | $obtained | $correct | $observations |" >> results.md
}

echo "| Prova | Codi esperat | Codi obtingut | Correcte? | Observacions |" > results.md
echo "|---|---:|---:|---|---|" >> results.md

# ====================================================================================================================== TEST GET
echo -e  "GET ALL tracks"
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" http://localhost:3000/tracks)

print_result "GET /tracks" "200 OK" "$RESUL OK" ""
# 

echo -e  "\n=====================================================================================================================\n"

echo -e  "GET track by ID: FE3C4F2A-B094-4908-B4D8-AFD5C9989656"
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" http://localhost:3000/tracks/FE3C4F2A-B094-4908-B4D8-AFD5C9989656)

print_result "GET /tracks/FE3C4F2A-B094-4908-B4D8-AFD5C9989656" "200 OK" "$RESUL OK" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "GET track by ID => NOT FOUND: FE3C4F2A-1111-4908-B4D8-AFD5C9989656"
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" http://localhost:3000/tracks/FE3C4F2A-1111-4908-B4D8-AFD5C9989656)

print_result "GET /tracks/FE3C4F2A-1111-4908-B4D8-AFD5C9989656" "404 Not Found" "$RESUL Not Found" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "GET track by ID => INVALID ID: 12345"
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" http://localhost:3000/tracks/12345)

print_result "GET /tracks/12345" "400 Bad Request" "$RESUL Bad Request" ""
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

POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

IDCREATED=$(echo "$POST_RESPONSE" | head -n1 | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /tracks" "201" "$RESUL" 

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


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

IDCREATED=$(echo "$POST_RESPONSE" | head -n1 | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /tracks => ALBUM ID NULL" "201" "$RESUL" ""

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
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X POST http://localhost:3000/tracks   -H "Content-Type: application/json"   -d "$DATATRACK")

print_result "POST /tracks => ALBUM ID REMOVED" "201" "$RESUL" ""

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
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X POST http://localhost:3000/tracks   -H "Content-Type: application/json"   -d "$DATATRACK")

print_result "POST /tracks => INVALID BODY -> TITLE EMPTY" "400 Bad Request" "$RESUL Bad Request" ""

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
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X POST http://localhost:3000/tracks   -H "Content-Type: application/json"   -d "$DATATRACK")

print_result "POST /tracks => INVALID BODY -> DURATION INVALID" "400 Bad Request" "$RESUL Bad Request" ""

# ===================================================================================================================== TEST PUT

echo -e  "\n=====================================================================================================================\n"

echo -e  "PUT /tracks/{id} - Modificar cançó"
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Don'\''t Stop Me Now - Remastered",
    "artistId": "4A512A1D-3D1D-4E17-A144-5BBEF500717C",
    "albumId": "B66D3E63-30B5-4273-BB6A-778E94E9FDA9",
    "durationSeconds": 210
  }')

RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" http://localhost:3000/tracks/$IDCREATED)

print_result "PUT /tracks/{id} - Modificar cançó" "200 OK" "$RESUL OK" ""
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
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

print_result "PUT /tracks => ALBUM ID NULL" "200 OK" "$RESUL OK" ""

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
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d  "$DATATRACK")

print_result "PUT /tracks => ALBUM ID REMOVED" "200 OK" "$RESUL OK" ""

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
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d  "$DATATRACK")

print_result "PUT /tracks => INVALID BODY -> TITLE EMPTY" "400 Bad Request" "$RESUL Bad Request" ""

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
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X PUT http://localhost:3000/tracks/$IDCREATED \
  -H "Content-Type: application/json" \
  -d  "$DATATRACK")

print_result "PUT /tracks => INVALID BODY -> DURATION INVALID" "400 Bad Request" "$RESUL Bad Request" ""

# ===================================================================================================================== TEST DELETE

echo -e  "\n=====================================================================================================================\n"

echo -e  "DELETE /tracks/{id} - Eliminar cançó"
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X DELETE http://localhost:3000/tracks/$IDCREATED)

print_result "DELETE /tracks/{id} - Eliminar cançó" "204 No Content" "$RESUL No Content" ""
echo -e  "\n=====================================================================================================================\n"

echo -e  "DELETE track by ID => NOT FOUND: $IDCREATED"
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X DELETE http://localhost:3000/tracks/$IDCREATED)

print_result "DELETE track by ID => NOT FOUND: $IDCREATED" "404 Not Found" "$RESUL Not Found" ""
echo -e  "\n=====================================================================================================================\n"

echo -e  "DELETE track by ID => INVALID ID: 12345"
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" -X DELETE http://localhost:3000/tracks/12345)
print_result "DELETE track by ID => INVALID ID: 12345" "400 Bad Request" "$RESUL Bad Request" ""

# ===================================================================================================================== ERROR HANDLE

CONTID=$(docker ps | tail -n1 | cut -c 1-12)

echo -e  "\n=====================================================================================================================\n"
echo -e  "STOP API CONTAINER TO SIMULATE ERROR 500"
docker stop $CONTID > /dev/null

echo -e  "GET ALL tracks => SIMULATE ERROR 500"
RESUL=$(curl -s -o /dev/null -w "%{http_code}\n" -w "%{http_code}\n" http://localhost:3000/tracks)

print_result "GET /tracks => SIMULATE ERROR 500" "500 Internal Server Error" "$RESUL Internal Server Error" ""
echo -e  "\n=====================================================================================================================\n"

echo -e  "START API CONTAINER"
docker start $CONTID  > /dev/null

echo -e  "\n=====================================================================================================================\n"