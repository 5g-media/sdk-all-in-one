import { getRequest, postRequest } from 'api/client/client';
import { parseResult } from 'api/service/dataParser';
import { CONTENT_TYPE } from 'constants/headers';
import { gitlab, jenkins } from 'constants/clientConfig';

export const getReposWithToken = async ({ token }) => {
  const url = gitlab({}).getRepos;
  const headers = {
    'PRIVATE-TOKEN': token,
    'content-type': CONTENT_TYPE.APPLICATION_JSON,
  };

  const result = await getRequest(url, { headers });

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const buildRequest = async ({
  taskName,
  projectName,
  projectType,
  userList,
}) => {
  const url = jenkins({
    taskName: taskName.toUpperCase(),
    projectName,
    projectType,
    userList,
  }).createTask;

  const result = await getRequest(url, {
    auth: {
      username: 'sdk',
      password: 'fivegmediacicd',
    },
  });

  return result;
};

export const runTask = async ({ taskName }) => {
  const url = jenkins({ taskName }).runTask;

  const result = await getRequest(url, {
    auth: {
      username: 'sdk',
      password: 'fivegmediacicd',
    },
  });

  return result;
};

export const getBuildResult = async ({ taskName }) => {
  const url = jenkins({ taskName }).buildResult;

  const result = await getRequest(url, {
    auth: {
      username: 'sdk',
      password: 'fivegmediacicd',
    },
  });

  return result;
};

export const createGitlabRepo = async ({ repoName, token }) => {
  const url = gitlab({ repoName }).createRepo;

  const headers = { 'PRIVATE-TOKEN': token };

  const result = await postRequest(url, null, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};

export const addFilesToRepo = async ({ repoId, fileName, content, token }) => {
  const url = gitlab({ repoId }).addFilesToRepo;

  const data = {
    actions: [
      {
        action: 'create',
        file_path: `/meta/${fileName}.yaml`,
        content,
      },
    ],
    branch: 'master',
    commit_message: 'add run.yaml',
  };

  const headers = {
    'PRIVATE-TOKEN': token,
    'Content-Type': 'application/json',
  };

  const result = await postRequest(url, data, headers);

  const parsedResult = parseResult(result);

  return parsedResult;
};
