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
