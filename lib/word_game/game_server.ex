defmodule WordGame.GameServer do
  use GenServer

  alias WordGame.Game

  def start_link(_) do
    game = Game.new()
    GenServer.start_link(__MODULE__, game, name: __MODULE__)
  end

  def peek() do
    GenServer.call(__MODULE__, :peek)
  end

  def join(name) do
    GenServer.call(__MODULE__, {:join, name})
  end

  def guess(name, ch) do
    GenServer.call(__MODULE__, {:guess, name, ch})
  end

  @impl true
  def init(game) do
    {:ok, game}
  end

  @impl true
  def handle_call(:peek, _from, game) do
    {:reply, Game.view(game), game}
  end

  @impl true
  def handle_call({:join, name}, _from, game) do
    {:ok, game} = Game.join(game, name)
    {:reply, {:ok, Game.view(game)}, game}
  end

  @impl true
  def handle_call({:guess, name, ch}, _from, game) do
    {:ok, game} = Game.guess(game, name, ch)
    {:reply, {:ok, Game.view(game)}, game}
  end
end
