- `create-react-app my-project`  

- `npm install bootstrap --save `  # 样式 import 'bootstrap/dist/css/bootstrap.min.css'

- `npm install react-ionicons@2.1.6 --save   `  ionicon图标库在react中使用, 3.0版本中有破坏性更新

- `npm install enzyme enzyme-adapter-react-16 --save-dev`   单元测试- React测试工具

- `npm install react-router-dom --save`(web环境)  SPA单页面应用 -> 路由import { withRouter } from 'react-router-dom'

- `npm install json-server --save-dev`  (开发中的工具) 使用json-server打造mock server

  package.json:

  ```
  "mock": "json-server --watch db.json"
  ```

- `npm install axios --save`   异步请求
  

package.json:

```
  "start": "react-scripts start",
  "mock": "json-server --watch db.json --port 3004"
```

运行：`npm run mock`  // 端口3004    `npm start` // 端口3000

- `npm install concurrently --save-dev`   运行多个命令的简单脚本
  

`npm start`  同时可运行前端与mock server两个命令 (3004 mock server 与 3000前端端口 都运行了)

package.json:

  ```
  "start": "concurrently \"react-scripts start\" \"npm run mock\"",
  "mock": "json-server --watch db.json --port 3004"
  ```

- 使用create-react-app自带的proxy解决跨域问题；

  package.json:

  ```json
  "proxy": "http://localhost:3004"
  ```

- `npm install recharts --save` recharts可视化图表



（开发环境）运行：

```
npm install // 包下载
npm start  // 同时运行前端3000与mock server3004端口 两个命令
```

