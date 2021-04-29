#!/bin/bash

. ./config.sh

timestamp() {
  TZ='Europe/Kiev' date +%H:%M # current time
}

# Пример отправки значения оставщегося времени


while true; do

# Пример отправки значения оставщегося времени (для простоты передается текущее время)
#curl -X POST -H "Content-Type: text/plain" -d $"time=Заморозка: $(timestamp)" $HOST/$TOKEN/$HWID
send $"time=Заморозка: $(timestamp)"

# curl -X POST -H "Content-Type: text/plain" -d $'t1=56\nt2=58\nvacuum1=940\nwifi=50\n' $HOST/$TOKEN/$HWID
send $'t1=56\nt2=58\nvacuum1=940\nwifi=50\n'
sleep 1
# curl -X POST -H "Content-Type: text/plain" -d $'t1=58\nt2=56\nvacuum1=990\nwifi=60\n' $HOST/$TOKEN/$HWID
send $'t1=58\nt2=56\nvacuum1=990\nwifi=60\nslide1=30\n'
sleep 1
# curl -X POST -H "Content-Type: text/plain" -d $'t1=54\nt2=56\nvacuum1=960\nwifi=70\n#Comment' $HOST/$TOKEN/$HWID
send $'t1=54\nt2=56\nvacuum1=960\nwifi=70\n#Comment'
sleep 1
# curl -X POST -H "Content-Type: text/plain" -d $'t1=65\nt2=56\nvacuum1=980\nwifi=40\n#Comment' $HOST/$TOKEN/$HWID
send $'t1=65\nt2=56\nvacuum1=980\nwifi=40\nslide1=70\n#Comment'
sleep 1

done
