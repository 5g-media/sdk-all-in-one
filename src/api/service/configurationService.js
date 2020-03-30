import { getRequest, postRequest } from 'api/client/client';
import { parseResult } from 'api/service/dataParser';
import { CONTENT_TYPE } from 'constants/headers';
import { validation } from 'constants/clientConfig';

export const setConfiguration = async ({ conf, validationServiceIp }) => {
  const url = validation({
    validationServiceIp,
  }).setConfig;

  const headers = {
    content_type: CONTENT_TYPE.APPLICATION_JSON,
  };
  const result = await postRequest(url, conf, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const getConfiguration = async ({ validationServiceIp }) => {
  const url = validation({
    validationServiceIp,
  }).getConfig;

  const headers = {
    content_type: CONTENT_TYPE.APPLICATION_JSON,
  };
  const result = await getRequest(url, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const startTraining = async ({ confdata, validationServiceIp }) => {
  const url = validation({
    validationServiceIp,
  }).startTraining;

  const headers = {
    content_type: CONTENT_TYPE.APPLICATION_JSON,
  };
  const result = await postRequest(url, confdata, headers);

  return result;
};

export const stopTraining = async ({ validationServiceIp }) => {
  const url = validation({
    validationServiceIp,
  }).stopTraining;

  const headers = {
    content_type: CONTENT_TYPE.TEXT_PLAIN,
  };

  const result = await getRequest(url, headers);
  return result;
};

export const tensorboardStart = async ({ validationServiceIp }) => {
  const url = validation({
    validationServiceIp,
  }).tensorboardStart;

  const headers = {
    content_type: CONTENT_TYPE.TEXT_PLAIN,
  };

  const result = await getRequest(url, headers);

  return result;
};
