const debug = require('debug');


module.exports = {
  log: (msg) => {
    debug('src:log')(msg);
  },
  err: (msg) => {
    debug('src:err')(msg);
  }
};