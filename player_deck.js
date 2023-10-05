'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class player_decks extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  player_decks.init(
    {
      // Define columns of the task_user table here
      player_id: DataTypes.INTEGER,
      deck_id: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      modelName: 'player_decks',
      tableName: 'player_decks',
      underscored: false,
      
      freezeTableName: true // Prevent Sequelize from pluralizing table name
    }
  );

  return player_decks;
};