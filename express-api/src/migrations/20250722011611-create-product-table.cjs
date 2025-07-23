'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        primaryKey : true,
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUID,
        allowNull : false
      },
      name : {
        type : Sequelize.STRING,
        allowNull : false
      },
      price : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      description : {
        type : Sequelize.STRING
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  }
};
