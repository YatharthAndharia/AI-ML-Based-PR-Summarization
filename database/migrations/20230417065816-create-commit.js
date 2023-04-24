/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Commits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {type:Sequelize.STRING,allowNull:false,unique:true},
      userId:{type:Sequelize.INTEGER,allowNull:false},
    repoId:{type:Sequelize.INTEGER,allowNull:false},
    message:{type:Sequelize.STRING,allowNull:true},
    commitDate:{type:Sequelize.DATE,allowNull:false},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Commits', {
      type: 'foreign key',
      name: 'fk_users_id_commits_userId',
      fields: ['userId'],
      references: {
        table: 'Users',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('Commits', {
      type: 'foreign key',
      name: 'fk_repos_id_commits_repoId',
      fields: ['repoId'],
      references: {
        table: 'Repos',
        field: 'id'
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Commits');
  }
};