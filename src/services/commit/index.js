const { Octokit } = require('octokit');
const { Commit } = require('../../infrastructure/repositories/commit-dao');
const { STATUS_CODES } = require('../../utils/constant');

const createCommit = async ({ accessToken, owner, repo, repoId, userId }) => {
  const octokit = new Octokit({
    auth: accessToken
  });
  const commits = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  for (let i = 0; i < commits.data.length; i += 1) {
    Commit.create({
      data: {
        url: commits.data[i].url,
        userId,
        repoId,
        message: commits.data[i].commit.message,
        commitDate: commits.data[i].commit.author.date
      }
    });
  }
};
const createCommitWebHook = async ({ owner, repo, accessToken }) => {
  try {
    const octokit = new Octokit({
      auth: accessToken
    });
    await octokit.request(`POST /repos/${owner}/${repo}/hooks`, {
      owner: 'OWNER',
      repo: 'REPO',
      name: 'web',
      active: true,
      events: ['push'],
      config: {
        url: 'https://hkdk.events/Gb4A9XXcmCWo',
        content_type: 'json',
        insecure_ssl: '0'
      },
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return { status: STATUS_CODES.SUCCESS };
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports = { createCommit, createCommitWebHook };
