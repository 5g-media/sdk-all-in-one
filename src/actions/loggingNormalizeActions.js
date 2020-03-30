import * as descriptorActions from './loggingDescriptorActions';

export const normalizeResource = data => {
  const normalizedData = data.map(datum => {
    return {
      id: descriptorActions.getIssueId(datum),
      date: descriptorActions.getIssueDate(datum),
      vnfdId: descriptorActions.getVnfdInformation({
        datum,
        key: 'VNFd identifier: ',
      }),
      vnfdRef: descriptorActions.getVnfdInformation({
        datum,
        key: 'VNFd ref: ',
      }),
      issueType: 'Resource',
      cpuCurrent: descriptorActions.getResource({
        datum,
        key: 'vCPU',
        index: 0,
      }),
      memoryCurrent: descriptorActions.getResource({
        datum,
        key: 'MEMORY',
        index: 0,
      }),
      storageCurrent: descriptorActions.getResource({
        datum,
        key: 'DISK',
        index: 0,
      }),
      cpuRecommended: descriptorActions.getResource({
        datum,
        key: 'vCPU',
        index: 1,
      }),
      memoryRecommended: descriptorActions.getResource({
        datum,
        key: 'MEMORY',
        index: 1,
      }),
      storageRecommended: descriptorActions.getResource({
        datum,
        key: 'DISK',
        index: 1,
      }),
      description: descriptorActions.getDescription(datum),
    };
  });
  return normalizedData;
};

export const normalizeScale = data => {
  const normalizedData = data.map(datum => {
    return {
      id: descriptorActions.getIssueId(datum),
      date: descriptorActions.getIssueDate(datum),
      vnfdId: descriptorActions.getVnfdInformation({
        datum,
        key: 'VNFd identifier: ',
      }),
      vnfdRef: descriptorActions.getVnfdInformation({
        datum,
        key: 'VNFd ref: ',
      }),
      issueType: 'Scaling group',
      cpuCurrent: descriptorActions.getCurrentScale(datum),
      cpuRecommended: descriptorActions.getRecommendedScale(datum),
      description: descriptorActions.getDescription(datum),
    };
  });
  return normalizedData;
};
