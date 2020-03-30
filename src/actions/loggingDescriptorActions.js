export const getIssueId = datum => {
  return datum.id;
};

export const getIssueDate = datum => {
  return datum.updated_on;
};

export const getVnfdInformation = ({ datum, key }) => {
  const Arr = datum.description.split('\r\n');
  const B = Arr.filter(item => item.includes(key));

  return B[0].substring(B[0].indexOf(key) + key.length);
};

export const getResource = ({ datum, key, index }) => {
  const Arr = datum.description.split('\r\n');
  const B = Arr.filter(item => item.includes(key));

  return B[index].substring(2);
};

export const getDescription = datum => {
  return datum.description.split('\r\n');
};

export const getCurrentScale = datum => {
  const Arr = datum.description.split('\r\n');
  const B = Arr.filter(item =>
    item.includes('allowed number of VNF instances is'),
  );

  const value = B[0].substring(B[0].indexOf('is: ') + 4, B[0].length - 1);

  return `maxNumberOfInstances: ${value}`;
};

export const getRecommendedScale = datum => {
  const Arr = datum.description.split('\r\n');
  const B = Arr.filter(item =>
    item.includes('allowed number of VNF instances to'),
  );

  const value = B[0].substring(B[0].indexOf('to: ') + 4, B[0].length - 1);

  return `maxNumberOfInstances: ${value}`;
};
