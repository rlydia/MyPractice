import * as constants from './constants';
import { fromJS } from 'immutable';
import axios from 'axios';

const changeList = (data) => ({
  // type: 'change_list',
  type: constants.CHANGE_LIST, // 应该为常量 而不该是字符串
  // 接口传过来的数据肯定是普通数组，为保持数据结构的一致 需改为immutable数组；
  // data
  data: fromJS(data),
  totalPage: Math.ceil(data.length / 10)   // 每页显示10个
})

export const searchFocus = () => ({
  // type: 'search_focus'
  type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
  // type: 'search_blur'
  type: constants.SEARCH_BLUR
});

export const mouseEnter = () => ({
  type: constants.MOUSE_ENTER
})

export const mouseLeave = () => ({
  type: constants.MOUSE_LEAVE
})
// 传递给reducer
export const changePage = (page) => ({
  type: constants.CHANGE_PAGE,
  page
})


// 用来redux-thunk后，这个函数可以不再像前面一样返回对象，而是返回函数
// 派发异步请求
export const getList = () => {
  return (dispatch) => {
    // console.log(123); 
    // 需与后端的接口开发协调 => 目前前端测试阶段 可先用个假数据；
    axios.get('/api/headerList.json').then((res) => {
      // console.log(res)
      const data = res.data;
      // 修改store中的数据 action=> store=> reducer
      // const action = {
      //   type: 'change_list',
      //   data: data.data
      // }
      // dispacth(action)
      // action都是由actionCreator创建的；并将action派发给store => 传递给reducer
      dispatch(changeList(data.data))
    }).catch(() => {
      console.log('error')
    })
  }
}