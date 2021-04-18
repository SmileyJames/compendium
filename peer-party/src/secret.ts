import { Move } from ".";

export const withSecret = (moveFn: Move) => {
  moveFn._isSecret = true;
  return moveFn;
}

export const isSecretMove = (moveFn: Move) => moveFn._isSecret