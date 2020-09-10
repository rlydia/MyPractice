import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col, Breadcrumb, Affix, BackTop } from 'antd'
// import ReactMarkdown from 'react-markdown'
import marked from 'marked'   // 解析markdown的代码
import hljs from "highlight.js";   // 用来代码高亮的
import 'highlight.js/styles/monokai-sublime.css';
import axios from 'axios'
// import MarkNav from 'markdown-navbar'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import Tocify from '../components/tocify.tsx'
import  servicePath  from '../config/apiUrl'
import {
  CalendarOutlined, 
  FolderOpenOutlined, 
  FireOutlined
} from '@ant-design/icons';

const Detailed = (props) => {
  let articleContent=props.article_content

  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({  // 配置
    renderer: renderer, 
    gfm: true,  // 类似github
    pedantic: false,  // 容错
    sanitize: false,  // 不忽略html标签
    tables: true, 
    breaks: false,  // github样式
    smartLists: true,  // 好看的列表样式
    smartypants: false,   
    highlight: function (code) {   // 代码高亮
      return hljs.highlightAuto(code).value;
    }
  }); 

  let html = marked(props.article_content) 

  return (
    <>
    <BackTop />
    <Head>
      <title>博客详细页 | rLydia</title>
    </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
  
           <div>
              <div className="detailed-title">
                {props.title}
              </div>
  
              <div className="list-icon center">
                <span><CalendarOutlined />{props.addTime}</span>
                <span><FolderOpenOutlined />{props.typeName}</span>
                <span><FireOutlined />{props.view_count}人</span>
              </div>
  
              <div className="detailed-content" 
                dangerouslySetInnerHTML={{__html: html}}
              >
              </div>
  
           </div>
  
          </div>
      </Col>
  
      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        <div className="right-container">
          <Advert />
        </div>
        <div className="right-container">
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </div>
      </Col>
    </Row>
    <Footer/>
    </>
  )
}

Detailed.getInitialProps = async(context)=>{

  // console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById + id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed