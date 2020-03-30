export const findPublicPort = (arr, port) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].PrivatePort === port) {
      return arr[i].PublicPort;
    }
  }
  return 0;
};
