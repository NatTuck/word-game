defmodule WordGame.Eggman do
  alias WordGame.Game

  def try_move(%Game{} = game) do
    if game.active == "Eggman" && !Game.over?(game) do
      move(game)
    else
      {:ok, game}
    end
  end

  def move(%Game{} = game) do
    ch = unguessed(game) |> Enum.at(0)
    Game.guess(game, "Eggman", ch)
  end

  def unguessed(%Game{} = game) do
    Enum.filter letters(), fn ch ->
      !MapSet.member?(game.guesses, ch)
    end
  end

  def letters do
    "tnrshdlfcmgypwbvkjxzqeaoiu"
    |> String.split("")
    |> Enum.filter(&(&1 != ""))
  end
end
