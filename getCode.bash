#!/bin/bash
if [ $# -ne 1 ]
then 
    echo "Cal indicar el PATH a on buscar els fitxers"
    exit 1
fi
# Fitxer on desarem el resultat
output_file="result.md"

# Buidem el fitxer si ja existeix

# Recorrem tots els fitxers .cs a partir del directori actual

CURRENT=$(pwd)

echo > "$output_file"

find "$1" -type d -name "node_modules" -prune -o -type f -name "*.ts" -print | while read file; do
    echo "Nom fitxer: $file" 
    # Afegim la ruta i el nom del fitxer
    echo "// Nom fitxer: $file" >> "$output_file"
    
    # Afegim el contingut del fitxer
    echo "\`\`\`ts" >> "$output_file"
    echo -e "\n" >> "$output_file"
    cat "$file" >> "$output_file"
    echo -e "\n" >> "$output_file"
    echo "\`\`\`" >> "$output_file"
    echo -e "\n" >> "$output_file"
done

echo "Fitxer generat: $output_file"