const models = require('../../../database/models');

class VerifySignup {
  static async checkDuplicateUserName(userName) {
    const user = await models.User.findOne({
      where: { userName }
    });

    if (user) {
      return true;
    }
    return false;
  }
}

module.exports = { VerifySignup };
