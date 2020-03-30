import { postRequest } from 'api/client/client';
import { parseResult } from 'api/service/dataParser';
import { CONTENT_TYPE } from 'constants/headers';
import { xterm } from '../../constants/clientConfig';

export const sendCommand = async ({ serviceIp, processId, command }) => {
  const { xtermCommandUrl } = xterm({ xtermServerIp: serviceIp, processId });

  const data = command;

  const headers = { 'content-type': CONTENT_TYPE.FORM_URLENCODED };
  const result = await postRequest(xtermCommandUrl, data, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};
