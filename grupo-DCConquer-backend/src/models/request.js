const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'player_id',
        as: 'player',
      });
      this.belongsTo(models.Match, {
        foreignKey: 'match_id',
        as: 'match',
      });
    }
  }
  Request.init(
    {
      match_id: DataTypes.INTEGER,
      player_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Request',
    },
  );
  return Request;
};
