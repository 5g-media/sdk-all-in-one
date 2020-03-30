import { uploadService, exportService } from 'api/service/validationService';
import { yaml2jsonparse, checkIsVnfd } from 'utils/validateUtils';
import * as actionTypes from 'actions/actionTypes';
import {
  createVNFResource,
  onboardVnf,
  createNSResource,
  onboardNs,
} from '../api/service/privateCatalogueService';

export const onUpload = ({
  uploadFile,
  uploadFileName,
  isArchive,
  schemaName,
  descriptorType,
  validationServiceIp,
}) => {
  return async dispatch => {
    const response = await uploadService({
      uploadFile,
      isArchive,
      schemaName,
      descriptorType,
      validationServiceIp,
    });
    if (response.data.error) {
      dispatch({
        type: actionTypes.UPLOAD_ARCHIVE_FAIL,
        payload: {
          alertText: "Couldn't open uploaded file!!",
          showAlert: true,
          error: true,
          success: false,
        },
      });
    } else {
      const descriptor = response.data.fileContent;
      const descriptorName = `${response.data.folderPath}/${response.data.filePath}`;
      const parsedDescriptor = yaml2jsonparse(descriptor, schemaName);
      const isVnfd = checkIsVnfd({ descriptor: parsedDescriptor, schemaName });
      const tmpDescriptorType = isVnfd ? 'vnfd' : 'nsd';

      dispatch({
        type: actionTypes.UPLOAD_ARCHIVE,
        payload: {
          descriptor,
          descriptorName,
          isVnfd,
          isArchive,
          uploadFileName,
          descriptorType: tmpDescriptorType,
        },
      });
    }
  };
};

export const setSchema = ({ schema, schemaName }) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_SCHEMA, payload: { schema, schemaName } });
  };
};

export const setDescriptor = (descriptor, schemaName, descriptorType) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_DESCRIPTOR_FROM_LOGGING,
      payload: { descriptor, schemaName, descriptorType },
    });
  };
};

export const exportDescriptor = ({
  descriptor,
  descriptorName,
  isArchive,
  isVnfd,
  schemaName,
  validationServiceIp,
}) => {
  return async dispatch => {
    const res = await exportService({
      descriptor,
      descriptorName,
      isArchive,
      isVnfd,
      schemaName,
      validationServiceIp,
    });

    if (res.data.error) {
      dispatch({
        type: actionTypes.UPLOAD_ARCHIVE_FAIL,
        payload: {
          alertText: "Couldn't packaged descriptor!!",
          showAlert: true,
          error: true,
          success: false,
        },
      });
    } else {
      const tmpDescriptorName = res.data.fileName;
      const exportURL = res.data.fileDownloadUri;

      dispatch({
        type: actionTypes.EXPORT_DESCRIPTOR,
        payload: { exportURL, descriptorName: tmpDescriptorName },
      });
    }
  };
};

export const handleDescChange = ({ descriptor }) => {
  return dispatch => {
    dispatch({ type: actionTypes.DESCRIPTOR_CHANGE, payload: { descriptor } });
  };
};

export const setStatus = ({ status }) => {
  return dispatch => {
    dispatch({ type: actionTypes.VALIDATE, payload: { status } });
  };
};

export const closeAlert = ({ showAlert }) => {
  return dispatch => {
    dispatch({ type: actionTypes.CLOSE_ALERT, payload: { showAlert } });
  };
};

export const setDescriptorType = ({ descriptorType }) => {
  return dispatch => {
    let isVnfd;
    if (descriptorType === 'vnfd') {
      isVnfd = true;
    } else {
      isVnfd = false;
    }
    dispatch({
      type: actionTypes.SET_DESCRIPTOR_TYPE,
      payload: { descriptorType, isVnfd },
    });
  };
};

export const reset = () => {
  return dispatch => {
    dispatch({ type: actionTypes.RESET });
  };
};

export const setisVnfd = ({ isVnfd }) => {
  return dispatch => {
    let descriptorType;
    if (isVnfd !== null) {
      descriptorType = isVnfd ? 'vnfd' : 'nsd';
    } else {
      descriptorType = null;
    }
    dispatch({
      type: actionTypes.SETISVNFD,
      payload: { isVnfd, descriptorType },
    });
  };
};

export const vnfdOnboard = ({
  privateCatalogueIP,
  privateCataloguePort,
  validationServiceIp,
  descriptorName,
  status,
}) => {
  return async dispatch => {
    if (status.isValid === true) {
      try {
        const createVnfResult = await createVNFResource({
          privateCatalogueIP,
          privateCataloguePort,
        });
        const onboardVnfResult = await onboardVnf({
          privateCatalogueIP,
          privateCataloguePort,
          catalogueId: createVnfResult.data.data.id,
          validationServiceIp,
          descriptorName,
        });
        dispatch({
          type: actionTypes.ONBOARD_VNF,
          payload: {
            alertText: `${onboardVnfResult.data.data.message}`,
            showAlert: true,
            error: !onboardVnfResult.data.data.success,
            success: onboardVnfResult.data.data.success,
            onBoardDisabled: false,
          },
        });
      } catch (err) {
        dispatch({
          type: actionTypes.ONBOARD_VNF,
          payload: {
            alertText: err,
            showAlert: true,
            error: true,
            success: false,
            onBoardDisabled: false,
          },
        });
      }
    } else {
      dispatch({
        type: actionTypes.ONBOARD_VNF,
        payload: {
          alertText: 'Please Validate First!',
          showAlert: true,
          error: true,
          success: false,
          onBoardDisabled: false,
        },
      });
    }
  };
};

export const nsdOnboard = ({
  privateCatalogueIP,
  privateCataloguePort,
  descriptor,
  descriptorName,
  status,
}) => {
  return async dispatch => {
    if (status.isValid === true) {
      try {
        const createNsResult = await createNSResource({
          privateCatalogueIP,
          privateCataloguePort,
        });
        await onboardNs({
          privateCatalogueIP,
          privateCataloguePort,
          catalogueId: createNsResult.data.data.id,
          descriptor,
          descriptorName,
        });
        dispatch({
          type: actionTypes.ONBOARD_NSD,
          payload: {
            alertText: `Onboard NSD Successful`,
            showAlert: true,
            error: false,
            success: true,
            onBoardDisabled: false,
          },
        });
      } catch (err) {
        dispatch({
          type: actionTypes.ONBOARD_NSD,
          payload: {
            alertText: err,
            showAlert: true,
            error: true,
            success: false,
            onBoardDisabled: false,
          },
        });
      }
    } else {
      dispatch({
        type: actionTypes.ONBOARD_NSD,
        payload: {
          alertText: 'Please Validate First!',
          showAlert: true,
          error: true,
          success: false,
          onBoardDisabled: false,
        },
      });
    }
  };
};
