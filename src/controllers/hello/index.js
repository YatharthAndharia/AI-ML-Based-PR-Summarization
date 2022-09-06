const { Hello } = require('../../services/index.js');

class HelloController {
  static hello(req, res) {
    res.json({
      message: Hello.sayHello()
    });
  }
}

module.exports = { HelloController };
