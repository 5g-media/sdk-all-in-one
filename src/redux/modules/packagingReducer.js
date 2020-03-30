import * as actionTypes from 'actions/actionTypes';

const defaultState = {
  repoName: '',
  operationIndex: '',
  packageYaml: '',
  runYaml: '',
  loading: false,
  alertText: '',
  error: false,
  success: false,
  projectGitUrl: '',
  showAlert: false,
  activeRepo: { name: '' },
  repositories: [],
  buildResult: '',
  buildStatusLoading: false,
  buildButtonLoading: false,
  userList: '',
  buildedTaskName: '',
  projectName: '',
  selectedProjectType: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_REPO_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_OPERATION_INDEX:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_PACKAGE_YAML:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_RUN_YAML:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.CREATE_UNIKERNEL_PROJECT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.CREATE_UNIKERNEL_PROJECT_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.CLOSE_PACKAGING_ALERT:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.CREATE_DOCKER_PROJECT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.CREATE_DOCKER_PROJECT_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_REPOS_WITH_TOKEN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_REPOS_WITH_TOKEN_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_ACTIVE_REPO:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_SELECTED_PROJECT_TYPE:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_BUILD_STATUS_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_BUILD_STATUS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_BUILD_STATUS_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_BUILD_BUTTON_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.BUILD_PROJECT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.BUILD_PROJECT_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_USER_LIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};
