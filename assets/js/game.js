
import socket from './socket';
import store from './store';

let channel = null;

export function join_game(game_id, name) {
  return new Promise((resolve, reject) => {
    channel = socket.channel("game:" + game_id, {name});
    channel.join()
      .receive("ok", resolve)
      .receive("error", reject);
    channel.on("view", (view) => {
      store.dispatch({
        type: 'update-view',
        data: view,
      });
    })
  });
}

export function add_game_guess(ch) {
  return new Promise((resolve, reject) => {
    channel.push("guess", {ch})
      .receive("ok", resolve)
      .receive("error", reject);
  });
}

export const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
