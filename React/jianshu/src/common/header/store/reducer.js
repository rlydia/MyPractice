import * as constants from './constants';
import { fromJS } from 'immutable'; // 将一个JS对象转变为immutable对象；

// 当外层用fromJS时，内存数组 也会变为immutable数组；(保持数据类型不变,`state.set('list', action.data)`中数据也需是immutable类型。
const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  // list的初始值为immutable的数组
  list: [], // 热门搜索区域数据 --通过ajax获取
  page: 1,  // 初始化
  totalPage: 1,
});

// 导出一个纯函数：给定一个固定的输入 就会有一个固定的输出；
// action=> store=> reducer
export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.SEARCH_FOCUS:
      return state.set('focused', true)
    case constants.SEARCH_BLUR:
      return state.set('focused', false)
    case constants.CHANGE_LIST:
      return state.merge({ // marge可同时改变多个数据内容(效率更高)
        list: action.data,
        totalPage: action.totalPage,
      })
      // set调用两次,会返回两次immutable数据类型
      // return state
      //         .set('list', action.data)
      //         .set('totalPage', action.totalPage)
    case constants.MOUSE_ENTER:
      return state.set('mouseIn', true)
    case constants.MOUSE_LEAVE:
      return state.set('mouseIn', false)
    case constants.CHANGE_PAGE:
      return state.set('page', action.page)
    default:
      return state;
  }

  /*
  // if (action.type === 'search_focus') {
  if (action.type === constants.SEARCH_FOCUS) {
    // return {
    //   focused: true
    // }
    // 
    // state已经是immutable数据；
    // immutable对象的set方法，会结合之前immmutable对象的值 和设置的值，返回一个全新的对象；
    return state.set('focused', true)
  }
  // if (action.type === 'search_blur') {
  if (action.type === constants.SEARCH_BLUR) {    
    // return {
    //   focused: false
    // }
    return state.set('focused', false)
  }
  // action=> store=> reducer
  if (action.type === constants.CHANGE_LIST) {
    // console.log(action)
    return state.set('list', action.data)
  }
  return state;
  */
}