"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      card_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      card_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image_link: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      card_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      grade: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      power: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      shield: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      trigger: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      is_sentinel: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      effect: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      card_advantage: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      counter_blast: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      counter_charge: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      soul_blast: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      soul_charge: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cards');
  },
};
