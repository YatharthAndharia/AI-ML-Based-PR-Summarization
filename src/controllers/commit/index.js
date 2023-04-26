const { Commit } = require('../../infrastructure/repositories/commit-dao');
const { MESSAGES } = require('../../utils/constant');

const listenCommit = async (req, res, next) => {
  try {
    if (req.body.commits) {
      await Commit.create({
        data: {
          url: req.body.commits[0].url,
          userId: req.body.sender.id,
          repoId: req.body.repository.id,
          message: req.body.commits[0].message,
          commitDate: req.body.commits[0].timestamp
        }
      });
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
  }
};
const getCommitData = async (req, res, next) => {
  try {
    const commitData = [];
    const startDate = new Date(req.headers.startdate.slice(0, 10));
    const endDate = new Date(req.headers.enddate.slice(0, 10));
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // eslint-disable-next-line no-await-in-loop
      const count = await Commit.countOnDate({
        where: { commitDate: currentDate, userId: req.user.id }
      });
      commitData.push({
        commitCount: count,
        commitDate: currentDate.toISOString()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return res.success(MESSAGES.SUCCESS, commitData);
  } catch (error) {
    return res.error(error);
  }
};
module.exports = { listenCommit, getCommitData };
