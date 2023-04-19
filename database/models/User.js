const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Repo,{
        foreignKey:'repo_owner'
      })
      User.hasMany(models.Commit,{
        foreignKey:'authorId'
      })
    }
  }
  User.init(
    {
      userName: {type:DataTypes.STRING,allowNull:true,unique:true},
      email: {type:DataTypes.STRING,allowNull:true},
      bio:{type:DataTypes.STRING,allowNull:true},
      blog:{type:DataTypes.STRING,allowNull:true},
      created_at:{type:DataTypes.DATE,allowNull:true},
      event_url:{type:DataTypes.STRING,allowNull:true},
      followers:{type:DataTypes.INTEGER,allowNull:true},
      followers_url:{type:DataTypes.STRING,allowNull:true},
      following:{type:DataTypes.INTEGER,allowNull:true},
      following_url:{type:DataTypes.STRING,allowNull:true},
      avatar_url:{type:DataTypes.STRING,allowNull:true},
      name:{type:DataTypes.STRING,allowNull:true},
      public_repos:{type:DataTypes.INTEGER,allowNull:true},
      repos_url:{type:DataTypes.STRING,allowNull:true},
      starred_url:{type:DataTypes.STRING,allowNull:true},
      subcriptions_url:{type:DataTypes.STRING,allowNull:true},
      twitter_username:{type:DataTypes.STRING,allowNull:true},
      access_token:{type:DataTypes.STRING,allowNull:true}
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
