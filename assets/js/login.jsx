
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';

import { join_game } from './game';

export default function Login() {
  const [name, setName] = useState("");
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

  function join(ev) {
    ev.preventDefault();
    setWait(true);
    join_game("0", name).then((resp) => {
      console.log("Joined", resp);
      dispatch({
        type: 'set-user',
        data: name,
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
        </label>
        <Button className="my-2"
                disabled={wait}
                onClick={join}>Join Game</Button>
      </form>
    </div>
  );
}
