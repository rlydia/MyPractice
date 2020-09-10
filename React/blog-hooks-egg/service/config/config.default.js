/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1596965682625_3113';

  // add your middleware config here
  config.middleware = [
    // 'adminAuth'
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '123456',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.security = {
    csrf: {enable: false},
    domainWhiteList: [ 'http://localhost:9000', 'http://localhost:3000' ]
  };
  config.cors = {
    // origin: 'http://localhost:9000', //只允许这个域进行访问接口
    credentials: true,   // 允许cookie可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  
  // config.session={
  //   key:'SESSION_ID',
  //   maxAge:864000,
  //   httpOnly: true,
  //   encrypt: true,
  //   renew: true //延长会话有效期
  // }

  return {
    ...config,
    ...userConfig,
  };
};


