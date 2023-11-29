
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import $ from 'cash-dom';

import { selectDefaults } from './selectors';
import { letters } from './game';
import store from './store';
import { Link } from './components';

function Home() {
  const {view, guesses} = useSelector(selectDefaults);
  const dispatch = useDispatch();

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
      <h1 className="font-bold text-2xl">Word Game</h1>

      <div className="border-solid border-2 border-indigo-600 m-4 p-4">
        <p className="font-mono text-lg">{ view }</p>
        <p>Guesses: { guesses.toArray() }</p>
      </div>

      <div>
        <p>Actions:</p>
        <p>{ guessLinks }</p>
        <ul>
          <li>Guess Non-Vowel</li>
          <li>Guess Vowel</li>
          <li>Guess Solution</li>
        </ul>
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
