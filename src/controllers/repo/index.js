const { default: fetch } = require('node-fetch');
const { MESSAGES } = require('../../utils/constant.js');
const { Repo } = require('../../infrastructure/repositories/repo-dao.js');
const { createWebHook } = require('../../services/pr/index.js');
const { User } = require('../../infrastructure/repositories/user-dao.js');

const getRepos = async (req, res) => {
  try {
    const repos = await Repo.getAll({ where: { repo_owner: req.user.id } });
    return res.success(MESSAGES.SUCCESS, repos);
  } catch (error) {
    console.log(error);
    return res.error(error);
  }
};

const getRepoStats = async (req, res) => {
  const repoStats = await Repo.count({ where: { repo_owner: req.user.id } });
  return res.success(MESSAGES.SUCCESS, repoStats);
};

const handleRepoCommenting = async (req, res) => {
  try {
    const repo = await Repo.get({ where: { id: req.headers.repoid } });
    await Repo.update({
      data: { autoComment: !repo.dataValues.autoComment },
      where: { id: req.headers.repoid }
    });
    return res.success(MESSAGES.SUCCESS);
  } catch (error) {
    return res.error(error);
  }
};

const createHook = async (req, res) => {
  try {
    const repo = await Repo.get({ where: { id: req.headers.repoid } });
    const user = await User.get({ where: { id: repo.dataValues.repo_owner } });
    const response = await createWebHook({
      owner: req.user.userName,
      repo: repo.dataValues.name,
      accessToken: user.dataValues.access_token
    });
    if (response.status === 200) {
      await Repo.update({
        data: { isHookExists: true },
        where: { id: req.headers.repoid }
      });
      return res.success(MESSAGES.SUCCESS);
    }
    return res.alreadyExists(MESSAGES.ALREADY_EXIST);
  } catch (error) {
    return res.error(error);
  }
};
module.exports = { getRepos, getRepoStats, createHook, handleRepoCommenting };
