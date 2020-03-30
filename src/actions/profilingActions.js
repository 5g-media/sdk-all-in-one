import * as actionTypes from 'actions/actionTypes';
import {
  getNonFaasConf,
  sendVspeechConfiguration,
  sendvCacheConfiguration,
  getFaasConf,
  startProfiling,
  getLogs,
} from '../api/service/profilingService';
import { findPublicPort } from '../utils/profilingUtils';
import { vtranscoder, vspeech, vCache } from '../constants/dockerConfig';

export const clearLogs = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.CLEAR_LOGS,
      payload: { logs: '', loading: true },
    });
  };
};

export const setServiceName = ({ serviceName }) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_SERVICE_NAME, payload: { serviceName } });
  };
};

export const setPorts = ({ ...portConfig }) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_PORTS, payload: { ...portConfig } });
  };
};

export const setInvalidStatus = ({ ...status }) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_INVALID_STATUS, payload: { ...status } });
  };
};

export const setIpAddress = ({ ipAddress }) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_IP_ADDRESS, payload: { ipAddress } });
  };
};

export const setIpInvalidStatus = ({ ipInvalidStatus }) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_IP_INVALID_STATUS,
      payload: { ipInvalidStatus },
    });
  };
};

export const setProfilingType = ({ ...type }) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_PROFILE_TYPE, payload: { ...type } });
  };
};

export const setInputChange = ({ ...inputs }) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_INPUT_CHANGES, payload: { ...inputs } });
  };
};

export const startProfiler = ({ state, config }) => {
  return async dispatch => {
    const {
      platform,
      ipAddress,
      inputPort,
      outputPort,
      configPort,
      frameToSend,
      mode,
      stepCount,
    } = state;
    const serviceIp = config.validation.extract_service;
    let optsc;
    if (platform === 'Faas' && mode === 'Producer') {
      optsc = vtranscoder({
        ipAddress,
        inputPort,
        outputPort,
        configPort,
        frameToSend,
      });
    } else if (platform === 'Non-Faas' && mode === 'Producer') {
      optsc = vspeech({ ipAddress, inputPort });
    } else if (platform === 'Non-Faas' && mode === 'Consumer') {
      optsc = vCache({ ipAddress, outputPort });
    }

    const envList = optsc.Env;
    const imageName = optsc.Image;

    const result = await startProfiling({
      serviceIp,
      envList,
      imageName,
      stepCount,
    });

    if (result.status === 200) {
      let logResult = '';
      if (imageName === 'docker5gmedia/vcache-profiling') {
        dispatch({
          type: actionTypes.START_PROFILER_LOG,
          payload: {
            loading: false,
            logs: 'Consuming the media has started !!!',
          },
        });
      } else {
        logResult = await getLogs({ serviceIp, containerId: result.data });
        if (logResult.status === 200) {
          dispatch({
            type: actionTypes.START_PROFILER_LOG,
            payload: { loading: false, logs: logResult.data.join('') },
          });
        } else {
          dispatch({
            type: actionTypes.START_PROFILER_LOG_FAIL,
            payload: {
              loading: false,
              logs: `Internal Server Error\nCouldn't Get Profiler Log !!`,
            },
          });
        }
      }
    } else if (result.status === 500) {
      dispatch({
        type: actionTypes.START_PROFILER_FAIL,
        payload: {
          loading: false,
          logs: `${result.status} Internal Server Error\nCouldn't Start Profiler !!`,
        },
      });
    }
  };
};

export const getServiceConfig = ({ states, config }) => {
  return async dispatch => {
    if (states.platform === 'Non-Faas' && states.mode === 'Producer') {
      try {
        const res = await getNonFaasConf({
          serviceIp: config.validation.extract_service,
          serviceName: states.serviceName,
        });
        if (res.data.data[0]) {
          dispatch({
            type: actionTypes.SET_NFP_CONF,
            payload: {
              ipAddress: config.validation.extract_service,
              inputPort: res.data.data[0].Ports[0].PublicPort,
              outputPort: '',
              configPort: '',
            },
          });
          sendVspeechConfiguration({
            ipAddress: config.validation.extract_service,
            vspeechPort: res.data.data[1].Ports[1].PublicPort,
            rtmpPort: res.data.data[0].Ports[0].PublicPort,
          });
        } else {
          dispatch({
            type: actionTypes.SET_NFP_CONF_ERROR,
            payload: {
              ipAddress: '',
              inputPort: '',
              outputPort: '',
              configPort: '',
            },
          });
        }
      } catch (error) {
        dispatch({
          type: actionTypes.SET_NFP_CONF_ERROR,
          payload: {
            ipAddress: '',
            inputPort: '',
            outputPort: '',
            configPort: '',
            errMessage: error.message,
          },
        });
      }
    } else if (states.platform === 'Non-Faas' && states.mode === 'Consumer') {
      try {
        const nonFaasRes = await getNonFaasConf({
          serviceIp: config.validation.extract_service,
          serviceName: states.serviceName,
        });
        dispatch({
          type: actionTypes.SET_NFC_CONF,
          payload: {
            ipAddress: config.validation.extract_service,
            inputPort: findPublicPort(nonFaasRes.data.data[0].Ports, 8080),
            outputPort: findPublicPort(nonFaasRes.data.data[1].Ports, 8080),
            configPort: findPublicPort(nonFaasRes.data.data[1].Ports, 8888),
            errMessage: '',
          },
        });
        sendvCacheConfiguration({
          serviceIp: config.validation.extract_service,
          cacheApiPort: findPublicPort(nonFaasRes.data.data[1].Ports, 8888),
          originPort: findPublicPort(nonFaasRes.data.data[0].Ports, 8080),
          cachePort: findPublicPort(nonFaasRes.data.data[1].Ports, 8080),
        });
      } catch (error) {
        dispatch({
          type: actionTypes.SET_NFC_CONF_ERR,
          payload: {
            ipAddress: '',
            inputPort: '',
            outputPort: '',
            configPort: '',
            errMessage: error.message,
          },
        });
      }
    } else if (states.platform === 'Faas' && states.mode === 'Producer') {
      try {
        const res = await getFaasConf({
          serviceIp: config.editor.editor_url,
          serviceName: states.serviceName,
        });
        dispatch({
          type: actionTypes.SET_FP_CONF,
          payload: {
            ipAddress: res.data.vnfs[0].vim_info.host_ip,
            inputPort: res.data.vnfs[0].vim_info.service.service_ports[18091],
            outputPort: res.data.vnfs[0].vim_info.service.service_ports[18090],
            configPort: res.data.vnfs[0].vim_info.service.service_ports[18092],
          },
        });
      } catch (error) {
        dispatch({
          type: actionTypes.SET_FP_CONF_ERR,
          payload: {
            ipAddress: '',
            inputPort: '',
            outputPort: '',
            configPort: '',
            errMessage: error.message,
          },
        });
      }
    }
  };
};
