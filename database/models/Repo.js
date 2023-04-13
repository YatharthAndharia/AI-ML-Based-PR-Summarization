const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Repo extends Model {
    static associate(models) {
      Repo.hasMany(models.PR,{foreignKey:'repoId'})
        Repo.belongsTo(models.User,{foreignKey:'repo_owner'})
    }
  }
  Repo.init(
    {
      name:{type:DataTypes.STRING,allowNull:false},
      created_at:{type:DataTypes.DATE,allowNull:false},
      default_branch:{type:DataTypes.STRING,allowNull:true},
      description:{type:DataTypes.STRING,allowNull:true},
      raw_data:{type:DataTypes.JSON,allowNull:true},
      repo_owner:{type:DataTypes.INTEGER,allowNull:false}
    },
    {
      sequelize,
      modelName: 'Repo'
    }
  );
  return Repo;
};