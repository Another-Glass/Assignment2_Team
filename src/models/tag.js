module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    size: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  });

  tag.associate = models => {
    tag.belongsToMany(models.menu, {
      through: 'menu_tag',
      as: 'menuTag',
    });
  };

  return tag;
};
