
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
import $ from 'cash-dom';

import { select, selectDefaults } from './selectors';
import { letters } from './game';
import store from './store';
import { Link } from './components';

function Home() {
  const user = useSelector(select("user"));

  if (user) {
    return <Play />;
  }
  else {
    return <Login />;
  }
}

function Login() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function join(ev) {
    ev.preventDefault();
    dispatch({
      type: 'set-user',
      data: name,
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
                     onChange={onChange} />
        </label>
        <Button className="my-2" onClick={join}>Join Game</Button>
      </form>
    </div>
  );
}

function Play() {
  const { guesses, score, user, view }  = useSelector(selectDefaults);
  const dispatch = useDispatch();

  function newGame(ev) {
    ev.preventDefault();
    dispatch({
      type: 'new-game',
    });
  }

  function makeGuess(ch) {
    return (ev) => {
      ev.preventDefault();
      dispatch({
        type: 'add-guess',
        data: ch,
      });
    };
  }
  
  let guessLinks = letters
      .filter((ch) => !guesses.has(ch))
      .map((ch) => (
        <span key={ch}>
          <Link onClick={makeGuess(ch)}>
            {ch}
          </Link>
        </span>
      ));


  return (
    <div>
      <p>Playing as: { user }, <Link onClick>Log out</Link></p>
      <h1 className="font-bold text-2xl">Word Game</h1>

      <Button onClick={newGame}>New Game</Button>


      <div className="border-solid border-2 border-indigo-600 m-4 p-4">
        <p className="font-mono text-lg">{ view }</p>
        <p>Guesses: { guesses.toArray() }</p>
        <p>Score: { score }</p>
      </div>

      <div>
        <p>Guess a letter. Vowels are worth no points.</p>
        <p>{ guessLinks }</p>

      </div>
    </div>
  );
}


function setup() {
  let root = createRoot(document.getElementById('react-root'));
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <Home />
      </React.StrictMode>
    </Provider>
  );
}

$(setup);
