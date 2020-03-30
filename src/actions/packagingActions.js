import * as actionTypes from 'actions/actionTypes';
import {
  createGitlabRepo,
  addFilesToRepo,
  getReposWithToken,
  getBuildResult,
  buildRequest,
  runTask,
} from '../api/service/packagingService';
import { getTaskName } from '../utils/packagingUtils';

export const setRepoName = ({ repoName }) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_REPO_NAME, payload: { repoName } });
  };
};

export const setOperationIndex = ({ operationIndex }) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_OPERATION_INDEX,
      payload: { operationIndex },
    });
  };
};

export const setPackageYaml = ({ packageYaml }) => {
  return dispatch =>
    dispatch({ type: actionTypes.SET_PACKAGE_YAML, payload: { packageYaml } });
};

export const setRunYaml = ({ runYaml }) => {
  return dispatch =>
    dispatch({ type: actionTypes.SET_RUN_YAML, payload: { runYaml } });
};

export const setLoading = ({ loading }) => {
  return dispatch =>
    dispatch({ type: actionTypes.SET_LOADING, payload: { loading } });
};

export const closeAlert = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.CLOSE_PACKAGING_ALERT,
      payload: { showAlert: false },
    });
  };
};

export const setActiveRepo = ({ activeRepo }) => {
  return dispatch =>
    dispatch({ type: actionTypes.SET_ACTIVE_REPO, payload: { activeRepo } });
};

export const setUserList = ({ userList }) => {
  return dispatch =>
    dispatch({ type: actionTypes.SET_USER_LIST, payload: { userList } });
};

export const setBuildStatusLoading = ({ buildStatusLoading }) => {
  return dispatch =>
    dispatch({
      type: actionTypes.SET_BUILD_STATUS_LOADING,
      payload: { buildStatusLoading },
    });
};

export const setBuildButtonLoading = ({ buildButtonLoading }) => {
  return dispatch =>
    dispatch({
      type: actionTypes.SET_BUILD_BUTTON_LOADING,
      payload: { buildButtonLoading },
    });
};

export const setSelectedProjectType = ({ selectedIndex }) => {
  return dispatch => {
    let selectedProjectType;
    if (selectedIndex === 1) {
      selectedProjectType = 'nodejs';
    } else if (selectedIndex === 2) {
      selectedProjectType = 'java';
    } else if (selectedIndex === 3) {
      selectedProjectType = 'python';
    } else if (selectedIndex === 4) {
      selectedProjectType = 'native';
    } else if (selectedIndex === 5) {
      selectedProjectType = 'docker';
    }
    dispatch({
      type: actionTypes.SET_SELECTED_PROJECT_TYPE,
      payload: { selectedProjectType },
    });
  };
};

export const buildProject = ({ activeRepo, selectedProjectType, userList }) => {
  return async dispatch => {
    const taskName = getTaskName({
      repoName: activeRepo.name,
      projectType: selectedProjectType,
    });
    let currentUserList = userList.replace(';', '%20');
    currentUserList = currentUserList.replace(' ', '%20');
    const projectName = activeRepo.name;
    const projectType = selectedProjectType;

    try {
      const result = await buildRequest({
        taskName,
        projectName,
        projectType,
        userList: currentUserList,
      });
      if (result) {
        await runTask({ taskName, projectName, projectType });
        dispatch({
          type: actionTypes.BUILD_PROJECT_SUCCESS,
          payload: {
            buildedTaskName: result,
            buildButtonLoading: false,
            projectName,
          },
        });
      } else {
        dispatch({
          type: actionTypes.BUILD_PROJECT_FAIL,
          payload: {
            buildedTaskName: result.message,
            buildButtonLoading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.BUILD_PROJECT_FAIL,
        payload: {
          buildedTaskName: 'Build Failed!!',
          buildButtonLoading: false,
        },
      });
    }
  };
};

export const getBuildStatus = ({ activeRepo, selectedProjectType }) => {
  return async dispatch => {
    const taskName = getTaskName({
      repoName: activeRepo.name,
      projectType: selectedProjectType,
    });

    try {
      const res = await getBuildResult({
        taskName,
        projectname: activeRepo.name,
        projectType: selectedProjectType,
      });
      if (res) {
        dispatch({
          type: actionTypes.GET_BUILD_STATUS_SUCCESS,
          payload: {
            buildResult: `${taskName} --> ${res}`,
            buildStatusLoading: false,
          },
        });
      } else {
        dispatch({
          type: actionTypes.GET_BUILD_STATUS_FAIL,
          payload: {
            buildResult: `${taskName} --> ${res}`,
            buildStatusLoading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_BUILD_STATUS_FAIL,
        payload: {
          buildResult: `Couln't get build result`,
          buildStatusLoading: false,
        },
      });
    }
  };
};

export const getRepos = ({ token }) => {
  return async dispatch => {
    try {
      const res = await getReposWithToken({ token });
      if (res.errStatus === false) {
        dispatch({
          type: actionTypes.GET_REPOS_WITH_TOKEN_SUCCESS,
          payload: { repositories: res.data },
        });
      } else {
        dispatch({
          type: actionTypes.GET_REPOS_WITH_TOKEN_FAIL,
          payload: { repositories: {} },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_REPOS_WITH_TOKEN_FAIL,
        payload: {
          repositories: {},
          showAAlert: true,
          alertText: "Couln't get Repos",
          error: true,
          success: false,
        },
      });
    }
  };
};

export const createRepoForDocker = ({ repoName, token }) => {
  return async dispatch => {
    try {
      const repoRes = await createGitlabRepo({
        repoName,
        token,
      });

      if (repoRes.errStatus === false) {
        dispatch({
          type: actionTypes.CREATE_DOCKER_PROJECT_SUCCESS,
          payload: {
            showAAlert: true,
            alertText: 'Project Created Succesfully',
            error: false,
            success: true,
            projectGitUrl: repoRes.data.data.http_url_to_repo,
            loading: false,
          },
        });
      } else {
        dispatch({
          type: actionTypes.CREATE_UNIKERNEL_PROJECT_FAIL,
          payload: {
            showAAlert: true,
            alertText: repoRes.data.errors.message,
            error: true,
            success: false,
            projectGitUrl: '',
            loading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_DOCKER_PROJECT_FAIL,
        payload: {
          showAAlert: true,
          alertText: 'unexpected error',
          error: true,
          success: false,
          projectGitUrl: '',
          loading: false,
        },
      });
    }
  };
};

export const createProject = ({ repoName, runYaml, packageYaml, token }) => {
  return async dispatch => {
    try {
      const repoRes = await createGitlabRepo({
        repoName,
        token,
      });

      if (repoRes.errStatus === false) {
        await addFilesToRepo({
          repoId: repoRes.data.id,
          fileName: 'run',
          content: runYaml,
          token,
        });

        await addFilesToRepo({
          repoId: repoRes.data.id,
          fileName: 'package',
          content: packageYaml,
          token,
        });

        dispatch({
          type: actionTypes.CREATE_UNIKERNEL_PROJECT_SUCCESS,
          payload: {
            showAAlert: true,
            alertText: 'Project Created Succesfully',
            error: false,
            success: true,
            projectGitUrl: repoRes.data.http_url_to_repo,
            loading: false,
          },
        });
      } else {
        dispatch({
          type: actionTypes.CREATE_UNIKERNEL_PROJECT_FAIL,
          payload: {
            showAAlert: true,
            alertText: repoRes.data.errors.message,
            error: true,
            success: false,
            projectGitUrl: '',
            loading: false,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.CREATE_UNIKERNEL_PROJECT_FAIL,
        payload: {
          showAAlert: true,
          alertText: 'unexpected error',
          error: true,
          success: false,
          projectGitUrl: '',
          loading: false,
        },
      });
    }
  };
};
