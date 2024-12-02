
import { createSelector } from 'reselect';

export function selectName(state) {
  return state.name;
}

export const selectDefaults = createSelector(
  (state) => state,
  (state) => Object.assign({}, state),
);
