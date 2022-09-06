module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        userName: 'demo',
        password:
          '$2a$08$c7.diWmq8sjawgFDBhynyO2DFMGFT3AYm9gYfi6BpaHMUlBqjPXzq',
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
