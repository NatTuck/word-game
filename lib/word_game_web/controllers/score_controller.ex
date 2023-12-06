defmodule WordGameWeb.ScoreController do
  use WordGameWeb, :controller

  alias WordGame.Scores
  alias WordGame.Scores.Score

  def index(conn, _params) do
    scores = Scores.list_scores()
    render(conn, :index, scores: scores)
  end
end
