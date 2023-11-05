// @Types
import { PRDetails } from './pr.types';

// parse the diff string and get back an array of files
export const parseDiff = (diff: string) => {
  const lines = diff.split('\n');
  const files = lines
    .filter((line) => line.startsWith('+++ b/'))
    .map((line) => line.replace('+++ b/', ''));
  return files;
};

// get the diff from the pull request
export const getPullRequestDiff = async (prDetails: PRDetails) => {
  const { oktokit, owner, repoName, prNumber } = prDetails;
  return oktokit.rest.pulls.get({
    owner,
    repo: repoName,
    pull_number: prNumber,
    mediaType: {
      format: 'diff',
    },
  });
};

// create comment
export const createPRComment = async (prDetails: PRDetails, body: string) => {
  const { oktokit, owner, repoName, prNumber } = prDetails;
  await oktokit.rest.issues.createComment({
    owner,
    repo: repoName,
    issue_number: prNumber,
    body,
  });
};

// update the pr description
export const updatePRDescription = async (
  prDetails: PRDetails,
  body: string,
) => {
  const { oktokit, owner, repoName, prNumber } = prDetails;
  await oktokit.rest.pulls.update({
    owner,
    repo: repoName,
    pull_number: prNumber,
    body,
  });
};

// get changed files
export const getChangedFiles = (files: string[]) => {
  return files.map((file) => `* ${file}`).join('\n');
};
