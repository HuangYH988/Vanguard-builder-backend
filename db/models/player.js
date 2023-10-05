const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      this.hasMany(models.decks);
    }
  }
  Player.init(
    {
      player_name: DataTypes.STRING,
      player_email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "players",
      underscored: true,
      freezeTableName: true,
    }
  );
  return Player;
};
