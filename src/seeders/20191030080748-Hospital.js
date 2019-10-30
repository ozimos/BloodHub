'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Hospitals', [{
    name: "St Charles Hospital",
    street: "3 oshinkalu nbsp close off randle avenue",
    lg: "surulere",
    state: "Lagos"
  },
  {
    name: "Citizen Medical Centre",
    street: "86 Norman Williams Street, Ikoyi",
    lg: "obalende",
    state: "Lagos"
  },
  {
    name: "Family health Hospital",
    street: "9 Akobi Crescent Off Ishaga Road, Surulere",
    lg: "surulere",
    state: "Lagos"
  },
  {
    name: "First Consultants Medical Centre",
    street: "6/24 Ikoyi Road, Ikoyi, Obalende",
    lg: "obalende",
    state: "Lagos"
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Hospitals', null, {})
};
