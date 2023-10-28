"use strict";/** @type {import('sequelize-cli').Migration} */

const bcryptjs = require('bcryptjs');
module.exports = {
  up: async (queryInterface) =>  queryInterface.bulkInsert(

    'users',
      [
        {
          nome: 'Matheus 1',
          email: 'matheuslevi1@gmail.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Matheus 2',
          email: 'matheuslevi2@gmail.com',
          password_hash: await bcryptjs.hash('654321', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Matheus 3',
          email: 'matheuslevi3@gmail.com',
          password_hash: await bcryptjs.hash('1231456', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
      ], {}
  ),

  down: () => {

  }
};
