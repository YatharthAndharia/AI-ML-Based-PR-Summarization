const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PR extends Model {
    static associate(models) {
      PR.belongsTo(models.Repo, { foreignKey: 'repoId' });
      PR.belongsTo(models.User, { foreignKey: 'user' });
    }
  }
  PR.init(
    {
      url: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      diff_url: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.INTEGER, allowNull: false },
      raw_data: { type: DataTypes.JSON, allowNull: true },
      head: { type: DataTypes.JSON, allowNull: true },
      base: { type: DataTypes.JSON, allowNull: true },
      state: { type: DataTypes.STRING, allowNull: false },
      repoId: { type: DataTypes.INTEGER, allowNull: false },
      user: { type: DataTypes.INTEGER, allowNull: true },
      autoComment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'PR'
    }
  );
  return PR;
};
