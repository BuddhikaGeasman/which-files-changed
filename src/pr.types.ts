import { Octokit } from '@octokit/core';
import { Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types';

export type PRDetails = {
  oktokit: Octokit & Api;
  owner: string;
  repoName: string;
  prNumber: number;
};
