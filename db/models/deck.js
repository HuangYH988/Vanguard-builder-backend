const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    static associate(models) {
      this.belongsTo(models.players, { foreignKey: "player_id" });
    }
  }
  Deck.init(
    {
      deck_name: DataTypes.STRING,
      player_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "players",
          key: "id",
        },
      },
      ride_deck: DataTypes.ARRAY(DataTypes.INTEGER),
      triggers: DataTypes.ARRAY(DataTypes.INTEGER),
      main_deck: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    { sequelize, modelName: "decks", underscored: true, freezeTableName: true }
  );
  return Deck;
};
