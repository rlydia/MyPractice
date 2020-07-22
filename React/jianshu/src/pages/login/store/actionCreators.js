import axios from 'axios';
import * as constants from './constants'

const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true
})

export const logout = () => ({
  type: constants.LOGOUT,
  value: false
})

export const login = (account, password) => {
  return (dispatch) => {
    // 数据模拟 用get给后端发送请求；
    axios.get('/api/login.json?account=' + account + '&password=' + password).then((res) => {
      // console.log(res)
      const result = res.data.data;
      if (result) {  // 若登录成功，将login状态由false改为true
        dispatch(changeLogin())
      } else {
        alert('登录失败')
      }
    })
  }
}