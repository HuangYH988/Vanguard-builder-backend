const { Model, DataTypes } = require("sequelize");

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
      effect: DataTypes.TEXT,
      card_advantage: DataTypes.INTEGER,
      counter_blast: DataTypes.BOOLEAN,
      counter_charge: DataTypes.BOOLEAN,
      soul_blast: DataTypes.BOOLEAN,
      soul_charge: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "cards",
      underscored: true,
      freezeTableName: true,
    }
  );
  return Card;
};
