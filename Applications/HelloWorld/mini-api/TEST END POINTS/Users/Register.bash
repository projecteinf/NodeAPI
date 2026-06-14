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


# ===================================================================================================================== 

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /userss"
DATATRACK=$(cat <<EOF
{
  "username": "miquel.boada",
  "email": "mboada35@boscdelacoma.cat",
  "password": "password123"
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

IDCREATED=$(echo "$POST_RESPONSE" | head -n1 | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users" "201" "$RESUL" 


# ===================================================================================================================== TEST POST

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /userss => duplicated username"
DATATRACK=$(cat <<EOF
{
  "username": "miquel.boada",
  "email": "mboadaXX@boscdelacoma.cat",
  "password": "password123"
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

IDCREATED=$(echo "$POST_RESPONSE" | head -n1 | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users" "400 Bad Request" "$RESUL Bad Request" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /userss => duplicated email"
DATATRACK=$(cat <<EOF
{
  "username": "miquel.boada.artigas",
  "email": "mboada35@boscdelacoma.cat",
  "password": "password123"
}
EOF
)


POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

IDCREATED=$(echo "$POST_RESPONSE" | head -n1 | cut -d":" -f 2 | cut -d "," -f1 | cut -d '"' -f2)
RESUL=$(echo "$POST_RESPONSE" | tail -n1)

print_result "POST /users" "400 Bad Request" "$RESUL Bad Request"


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users => username empty"
DATATRACK=$(cat <<EOF
{
  "username": "",
  "email": "mboada35@boscdelacoma.cat",
  "password": "password123"
}
EOF
)

POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

print_result "POST /users => INVALID BODY -> USERNAME EMPTY" "400 Bad Request" "$RESUL Bad Request" ""


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users => username too short"
DATATRACK=$(cat <<EOF
{
  "username": "mike",
  "email": "mboada35@boscdelacoma.cat",
  "password": "password123"
}
EOF
)

POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

print_result "POST /users => INVALID BODY -> USERNAME TOO SHORT" "400 Bad Request" "$RESUL Bad Request" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users => email not valid"
DATATRACK=$(cat <<EOF
{
  "username": "mboadaar",
  "email": "invalid-email",
  "password": "password123"
}
EOF
)

POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

print_result "POST /users => INVALID BODY -> EMAIL NOT VALID" "400 Bad Request" "$RESUL Bad Request" ""


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users => email not specified"
DATATRACK=$(cat <<EOF
{
  "username": "mboadaar",
  "password": "password123"
}
EOF
)

POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

print_result "POST /users => INVALID BODY -> EMAIL NOT SPECIFIED" "400 Bad Request" "$RESUL Bad Request" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /users => password too short"
DATATRACK=$(cat <<EOF
{
  "username": "mboadaar",
  "email": "invalid-email",
  "password": "pass"
}
EOF
)

POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "$DATATRACK")

print_result "POST /users => INVALID BODY -> PASSWORD TOO SHORT" "400 Bad Request" "$RESUL Bad Request" ""

# ===================================================================================================================== TEST POST

echo -e  "\n=====================================================================================================================\n"

echo "Eliminar usuari miquel.boada"

docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd   -S localhost   -U sa   -P "Patata123!"   -No  \
   -d MusicCloud   -Q "DELETE FROM Users WHERE username = 'miquel.boada';"


