#!/bin/bash
echo -e "\n===========================================================\n"
echo -e "\nObtenir tots els tracks de la primera plana ordenats per títol\n"
curl -i 'http://localhost:3000/tracks'

echo -e "\n===========================================================\n"
echo -e "\nObtenir els 5 primers tracks de la primera plana ordenats per títol\n"
curl -i 'http://localhost:3000/tracks?limit=5'

echo -e "\n===========================================================\n"
echo -e "\nObtenir els 3 primers tracks de la segona plana\n"
curl -i 'http://localhost:3000/tracks?page=2&limit=3'

echo -e "\n===========================================================\n"
echo -e "\nLlistat ordenat per la duració\n"
curl -i 'http://localhost:3000/tracks?sortBy=duration'


echo -e "\n===========================================================\n"
echo -e "\nLlistat ordenat per la duració descendent\n"
curl -i 'http://localhost:3000/tracks?sortBy=duration&sortOrder=DESC'


echo -e "\n===========================================================\n"
echo -e "\nObtenir el 1 primer track de la segona plana ordenat de forma descendent segons la duració\n"
curl -i 'http://localhost:3000/tracks?page=2&limit=1&sortOrder=DESC&sortBy=duration'


echo -e "\n===========================================================\n"
echo -e "\nObtenir els 3 primers tracks de la segona plana\n"
curl -i 'http://localhost:3000/tracks?page=2&limit=3'

# ============================================================== Sonbrepassa límit
echo -e "\n===========================================================\n"
echo -e "\nLímit no vàlid. Valor massa gran\n"
curl -i 'http://localhost:3000/tracks?limit=120'

echo -e "\n===========================================================\n"
echo -e "\nLímit no vàlid. Valor zero\n"
curl -i 'http://localhost:3000/tracks?limit=0'

echo -e "\n===========================================================\n"
echo -e "\nLímit no vàlid. Valor negatiu\n"
curl -i 'http://localhost:3000/tracks?limit=-10'

echo -e "\n===========================================================\n"
echo -e "\nPàgina no vàlida. Valor zero\n"
curl -i 'http://localhost:3000/tracks?page=0'

echo -e "\n===========================================================\n"
echo -e "\nPàgina no vàlida. Valor negatiu\n"
curl -i 'http://localhost:3000/tracks?page=-10'

echo -e "\n===========================================================\n"
echo -e "\nObtenir els 5 primers tracks de la primera plana ordenats per títol\n"
curl -i 'http://localhost:3000/tracks?limit=unlimited'