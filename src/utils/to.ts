export const to = async (promise: any) => {
  return promise
    .then((response: any) => [null, response])
    .catch((error: any) => [error, null]);
};
