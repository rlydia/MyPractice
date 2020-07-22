import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWrapper, TopicItem } from '../style';

class Topic extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <TopicWrapper>
        {
          list.map((item) => (
            <TopicItem key={item.get('id')}>
              <a href={item.get('href')} target="_blank" rel="noopener noreferrer">
                <img 
                  className="topic-pic"
                  src={item.get('imgUrl')}
                  alt={item.get('title')}
                />
                {item.get('title')}
              </a>
            </TopicItem>
          ))
        }
      </TopicWrapper>
    )
  }
}

const mapState = (state) => ({
  // 赋值到这个组件下的this.props.list属性上
  // list: state.get('home').get('topicList')
  list: state.getIn(['home', 'topicList'])
});

// export default Topic;
// 导出connect()方法包装的容器组件; 现在组件是为了与store做连接，拿到store中的数据(mapState)，而并不要求改store中的数据，所以mapDispatch暂时用不到 -- null;
export default connect(mapState, null)(Topic);