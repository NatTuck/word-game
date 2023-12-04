import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'flowbite-react';

import { selectName, selectDefaults } from './selectors';
import { letters, add_game_guess } from './game';

export default function Play() {
  const { guesses, puzzle, name, players }  = useSelector(selectDefaults);
  const dispatch = useDispatch();

  function reset(ev) {
    ev.preventDefault();
    dispatch({
      type: 'reset',
      data: name,
    });
  }

  function makeGuess(ch) {
    return (ev) => {
      ev.preventDefault();
      add_game_guess(ch).then((resp) => {
        dispatch({
          type: 'replace-state',
          data: resp,
        });
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
        <span className="px-4 py-2">Playing as: { name }</span>
        <Button onClick={reset} color="warning">Reset</Button>
      </div>

      <h1 className="font-bold text-2xl">Word Game</h1>

      <div className="border-solid border-2 border-indigo-600 m-4 p-4">
        <p className="font-mono text-lg">{ puzzle }</p>
        <p>Guesses: { guesses.toArray() }</p>
        <p>Scores: ...</p>
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

