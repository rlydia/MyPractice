import React, {useState, useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/style/components/header.css'
import {Row, Col, Menu} from 'antd'
import {
  HomeOutlined, 
  YoutubeOutlined, 
  SmileOutlined,
  MessageOutlined
} from '@ant-design/icons';

const Header = () => {

  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(servicePath.getTypeInfo).then(
        (res) => {
          // setNavArray(res.data.data)
          return res.data.data
        }
      )
      setNavArray(res)
    }
    fetchData()
  }, [])

  // 跳转到列表页
  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  return (
    <div className="header">
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={10} lg={15} xl={12}>
        <span className="header-logo">
          <Link href={{pathname: '/'}}>
            <a> rLydia </a>
          </Link>
        </span>
        <span className="header-txt">记录前端点滴进步</span>
      </Col>

      <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
        <Menu 
          mode="horizontal"
          onClick={handleClick}
        >
          <Menu.Item key="0">
            <HomeOutlined />
            博客首页
          </Menu.Item>
          {
            navArray.map((item) => {
              return (
                <Menu.Item key={item.id}>
                  {item.typeName}
                </Menu.Item>
              )
            })
          }
          {/* 
            <Menu.Item key="1">
              <YoutubeOutlined />
              视频教程
            </Menu.Item>
            <Menu.Item key="2">
              <MessageOutlined />
              杂谈
            </Menu.Item>
            <Menu.Item key="3">
              <SmileOutlined />
              快乐生活
            </Menu.Item> 
          */}
        </Menu>

      </Col>
    </Row>
    </div>
  )
}

export default Header