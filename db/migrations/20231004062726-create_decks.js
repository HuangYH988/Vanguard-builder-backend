"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("decks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      deck_name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "New deck",
      },
      player_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
        references: { model: "players", key: "id" },
      },
      ride_deck: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        
      },
      triggers: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        
      },
      main_deck: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        
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
    await queryInterface.dropTable("decks");
  },
};
