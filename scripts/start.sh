#!/bin/bash

# For Mac & Linux

docker run --name db -d mongo
docker run -p 3000:3000 -itd --link db:mongo --name web adcmeta
