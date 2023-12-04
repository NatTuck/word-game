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

  def puzzle_letters(%Game{} = game) do
    game.secret
    |> Enum.join(" ")
    |> String.split("")
  end

  def puzzle_view(%Game{} = game) do
    puzzle_letters(game)
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

  def join(%Game{} = game, name) do
    game1 = %Game{ game | players: MapSet.put(game.players, name) }
    {:ok, game1}
  end

  def guess(%Game{} = game, name, ch) do
    unless MapSet.member?(game.players, name) do
      {:error, game}
    end

    if MapSet.member?(game.guesses, ch) do
      {:ok, game}
    else
      guesses = MapSet.put(game.guesses, ch)
      points = calc_points(game, ch)
      scores = Map.update game.scores, name, points, fn sc0 ->
        sc0 + points
      end
      game1 = %Game{ game | guesses: guesses, scores: scores }
      {:ok, game1}
    end
  end

  def points(_game, ch) when ch in ["a", "e", "i", "o", "u"] do
    0
  end

  def calc_points(game, ch) do
    puzzle_letters(game)
    |> Enum.filter(&(&1 == ch))
    |> length()
  end

  def random_secret do
    Application.app_dir(:word_game, "priv/data/words.txt.gz")
    |> File.stream!([:compressed])
    |> Enum.shuffle()
    |> Enum.take(5)
    |> Enum.map(&String.trim/1)
  end
end
