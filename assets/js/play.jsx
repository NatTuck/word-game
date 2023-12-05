import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'flowbite-react';

import { selectName, selectDefaults } from './selectors';
import { letters, add_game_guess } from './game';

export default function Play() {
  const { game_id, active, guesses, puzzle, name, players }  = useSelector(selectDefaults);
  const dispatch = useDispatch();

  function reset(ev) {
    ev.preventDefault();
    dispatch({
      type: 'reset-name',
    });
  }

  function makeGuess(ch) {
    return (ev) => {
      ev.preventDefault();
      add_game_guess(ch).then((resp) => {
        dispatch({
          type: 'update-view',
          data: resp,
        });
      });
    };
  }

  let playerScores = players
      .map(({name, score}) => 
        <span key={name} className="p-2">
          {name}: {score}
        </span>
      );
  
  let guessLinks = letters
      .filter((ch) => !guesses.has(ch))
      .map((ch) => (
        <Button key={ch} onClick={makeGuess(ch)} className="m-2">
          { ch }
        </Button>
      ));


  return (
    <div>
      <div className="flex justify-end">
        <span className="px-4 py-2">Playing as: { name }</span>
        <Button onClick={reset} color="warning">Reset</Button>
      </div>

      <h1 className="font-bold text-2xl">Word Game: {game_id}</h1>

      <div className="border-solid border-2 border-indigo-600 m-4 p-4">
        <p className="font-mono text-lg">{ puzzle }</p>
        <p>
          Guesses:
          <span className="font-mono px-2">{ guesses.toArray().join(" ") }</span>
        </p>
        <p>Current turn: { active }</p>
        <p>Scores: { playerScores }</p>
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

