const jsonServer = require('json-server')
const express = require('express')

const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router('db.json')  // 路由
const middlewares = jsonServer.defaults()  // 中间件
const root = __dirname + '/build'
server.use(express.static(root, { maxAge: 86400000 })) // 静态文件
server.use(middlewares)

const reactRouterWhiteList = ['/create', '/edit/:itemId']
server.get(reactRouterWhiteList, (request, response) => {
  response.sendFile(path.resolve(root, 'index.html'))
})

server.use(router)
server.listen(3000, () => {
  console.log('server 3000 is running')
})