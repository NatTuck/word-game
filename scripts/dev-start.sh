#!/bin/bash
mix deps.get
(cd assets && yarn)
mix phx.server
