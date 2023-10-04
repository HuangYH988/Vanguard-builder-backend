

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("deck_cards", {
      deck_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "decks",
          key: "id",
        },
      },
      card_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "cards",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add a composite primary key on deck_id and card_id
    await queryInterface.addConstraint("deck_cards", {
      type: "primary key",
      fields: ["deck_id", "card_id"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("deck_cards");
  },
};

