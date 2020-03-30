const parseError = result => {
  return { data: result, errStatus: true };
};

const parseSuccess = result => {
  return { data: result, errStatus: false };
};

export const parseResult = result => {
  if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
    return parseError(result);
  }
  return parseSuccess(result);
};
