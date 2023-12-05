#!/bin/bash

export MIX_ENV=prod
export PORT=4807
export PHX_SERVER=1
export DATABASE_PATH=$HOME/db/word_game_prod.db
export PHX_HOST=words.homework.quest

if [[ !-e ~/.secret ]]; then
    ps -ef | sha256sum | cut -f 1 -d " " > ~/.secret
fi

export SECRET_KEY_BASE=$(cat ~/.secret)
