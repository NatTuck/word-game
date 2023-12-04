
import { createStore, combineReducers } from 'redux';
import { OrderedSet } from 'immutable';
import { freeze } from 'icepick';
import { shuffle, take } from 'lodash';

// TODO: Pull state entirely from server.

function name(state = null, action) {
  switch (action.type) {
  case 'replace-state':
    console.log("replace name", state, action.data.name);
    return action.data.name;
  default:
    return state;
  }
}

function active(state = null, action) {
  switch (action.type) {
  case 'replace-state':
    return action.data.active;
  default:
    return state;
  }
}

function puzzle(state = "", action) {
  switch (action.type) {
  case 'replace-state':
    return action.data.puzzle;
  default:
    return state;
  }
}

function guesses(state = OrderedSet(), action) {
  switch (action.type) {
  case 'replace-state':
    return OrderedSet(action.data.guesses);
  default:
    return state;
  }
}

function players(state = [], action) {
  switch (action.type) {
  case 'replace-state':
    return action.data.players;
  default:
    return state;
  }
}

function rootReducer(state = {}, action) {
  console.log("state0", state)
  let rfn = combineReducers({name, puzzle, guesses, players, active});
  let state1 = freeze(rfn(state, action));
  console.log("state1", state1)
  return state1;
}

let store = createStore(rootReducer);
export default store;
