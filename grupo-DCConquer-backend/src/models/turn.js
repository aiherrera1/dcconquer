const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Turn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongs to a match
      this.belongsTo(models.Match, {
        foreignKey: 'match_id',
        as: 'match',
      });
      // belongs to a player
    }
  }
  Turn.init(
    {
      match_id: DataTypes.INTEGER,
      player_turn: DataTypes.INTEGER,
      current_turn: DataTypes.INTEGER,
      card: DataTypes.BOOLEAN,
      dices: DataTypes.STRING,
      threw_first: DataTypes.BOOLEAN,
      threw_second: DataTypes.BOOLEAN,
      dice_card: DataTypes.BOOLEAN,
      from: DataTypes.INTEGER,
      to: DataTypes.INTEGER,
      from_warriors: DataTypes.INTEGER,
      attacked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Turn',
    },
  );
  return Turn;
};
