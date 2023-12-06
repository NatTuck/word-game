defmodule WordGame.Repo.Migrations.CreateScores do
  use Ecto.Migration

  def change do
    create table(:scores) do
      add :name, :string, null: false
      add :points, :integer, null: false
      add :games, :integer, null: false
      add :mean, :float, null: false

      timestamps(type: :utc_datetime)
    end

    create index("scores", [:name], unique: true)
    create index("scores", [:mean])
  end
end
