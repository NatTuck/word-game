defmodule WordGame.Scores.Score do
  use Ecto.Schema
  import Ecto.Changeset

  alias __MODULE__

  schema "scores" do
    field :name, :string
    field :points, :integer
    field :games, :integer
    field :mean, :float

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(score, attrs) do
    score
    |> cast(attrs, [:name, :points, :games, :mean])
    |> validate_required([:name, :points, :games, :mean])
  end

  def add_game(%Score{} = score, game_score) do
    points0 = score.points || 0
    points = points0 + game_score

    games0 = score.games || 0
    games = games0 + 1

    changeset(score, %{points: points, games: games, mean: points/games})
  end
end
