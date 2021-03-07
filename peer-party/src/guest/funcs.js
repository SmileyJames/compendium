export const logSizeToIndex = logSize => {
  const index = logSize - 1;
  return (index < 0) ? null : index;
};
