const { Octokit } = require('octokit');
const { default: fetch } = require('node-fetch');
const { PR } = require('../../infrastructure/repositories/pr-dao');
const { generateComment } = require('../openai');
const { User } = require('../../infrastructure/repositories/user-dao');
const { STATUS_CODES } = require('../../utils/constant');

const createWebHook = async ({ owner, repo, accessToken }) => {
  try {
    const octokit = new Octokit({
      auth: accessToken
    });
    await octokit.request(`POST /repos/${owner}/${repo}/hooks`, {
      owner: 'OWNER',
      repo: 'REPO',
      name: 'web',
      active: true,
      events: ['pull_request'],
      config: {
        url: 'https://hkdk.events/dnSQAce0fwJx',
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

const createPR = async ({ prData }) => {
  const isExist = await PR.get({ where: { id: prData.id } });
  if (!isExist) {
    await PR.create({
      data: {
        ...prData,
        user: prData.user.id,
        raw_data: prData,
        repoId: prData.head.repo.id
      }
    });
  } else {
    await PR.update({
      data: { state: prData.state },
      where: { id: prData.id }
    });
  }
};

const addComment = async ({ prData }) => {
  const pr = await PR.get({ where: { id: prData.id } });
  if (prData.state === 'open' && pr.dataValues.autoComment) {
    const user = await User.get({ where: { userName: prData.user.login } });
    const diffResponse = await fetch(prData.diff_url);
    const diffContent = await diffResponse.text();
    const commentData = await generateComment({ diffContent });
    const octokit = new Octokit({
      auth: user.dataValues.access_token
    });
    await octokit.request(
      `POST /repos/${prData.user.login}/${prData.head.repo.name}/issues/${prData.number}/comments`,
      {
        body: commentData
      }
    );
  }
};
module.exports = { createWebHook, createPR, addComment };
