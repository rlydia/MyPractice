const ws = require('nodejs-websocket')
const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MSG = 2
/* 
  分析：
    消息不应该是简单的字符串
    这个消息应该是一个对象
    type: 消息的类型， 0：表示进入聊天室的消息  1：用户离开聊天室的消息 2：正常的聊天消息
    msg: 消息的内容
    time: 聊天的具体时间
*/
// count 记录当前连接上来的总用户数量；
let count = 0
// conn 每个连接到服务器的用户，都有一个conn对象
const server = ws.createServer(conn => {
  console.log('新的连接')
  count++
  conn.userName = `用户${count}`
  // 1.告诉所有用户，有人加入了聊天室 - 广播
  broadcast({
    type: TYPE_ENTER,
    msg: `${conn.userName}进入了聊天室`,
    time: new Date().toLocaleTimeString()
  })

  // 接收到了浏览器的数据
  conn.on('text', data => {
    // 2. 当我们接收到某个用户的信息时，告诉所有用户，发送的消息内容是什么
    // 聊天的消息
    broadcast({
      type: TYPE_MSG,
      msg: data,
      time: new Date().toLocaleTimeString()
    })
  })
  // 关闭链接的时候，触发
  conn.on('close', data => {
    console.log('关闭连接')
    count--
    // 3. 告诉所有用户，有人离开了聊天室
    broadcast({
      type: TYPE_LEAVE,
      msg: `${conn.userName}离开了聊天室`,
      time: new Date().toLocaleTimeString()
    })
  })
  // 发生异常，触发
  conn.on('error', data => {
    console.log('发生异常')
  })
})

// 广播， 给所有的用户发送消息
function broadcast(msg) {
  // server.connections:表示所有的用户
  server.connections.forEach(item => {
    item.send(JSON.stringify(msg)) // 将msg对象转为字符串 再发送给前端；
  })
}

server.listen(3001, () => {
  console.log('监听端口3001')
})
