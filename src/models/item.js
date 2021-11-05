module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    isSold: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  });

  item.associate = models => {
    item.belongsToMany(models.menu, {
      through: 'menu_item',
      as: 'menuItem',
    });
  };

  return item;
};
