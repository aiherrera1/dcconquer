const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlayersInMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'player_id',
        as: 'players',
      });
      this.belongsTo(models.Match, {
        foreignKey: 'id',
        as: 'matches',
      });
      // define association here
      // belongs to a match
      // belongs to a player
    }
  }
  PlayersInMatch.init(
    {
      match_id: DataTypes.INTEGER,
      player_id: DataTypes.INTEGER,
      wall_cards: DataTypes.INTEGER,
      ship_cards: DataTypes.INTEGER,
      dice_cards: DataTypes.INTEGER,
      turn: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'PlayersInMatch',
    },
  );
  return PlayersInMatch;
};
