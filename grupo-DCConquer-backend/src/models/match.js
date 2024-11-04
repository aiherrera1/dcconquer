const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, {
        foreignKey: 'game_id',
        as: 'game',
      });
      this.hasMany(models.Territory, {
        foreignKey: 'match_id',
        as: 'territories',
      });
      this.hasMany(models.Request, {
        foreignKey: 'match_id',
        as: 'requests',
      });

      this.hasMany(models.PlayersInMatch, {
        foreignKey: 'match_id',
        as: 'playersInMatch',
      });

      this.belongsToMany(models.Player, {
        through: models.PlayersInMatch,
        foreignKey: 'match_id',
        as: 'players',
      });

      this.hasMany(models.Wall, {
        foreignKey: 'match_id',
        as: 'walls',
      });
    }
  }
  Match.init(
    {
      game_id: DataTypes.INTEGER,
      n_players: DataTypes.INTEGER,
      current_turn: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Match',
    },
  );
  return Match;
};
