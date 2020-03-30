export const validation = ({ validationServiceIp }) => ({
  export: `http://${validationServiceIp}:8434/exportFile`,
  upload: `http://${validationServiceIp}:8434/uploadFile`,
  onboard: `http://${validationServiceIp}:8434/onboardToPrivateCatalogue`,
  getConfig: `http://${validationServiceIp}:8434/getConfig`,
  setConfig: `http://${validationServiceIp}:8434/setConfig`,
  stopTraining: `http://${validationServiceIp}:8434/shutdown`,
  tensorboardStart: `http://${validationServiceIp}:8434/tensorboard`,
  startTraining: `http://${validationServiceIp}:8434/trainData`,
  deployMape: `http://${validationServiceIp}:8434/deployMape`,
  uploadZipFile: `http://${validationServiceIp}:8434/uploadZipFile`,
});

export const catalogue = ({
  privateCatalogueIP,
  privateCataloguePort,
  catalogueId,
}) => ({
  createNsResource: `http://${privateCatalogueIP}:8083/nsd/v1/ns_descriptors`,
  uploadNsContent: `http://${privateCatalogueIP}:8083/nsd/v1/ns_descriptors/${catalogueId}/nsd_content`,
  vnfResource: `http://${privateCatalogueIP}:8083/vnfpkgm/v1/vnf_packages`,
  getVnfdContent: `http://${privateCatalogueIP}:8083/vnfpkgm/v1/vnf_packages/${catalogueId}/vnfd`,
  uploadVnfContent: `http://${privateCatalogueIP}:8083/vnfpkgm/v1/vnf_packages/${catalogueId}/package_content`,
  catalogueUrl:
    privateCataloguePort !== ''
      ? `http://${privateCatalogueIP}:${privateCataloguePort}/5gcatalogue`
      : `http://${privateCatalogueIP}/5gcatalogue`,
});

export const editor = ({ editorUrl, editorPort }) => ({
  editorUrl:
    editorPort !== ''
      ? `http://${editorUrl}:${editorPort}`
      : `http://${editorUrl}`,
});

export const monitoring = ({ monitoringUrl, monitoringPort }) => ({
  monitoringUrl: `http://${monitoringUrl}:${monitoringPort}`,
});

export const xterm = ({
  xtermServerIp,
  xtermServerPort,
  xtermCols,
  xtermRows,
  processId,
}) => ({
  xtermCommandUrl: `http://${xtermServerIp}:8333/terminals/${processId}/writeln`,
  sockerUrl: `${xtermServerIp}:${xtermServerPort}/terminals/`,
  serverUrl: `http://${xtermServerIp}:${xtermServerPort}/terminals?cols=${xtermCols}&rows=${xtermRows}`,
  resizeUrl: `http://${xtermServerIp}:${xtermServerPort}/terminals/${processId}/size?cols=${xtermCols}&rows=${xtermRows}`,
});

export const profiling = ({ serviceIp, serviceName }) => ({
  faasConfUrl: `http://${serviceIp}:5002/osm/${serviceName}`,
  nonFaasConfUrl: `http://${serviceIp}:8434/getContainersByName`,
  startProfiler: `http://${serviceIp}:8434/startProfiler`,
  getLogs: `http://${serviceIp}:8434/getLogs`,
});

export const logging = ({ serviceIp, projectId, issueId }) => ({
  getLogs: `http://${serviceIp}/issues.json?project_id=${projectId}&limit=1000`,
  deleteIssue: `http://${serviceIp}/issues/${issueId}.json`,
});

export const vspeechConfUrl = ({ ipAddress, vspeechPort, rtmpPort }) => ({
  vspeechUrl: `http://${ipAddress}:${vspeechPort}/api/configuration/`,
  confUrl: `rtmp://${ipAddress}:${rtmpPort}/live/teststream`,
});

export const vCacheConfUrl = ({ serviceIp, cacheApiPort }) => ({
  vCacheUrl: `http://${serviceIp}:${cacheApiPort}/vnfconfig/v1/cache_edge_origin_configuration`,
});

export const gitlab = ({ repoName, repoId }) => ({
  getRepos: 'https://production.eng.it/gitlab/api/v4/projects?per_page=100',
  createRepo: `https://production.eng.it/gitlab/api/v4/projects?name=${repoName}&namespace_id=880`,
  addFilesToRepo: `https://production.eng.it/gitlab/api/v4/projects/${repoId}/repository/commits`,
});

export const jenkins = ({ taskName, projectName, projectType, userList }) => ({
  createTask: `http://217.172.12.237:8090/createTask/${taskName}/${projectName}/${projectType}/${userList}`,
  runTask: `http://217.172.12.237:8090/runTask/${taskName}`,
  buildResult: `http://217.172.12.237:8090/getLastBuildResult/${taskName}`,
});
