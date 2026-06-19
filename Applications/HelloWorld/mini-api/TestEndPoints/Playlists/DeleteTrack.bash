#!/bin/bash

function eliminar_playlists_tracks {
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

function inserir_tracks {
  echo -e  "POST /playlists/tracks amb totes les dades correctes"
  PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
  TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"
  DATATRACK=$(cat <<EOF
  {
    "playlistId": "$PLAYLISTID",
    "trackId": "$TRACKID"
  }
EOF
  )

  POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/playlists/tracks \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$DATATRACK")

  echo -e  "POST /playlists/tracks amb totes les dades correctes"
  PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
  TRACKID="50AD955C-DA0E-4BB5-A509-1B0EBC91F750"
  DATATRACK=$(cat <<EOF
  {
    "playlistId": "$PLAYLISTID",
    "trackId": "$TRACKID"
  }
EOF
  )


  POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/playlists/tracks \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$DATATRACK")
}



eliminar_playlists_tracks
generar_token mboada35@boscdelacoma.cat
inserir_tracks


# ============================================= FORBIDDEN

echo -e "\n# ============================================= FORBIDDEN\n\n"
generar_token mboada35@xtec.cat

PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"

curl -i -X DELETE http://localhost:3000/playlists/$PLAYLISTID/tracks/$TRACKID \
  -H "Authorization: Bearer $TOKEN" 


# ============================================= CORRECTE
echo -e "\n# ============================================= CORRECTE\n\n"
generar_token mboada35@boscdelacoma.cat

PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"

curl -i -X DELETE http://localhost:3000/playlists/$PLAYLISTID/tracks/$TRACKID \
  -H "Authorization: Bearer $TOKEN" 
  
# ============================================= NOT FOUND
echo -e "\n# ============================================= NOT FOUND PLAYLIST\n\n"
# PLAYLIST
PLAYLISTID="FB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D1"

curl -i -X DELETE http://localhost:3000/playlists/$PLAYLISTID/tracks/$TRACKID \
  -H "Authorization: Bearer $TOKEN" 

# TRACK

echo -e "\n# ============================================= NOT FOUND TRACK\n\n"

PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D0"

curl -i -X DELETE http://localhost:3000/playlists/$PLAYLISTID/tracks/$TRACKID \
  -H "Authorization: Bearer $TOKEN" 


# INVALID ID

echo -e "\n# ============================================= INVALID ID PLAYLIST\n\n"

PLAYLISTID="EB00DFFC-236D-4731-B175"
TRACKID="30D1A058-992A-4FD1-9AAD-56F5AC0422D0"

curl -i -X DELETE http://localhost:3000/playlists/$PLAYLISTID/tracks/$TRACKID \
  -H "Authorization: Bearer $TOKEN" 


# INVALID ID

echo -e "\n# ============================================= INVALID ID TRACK\n\n"

PLAYLISTID="EB00DFFC-236D-4731-B175-EDCA615877BD"
TRACKID="30D1A058-4FD1-9AAD-56F5AC0422D0"

curl -i -X DELETE http://localhost:3000/playlists/$PLAYLISTID/tracks/$TRACKID \
  -H "Authorization: Bearer $TOKEN" 

