import * as actionTypes from 'actions/actionTypes';

import uuid from 'uuid';
import { getLogs, deleteLog } from '../api/service/loggingService';
import { setDescriptor } from './validatorActions';
import {
  getVNFResource,
  getVNFDContent,
} from '../api/service/privateCatalogueService';

import * as normalizeActions from './loggingNormalizeActions';

export const getIssues = ({ config }) => {
  return async dispatch => {
    try {
      const res = await getLogs({
        serviceIp: config.mape.mapeURL,
        projectId: 6,
      });
      const data1 = normalizeActions.normalizeResource(res.data.issues);

      const res2 = await getLogs({
        serviceIp: config.mape.mapeURL,
        projectId: 8,
      });
      const data2 = normalizeActions.normalizeScale(res2.data.issues);

      const data = [...data1, ...data2];

      data.sort((a, b) => {
        return b.id - a.id;
      });

      dispatch({
        type: actionTypes.GET_ISSUES_SUCCESS,
        payload: {
          data,
          errMessage: '',
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ISSUES_FAIL,
        payload: {
          data: [],
          errMessage: error.message,
        },
      });
    }
  };
};

export const updateIssueList = issueId => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_LIST, payload: { issueId } });
  };
};

export const setLoading = status => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_DELETE_LOADING, payload: { status } });
  };
};

export const deleteIssue = ({ config, issueId }) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      await deleteLog({
        serviceIp: config.mape.mapeURL,
        issueId,
      });

      dispatch({
        type: actionTypes.DELETE_ISSUES_SUCCESS,
        payload: {
          errMessage: '',
        },
      });
      dispatch(updateIssueList(issueId));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ISSUES_FAIL,
        payload: {
          errMessage: error.message,
        },
      });
      dispatch(setLoading(false));
    }
  };
};

export const fetchDescriptors = ({ privateCatalogueIP }) => {
  return async dispatch => {
    try {
      const res = await getVNFResource({
        privateCatalogueIP,
      });

      dispatch({
        type: actionTypes.GET_VNFD_LIST_SUCCESS,
        payload: {
          data: res.data,
          errMessage: '',
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_VNFD_LIST_FAIL,
        payload: {
          data: [],
          errMessage: error.message,
        },
      });
    }
  };
};

const findDescriptor = ({ data, descriptorId }) => {
  const item = data.find(it => it.vnfdId === descriptorId);
  return item.id;
};

export const updateDescriptor = data => {
  return dispatch => {
    dispatch(setDescriptor(data, 'tosca', 'vnfd'));
  };
};

export const getDescriptor = ({ datum, privateCatalogueIP }) => {
  return async dispatch => {
    try {
      const res = await getVNFResource({
        privateCatalogueIP,
      });

      const catalogueId = findDescriptor({
        data: res.data,
        descriptorId: datum.vnfdRef,
      });

      const res2 = await getVNFDContent({
        privateCatalogueIP,
        catalogueId,
      });

      let finalData = '';

      if (datum.issueType === 'Resource') {
        const searchCpu = `numVirtualCpu: ${datum.cpuCurrent.split(' ')[1]}`;
        const replaceCpu = `numVirtualCpu: ${
          datum.cpuRecommended.split(' ')[1]
        }`;

        const cpuData = res2.data.replace(searchCpu, replaceCpu);

        const searchMemory = `virtualMemSize: ${
          datum.memoryCurrent.split(' ')[1].split('.')[0]
        }`;
        const replaceMemory = `virtualMemSize: ${
          datum.memoryRecommended.split(' ')[1].split('.')[0]
        }`;

        const memoryData = cpuData.replace(searchMemory, replaceMemory);

        const searchStorage = `sizeOfStorage: ${
          datum.storageCurrent.split(' ')[1]
        }`;
        const replaceStorage = `sizeOfStorage: ${
          datum.storageRecommended.split(' ')[1]
        }`;

        finalData = memoryData.replace(searchStorage, replaceStorage);
      } else {
        const searchCpu = `maxNumberOfInstances: ${
          datum.cpuCurrent.split(' ')[1]
        }`;
        const replaceCpu = `maxNumberOfInstances: ${
          datum.cpuRecommended.split(' ')[1]
        }`;

        finalData = res2.data.replace(searchCpu, replaceCpu);
      }

      const ff = finalData.replace(new RegExp(datum.vnfdRef, 'g'), uuid());

      dispatch(updateDescriptor(ff));
    } catch (error) {
      dispatch({
        type: actionTypes.GET_VNFD_CONTENT_FAIL,
        payload: {
          data: [],
          errMessage: error.message,
        },
      });
    }
  };
};
