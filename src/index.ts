import * as core from '@actions/core';
import { context as githubContext, getOctokit } from '@actions/github';

// @Utils
import {
  createPRComment,
  getChangedFiles,
  getPullRequestDiff,
  parseDiff,
  updatePRDescription,
} from './utils';
export const addChangedFiles = async () => {
  try {
    // get the inputs from the action
    const token = core.getInput('token', { required: true });
    const addAsPRComment = core.getInput('pr-comment');

    if (
      githubContext.eventName !== 'pull_request' ||
      !githubContext.payload.pull_request
    ) {
      core.info('This function can only run on pull requests!');
      return;
    }

    // pr number and repo name
    const repoName = githubContext.repo.repo;
    const owner = githubContext.repo.owner;
    const { number: prNumber, body: existingDescription } =
      githubContext.payload.pull_request;

    // set up oktokit
    const oktokit = getOctokit(token);

    // changed files
    const diff = await getPullRequestDiff({
      oktokit,
      owner,
      repoName,
      prNumber,
    });
    const changedFiles = parseDiff(diff.data as unknown as string);

    // description
    const updatedDescription = `## 🖍️ Files changed:\n${getChangedFiles(
      changedFiles,
    )}`;

    if (addAsPRComment === 'true') {
      // create a comment
      await createPRComment(
        { oktokit, owner, repoName, prNumber },
        updatedDescription,
      );
      console.log('PR comment has been added');
    } else {
      // update the pr itself
      await updatePRDescription(
        { oktokit, owner, repoName, prNumber },
        `${
          existingDescription ? existingDescription : ''
        }\n\n${updatedDescription}`,
      );
      console.log('PR description has been updated');
    }
  } catch (error) {
    core.setFailed(`An error occurred: ${error}`);
  }
};

addChangedFiles();
