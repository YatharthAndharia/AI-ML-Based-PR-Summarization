module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        userName: 'demo',
        email: 'adt@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
