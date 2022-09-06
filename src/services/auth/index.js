const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../../../database/models');
const { VerifySignup } = require('../../middlewares/index.js');

class Auth {
  static async login(req) {
    const { userName, password } = req.body;
    const user = await models.User.findOne({
      where: { userName }
    });

    if (!user) return false;
    if (await bcrypt.compare(password, user.password)) {
      return jwt.sign(userName, process.env.JWT_SECRET);
    }
    return false;
  }

  static async signup(req) {
    const res = await VerifySignup.checkDuplicateUserName(req.body.userName);
    if (res) {
      return false;
    }

    const usr = models.User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    return usr;
  }
}

module.exports = { Auth };
