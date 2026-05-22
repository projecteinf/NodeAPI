#!/bin/bash

date

# Eliminar processos anteriors en execució
lsof -i :3000 -sTCP:LISTEN |awk 'NR > 1 {print $2}'  | xargs kill -15 2>/dev/null 1>/dev/null


npm run dev &
PIDT=$!

cleanup() {
  echo "Aturant servidor..."
  kill $PIDT 2>/dev/null
}

trap cleanup EXIT

echo "Esperant que el servidor arrenqui..."

until curl -s http://localhost:3000 > /dev/null; do
  sleep 1
done

echo "Servidor arrencat. Executant proves..."

bash "./TEST END POINTS/tests.bash"