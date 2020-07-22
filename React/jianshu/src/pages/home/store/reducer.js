import { fromJS } from 'immutable';
import * as constants from './constants'

const defaultState = fromJS({
  mouseIn: false,
  // topicList为immutable数组
  topicList: [],
  articleList: [],
  recommendList: [],
  articlePage: 1,
  showScroll: false,
});

// 代码优化 (让reducer结构更明确)
const changeHomeData = (state, action) => {
  return state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    recommendList: fromJS(action.recommendList)
  });
}

const addArticleData = (state, action) => {
  return state.merge({
    articleList: state.get('articleList').concat(action.list),
    articlePage: fromJS(action.nextPage)
  });
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case  constants.MOUSE_ENTER:
      return state.set('mouseIn', true)
    case constants.MOUSE_LEAVE:
      return state.set('mouseIn', false)
    // case 'change_home_data':
    case constants.CHANGE_HOME_DATA:
      // console.log(action)
      // fromJS将普通的JS对象，转换为immutable对象
      // state.set('topicList', fromJS(action.topicList))
      // 一次设置多个属性
      return changeHomeData(state, action)
    case constants.ADD_ARTICLE_LIST:
      // return state.set('articleList', state.get('articleList').concat(action.list))
      return addArticleData(state, action)
    case constants.TOGGLE_SCROLL_TOP:
      return state.set('showScroll', action.show)
    default: 
      return state
  }
}