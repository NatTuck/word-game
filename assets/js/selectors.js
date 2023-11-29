
import { createSelector } from 'reselect';

export function select(name) {
  return function(store) {
    return store[name];
  }
}

export function selectView({secret, guesses}) {
  return secret.map((word) => (
    word.split("")
      .map((ch) => guesses.has(ch) ? ch : "-")
      .join("")
  )).join(" ");
}

export const selectDefaults = createSelector(
  (state) => state,
  (state) => {
    return {
      view: selectView(state),
      guesses: state.guesses,
      score: state.score,
    };
  }
);
