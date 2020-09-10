import '../static/style/components/Advert.css'
import { Divider, Button } from 'antd'

const Advert = () => {

  return (
    <div className="project-div comm-box">
      <Divider>项目展示</Divider>
      <Button block>在线账本</Button>
      <Button block>俄罗斯方块</Button>
      <Button block>聊天室</Button>
    </div>
)
}

export default Advert