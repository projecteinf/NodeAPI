#!/bin/bash
echo -e "\n===========================================================\n"
echo -e "\nObtenir tots els tracks\n"
curl -i 'http://localhost:3000/tracks'

echo -e "\n===========================================================\n"
echo -e "\nObtenir totes els tracks que el seu títol conté el text an\n"
curl -i 'http://localhost:3000/tracks?search=an'

echo -e "\n===========================================================\n"
echo -e "\nObtenir totes els tracks que la seva duració no sobrepassa els 320 segons\n"
curl -i 'http://localhost:3000/tracks?duration=320'

echo -e "\n===========================================================\n"
echo -e "\nObtenir totes els tracks que la seva duració no sobrepassa els 320 segons i el seu títol conté ll\n"
curl -i 'http://localhost:3000/tracks?duration=320&search=ll'

echo -e "\n===========================================================\n"
echo -e "\n400 INVALID REQUEST -> La duració no és numèrica\n"
curl -i 'http://localhost:3000/tracks?duration=320s&search=ll'