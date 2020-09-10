# demo演示

思考：这种网页版的聊天功能应该如何去实现？？

![image-20200601155301776](https://github.com/rlydia/MyPractice/tree/master/websocket-chatroom/mdImg/1.png)

http不能实现这种聊天效果，因为http是基于请求-响应模型的；只有小王请求了服务器，服务器才能给小王响应，而不能主动给小妹响应。



# websocket介绍

> WebSocket协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器**全双工**(full-duplex)通信——允许客户端主动给服务器发送消息，同时 服务器主动发送信息给客户端。
>
> websocket是一种持久协议(长连接)，http是非持久协议。

**现在很多网站都有实时推送的需求，比如聊天，客服咨询等**

早期没有websocket时，通过**ajax轮询(基于HTTP协议的)**，由于http请求，服务器无法给浏览器主动发送数据，因此需要浏览器定时的给服务器发送请求（比如1s一次）,服务器把最新的数据响应给浏览器。这种模式的缺点就是浪费性能和资源。(在一次请求-响应后，断开。再次请求-响应...；http请求响应都会有 三次握手，很耗时间与性能)

![](https://github.com/rlydia/MyPractice/tree/master/websocket-chatroom/mdImg/websocket.png)



websocket是一种基于TCP的网络协议，允许客户端和服务端全双工(双向的)的进行网络通讯，服务器可以主动给客户端发消息，客户端也可以主动给服务器发消息。websocket只需建立一次连接，之后是不会中断的，建立连接后 客户端与服务端可一直互相通信(是实时的)。



# websocket基本使用

> 在 H5 中，如何使用websocket。

在HTML5中，浏览器已经实现了websocket的API，直接使用即可。

[WebSocket-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

## 创建websocket对象

```js
// 参数1： url：连接的websocket属性
// 参数2： protocol，可选的，指定连接的协议
// var socket = new WebSocket('ws://echo.websocket.org')
var Socket = new WebSocket(url, [protocol] );
```

## websocket事件

| 事件    | 事件处理程序     | 描述                       |
| :------ | :--------------- | :------------------------- |
| open    | Socket.onopen    | 连接建立时触发             |
| message | Socket.onmessage | 客户端接收服务端数据时触发 |
| error   | Socket.onerror   | 通信发生错误时触发         |
| close   | Socket.onclose   | 连接关闭时触发             |

## websocket方法

| 方法           | 描述             |
| :------------- | :--------------- |
| Socket.send()  | 使用连接发送数据 |
| Socket.close() | 关闭连接         |

# 使用nodejs开发websocket服务

> `var socket = new WebSocket('ws://echo.websocket.org')`
>
> 之前使用了官网提供的echo服务，接下来我们自己通过nodejs实现一个简单的websocket服务。

使用nodejs开发websocket需要依赖一个第三方包。[Nodejs Websocket](https://github.com/sitegui/nodejs-websocket#readme)

## 项目搭建

新建一个websocket server端的项目

```bash
mkdir server-demo
cd server-demo
yarn init -y
yarn add nodejs-websocket
touch app.js
```

## 开发服务程序

在app.js中

```js
// 导入第三方模块
const ws = require('nodejs-websocket')
// websocket占用的端口号
const PORT = 3000

// 创建了websocket服务
// 1. 能够接收到浏览器给我发送的数据
// 2. 能够给浏览器主动的发送数据
// 每次只要有用户连接，函数就会被执行，会给当前连接的用户创建一个connect对象
const server = ws.createServer(connect => {
  console.log('新的连接')

  // 接收到客户端的文本内容时触发
  connect.on('text', str => {
    console.log('接收:' + str)
    // 把接收到的字符串转换成大写，并且给客户端响应
    connect.sendText(str.toUpperCase() + '!!!!')
  })

  // 监听关闭事件
  connect.on('close', () => {
    console.log('连接关闭了')
  })

  // 监听错误事件， 比如浏览器关闭了连接，或者发送的数据格式不对等
  connect.on('error', err => {
    console.log('连接异常')
  })
})

// 启动websocket服务
server.listen(PORT, function() {
  console.log(`websocket server listening on ${PORT}`)
})
```

## 启动服务

```bash
node app.js
```

在终端中看到`websocket server listening on 3000`就说明webserver服务启动成功了

## 进行测试

修改客户端中`index.html`文件中的连接地址,重新进行测试

```js
// 创建websocket对象，地址已经修改称为了自己编写的地址
// var socket = new WebSocket('ws://echo.websocket.org')
const URL = 'ws://localhost:3000'
const websocket = new WebSocket(URL)
```



# websocket开发聊天室程序

![image-20200601195718329](https://github.com/rlydia/MyPractice/tree/master/websocket-chatroom/mdImg/2.png)

```
yarn init -y
yarn add nodejs-websocket
node app.js
```

app.js

```js
const ws = require('nodejs-websocket')

const PORT = 3000
const TYPE_MSG = 0
const TYPE_ENTER = 1
const TYPE_LEAVE = 2

let userCount = 0
const server = ws.createServer(connect => {
  console.log('有新用户连接了')
  // 每次有新用户连接，需要给所有用户发送一条新增用户的消息
  userCount++
  connect.userName = 'user' + userCount
  // 给所有的用户进行广播
  broadcast({
    type: TYPE_ENTER,
    msg: connect.userName + '进入了聊天室',
    date: new Date().toLocaleTimeString()
  })

  connect.on('text', msg => {
    // 如果接收到用户的数据， 需要发送给所有的用户
    broadcast({
      type: TYPE_MSG,
      msg: msg,
      date: new Date().toLocaleTimeString()
    })
  })
  connect.on('close', () => {
    console.log('用户断开连接')
    userCount--
    // 给所有的用户发送一条用户离开的消息
    broadcast({
      type: TYPE_LEAVE,
      msg: `${connect.userName}离开了聊天室`,
      date: new Date().toLocaleTimeString()
    })
  })
  connect.on('error', () => {
    console.log('连接失败')
  })
})

function broadcast(msg) {
  server.connections.forEach(conn => {
    conn.sendText(JSON.stringify(msg))
  })
}

server.listen(PORT, () => {
  console.log('服务器启动成功了', PORT)
})

```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      /* div {
        width: 200px;
        height: 200px;
        border: 1px solid #000;
      } */
    </style>
  </head>
  <body>
    <!-- 用于收集输入内容 -->
    <input type="text" placeholder="请输入需要发送的内容" />
    <!-- 用于发送websocket请求 -->
    <button>websocket测试</button>
    <!-- 用于显示websock服务器的响应 -->
    <div class="show"></div>
    <script>
      var input = document.querySelector('input')
      var button = document.querySelector('button')
      var div = document.querySelector('div')
      // 1. 创建websocket对象, 这个地址是官方提供的地址
      // var socket = new WebSocket('ws://echo.websocket.org')
      var socket = new WebSocket('ws://localhost:3000')

      // 2. 给websocket注册事件
      socket.addEventListener('open', function() {
        // 与服务端建立连接的时候触发
        div.innerText = '恭喜你，与服务端建立连接了'
      })
      // 如何给服务器发送消息
      button.addEventListener('click', function() {
        socket.send(input.value)
        input.value = ''
      })

      // 如果接收服务器的数据
      socket.addEventListener('message', function(e) {
        var data = JSON.parse(e.data)
        var dv = document.createElement('div')
        dv.innerHTML = data.msg + '----' + data.date
        if (data.type === 0) {
          dv.style.color = 'green'
        }
        if (data.type === 1) {
          dv.style.color = 'red'
        }
        if (data.type === 2) {
          dv.style.color = 'gray'
        }
        div.appendChild(dv)
      })

      socket.addEventListener('close', () => {
        div.innerHTML = '与服务器断开连接'
      })
    </script>
  </body>
</html>

```

如果使用原生的websocket进行开发，会比较麻烦, 比如:

- 提供的api也很少，类似于广播这种方法都没有，需要自己封装；

- 发送的数据只能是字符串格式的；用`JSON.parse()`/`JSON.stringfy()`转换；

- 支持的事件太少，open/message/close...

  



# socket.io基本使用

[socketio](https://socket.io/docs/)  -- 基于websocket的框架；既可以在浏览器端使用，也可在服务端使用。

同websocket一样，其目的是为了让服务器与浏览器实现双向的数据访问。

```
yarn init -y
yarn add socket.io
node app.js
```

socket.io只需做两件事情： （socket 表示用户的连接）

- socket.on 表示注册某个事件，如果我需要获取浏览器的数据，则需要注册一个事件 等待浏览器触发。`socket.on('hehe', data => {console.log(data)}`  (参数1：事件名 任意； 参数2：回调函数中的参数为 获取到的数据 )

- socket.emit 表示触发某个事件，如果需要给浏览器发数据，需要触发浏览器注册的某个事件。

  `socket.emit('hehe', { name: 'zs', age: 18 })`

## node

app.js:

```js
// 创建了http服务器
const http = require('http')
var fs = require('fs')
const app = http.createServer()
const PORT = 3003

app.on('request', (req, res) => {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading index.html')
    }
    res.writeHead(200)
    res.end(data)
  })
})

app.listen(PORT, () => {
  console.log('服务器启动成功', PORT)
})
// ---------------------前面部分都是nodejs服务-------------------------
// socket.io对象
const io = require('socket.io')(app)

// 监听用户连接的事件
io.on('connection', socket => {
  console.log('新用户连接了')
  
  socket.on('hehe', data => {
    console.log(data)
    socket.emit('send', data)
  })
  
  socket.on('login', data => {
    console.log(data)
  })
})

```

index.html:

```html
<body>
  哈哈
  <script src="http://localhost:3003/socket.io/soc
io.js"></script>
  <script>
    // 连接socket服务; 参数：服务器地址
    var socket = io('http://localhost:3003')
    // 接受服务器返回的数据
    // socket.on('send', data => {
    //   console.log(data)
    // })
    // socket.emit 表示触发某个事件
    socket.emit('hehe', { name: 'zs', age: 18 })
    
    // socket.on 表示注册某个事件
    socket.on('send', function(data) {
      console.log(data)
    })
    socket.emit('login', { name: 'ls' });
  </script>
</body>
```

![image-20200601221040302](https://github.com/rlydia/MyPractice/tree/master/websocket-chatroom/mdImg/3.png)

![image-20200601221115661](https://github.com/rlydia/MyPractice/tree/master/websocket-chatroom/mdImg/4.png)



浏览器端  --- 服务器端

- 浏览器给服务器发送数据(socket.emit)，浏览器触发服务器监听的事件(socket.on)。
- 服务器给浏览器发送数据(socket.emit)，只要触发浏览器监听的事件即可(socket.on)

![image-20200602094523597](https://github.com/rlydia/MyPractice/tree/master/websocket-chatroom/mdImg/5.png)

## express

socket.io - express:  （服务器用express创建）

```
yarn init -y
yarn add socket.io express
node app.js
```

app.js:

```js
var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const PORT = 3005

// 启动了服务器
server.listen(PORT, () => {
  console.log('服务器启动成功了', PORT)
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
  socket.on('hehe', data => {
    console.log(data)

    socket.on('login', data => {
      console.log(data)
    })
  })
  socket.emit("send", { hello: 'world' })
})
```

index.html:

```html
<script src="http://localhost:3005/socket.io/socket.
io.js"></script>
<script>
  // 连接socket服务
  // 参数：服务器地址
  var socket = io('http://localhost:3005')
  // 接受服务器返回的数据
  // socket.on('send', data => {
  //   console.log(data)
  // })
  socket.emit('hehe', { name: 'zs', age: 18 })
  socket.on('send', function(data) {
    console.log(data)
  })
  socket.emit('login', { name: 'ls' })
</script>
```

![image-20200602101401927](https://github.com/rlydia/MyPractice/tree/master/websocket-chatroom/mdImg/6.png)



# 基于socket.io开发完整的聊天室

```js
yarn init -y
yarn add socket.io express
node app.js
```

**聊天室功能--滚动到底部的功能**：`scrollIntoView()` 滚动到可视区；

```js
function scrollIntoView() {
  // 当前元素的底部滚动到可视区
  $('.box-bd')
    .children(':last')
    .get(0)
    .scrollIntoView(false)
}
```

**聊天室功能--发送图片**；

**聊天室功能--发送表情包** (jquery-emoji 表情插件):

```
<link rel="stylesheet" href="lib/jquery-mCustomScrollbar/css/jquery.mCustomScrollbar.min.css"/>
<link rel="stylesheet" href="lib/jquery-emoji/css/jquery.emoji.css"/>
```

```
<script src="lib/jquery-mCustomScrollbar/script/jquery.mCustomScrollbar.min.js"></script>
<script src="lib/jquery-emoji/js/jquery.emoji.min.js"></script>
```



截图功能：

https://www.jianshu.com/p/8c43576bdbe3

https://segmentfault.com/q/1010000008019963

html2canvas，jcanvas 库

