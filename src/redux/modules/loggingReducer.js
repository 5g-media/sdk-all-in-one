import * as actionTypes from 'actions/actionTypes';

const defaultState = {
  issues: [],
  loading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_ISSUES_SUCCESS:
      return { ...state, issues: action.payload.data };
    case actionTypes.UPDATE_ISSUE_LIST:
      // eslint-disable-next-line no-case-declarations
      const updatedIssues = state.issues.filter(
        issue => issue.id !== action.payload.issueId,
      );
      return JSON.parse(JSON.stringify({ ...state, issues: updatedIssues }));
    case actionTypes.GET_VNFD_CONTENT_SUCCESS:
      return { ...state, vnfdContent: action.payload.data };
    case actionTypes.SET_DELETE_LOADING:
      return { ...state, loading: action.payload.status };
    case actionTypes.GET_VNFD_LIST_SUCCESS:
      return { ...state, vnfds: action.payload.data };

    default:
      return { ...state };
  }
};
