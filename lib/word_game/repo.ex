defmodule WordGame.Repo do
  use Ecto.Repo,
    otp_app: :word_game,
    adapter: Ecto.Adapters.SQLite3
end
