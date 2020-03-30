import * as actionTypes from 'actions/actionTypes';

const defaultState = {
  logs: '',
  loading: false,
  serviceName: '',
  ipInvalidStatus: '',
  ipAddress: '',
  inputPortInvalidStatus: '',
  inputPort: '',
  outputPortInvalidStatus: '',
  outputPort: '',
  configPortInvalidStatus: '',
  configPort: '',
  platform: 'Faas',
  mode: 'Producer',
  errMessage: '',
  frameToSend: 20,
  stepCount: 1,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_LOGS:
      return { ...state, ...action.payload };
    case actionTypes.SET_SERVICE_NAME:
      return { ...state, ...action.payload };
    case actionTypes.SET_PORTS:
      return { ...state, ...action.payload };
    case actionTypes.SET_INVALID_STATUS:
      return { ...state, ...action.payload };
    case actionTypes.SET_IP_ADDRESS:
      return { ...state, ...action.payload };
    case actionTypes.SET_IP_INVALID_STATUS:
      return { ...state, ...action.payload };
    case actionTypes.SET_NFP_CONF:
      return { ...state, ...action.payload };
    case actionTypes.SET_NFP_CONF_ERROR:
      return { ...state, ...action.payload };
    case actionTypes.SET_NFC_CONF:
      return { ...state, ...action.payload };
    case actionTypes.SET_NFC_CONF_ERR:
      return { ...state, ...action.payload };
    case actionTypes.SET_FP_CONF:
      return { ...state, ...action.payload };
    case actionTypes.SET_FP_CONF_ERR:
      return { ...state, ...action.payload };
    case actionTypes.SET_INPUT_CHANGES:
      return { ...state, ...action.payload };
    case actionTypes.START_PROFILER:
      return { ...state, ...action.payload };
    case actionTypes.START_PROFILER_FAIL:
      return { ...state, ...action.payload };
    case actionTypes.START_PROFILER_LOG:
      return { ...state, ...action.payload };
    case actionTypes.START_PROFILER_LOG_FAIL:
      return { ...state, ...action.payload };
    case actionTypes.SET_PROFILE_TYPE:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};
