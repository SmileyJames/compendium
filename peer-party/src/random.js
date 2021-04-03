export const withRandom = (moveFn) => {
  moveFn._isRandom = true;
  return moveFn;
}

export const isRandomMove = (moveFn) => moveFn._isRandom;
