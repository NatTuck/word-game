# WordGame

## Game Rules

 - Hangman
 - Guess one letter per turn
 - Points for revealing letters - except vowels.
 - Multiplayer: Most points wins, multiple rounds
   - Multiple rounds lets different players go first.

## Setup Using User Sessions

To enable user services to start on boot:

```bash
$ loginctl enable-linger
```

Install and enable service.

```bash
$ mkdir -p ~/.config/systemd/user
$ cp scripts/word-game-user.service ~/.config/systemd/user
$ systemctl --user enable word-game-user
```

ref: https://wiki.archlinux.org/title/systemd/User

## Default README

To start your Phoenix server:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
