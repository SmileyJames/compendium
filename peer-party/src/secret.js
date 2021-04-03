export const withSecret = (moveFn) => {
  moveFn._isSecret = true;
  return moveFn;
}

export const isSecretMove = (moveFn) => moveFn._isSecret
