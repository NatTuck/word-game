defmodule WordGame.Game do
  alias __MODULE__

  defstruct [:game_id, :secret, :guesses, :players, :scores, :active]

  def new(game_id) do
    %Game{
        game_id: game_id,
        secret: random_secret(),
        guesses: MapSet.new(),
        players: MapSet.new(),
        scores: Map.new(),
        active: nil,
    }
  end

  def view(%Game{} = game) do
    %{
      game: game.game_id,
      puzzle: puzzle_view(game),
      guesses: MapSet.to_list(game.guesses),
      players: players_view(game),
      active: game.active
    }
  end

  def over?(%Game{} = game) do
    MapSet.size(game.guesses) >= 26
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
    if is_nil(game1.active) do
      {:ok, %Game{ game1 | active: next_player(game1) }}
    else
      {:ok, game1}
    end
  end

  def guess(%Game{} = game, name, ch) do
    if MapSet.member?(game.guesses, ch) ||
         !MapSet.member?(game.players, name) ||
         name != game.active do
      {:ok, game}
    else
      guesses = MapSet.put(game.guesses, ch)
      points = calc_points(game, ch)
      scores = Map.update game.scores, name, points, fn sc0 ->
        sc0 + points
      end
      game1 = %Game{ game | guesses: guesses, scores: scores, active: next_player(game) }
      {:ok, game1}
    end
  end

  def calc_points(%Game{} = _game, ch) when ch in ["a", "e", "i", "o", "u"] do
    0
  end

  def calc_points(%Game{} = game, ch) do
    puzzle_letters(game)
    |> Enum.filter(&(&1 == ch))
    |> length()
  end

  def next_player(%Game{} = game) do
    if MapSet.size(game.players) > 0 do
      players = game.players
      |> MapSet.to_list()
      |> Enum.sort()

      ii = Enum.find_index(players, &(&1 == game.active)) || 0
      jj = Integer.mod(ii + 1, length(players))
      Enum.at(players, jj)
    else
      nil
    end
  end

  def random_secret do
    Application.app_dir(:word_game, "priv/data/words.txt.gz")
    |> File.stream!([:compressed])
    |> Enum.shuffle()
    |> Enum.take(5)
    |> Enum.map(&String.trim/1)
  end
end
