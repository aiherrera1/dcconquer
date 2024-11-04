const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Match, {
        foreignKey: 'game_id',
        as: 'match',
      });
      // has many players
    }
  }
  Game.init(
    {
      host_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      min_players: DataTypes.INTEGER,
      max_players: DataTypes.INTEGER,
      starting_cards: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      winner_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Game',
    },
  );
  return Game;
};
