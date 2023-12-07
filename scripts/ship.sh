#!/bin/bash

USER="words"
HOST="words.homework.quest"

rsync -avz --delete ../word-game $USER@$HOST:~/

#ssh $USER@$HOST bash -c "'(cd word-game && release.sh)'"
