module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    domain: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false },
    salt: { type: DataTypes.STRING },
    refreshToken: { type: DataTypes.STRING },
  });

  return user;
};
