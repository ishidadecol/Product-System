const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        email: 'admin@b4you.dev',
        password: hashedPassword
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'admin@b4you.dev' }, {});
  }
};
