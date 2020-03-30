import { getRequest, postRequest, patchRequest } from 'api/client/client';
import { parseResult } from 'api/service/dataParser';
import { CONTENT_TYPE, HEADER } from 'constants/headers';
import { profiling, vspeechConfUrl, vCacheConfUrl } from 'constants/clientConfig';

export const getFaasConf = async ({ serviceIp, serviceName }) => {
  const url = profiling({
    serviceIp,
    serviceName,
  }).faasConfUrl;

  const headers = {
    'content-type': CONTENT_TYPE.APPLICATION_JSON,
    accept: HEADER.ACCEPT,
  };
  const result = await getRequest(url, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const getNonFaasConf = async ({ serviceIp, serviceName }) => {
  const url = profiling({
    serviceIp,
  }).nonFaasConfUrl;

  const headers = { 'content-type': CONTENT_TYPE.FORM_URLENCODED };
  const formData = new FormData();
  formData.append('containerName', serviceName);
  const result = await postRequest(url, formData, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const sendVspeechConfiguration = async ({ ipAddress, vspeechPort, rtmpPort }) => {
  const { vspeechUrl } = vspeechConfUrl({ ipAddress, vspeechPort });
  const { confUrl } = vspeechConfUrl({ ipAddress, rtmpPort });

  const headers = { 'content-type': CONTENT_TYPE.APPLICATION_JSON };

  const data = { url: confUrl };
  const result = await postRequest(vspeechUrl, data, headers);
  const parsedResult = parseResult(result);

  return parsedResult;
};

export const sendvCacheConfiguration = async ({
  serviceIp,
  cacheApiPort,
  originPort,
  cachePort,
}) => {
  const { vCacheUrl } = vCacheConfUrl({ serviceIp, cacheApiPort });

  const data = {
    vnfConfigurationData: {
      vnfSpecificData: {
        ip_address: serviceIp,
        port: `${originPort}`,
        fqdn: `${serviceIp}:${cachePort}`,
      },
    },
  };
  const headers = { 'content-type': CONTENT_TYPE.APPLICATION_JSON };

  await patchRequest(vCacheUrl, data, headers);
  // const parsedResult = parseResult(result);

  // return parsedResult;
};

export const startProfiling = async ({ serviceIp, envList, imageName, stepCount }) => {
  const url = profiling({ serviceIp }).startProfiler;
  const formData = new FormData();
  formData.append('envList', envList);
  formData.append('imageName', imageName);
  formData.append('stepCount', parseInt(stepCount, 10));
  const result = await postRequest(url, formData);
  return result;
};

export const getLogs = async ({ serviceIp, containerId }) => {
  const url = profiling({ serviceIp }).getLogs;
  const formData = new FormData();
  formData.append('containerId', containerId);
  const result = await postRequest(url, formData);
  return result;
};
