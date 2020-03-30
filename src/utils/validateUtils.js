import tv4 from 'tv4';
import schemaV4 from 'constants/schemas/schema_v4';

import YAML from 'yamljs';

export const isJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const yaml2jsonparse = (yamlStr, schemaFileName) => {
  let tmpYamlStr;
  let parsedjson = '';
  if (yamlStr !== undefined || yamlStr !== null) {
    if (schemaFileName !== 'tosca') {
      tmpYamlStr = yamlStr.replace(/- /g, '  ');
    } else {
      tmpYamlStr = yamlStr;
    }

    try {
      parsedjson = YAML.parse(tmpYamlStr);
    } catch (err) {
      parsedjson = '';
    }

    return parsedjson;
  }
  return parsedjson;
};

export const validate = ({ descriptor, schema, schemaName }) => {
  const input = isJsonString(descriptor)
    ? JSON.parse(descriptor)
    : yaml2jsonparse(descriptor, schemaName);

  const resY1 = schema;
  let valid = {};
  if (input !== undefined) {
    if (tv4.validate(resY1, schemaV4)) {
      valid = tv4.validateResult(input, resY1, true, true);

      if (valid.valid === false) {
        return {
          validStatus: 'Descriptor is not Valid (Code: 504)',
          errorDataPath: valid.error.dataPath ? valid.error.dataPath : '',
          errorMessage: valid.error.message ? valid.error.message : '',
          isValid: false,
          isValidationClicked: true,
        };
      }
      return {
        validStatus: 'Descriptor is Valid (Code : 201)',
        errorDataPath: '',
        errorMessage: '',
        isValidationClicked: true,
        isValid: true,
      };
    }
    return {
      validStatus: 'Schema is not Valid (Code : 502)',
      errorDataPath: '',
      errorMessage: '',
      isValid: false,
      isValidationClicked: true,
    };
  }
  return {
    isValid: false,
    alertText: 'Not Valid. Make sure you select the right schema',
  };
};

export const checkIsVnfd = ({ descriptor, schemaName }) => {
  try {
    if (schemaName === 'tosca') {
      const isVnfd =
        descriptor.topologyTemplate.substitutionMappings.nodeType === 'tosca.nodes.nfv.VNF';
      return isVnfd;
    }
    return (
      Object.prototype.hasOwnProperty.call(descriptor, 'vnfd-catalog') ||
      Object.prototype.hasOwnProperty.call(descriptor, 'vnfd:vnfd-catalog')
    );
  } catch (error) {
    return null;
  }
};

export const getSecondDirectoryName = ({ descriptorName }) => {
  const secondIndex = descriptorName.indexOf('/', descriptorName.indexOf('/') + 1);
  return descriptorName.substring(descriptorName.indexOf('/'), secondIndex);
};
