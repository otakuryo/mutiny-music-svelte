#!/bin/sh
docker run --name mutynic-nginx \
 -p 8585:80 \
 -v /Users/agustin/Black\ Hole/docker/personal/docker-node-global/mutiny-music-svelte/build:/usr/share/nginx/html:ro \
 -d nginx