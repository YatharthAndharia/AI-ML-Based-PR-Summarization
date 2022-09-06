const { Auth: AuthService } = require('../../services/index.js');

class Auth {
  static async signup(req, res) {
    const usr = await AuthService.signup(req);
    if (!usr) res.status(409).json({ msg: 'User Already Exists' });
    else res.status(200).json({ user: usr });
  }

  static async login(req, res) {
    const token = await AuthService.login(req);
    if (token) {
      res.status(200).json({ msg: token });
    } else res.status(401).json({ msg: 'Invalid Credentials' });
  }
}
module.exports = { Auth };
