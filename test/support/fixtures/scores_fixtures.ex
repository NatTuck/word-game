defmodule WordGame.ScoresFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `WordGame.Scores` context.
  """

  @doc """
  Generate a score.
  """
  def score_fixture(attrs \\ %{}) do
    {:ok, score} =
      attrs
      |> Enum.into(%{
        games: 42,
        mean: 120.5,
        name: "some name",
        points: 42
      })
      |> WordGame.Scores.create_score()

    score
  end
end
