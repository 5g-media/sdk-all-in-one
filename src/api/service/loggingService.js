import { getRequest, deleteRequest } from 'api/client/client';
import { parseResult } from 'api/service/dataParser';
import { CONTENT_TYPE, HEADER } from 'constants/headers';
import { logging } from 'constants/clientConfig';

export const getLogs = async ({ serviceIp, projectId }) => {
  const url = logging({
    serviceIp,
    projectId,
  }).getLogs;

  const headers = {
    'content-type': CONTENT_TYPE.APPLICATION_JSON,
    accept: HEADER.ACCEPT,
  };

  const result = await getRequest(url, {
    auth: {
      username: 'sdkuser',
      password: 'RAPtor1234',
    },
    headers,
  });

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const deleteLog = async ({ serviceIp, issueId }) => {
  const url = logging({
    serviceIp,
    issueId,
  }).deleteIssue;

  const headers = {
    'content-type': CONTENT_TYPE.APPLICATION_JSON,
    accept: HEADER.ACCEPT,
  };

  const result = await deleteRequest(url, {
    auth: {
      username: 'sdkuser',
      password: 'RAPtor1234',
    },
    headers,
  });

  const parsedResult = parseResult(result);

  return parsedResult;
};
