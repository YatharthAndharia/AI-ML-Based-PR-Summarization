/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PRs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url:{type:Sequelize.STRING,allowNull:false},
      created_at:{type:Sequelize.DATE,allowNull:false},
      diff_url:{type:Sequelize.STRING,allowNull:false},
      number:{type:Sequelize.INTEGER,allowNull:false},
      raw_data:{type:Sequelize.JSON,allowNull:true},
      head:{type:Sequelize.JSON,allowNull:true},
      base:{type:Sequelize.JSON,allowNull:true},
      state:{type:Sequelize.STRING,allowNull:false},
      repoId:{type:Sequelize.INTEGER,allowNull:false},
      user:{type:Sequelize.JSON,allowNull:true},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('PRs', {
      type: 'foreign key',
      name: 'fk_repos_id_prs_repoId',
      fields: ['repoId'],
      references: {
        table: 'Repos',
        field: 'id'
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('PRs');
  }
};