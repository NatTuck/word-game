import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'flowbite-react';

import { select, selectDefaults } from './selectors';
import { letters } from './game';

export default function Play() {
  const { guesses, score, user, view }  = useSelector(selectDefaults);
  const dispatch = useDispatch();

  function reset(ev) {
    ev.preventDefault();
    dispatch({
      type: 'reset',
      data: name,
    });
  }

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
        <Button key={ch} onClick={makeGuess(ch)} className="m-2">
          {ch}
        </Button>
      ));


  return (
    <div>
      <div className="flex justify-end">
        <span className="px-4 py-2">Playing as: { user }</span>
        <Button onClick={reset} color="warning">Reset</Button>
      </div>

      <h1 className="font-bold text-2xl">Word Game</h1>

      <div className="border-solid border-2 border-indigo-600 m-4 p-4">
        <p className="font-mono text-lg">{ view }</p>
        <p>Guesses: { guesses.toArray() }</p>
        <p>Score: { score }</p>
      </div>

      <div>
        <p>Guess a letter. Vowels are worth no points.</p>
        <div className="flex grid-flow-col flex-wrap">
          { guessLinks }
        </div>
      </div>
    </div>
  );
}

