"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cards", [
      {
        card_number: "BT16-094",
        card_name: "Cheer Girl, Adalaide",
        image_link:
          "https://static.wikia.nocookie.net/cardfight/images/9/93/BT16-094-C_%28Sample%29.png/",
        nation: "Dark Zone",
        card_type: "Unit",
        grade: 0,
        power: 5000,
        shield: 10000,
        trigger: "Heal",
        is_sentinel: false,
        effect: null,
        card_advantage: null,
        counter_blast: null,
        counter_charge: null,
        soul_blast: null,
        soul_charge: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cards");
  },
};
