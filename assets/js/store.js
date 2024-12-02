
import { createStore, combineReducers } from 'redux';
import { OrderedSet } from 'immutable';
import { freeze } from 'icepick';
import { shuffle, take } from 'lodash';

// TODO: Pull state entirely from server.

function name(state = null, action) {
  switch (action.type) {
  case 'update-view':
    if (action.data.hasOwnProperty('name')) {
      return action.data.name;
    }
    else {
      return state;
    }
  case 'reset-name':
    return null;
  default:
    return state;
  }
}

function game(state = null, action) {
  switch (action.type) {
  case 'update-view':
    return action.data.game;
  default:
    return state;
  }
}

function active(state = null, action) {
  switch (action.type) {
  case 'update-view':
    return action.data.active;
  default:
    return state;
  }
}

function puzzle(state = "", action) {
  switch (action.type) {
  case 'update-view':
    return action.data.puzzle;
  default:
    return state;
  }
}

function guesses(state = OrderedSet(), action) {
  switch (action.type) {
  case 'update-view':
    return OrderedSet(action.data.guesses);
  default:
    return state;
  }
}

function players(state = [], action) {
  switch (action.type) {
  case 'update-view':
    return action.data.players;
  default:
    return state;
  }
}

function rootReducer(state = {}, action) {
  //console.log("state0", state)
  let rfn = combineReducers({game, name, puzzle, guesses, players, active});
  let state1 = freeze(rfn(state, action));
  //console.log("state1", state1)
  return state1;
}

let store = createStore(rootReducer);
export default store;
