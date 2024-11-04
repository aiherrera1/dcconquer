const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Territory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongs to a match
      // has many walls (6)
      this.belongsTo(models.Player, {
        foreignKey: 'player_id',
        as: 'territories',
      });
    }
  }
  Territory.init(
    {
      match_id: DataTypes.INTEGER,
      player_id: DataTypes.INTEGER,
      position_id: DataTypes.INTEGER,
      warriors: DataTypes.INTEGER,
      ship_level: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Territory',
    },
  );
  return Territory;
};
