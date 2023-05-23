/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Repos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      default_branch: { type: Sequelize.STRING, allowNull: true },
      description: { type: Sequelize.STRING, allowNull: true },
      raw_data: { type: Sequelize.JSON, allowNull: true },
      repo_owner: { type: Sequelize.INTEGER, allowNull: false },
      isHookExists: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Repos', {
      type: 'foreign key',
      name: 'fk_users_id_repos_repo_owner',
      fields: ['repo_owner'],
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Repos');
  }
};
