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

function eliminar_playlists_tracks {
  echo "Eliminar tots els tracks de la llista: $ELIMINAR"

  echo -e  "\n=====================================================================================================================\n"

  echo "Eliminar playliststracks"

  docker exec -it musiccloud-sqlserver /opt/mssql-tools18/bin/sqlcmd   -S localhost   -U sa   -P "Patata123!"   -No  \
      -d MusicCloud   -Q "DELETE FROM PlaylistTracks;" 2>/dev/null

}

function generar_token {

  echo -e  "\n=====================================================================================================================\n"

  USEREMAIL=$1

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

  POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/playlists/tracks \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$DATATRACK")

  RESUL=$(echo "$POST_RESPONSE" | tail -n1)

  echo $POST_RESPONSE
  
  print_result "$ENDPOINT" "$EXPECTED" "$RESUL $TEXTRESUL" 

}



eliminar_playlists_tracks
generar_token mboada35@boscdelacoma.cat

echo "Token obtingut $TOKEN"

# ===================================================================================================================== 

echo "| Prova | Codi esperat | Codi obtingut | Correcte? | Observacions |" > results.md
echo "|---|---:|---:|---|---|" >> results.md


# ===================================================================================================================== 

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists/tracks amb totes les dades correctes"
PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
# TRACKID="50AD955C-DA0E-4BB5-A509-1B0EBC91F750"
TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"
DATATRACK=$(cat <<EOF
{
  "playlistId": "$PLAYLISTID",
  "trackId": "$TRACKID"
}
EOF
)

executar_i_resultat "POST /playlists" "201" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists/tracks amb totes les dades correctes"
PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="50AD955C-DA0E-4BB5-A509-1B0EBC91F750"
# TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"
DATATRACK=$(cat <<EOF
{
  "playlistId": "$PLAYLISTID",
  "trackId": "$TRACKID"
}
EOF
)

executar_i_resultat "POST /playlists" "201" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists/tracks PLAYLIST NO EXISTENT"
PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BA"
TRACKID="50AD955C-DA0E-4BB5-A509-1B0EBC91F750"
# TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"
DATATRACK=$(cat <<EOF
{
  "playlistId": "$PLAYLISTID",
  "trackId": "$TRACKID"
}
EOF
)

executar_i_resultat "POST /playlists" "404" ""


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists/tracks amb id de track incorrecte"
PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="50AD955C-DA0E-4BB5-A509-1B0EBC91F75A"
# TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"
DATATRACK=$(cat <<EOF
{
  "playlistId": "$PLAYLISTID",
  "trackId": "$TRACKID"
}
EOF
)

executar_i_resultat "POST /playlists" "404" ""


echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists/tracks amb id de track (format) incorrecte"
PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="50AD955C"
# TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"
DATATRACK=$(cat <<EOF
{
  "playlistId": "$PLAYLISTID",
  "trackId": "$TRACKID"
}
EOF
)

executar_i_resultat "POST /playlists" "400" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists/tracks amb id de playlist (format) incorrecte"
PLAYLISTID="EB00DFFC"
TRACKID="50AD955C-DA0E-4BB5-A509-1B0EBC91F75A"
# TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"
DATATRACK=$(cat <<EOF
{
  "playlistId": "$PLAYLISTID",
  "trackId": "$TRACKID"
}
EOF
)

executar_i_resultat "POST /playlists" "400" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists/tracks sense playlistId:"
PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="50AD955C-DA0E-4BB5-A509-1B0EBC91F75A"
# TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"
DATATRACK=$(cat <<EOF
{
  "trackId": "$TRACKID"
}
EOF
)

executar_i_resultat "POST /playlists" "400" ""

echo -e  "\n=====================================================================================================================\n"

echo -e  "POST /playlists/tracks sense trackId"
PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="50AD955C-DA0E-4BB5-A509-1B0EBC91F75A"
# TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"
DATATRACK=$(cat <<EOF
{
  "playlistId": "$PLAYLISTID"
}
EOF
)

executar_i_resultat "POST /playlists" "400" ""

echo -e  "\n=====================================================================================================================\n"

generar_token mboada35@xtec.cat

echo -e  "POST /playlists/tracks amb id de track incorrecte"
PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="50AD955C-DA0E-4BB5-A509-1B0EBC91F750"

DATATRACK=$(cat <<EOF
{
  "playlistId": "$PLAYLISTID",
  "trackId": "$TRACKID"
}
EOF
)

executar_i_resultat "POST /playlists" "403" ""

cat results.md

eliminar_playlists_tracks
