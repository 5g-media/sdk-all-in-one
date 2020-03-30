import { getConfiguration } from 'api/service/configurationService';

export const getConfig = async () => {
  let config;
  const res = await getConfiguration({
    validationServiceIp: process.env.REACT_APP_AIO_SERVER_IP,
  });
  if (res.errStatus === false) {
    if (res.data.status === true) {
      config = JSON.parse(res.data.content);
      return {
        config,
        alertText: ``,
        showAlert: false,
        error: false,
        success: true,
      };
    }
    return {
      config: {},
      alertText: `No Config Initialized Yet`,
      showAlert: true,
      error: true,
      success: false,
    };
  }
  return {
    config: {},
    alertText: `Couldn't Get Configuration ${res.data.message}`,
    showAlert: true,
    error: true,
    success: false,
  };
};
