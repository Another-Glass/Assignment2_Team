const Sequelize = require('sequelize');
const configs = require('../configs');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const sequelize = new Sequelize(
  configs.db.dbDATABASE,
  configs.db.dbUSERNAME,
  configs.db.dbPASSWORD,
  {
    host: configs.db.dbHOSTNAME,
    port: configs.db.dbPORT,
    dialect: 'mysql',
  },
);

const modules = {};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    modules[file.replace('.js', '')] = require(path.join(__dirname, file));
  });
Object.keys(modules).forEach(modelName => {
  if (modules[modelName].associate) {
    modules[modelName].associate(modules);
  }
});

modules.sequelize = sequelize;
modules.Sequelize = Sequelize;

// const connectDB = async () => {
//   try {
//     await modules.sequelize.authenticate();
//     await modules.sequelize.sync({ alter: true });
//     logger.log('MySQL connected ...');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

modules.sequelize
  .authenticate()
  .then(() => {
    modules.sequelize
      .sync()
      .then(() => {
        logger.log('MySQL connected ...');
      })
      .catch(err => {
        console.error(err.message);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });

// (async () => {
//   await connectDB();
// })();

module.exports = modules;
