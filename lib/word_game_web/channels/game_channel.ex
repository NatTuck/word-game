defmodule WordGameWeb.GameChannel do
  use WordGameWeb, :channel

  alias WordGame.GameServer

  @impl true
  def join("game" <> _game_id, %{"name" => name}, socket) do
    socket = assign(socket, :name, name)
    {:ok, view} = GameServer.join(name)
    {:ok, view, socket}
  end

  @impl true
  def handle_in("guess", %{"ch" => ch}, socket) do
    name = socket.assigns[:name]
    {:ok, view} = GameServer.guess(name, ch)
    broadcast(socket, "view", view)
    {:noreply, socket}
  end
end
