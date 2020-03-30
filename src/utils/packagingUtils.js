export const getTaskName = ({ repoName, projectType }) => {
  return `${repoName.toLowerCase()}-${projectType.toLowerCase()}-task`.toUpperCase();
};
