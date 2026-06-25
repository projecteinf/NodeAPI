#!/bin/bash
WORKING=$(docker ps | grep "musiccloud-sqlserver")
if [ $? -eq 0 ]
then
    echo "Docker està funcionant"
else
    echo "Docker està aturat"
fi