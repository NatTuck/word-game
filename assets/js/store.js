
import { createStore, combineReducers } from 'redux';
import { OrderedSet } from 'immutable';
import { freeze } from 'icepick';
import { shuffle, take } from 'lodash';

import words from './words';

function randomSecret() {
  return take(shuffle(words), 4);
}

function secret(state = randomSecret(), action) {
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

function rootReducer(state = {}, action) {
  let rfn = combineReducers({secret, guesses});
  return freeze(rfn(state, action));
}

let store = createStore(rootReducer);
export default store;
