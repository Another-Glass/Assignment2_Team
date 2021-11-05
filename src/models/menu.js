module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    category: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    isSold: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    badge: { type: DataTypes.STRING },
  });

  menu.associate = models => {
    menu.belongsToMany(models.tag, {
      through: 'menu_tag',
      as: 'menuTag',
    });

    menu.hasMany(models.item);
  };

  return menu;
};
