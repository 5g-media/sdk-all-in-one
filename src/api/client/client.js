import axios from 'axios';
// import { errorParser } from './errorParser';

export const getRequest = (url, config) => {
  return axios
    .get(url, { ...config })
    .then(res => res.data)
    .catch(err => (err.response ? err.response : err));
};
export const postRequest = (url, data, headers) => {
  return axios
    .post(url, data, { headers })
    .then(res => res)
    .catch(err => (err.response ? err.response : err));
};
export const putRequest = (url, data, headers) =>
  axios
    .put(url, data, { headers })
    .then(res => res.data)
    .catch(err => (err.response ? err.response : err));

export const deleteRequest = (url, config) =>
  axios
    .delete(url, { ...config })
    .then(res => res.data)
    .catch(err => (err.response ? err.response : err));

export const patchRequest = (url, data, headers) =>
  axios
    .patch(url, data, { headers: { 'Content-Type': headers } })
    .then(res => res.data)
    .catch(err => (err.response ? err.response : err));
