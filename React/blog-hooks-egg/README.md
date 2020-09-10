#  效果图

前台首页：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/420158/1599747465607-78048365-7521-48f7-9302-71bb11895027.png)

前台list筛选类别：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/420158/1599747485523-b6117b8a-78b1-4231-b9f5-1dcecdfc7efb.png)

前台文章详情页：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/420158/1599747511049-f43d69f8-bb1c-4cc4-a7b2-61313932c2e7.png)

后台登录页面：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/420158/1599747545860-072bdb6f-b31e-4b98-b796-3b6715df97d3.png)

后台首页/工作台：(添加文章)

![image.png](https://cdn.nlark.com/yuque/0/2020/png/420158/1599747576738-8f9a552a-80bd-4cae-ac1d-16fdb847ef0d.png)

文章列表:

![image.png](https://cdn.nlark.com/yuque/0/2020/png/420158/1599747618061-e48c5cf6-f607-45a4-bdfe-92fb925d2891.png)



# 技术栈

- 前台选用`Next.js`框架配合react进行服务端渲染，更利于SEO
- 后台管理系统不使用服务端渲染，而是直接使用hooks+antd来做单页应用；
- 为减少CSS和各种组件的重复开发，选用阿里的`Ant Desgin`来作为UI交互库

- 后端采用node的express框架 + mysql数据库作为数据支撑



前台：

| what                    | way                                                |
| ----------------------- | -------------------------------------------------- |
| create-next-app         | 用Next做服务端渲染，创建组件(create-next-app)      |
| @zeit/next-css          | 让Next.js可以加载CSS文件，需配置next.config.js文件 |
| antd                    | 使用Ant Desgin来写UI部分                           |
| babel-plugin-import     | 配置.babelrc文件，按需载入antd                     |
| @ant-design/icons       | 博客公共头部的icon                                 |
| marked                  | 使用marked+highlight.js方案来做markdown解析        |
| highlight               | 使用marked+highlight.js方案来做markdown解析        |
| markdown-navbar         | markdown文章导航                                   |
| lodash 与 @types/lodash | tocify.tsx文件配合使用，以制作文章导航             |
| axios                   | 从数据接口获得数据                                 |

数据中台(后端):

| what      | way                       |
| --------- | ------------------------- |
| egg-init  | egg.js的脚手架工具        |
| egg-mysql | 在egg.js中使用mysql数据库 |
| egg-cors  | 解决egg.js跨域问题        |

后台:

| what             | way                                         |
| ---------------- | ------------------------------------------- |
| create-react-app | 创建组件                                    |
| antd             | 使用Ant Desgin来写UI部分                    |
| react-router-dom | 前端路由, spa单页应用                       |
| marked           | 使用marked+highlight.js方案来做markdown解析 |
| highlight        | 使用marked+highlight.js方案来做markdown解析 |

# 项目结构

```
blog
├─ .babelrc           // 配置文件(增加antd插件,让其按需引入)
├─ README.md
├─ next.config.js     // next总配置文件
├─ package.json
├─ components         // 展示型组件文件夹
│    ├─ Advert.js  
│    ├─ Author.js
│    ├─ Footer.js
│    ├─ Header.js
│    └─ tocify.tsx
├─ config             // 统一的接口管理文件
│    └─ apiUrl.js
├─ pages
│    ├─ _app.js         // 项目输出文件(将antd等CSS样式全局引入)
│    ├─ detailed.js		// 博客详情页
│    ├─ index.js		// 博客主体页面-左:Antd List组件, 右: Author与Advert组件
│    └─ list.js			// 博客列表页 - antd的menu是单页应用
└─ static               //静态资源托管文件夹
     └─ style
          ├─ components   // components样式文件夹
          └─ pages    // pages样式文件夹
```

```js
service
├─ app
│    ├─ controller
│    │    ├─ admin
│    │    └─ default
│    ├─ middleware
│    │    └─ admin_auth.js
│    ├─ router
│    │    ├─ admin.js
│    │    └─ default.js   // 配置路由
│    └─ router.js
└─ config
       ├─ config.default.js
       └─ plugin.js
```

```
admin
└─ src
       ├─ App.js
       ├─ config
       │    └─ apiUrl.js  // 统一的接口管理文件
       ├─ index.js
       ├─ pages
       │    ├─ AddArticle.js
       │    ├─ AdminIndex.js
       │    ├─ ArticleList.js
       │    ├─ Login.js 
       │    └─ Main.js    // 配置路由
       └─ static
              └─ css
```

后台：添加文章、删除文章、修改文章



# 要点

## 解析Markdown语法

- 使用marked+highlight.js方案来做markdown解析  

- markdown-navbar  文章导航制作

  - tocify.tsx文件简介

  - 使用这个文件的两个必要条件：使用ant design、安装lodash模块

- 使用tocify.tsx生成文章目录

- 在`/blog/pages/detailed.js`引入

## egg 与 RESTful API

**数据中台 egg.js:**

- 采用Koa的上层框架egg.js，所谓上层框架就是在Koa的基础上，封装的框架。
- 由阿里开源的面向企业级开发的Node.js服务端框架，目的就是帮助团队和开发人员降低开发和维护成本，简化开发流程。

**RESTful API 设计简介和路由配置**

所有数据的获得和业务逻辑的操作都是通过中台实现的，也就是说中台只提供接口，这里的设计采用RESTful的规则，让egg为前端提供Api接口，实现中台主要的功能。

RESTful是目前最流行的网络应用程序设计风格和开发方式，大量使用在移动端App上和前后端分离的接口设计。

- RESTful简介和约束 请求方式
  - GET(SELECT) ： 从服务端取出/获取资源，可以同时取出一项或者多项。
  - POST(CREATE) ：在服务器新建一个资源。
  - PUT(UPDATE) ：在服务器更新资源（客户端提供改变后的完整资源）。
  - DELETE(DELETE) ：从服务器删除资源。
  
- 在egg.js中Api接口的路由配置

  接口：  /service/app/controller

  - admin文件夹（管理端/后台使用的所有API接口） /service/app/controller/admin

  - default文件夹（客户端/前台使用的所有API接口）  /service/app/controller/default

    - 前台首页所需要的api接口  /service/app/controller/default/home.js

  配置路由：/service/app/router

  - 新建两个文件 `default.js`(前台路由)和`admin.js`(后台路由)
    - 修改 /service/app/router/default.js
- /service/app/router.js  路由入口文件

## 数据库的设计与连接

- Egg.js中连接mysql数据库

  - egg-mysql模拟安装

    - yarn add egg-mysql  // 在egg.js中使用mysql数据库

  - 进行插件配置

    - /server/config/plugin.js
  - 数据库连接配置  php Study / XAMPP
    - /server/config/config.default.js; 修改对应参数 host、user、password和database；
- **数据库设计**和首页接口制作
  - 数据库中的表建立

    - type表（文章类型表）
    - article表 （文章内容表）

  - 前端首页文章列表接口
    - `getArticleList`的方法   service/app/contoller/default/home.js  
    - 配置路由     service/app/router/default.js, 新建立一个get形式的路由配置


## egg.js解决CORS跨域

前中台结合：前台安装axios模块 使用async/await方法 异步获取数据

后端解决egg.js的跨域问题：yarn add egg-cors  

- 配置config/plugin.js文件

- 配置config/config.default.js

## 登录界面/路由守卫

登录界面 与 业务逻辑：

- 接口：登录方法的编写  /service/controller/admin/main.js  

  - 编写验证登录的方法  checkLogin方法

  - 数据库新增一个table为admin_user
  - <u>session缓存openId</u>

- 后台: 登录方法编写checkLogin   /admin/src/pages/Login.js   

  - isLoading主要用于控制Spin组件是否进入加载状态，进入加载状态可以有效防止重复提交。
  - <u>localStorage存储openId</u>
  - 增加相应事件

    - Button点击时 被调用checkLogin
    - 跨域设置   /service/config/config.default.js

- 接口：路由守卫

  - 博客系统登录后，生成了session，通过后台是不是存在对应的session，作一个中台的路由守卫。如果没有登录，是不允许访问后台对应的接口，也没办法作对应的操作。这样就实现了接口的安全。
  - 编写守卫方法  service/app/middleware/adminauth.js
    - 守卫方法通过`egg.js`中间件来实现的`middleware`
    - 路由守卫是一个异步的方法，如果验证session成功，就会用await netx() 向下执行。也就是说可以正常向下走流程，如果验证失败，就直接返回“没有登录。

```js
module.exports = options =>{
    return async function adminauth(ctx,next){
        console.log(ctx.session.openId)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}
```

- 前后台分离共享session的方法

  - 在正常情况下前后台是不能共享`session`的，但是只要在egg端的`/config/config.default.js`里增加`credentials:true`就可以了。  --- 允许cookie可以跨域

- 使用中间件实现路由守卫  /service/app/router/admin.js

  - 前后端都可做 路由守卫

```
const {router,controller} = app
 var adminauth = app.middleware.adminauth()
```

路由守卫的用法：

从后台开一个读取文章类别的接口，然后从接口中获得数据，展现在添加文章页面上，方便以后选择文章类别。若没有不登录，就去访问这个接口是无效的，会返回让你去登录的。

