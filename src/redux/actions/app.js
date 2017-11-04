import * as types from '../constants';

export function newGame() {
  return {
    type: types.START_GAME
  }
}

export function endGame() {
  return {
    type: types.END_GAME
  };
}
