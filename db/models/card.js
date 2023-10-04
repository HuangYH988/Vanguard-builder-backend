const { Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {}
  Card.init(
    {
      card_number: DataTypes.STRING,
      card_name: DataTypes.STRING,
      image_link: DataTypes.STRING,
      nation: DataTypes.STRING,
      card_type: DataTypes.STRING,
      grade: DataTypes.INTEGER,
      power: DataTypes.INTEGER,
      shield: DataTypes.INTEGER,
      trigger: DataTypes.STRING,
      is_sentinel: DataTypes.BOOLEAN,
      effect: DataTypes.STRING,
      card_advantage: DataTypes.INTEGER,
      counter_blast: DataTypes.INTEGER,
      counter_charge: DataTypes.INTEGER,
      soul_blast: DataTypes.INTEGER,
      soul_charge: DataTypes.INTEGER,
    },
    { sequelize, modelName: "cards" }
  );
};
