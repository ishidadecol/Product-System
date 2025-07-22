const { v4: uuidv4 } = require('uuid');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: uuidv4(),
        name: 'Wireless Bluetooth Headphones',
        price: 15999, // R$159.99
        description: 'High-quality wireless headphones with noise cancellation and 20 hours battery life.',
      },
      {
        id: uuidv4(),
        name: 'Smart LED Desk Lamp',
        price: 8999, 
        description: 'Adjustable brightness and color temperature, with USB charging port.',

      },
      {
        id: uuidv4(),
        name: 'Gaming Mechanical Keyboard',
        price: 24999, 
        description: 'RGB backlit keys, durable mechanical switches, and ergonomic design.',
    
      },
      {
        id: uuidv4(),
        name: 'Portable External SSD 1TB',
        price: 54999, 
        description: 'High-speed USB-C portable SSD with 1TB storage capacity and compact design.',
     
      },
      {
        id: uuidv4(),
        name: 'Wireless Charging Pad',
        price: 3999, 
        description: 'Fast wireless charging for all Qi-enabled devices with LED indicator.',
     
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
