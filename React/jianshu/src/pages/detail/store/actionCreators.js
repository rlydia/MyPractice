import axios from 'axios';
import * as constants from './constants';

const changeDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
})

export const getDetail = (id) => {
  return (dispatch) => {
    // 请求接口时 将这个id传给后端
    axios.get('/api/detail.json?id=' + id).then((res) => {
      // console.log(res.data.data);
      const result = res.data.data;
      // 继续派发action，改变store中的数据
      dispatch(changeDetail(result.title, result.content))
    })
  }
}