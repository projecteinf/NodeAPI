#!/bin/bash

function print_result {
  local test="$1"
  local expected="$(echo "$2" | xargs)"
  local obtained="$(echo "$3" | xargs)"

  if [ "$expected" == "$obtained" ]; then
    correct="Yes"
  else
    correct="No"
  fi
  local observations="$4"
  
  echo "| $test | $expected | $obtained | $correct | $observations |" >> results.md
}

function eliminar_playlists {
  echo -e  "\n=====================================================================================================================\n"

  echo "Eliminar playlists"

  docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd   -S localhost   -U sa   -P "Patata123!"   -No  \
      -d MusicCloud   -Q "DELETE FROM playlists WHERE name like '%estiu%';" 2>/dev/null
}

function generar_token {

  echo -e  "\n=====================================================================================================================\n"

  USEREMAIL=$1

  echo -e  "POST /users - Registrar nou usuari"
  DATATRACK=$(cat <<EOF
  {
    "username": "miquel.boada",
    "email": "mboada35@boscdelacoma.cat",
    "password": "password123"
  }
EOF
  )

  curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
    -H "Content-Type: application/json" \
    -d "$DATATRACK" 2>&1 >/dev/null

  echo -e  "POST /users - Registrar nou usuari"
    DATATRACK=$(cat <<EOF
    {
      "username": "mboada",
      "email": "mboada35@xtec.cat",
      "password": "password123"
    }
EOF
  )

  curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
    -H "Content-Type: application/json" \
    -d "$DATATRACK" 2>&1 >/dev/null

  echo -e  "\n=====================================================================================================================\n"

  echo -e  "POST /users/login - Login correcte - obtenir TOKEN"
  DATATRACK=$(cat <<EOF
  {
    "email": "$USEREMAIL",
    "password": "password123"
  }
EOF
  )

  TOKEN=$(curl http://localhost:3000/users/login   -H "Content-Type: application/json"   -d "$DATATRACK" | cut -d "\"" -f4)

}


function crear_playlist {

  echo -e  "\n=====================================================================================================================\n"

  echo -e  "POST /playlists amb totes les dades correctes"
  DATATRACK=$(cat <<EOF
  {
    "name": "Música d'estiu",
    "description": "Música d'èxits d'estiu dels últims 30 anys"
  }
EOF
  )

  POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/playlists \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$DATATRACK")

  IDCREATED=$(echo "$POST_RESPONSE" | head -n1 | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
}


eliminar_playlists
generar_token mboada35@boscdelacoma.cat
crear_playlist

TOKENCREACIO=$TOKEN
generar_token mboada35@xtec.cat

echo "Play list created: $IDCREATED"


# ===================================================================================================================== 

echo -e  "\n=====================================================================================================================\n"
echo -e  "DELETE /playlists/id d'un altre usuari"

curl -i -X DELETE http://localhost:3000/playlists/$IDCREATED \
  -H "Authorization: Bearer $TOKEN" 
  
  
echo -e  "\n=====================================================================================================================\n"
echo -e  "DELETE /playlists/id -> id correcte i llista és propietat de l'usuari"

curl -i -X DELETE http://localhost:3000/playlists/$IDCREATED \
  -H "Authorization: Bearer $TOKENCREACIO" 
  

echo -e  "\n=====================================================================================================================\n"
echo -e  "DELETE /playlists/id que no existeix. Borrat prèviament"

curl -i -X DELETE http://localhost:3000/playlists/$IDCREATED \
  -H "Authorization: Bearer $TOKENCREACIO" 

# eliminar_playlists