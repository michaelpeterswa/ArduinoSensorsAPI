#!/bin/bash

#dorun after docker build -t <username>/lkapi .

#docker build -t michaelpeterswa/lkapi .

#docker run -d --name lkapi -p 6969:6969 --restart always michaelpeterswa/lkapi

FILE=".asapiconf"
HOSTNAME="$(hostname)"
if [ ! -f $FILE ]; then
    echo "asapi conf file not found!"
    echo "writing to .asapiconf..."
    echo "FIRSTRUN=\"yes\"" > .asapiconf
    echo 
    echo "starting docker build step..."
    docker build -t michaelpeterswa/asapi .
fi

docker run -d --name asapi -p 6970:6970 --restart always michaelpeterswa/asapi
echo "running $HOSTNAME/lkapi docker image on port 6970"
echo "check \"docker logs asapi\" for more info" 