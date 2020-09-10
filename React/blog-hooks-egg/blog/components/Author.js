import {Avatar, Divider, Tooltip} from 'antd'
import '../static/style/components/author.css'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';

const Author =()=>{
  return (
    <div className="author-div comm-box">
      <div> 
        <Avatar size={100} src="https://cdn.nlark.com/yuque/0/2020/png/420158/1595325480882-avatar/e39afe3a-0f3a-490c-bae8-3d8a7e2afb9a.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_192%2Ch_192%2Fformat%2Cpng"
        />
      </div>
      <div className="author-introduction">
        前端入门级选手, 积极学习中！
        <Divider>社交账号</Divider>
        <Tooltip
          title="https://github.com/rlydia"
          onClick={() => {
            window.open("https://github.com/rlydia")
          }}
        >
          <Avatar size={28} icon={<GithubOutlined />} className="account"/>
        </Tooltip>
        <Tooltip
          title="845944781"
        >
          <Avatar size={28} icon={<QqOutlined />} className="account"/>
        </Tooltip>
        <Tooltip
          title="zh____yojs"
        >
          <Avatar size={28} icon={<WechatOutlined />} className="account"/>
        </Tooltip>
      </div>
    </div>
  )

}

export default Author