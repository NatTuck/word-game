
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
import { shuffle } from 'lodash';

import { join_game } from './game';

function randomName() {
  var xs = ["Alice", "Bob", "Carol", "Dave", "Erin", "Frank",
            "Julia", "Ken", "Laura", "Matt"];
  xs = shuffle(xs);
  return xs[0];
}

export default function Login() {
  const [name, setName] = useState(randomName());
  const [game, setGame] = useState("demo");
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

  function join(ev) {
    ev.preventDefault();
    setWait(true);
    join_game(game, name).then((resp) => {
      console.log("Joined", resp);
      dispatch({
        type: 'update-view',
        data: resp,
      });
    });
  }

  function onKey(ev) {
    if (ev.code == "Enter") {
      join(ev);
    }
  }

  function onChange(ev) {
    ev.preventDefault();
    setName(ev.target.value);
  }

  function onGameChange(ev) {
    ev.preventDefault();
    setGame(ev.target.value);
  }

  return (
    <div>
      <h1 className="font-bold text-2xl">Word Game Login</h1>
      <form onSubmit={join}>
        <label htmlFor="name" className="my-2">
          Name
          <TextInput name="name" className="my-2"
                     value={name}
                     onKeyPress={onKey}
                     onChange={onChange}
                     disabled={wait} />
          Game
          <TextInput name="game" className="my-2"
                     value={game}
                     onKeyPress={onKey}
                     onChange={onGameChange}
                     disabled={wait} />
        </label>
        <Button className="my-2"
                disabled={wait}
                onClick={join}>Join Game</Button>
      </form>
    </div>
  );
}
