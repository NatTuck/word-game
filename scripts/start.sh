#!/bin/bash

if [[ -e ~/.asdf/asdf.sh ]]; then
    .  ~/.asdf/asdf.sh
fi

. scripts/prod-env.sh

_build/prod/rel/word_game/bin/word_game start
