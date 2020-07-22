### 技术栈

| what                   | way                                                          |
| ---------------------- | :----------------------------------------------------------- |
| React                  | 创建组件(create-react-app)                                   |
| styled-components      | 模块化 CSS  (css-in-js)                                      |
| react-transition-group | 动态改变 class 属性值实现 react 动画                         |
| Redux                  | 管理数据                                                     |
| react-redux            | 在react中使用redux                                           |
| redux-thunk            | 为redux的中间件，在action与store之间，是对dispatch方法的升级；让store有能力接收函数，用来做异步数据获取与复杂逻辑 |
| immutable.js           | 保证 redux 的 state 不被修改                                 |
| react-router-dom       | react路由管理                                                |
| react-loadable         | 实现异步组件。访问首页时，只加载首页代码；当访问详情页时，再去加载详情页的代码，而不是所有代码都打包在一起 |

### 运行本项目

```js
npm install
npm start
```

注： 所有的mock数据放在puclic/api

