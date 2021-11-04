const mongoose = require('mongoose');
const configs = require('../configs');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const connectDB = async () => {
  try {
    await mongoose.connect(configs.db.dbURL, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    });

    logger.log("Mongoose Connected ...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}


modules = {};
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    modules[file.replace('.js', '')] = require(path.join(__dirname, file));
  });


connectDB();

module.exports = modules;