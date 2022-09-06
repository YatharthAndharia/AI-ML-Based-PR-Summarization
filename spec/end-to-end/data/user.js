const bcrypt = require('bcryptjs');

const signUpData = () => ({
  userName: 'demo1',
  email: 'demo1@demo.com',
  password: bcrypt.hashSync('demo1', 8)
});

module.exports = {
  signUpData
};
