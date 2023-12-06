defmodule WordGame.GameServer do
  use GenServer

  alias WordGame.Game
  alias WordGame.Eggman
  alias WordGame.Scores

  def start(game_id) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [game_id]},
      restart: :transient
    }
    DynamicSupervisor.start_child(WordGame.GameSup, spec)
  end

  def start_link(game_id) do
    game = Game.new(game_id)
    GenServer.start_link(__MODULE__, game, name: reg(game_id))
  end

  def reg(game_id) do
    {:via, Registry, {WordGame.GameReg, game_id}}
  end

  def peek(game_id) do
    GenServer.call(reg(game_id), :peek)
  end

  def join(game_id, name) do
    if Registry.lookup(WordGame.GameReg, game_id) == [] do
      start(game_id)
    end
    GenServer.call(reg(game_id), {:join, name})
  end

  def guess(game_id, name, ch) do
    GenServer.call(reg(game_id), {:guess, name, ch})
  end

  @impl true
  def init(game) do
    # Kill games after half an hour.
    half_hour = 30 * 60 * 1000
    Process.send_after(self(), :shutdown, half_hour)

    # Add a robot player
    {:ok, game} = Game.join(game, "Eggman")
    {:ok, game}
  end

  @impl true
  def handle_call(:peek, _from, game) do
    {:reply, Game.view(game), game}
  end

  @impl true
  def handle_call({:join, name}, _from, game) do
    {:ok, game} = Game.join(game, name)
    {:ok, game} = Eggman.try_move(game)
    {:reply, {:ok, Game.view(game)}, game}
  end

  @impl true
  def handle_call({:guess, name, ch}, _from, game) do
    {:ok, game} = Game.guess(game, name, ch)
    {:ok, game} = Eggman.try_move(game)
    if Game.over?(game) do
      Scores.save_scores(game.scores)
      minute = 60 * 1000
      Process.send_after(self(), :shutdown, minute)
    end
    {:reply, {:ok, Game.view(game)}, game}
  end

  @impl true
  def handle_info(:shutdown, game) do
    {:stop, :normal, game}
  end
end
