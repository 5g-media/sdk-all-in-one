import { postRequest } from 'api/client/client';
// import { parseResult } from 'api/service/dataParser';
import { CONTENT_TYPE } from 'constants/headers';
import { validation } from 'constants/clientConfig';

export const uploadService = async ({
  uploadFile,
  isArchive,
  schemaName,
  descriptorType,
  validationServiceIp,
}) => {
  const { upload } = validation({ validationServiceIp });

  const formData = new FormData();
  formData.append('file', uploadFile);
  formData.append('isArchive', isArchive);
  formData.append('schemaName', schemaName);
  formData.append('descriptorType', descriptorType);

  const headers = { 'content-type': CONTENT_TYPE.MULTIPART_FORM_DATA };
  const result = await postRequest(upload, formData, headers);

  // const parsedResult = parseResult(result);

  return result;
};

export const exportService = async ({
  descriptor,
  descriptorName,
  isArchive,
  isVnfd,
  schemaName,
  validationServiceIp,
}) => {
  const url = validation({ validationServiceIp }).export;

  const filePath = descriptorName;
  const content = descriptor;

  const formData = new FormData();
  formData.append('content', content);
  formData.append('filePath', filePath);
  formData.append('isArchive', isArchive);
  formData.append('isVnfd', isVnfd);
  formData.append('schemaName', schemaName);

  const headers = { 'content-type': CONTENT_TYPE.FORM_URLENCODED };
  const result = await postRequest(url, formData, headers);

  // const parsedResult = parseResult(result);

  return result;
};
