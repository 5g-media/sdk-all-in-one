import * as actionTypes from 'actions/actionTypes';

const defaultState = {
  descriptor: '',
  descriptorName: '',
  uploadFileName: '',
  isVnfd: false,
  schema: null,
  schemaName: '',
  isArchive: false,
  exportURL: '',
  showAlert: false,
  alertText: '',
  error: false,
  success: false,
  onBoardDisabled: false,
  descriptorType: '',
  status: {
    validStatus: '',
    errorDataPath: '',
    errorMessage: '',
    isValid: false,
    isValidationClicked: false,
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_ARCHIVE:
      return {
        ...state,
        descriptor: action.payload.descriptor,
        descriptorName: action.payload.descriptorName,
        uploadFileName: action.payload.uploadFileName,
        isVnfd: action.payload.isVnfd,
        isArchive: action.payload.isArchive,
        descriptorType: action.payload.descriptorType,
      };
    case actionTypes.SET_SCHEMA:
      return {
        ...state,
        schema: action.payload.schema,
        schemaName: action.payload.schemaName,
      };
    case actionTypes.EXPORT_DESCRIPTOR:
      return {
        ...state,
        exportURL: action.payload.exportURL,
        descriptorName: action.payload.descriptorName,
      };
    case actionTypes.DESCRIPTOR_CHANGE:
      return {
        ...state,
        descriptor: action.payload.descriptor,
      };
    case actionTypes.VALIDATE:
      return {
        ...state,
        status: action.payload.status,
      };
    case actionTypes.CLOSE_ALERT:
      return {
        ...state,
        showAlert: action.payload.showAlert,
      };
    case actionTypes.ONBOARD_VNF:
      return {
        ...state,
        alertText: action.payload.alertText,
        showAlert: action.payload.showAlert,
        error: action.payload.error,
        success: action.payload.success,
        onBoardDisabled: action.payload.onBoardDisabled,
      };
    case actionTypes.ONBOARD_NSD:
      return {
        ...state,
        alertText: action.payload.alertText,
        showAlert: action.payload.showAlert,
        error: action.payload.error,
        success: action.payload.success,
        onBoardDisabled: action.payload.onBoardDisabled,
      };
    case actionTypes.SET_DESCRIPTOR_TYPE:
      return {
        ...state,
        descriptorType: action.payload.descriptorType,
        isVnfd: action.payload.isVnfd,
      };
    case actionTypes.UPLOAD_ARCHIVE_FAIL:
      return {
        ...state,
        alertText: action.payload.alertText,
        showAlert: action.payload.showAlert,
        error: action.payload.error,
        success: action.payload.success,
      };
    case actionTypes.SETISVNFD:
      return {
        ...state,
        isVnfd: action.payload.isVnfd,
        descriptorType: action.payload.descriptorType,
      };
    case actionTypes.RESET:
      return { ...defaultState };

    case actionTypes.SET_DESCRIPTOR_FROM_LOGGING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
