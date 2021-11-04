const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  dbURL: process.env.DB_URL
};
