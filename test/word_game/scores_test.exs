defmodule WordGame.ScoresTest do
  use WordGame.DataCase

  alias WordGame.Scores

  describe "scores" do
    alias WordGame.Scores.Score

    import WordGame.ScoresFixtures

    @invalid_attrs %{name: nil, points: nil, games: nil, mean: nil}

    test "list_scores/0 returns all scores" do
      score = score_fixture()
      assert Scores.list_scores() == [score]
    end

    test "get_score!/1 returns the score with given id" do
      score = score_fixture()
      assert Scores.get_score!(score.id) == score
    end

    test "create_score/1 with valid data creates a score" do
      valid_attrs = %{name: "some name", points: 42, games: 42, mean: 120.5}

      assert {:ok, %Score{} = score} = Scores.create_score(valid_attrs)
      assert score.name == "some name"
      assert score.points == 42
      assert score.games == 42
      assert score.mean == 120.5
    end

    test "create_score/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Scores.create_score(@invalid_attrs)
    end

    test "update_score/2 with valid data updates the score" do
      score = score_fixture()
      update_attrs = %{name: "some updated name", points: 43, games: 43, mean: 456.7}

      assert {:ok, %Score{} = score} = Scores.update_score(score, update_attrs)
      assert score.name == "some updated name"
      assert score.points == 43
      assert score.games == 43
      assert score.mean == 456.7
    end

    test "update_score/2 with invalid data returns error changeset" do
      score = score_fixture()
      assert {:error, %Ecto.Changeset{}} = Scores.update_score(score, @invalid_attrs)
      assert score == Scores.get_score!(score.id)
    end

    test "delete_score/1 deletes the score" do
      score = score_fixture()
      assert {:ok, %Score{}} = Scores.delete_score(score)
      assert_raise Ecto.NoResultsError, fn -> Scores.get_score!(score.id) end
    end

    test "change_score/1 returns a score changeset" do
      score = score_fixture()
      assert %Ecto.Changeset{} = Scores.change_score(score)
    end
  end
end
