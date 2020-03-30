import * as actionTypes from 'actions/actionTypes';

export const setProcessId = ({ processId }) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_LEAN_PROCESS_ID, payload: { processId } });
  };
};
