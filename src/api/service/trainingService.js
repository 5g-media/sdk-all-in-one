import { postRequest, getRequest } from "api/client/client";
import { parseResult } from "api/service/dataParser";
import { CONTENT_TYPE } from "constants/headers";
import { validation } from "constants/clientConfig";

export const startTraining = async ({ confdata, validationServiceIp }) => {
  const url = validation({
    validationServiceIp
  }).startTraining;

  const headers = {
    content_type: CONTENT_TYPE.APPLICATION_JSON
  };
  const result = await postRequest(url, confdata, headers);

  console.log("training result =    " + result);

  return result;
};

export const stopTraining = async ({ validationServiceIp }) => {
  const url = validation({
    validationServiceIp
  }).stopTraining;

  const headers = {
    content_type: CONTENT_TYPE.TEXT_PLAIN
  };

  const result = await getRequest(url, headers);

  return result;
};

export const uploadService = async ({ uploadFile, validationServiceIp }) => {
  const { uploadZipFile: url } = validation({ validationServiceIp });

  const formData = new FormData();
  formData.append("file", uploadFile);

  const headers = { "content-type": CONTENT_TYPE.MULTIPART_FORM_DATA };
  const result = await postRequest(url, formData, headers);

  return result;
};

export const deployMape = async ({ productionIP, validationServiceIp }) => {
  const url = validation({
    productionIP,
    validationServiceIp,
  }).deployMape;

  const headers = {
    content_type: CONTENT_TYPE.TEXT_PLAIN,
  };

  const result = await postRequest(url, headers);

  return result;
};