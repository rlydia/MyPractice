import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button} from './style'
import { actionCreators } from './store'

class Login extends PureComponent {
  render() {
    const { loginStatus, login } = this.props;
    if (!loginStatus) {
      return (
        <LoginWrapper>
          <LoginBox>
            {/* ref可获取当前dom */}
            <form>
              <Input placeholder='账号' autocomplete="off" ref={(input) => {this.account = input}}></Input>
              <Input placeholder='密码' autocomplete="current-password" type='password' ref={(input) => {this.password = input}}></Input>
              <Button onClick={() => login(this.account, this.password)}>登录</Button>
            </form>
          </LoginBox>
        </LoginWrapper>
      )
    }else {
      return <Redirect to='/' />
    }
  }

}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login'])
})

// 登录--异步请求 派发action
const mapDispatch = (dispatch) => ({
  login(accountElem, passwordElem) {
    // 用actionCreator来创建一个action
    dispatch(actionCreators.login(accountElem.value, passwordElem.value))
  }
})

export default connect(mapState, mapDispatch)(Login);