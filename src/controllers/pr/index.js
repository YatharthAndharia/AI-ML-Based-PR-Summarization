const { PR } = require('../../infrastructure/repositories/pr-dao');
const { createPR, addComment } = require('../../services/pr');
const { MESSAGES } = require('../../utils/constant');

const prListener = async (req, res) => {
  const prData = req.body.pull_request;
  if (prData) {
    await createPR({ prData });
    await addComment({ prData });
    res.sendStatus(200);
  }
};
const getPrStats = async (req, res) => {
  try {
    const totalPRs = await PR.count({ where: { user: req.user.id } });
    const totalOpenPRs = await PR.count({
      where: { user: req.user.id, state: 'open' }
    });
    return res.success(MESSAGES.SUCCESS, { totalPRs, totalOpenPRs });
  } catch (error) {
    return res.error(error);
  }
};
module.exports = { prListener, getPrStats };
