module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      bio:{type:Sequelize.STRING,allowNull:true},
      blog:{type:Sequelize.STRING,allowNull:true},
      created_at:{type:Sequelize.DATE,allowNull:true},
      event_url:{type:Sequelize.STRING,allowNull:true},
      followers:{type:Sequelize.INTEGER,allowNull:true},
      followers_url:{type:Sequelize.STRING,allowNull:true},
      following:{type:Sequelize.INTEGER,allowNull:true},
      following_url:{type:Sequelize.STRING,allowNull:true},
      avatar_url:{type:Sequelize.STRING,allowNull:true},
      name:{type:Sequelize.STRING,allowNull:true},
      public_repos:{type:Sequelize.INTEGER,allowNull:true},
      repos_url:{type:Sequelize.STRING,allowNull:true},
      starred_url:{type:Sequelize.STRING,allowNull:true},
      subcriptions_url:{type:Sequelize.STRING,allowNull:true},
      twitter_username:{type:Sequelize.STRING,allowNull:true},
      access_token:{type:Sequelize.STRING,allowNull:true},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};
