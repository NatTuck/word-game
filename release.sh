#!/bin/bash

if [[ -e ~/.asdf/asdf.sh ]]; then
    .  ~/.asdf/asdf.sh
fi

. prod-env.sh

#sudo service word-game stop

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

#echo "Stopping old copy of app, if any..."
#_build/prod/rel/draw/bin/practice stop || true

echo "Starting app..."

#_build/prod/rel/inkfish/bin/inkfish foreground

#sudo service inkfish start
