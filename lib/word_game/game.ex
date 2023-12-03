defmodule WordGame.Game do
  alias __MODULE__

  defstruct [:secret, :guesses, :players, :scores, :active]

  def new do
    %Game{
        secret: random_secret(),
        guesses: MapSet.new(),
        players: MapSet.new(),
        scores: Map.new(),
        active: nil,
    }
  end

  def view(%Game{} = game) do
    %{
      puzzle: puzzle_view(game),
      guesses: MapSet.to_list(game.guesses),
      players: players_view(game),
      active: game.active
    }
  end

  def puzzle_view(%Game{} = game) do
    game.secret
    |> Enum.join(" ")
    |> String.split("")
    |> Enum.map(fn ch ->
      if !Regex.match?(~r/^\w$/, ch) || MapSet.member?(game.guesses, ch) do
        ch
      else
        "-"
      end
    end)
    |> Enum.join("")
  end

  def players_view(%Game{} = game) do
    Enum.map game.players, fn name ->
      %{ name: name, score: Map.get(game.scores, name, 0) }
    end
  end

  def add_player(%Game{} = game, name) do
    %Game{ game | players: MapSet.put(game.players, name) }
  end

  def random_secret do
    Application.app_dir(:word_game, "priv/data/words.txt.gz")
    |> File.stream!([:compressed])
    |> Enum.shuffle()
    |> Enum.take(5)
    |> Enum.map(&String.trim/1)
  end
end
