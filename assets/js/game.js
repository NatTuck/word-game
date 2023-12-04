
import socket from './socket';

export function join_game(game_id, name) {
  return new Promise((resolve, reject) => {
    let channel = socket.channel("game:" + game_id, {name});
    channel.join()
      .receive("ok", resolve)
      .receive("error", reject);
  });
}

export const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
