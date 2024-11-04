const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongs to many territories (2)
      //   belongs to a match
      this.belongsTo(models.Match, {
        foreignKey: 'match_id',
        as: 'match',
      });
      this.hasOne(models.Territory, {
        foreignKey: 'id',
        as: 'territories',
      });
    }
  }
  Wall.init(
    {
      match_id: DataTypes.INTEGER,
      player_turn: DataTypes.INTEGER,
      territory_id: DataTypes.INTEGER,
      side: DataTypes.INTEGER,
      territory_side_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Wall',
    },
  );
  return Wall;
};
