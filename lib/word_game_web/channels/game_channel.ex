defmodule WordGameWeb.GameChannel do
  use WordGameWeb, :channel

  alias WordGame.GameServer

  @impl true
  def join("game:" <> _game_id, %{"name" => name}, socket) do
    {:ok, view} = GameServer.join(name)
    socket = socket
    |> assign(:name, name)
    |> assign(:view, view)
    send(self(), :broadcast)
    {:ok, Map.put(view, "name", name), socket}
  end

  @impl true
  def handle_in("guess", %{"ch" => ch}, socket) do
    name = socket.assigns[:name]
    {:ok, view} = GameServer.guess(name, ch)
    IO.inspect {:view, view}
    socket = assign(socket, :view, view)
    send(self(), :broadcast)
    {:noreply, socket}
  end

  @impl true
  def handle_info(:broadcast, socket) do
    broadcast(socket, "view", socket.assigns[:view])
    {:noreply, socket}
  end
end
