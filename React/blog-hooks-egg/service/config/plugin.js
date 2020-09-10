'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  
// };

// 配置插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}

exports.cors = {
  enable: true,
  package: 'egg-cors'
}

exports.session = {
  key: 'EGG_SESS',
  maxAge: 24 * 3600 * 1000, // 1 天
  httpOnly: true,
  encrypt: true,
};