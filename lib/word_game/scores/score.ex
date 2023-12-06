defmodule WordGame.Scores.Score do
  use Ecto.Schema
  import Ecto.Changeset

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
end
