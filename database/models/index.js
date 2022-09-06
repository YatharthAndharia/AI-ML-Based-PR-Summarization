const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  dialect: 'postgres'
});
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
