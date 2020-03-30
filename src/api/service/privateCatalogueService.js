import { postRequest, putRequest, getRequest } from 'api/client/client';
import { parseResult } from 'api/service/dataParser';
import { CONTENT_TYPE, HEADER } from 'constants/headers';
import { catalogue, validation } from 'constants/clientConfig';

export const createVNFResource = async ({
  privateCatalogueIP,
  privateCataloguePort,
}) => {
  const { vnfResource } = catalogue({
    privateCatalogueIP,
    privateCataloguePort,
  });

  const headers = {
    accept: HEADER.ACCEPT,
    content_type: CONTENT_TYPE.APPLICATION_JSON,
  };
  const result = await postRequest(vnfResource, {}, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const getVNFResource = async ({
  privateCatalogueIP,
  privateCataloguePort,
}) => {
  const { vnfResource } = catalogue({
    privateCatalogueIP,
    privateCataloguePort,
  });

  const headers = {
    accept: HEADER.ACCEPT,
    content_type: CONTENT_TYPE.APPLICATION_JSON,
  };
  const result = await getRequest(vnfResource, {}, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const getVNFDContent = async ({ privateCatalogueIP, catalogueId }) => {
  const { getVnfdContent } = catalogue({
    privateCatalogueIP,
    catalogueId,
  });

  const headers = {
    accept: HEADER.ACCEPT,
    content_type: CONTENT_TYPE.APPLICATION_JSON,
  };
  const result = await getRequest(getVnfdContent, {}, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const createNSResource = async ({
  privateCatalogueIP,
  privateCataloguePort,
}) => {
  const { createNsResource } = catalogue({
    privateCatalogueIP,
    privateCataloguePort,
  });

  const headers = {
    accept: HEADER.ACCEPT,
    content_type: CONTENT_TYPE.APPLICATION_JSON,
  };
  const result = await postRequest(createNsResource, {}, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const onboardVnf = async ({
  privateCatalogueIP,
  privateCataloguePort,
  catalogueId,
  validationServiceIp,
  descriptorName,
}) => {
  const { onboard } = validation({ validationServiceIp });
  const { uploadVnfContent } = catalogue({
    privateCatalogueIP,
    privateCataloguePort,
    catalogueId,
  });

  const headers = {
    accept: HEADER.ACCEPT,
  };
  const formData = new FormData();
  formData.append('url', uploadVnfContent);
  formData.append('exportFileName', descriptorName);
  const result = await postRequest(onboard, formData, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const onboardNs = async ({
  privateCatalogueIP,
  privateCataloguePort,
  catalogueId,
  descriptor,
  descriptorName,
}) => {
  const { uploadNsContent } = catalogue({
    privateCatalogueIP,
    privateCataloguePort,
    catalogueId,
  });

  const headers = {
    accept: HEADER.ACCEPT,
  };
  const file = new File([descriptor], `${descriptorName}.yaml`);
  const formData = new FormData();
  formData.append('file', file);

  const result = await putRequest(uploadNsContent, formData, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};
