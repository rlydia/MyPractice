import axios from 'axios'
import * as constants from './constants'
import { fromJS } from 'immutable'

const changHomeData = (result) => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList,
})

const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list), // fromJS将外层数组，与数组内层的对象 都转换为immutable类型；
  nextPage
})

export const getHomeInfo = () => {
  return (dispatch) => {
   axios.get('/api/home.json').then((res) => {
    const result = res.data.data;
    // 要修改store中的数据：构建一个action，将action派发给store
    // const action = changHomeData(result)
    // dispatch(action)
    dispatch(changHomeData(result))
   })
  }
}

export const mouseEnter = () => ({
  type: constants.MOUSE_ENTER
})

export const mouseLeave = () => ({
  type: constants.MOUSE_LEAVE
})

// 异步获取ajax新数据 => 改变store中的内容; action => reducer
export const getMoreList = (page) => {
  return (dispatch) => {
    // 派发ajax请求，获取更多内容--与后端协商接口；homeList为articleList中相似内容
    axios.get(`/api/homeList.json?page=${page}`).then((res) => {
      const result = res.data.data;
      // console.log(result)
      dispatch(addHomeList(result, page + 1))
     })
  }
}

export const toggleTopShow = (show) => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show
})