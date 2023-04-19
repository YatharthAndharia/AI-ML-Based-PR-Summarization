const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Commit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Commit.belongsTo(models.User,{foreignKey:"authorId"})
      Commit.belongsTo(models.Repo,{foreignKey:"repoId"})
    }
  }
  Commit.init({
    url: {type:DataTypes.STRING,allowNull:false,unique:true},
    authorId:{type:DataTypes.INTEGER,allowNull:false},
    repoId:{type:DataTypes.INTEGER,allowNull:false},
    message:{type:DataTypes.STRING,allowNull:true},
    commitDate:{type:DataTypes.DATE,allowNull:false}
  }, {
    sequelize,
    modelName: 'Commit',
  });
  return Commit;
};