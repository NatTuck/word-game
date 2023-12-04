
import { createStore, combineReducers } from 'redux';
import { OrderedSet } from 'immutable';
import { freeze } from 'icepick';
import { shuffle, take } from 'lodash';

function secret(state = [], action) {
  switch (action.type) {
  default:
    return state;
  }
}

function guesses(state = OrderedSet(), action) {
  switch (action.type) {
  case 'add-guess':
    return state.add(action.data);
  default:
    return state;
  }
}

function score(state = 0, action) {
  switch (action.type) {
  case 'add-guess':
    return state + action.points;
  default:
    return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
  case 'set-user':
    return action.data;
  default:
    return state;
  }
}

function rootReducer(state = {}, action) {
  if (action.type === 'reset') {
    return rootReducer(undefined, { type: 'RESET' });
  }

  if (action.type === 'add-guess') {
    if (vowels.has(action.data) || state.guesses.has(action.data)) {
      action.points = 0
    }
    else {
      let letters = state.secret.join(" ").split("");
      action.points = 0;
      for (var ch of letters) {
        action.points += (ch === action.data) ? 1 : 0;
      }
    }
  }

  let rfn = combineReducers({secret, guesses, score, user});
  return freeze(rfn(state, action));
}

let store = createStore(rootReducer);
export default store;
