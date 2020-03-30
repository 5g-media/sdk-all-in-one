import * as actionTypes from 'actions/actionTypes';

const defaultState = {
  processId: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_LEAN_PROCESS_ID:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};
