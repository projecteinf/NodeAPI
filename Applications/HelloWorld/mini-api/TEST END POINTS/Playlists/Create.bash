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

function executar_i_resultat {
  ENDPOINT=$1
  EXPECTED=$2
  TEXTRESUL=$3

  POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/playlists \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$DATATRACK")

  IDCREATED=$(echo "$POST_RESPONSE" | head -n1 | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
  RESUL=$(echo "$POST_RESPONSE" | tail -n1)
  
  print_result "$ENDPOINT" "$EXPECTED" "$RESUL $TEXTRESUL" 

}



eliminar_playlists
generar_token mboada35@boscdelacoma.cat

echo "Token obtingut $TOKEN"

# ===================================================================================================================== 

echo "| Prova | Codi esperat | Codi obtingut | Correcte? | Observacions |" > results.md
echo "|---|---:|---:|---|---|" >> results.md


# ===================================================================================================================== 

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists sense TOKEN"
DATATRACK=$(cat <<EOF
{
  "name": "Música d'estiu",
  "description": "Música d'èxits d'estiu dels últims 30 anys"
}
EOF
)

POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/playlists \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

IDCREATED=$(echo "$POST_RESPONSE" | head -n1 | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /playlists" "401 Access denied. No token provided." "$RESUL Access denied. No token provided." 

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists amb totes les dades correctes"
DATATRACK=$(cat <<EOF
{
  "name": "Música d'estiu",
  "description": "Música d'èxits d'estiu dels últims 30 anys"
}
EOF
)

executar_i_resultat "POST /playlists" "201" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists només amb nom correcte (sense descripció)"
DATATRACK=$(cat <<EOF
{
  "name": "Música d'estiu per passar-ho bé"
}
EOF
)

executar_i_resultat "POST /playlists" "201" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists amb descripció duplicada"
DATATRACK=$(cat <<EOF
{
  "name": "Música d'estiu canyera",
  "description": "Música d'èxits d'estiu dels últims 30 anys"
}
EOF
)

executar_i_resultat "POST /playlists" "201" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists nom buit"
DATATRACK=$(cat <<EOF
{
  "name": "",
  "description": "Música d'èxits d'estiu dels últims 30 anys"
}
EOF
)

executar_i_resultat "POST /playlists" "400 Bad Request" "Bad Request"
echo -e "\n$POST_RESPONSE\n"


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists name not specified"
DATATRACK=$(cat <<EOF
{
  "description": "Música d'èxits d'estiu dels últims 30 anys"
}
EOF
)

executar_i_resultat "POST /playlists" "400 Bad Request" "Bad Request"
echo -e "\n$POST_RESPONSE\n"

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists títol duplicat llista pel mateix usuari"
DATATRACK=$(cat <<EOF
{
  "name": "Música d'estiu"
}
EOF
)

executar_i_resultat "POST /playlists" "400 A play list with this name already exists" "A play list with this name already exists" 


generar_token mboada35@xtec.cat


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists títol duplicat llista per a un usuari diferent"
DATATRACK=$(cat <<EOF
{
  "name": "Música d'estiu"
}
EOF
)

executar_i_resultat "POST /playlists" "201" "" 

cat results.md

eliminar_playlists
