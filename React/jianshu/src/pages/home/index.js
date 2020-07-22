import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import AppDownload from './components/AppDownload';
import Writer from './components/Writer';
import { actionCreators } from './store'

import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style';

class Home extends Component {

  handleScrollTop() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <a target="_blank" rel="noopener noreferrer" href="https://www.jianshu.com/c/fd7d06e96763?utm_medium=index-banner&utm_source=desktop">
            <img className='banner-img' src="https://upload.jianshu.io/admin_banners/web_images/4894/23ecc55accf5c6a6c9910be966c125853d1f04a5.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="武汉加油"/>
          </a>
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <AppDownload />
          <Writer />
        </HomeRight>
        { this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : null}
      </HomeWrapper>
    )
  }
  // 生命周期函数
  componentDidMount() {
   this.props.changeHomeData();
   this.bindEvents();
    /*
    axios.get('/api/home.json').then((res) => {
      const result = res.data.data;
      // 要修改store中的数据：构建一个action，将action派发给store
      // 组件与store建立连接 -- connect方法
      const action = {
        type: 'change_home_data',
        topicList: result.topicList,
        articleList: result.articleList,
        recommendList: result.recommendList,
      }
      this.props.changeHomeData(action)
    })
    */
  }
  // 当组件挂载完成后，往window上绑定scroll事件监听，当组件从页面上移除时，一定要把scroll事件绑定再从window上移除 (这样 这个组件的事件就不会影响其他组件)；
  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }
  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }
}
// Home组件是一个UI组件，不应该出现 componentDidMount函数 这么多业务逻辑；=> 将UI组件的逻辑剔除掉了，而mapDispatch属于容器组件 => 而一般ajax的异步请求 也不放在容器组件中； => 异步操作使用redux-thunk中间件 将其放入action中处理；


const mapState = (state) => ({
  showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => ({
  // changeHomeData(action) {
     // dispatch(action); // 派发的action所有store的reducer都会接收到
  // }
  // changeHomeData() { 
    // axios.get('/api/home.json').then((res) => {
    //   const result = res.data.data;
    //   // 要修改store中的数据：构建一个action，将action派发给store
    //   // 组件与store建立连接 -- connect方法
    //   const action = {
    //     type: 'change_home_data',
    //     topicList: result.topicList,
    //     articleList: result.articleList,
    //     recommendList: result.recommendList,
    //   }
    //   dispatch(action);
    // })
  // }
  changeHomeData() {
    const action = actionCreators.getHomeInfo();
    dispatch(action)
  },
  changeScrollTopShow() {
    // console.log(document.documentElement.scrollTop)
    if (document.documentElement.scrollTop > 100) {
      dispatch(actionCreators.toggleTopShow(true))
    } else {
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
});

// export default Home;
// 向store中传值 改变store --- mapDispatch;
export default connect(mapState, mapDispatch)(Home);
