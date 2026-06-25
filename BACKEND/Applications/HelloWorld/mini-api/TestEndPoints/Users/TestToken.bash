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

#####################################################################################################################
# EXAMINAR DADES
# docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd   -S localhost   -U sa   -P "Patata123!"   -No   -d MusicCloud   -Q "SELECT * FROM Users;"
#####################################################################################################################


echo "| Prova | Codi esperat | Codi obtingut | Correcte? | Observacions |" > results.md
echo "|---|---:|---:|---|---|" >> results.md


# Creem usuari


echo -e  "\n=====================================================================================================================\n"

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


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users/login - Login correcte - obtenir TOKEN"
DATATRACK=$(cat <<EOF
{
  "email": "mboada35@boscdelacoma.cat",
  "password": "password123"
}
EOF
)

TOKEN=$(curl http://localhost:3000/users/login   -H "Content-Type: application/json"   -d "$DATATRACK" | cut -d "\"" -f4)

echo "Token obtingut $TOKEN"

# =====================================================================================================================  INICI DE TESTS

echo -e  "\n=====================================================================================================================\n"

echo -e  "GET /users/me - Token correcte"


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer $TOKEN")

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "GET /users/me" "200" "$RESUL" 


echo -e  "\n=====================================================================================================================\n"

echo -e  "GET /users/me - sense token"

POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET http://localhost:3000/users/me )

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "GET /users/me" "401 Access denied. No token provided." "$RESUL Access denied. No token provided." 


echo -e  "\n=====================================================================================================================\n"

echo -e  "GET /users/me - Token incorrecte"

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJCMEI0NTU4LUI1QTUtNDRGOS11NEZGLThFNUU4OEM0OUMyNSIsInVzZXJuYW1lIjoibWlxdWVsLmJvYWRhIiwiZW1haWwiOiJtYm9hZGEzNUBib3NjZGVsYWNvbWEuY2F0IiwiaWF0IjoxNzgxNzAwMDMzLCJleHAiOjE3ODE3MDM2MzN9.Ssyi-rDc3usPGoj53Lv_CUtVJPvXvsmWB7NTd4kLUp4"

POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer $TOKEN")

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "GET /users/me" "401 Invalid or expired token." "$RESUL Invalid or expired token." 

cat results.md



