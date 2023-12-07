#!/bin/bash

if [[ -e ~/.asdf/asdf.sh ]]; then
    .  ~/.asdf/asdf.sh
fi

. scripts/prod-env.sh

echo "Building..."

mkdir -p ~/.config
mkdir -p priv/static

mix deps.get
mix compile


if [[ ! -e "$DATABASE_PATH" ]]; then
    mkdir -p ~/db
    mix ecto.setup
fi

mix ecto.migrate

export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"

(cd assets && yarn)
mix assets.setup
mix assets.deploy

mix phx.digest

echo "Generating release..."
mix release --overwrite

systemctl --user stop word-game-user || true
systemctl --user start word-game-user
