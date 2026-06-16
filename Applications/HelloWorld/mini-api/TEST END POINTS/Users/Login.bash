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

# =====================================================================================================================  INICI DE TESTS

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users/login - Login correcte"
DATATRACK=$(cat <<EOF
{
  "email": "mboada35@boscdelacoma.cat",
  "password": "password123"
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users/login" "201" "$RESUL" 


# # ===================================================================================================================== TEST LOGIN

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users/login -> Missing password"
DATATRACK=$(cat <<EOF
{
  "email": "mboada35@boscdelacoma.cat"
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users/login" "400 Bad Request" "$RESUL Bad Request" 



echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users/login -> Missing email"
DATATRACK=$(cat <<EOF
{
  "password": "password123"
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users/login" "400 Bad Request"  "$RESUL Bad Request" 


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users/login -> Password empty"
DATATRACK=$(cat <<EOF
{
  "email": "mboada35@boscdelacoma.cat",
  "password": ""
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users/login" "400 Bad Request"  "$RESUL Bad Request" 


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users/login -> email empty"
DATATRACK=$(cat <<EOF
{
  "email": "",
  "password": "password123"
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users/login" "400 Bad Request"  "$RESUL Bad Request" 

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users/login -> invalid email"
DATATRACK=$(cat <<EOF
{
  "email": "mmb@gmail.com",
  "password": "password123"
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users/login" "401 Unauthorized" "$RESUL Unauthorized" 


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users/login -> invalid password"
DATATRACK=$(cat <<EOF
{
  "email": "mboada35@boscdelacoma.cat",
  "password": "password123445"
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users/login" "401 Unauthorized" "$RESUL Unauthorized" 

cat results.md
