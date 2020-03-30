export const errorParser = err => {
  return { errors: err, id: '', message: err.message, errStatus: true };
};
