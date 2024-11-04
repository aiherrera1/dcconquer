const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   has many walls
      //   has many territories
      this.hasMany(models.Territory, {
        foreignKey: 'player_id',
        as: 'territories',
      });
      this.belongsToMany(models.Match, {
        through: models.PlayersInMatch,
        foreignKey: 'player_id',
        as: 'matches',
      });
      this.hasMany(models.PlayersInMatch, {
        foreignKey: 'match_id',
        as: 'playersInMatch',
      });
      this.hasMany(models.Session, {
        foreignKey: 'id',
      });
      this.hasMany(models.Request, {
        foreignKey: 'player_id',
        as: 'requests',
      });
      this.belongsTo(models.Admin, {
        foreignKey: 'id',
        as: 'admin',
      });
    }
  }
  Player.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Player',
    },
  );
  return Player;
};
