// import React, { Component } from 'react';  // 无状态组件并没有使用Component;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom'
// import * as actionCreators from './store/actionCreators';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { 
  HeaderWrapper, 
  Logo, 
  Nav, 
  NavItem, 
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addition, 
  Button, 
  SearchWrapper   
} from './style';


/*
class Header extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     focused: false,
  //   }
  //   this.handleInputFocus = this.handleInputFocus.bind(this); // 对this指向做修改；
  //   this.handleInputBlur = this.handleInputBlur.bind(this);
  // }

  render() {
    return (
      <HeaderWrapper>
        <Logo />
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          <NavItem className="right">登录</NavItem>
          <NavItem className="right">
            <span className="iconfont iconAa">&#xe636;</span>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={this.props.focused}
              timeout={200}
              className={this.props.focused ? "focused slide" : "slide"}
            >
              <NavSearch
                // className={this.state.focused ? "focused" : ""}
                onFocus={this.props.handleInputFocus}
                onBlur={this.props.handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <span 
              className={this.props.focused ? "focused iconfont iconfangdajing" : "iconfont iconfangdajing"}
            >&#xe637;</span>
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className="writting">
            <span className="iconfont iconicon-checkin">&#xe615;</span>
            写文章
          </Button>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }

  // handleInputFocus() {
  //   this.setState({
  //     focused: true
  //   })
  // }
  // handleInputBlur() {
  //   this.setState({
  //     focused: false
  //   })
  // }
}
*/

// 将Header恢复为普通组件
class Header extends Component {

  getListArea() {
    // 数据与方法
    const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props; // 这样后面就不用写this.props.focused;
    // list目前是一个immutable数据类型--不支持list[i]=> 转换为普通数组
    const newList = list.toJS();
    const pageList = [];

    // 当刚进入页面时，Header就会被渲染；初始数据list为空,page为1；
    if (newList.length) {
      for (let i = (page-1)*10; i<page*10; i++) {
        if (newList[i]) {
          pageList.push(
            <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
          )
        }
      }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
            >
              {/* ref可获取这个i标签真实的dom节点 */}
              <i ref={(icon) => {this.spinIcon = icon}} className="iconfont iconAa iconspin">&#xe851;</i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }

  render() {
    const { focused, handleInputFocus, handleInputBlur, list, login, logout} = this.props
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo/>
        </Link>
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          {
            login ? <NavItem onClick={logout} className="right">退出</NavItem> : <Link to='/login'><NavItem className="right">登录</NavItem></Link>
          }
          <NavItem className="right">
            <span className="iconfont iconAa">&#xe636;</span>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={200}
              className={focused ? "focused slide" : "slide"}
            >
              <NavSearch
                className={focused ? "focused" : ""}
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <i 
              className={focused ? "focused iconfont iconfangdajing" : "iconfont iconfangdajing"}
            >&#xe637;</i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to='/write'>
            <Button className="writting">
              <span className="iconfont iconicon-checkin">&#xe615;</span>
              写文章
            </Button>
          </Link>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    );
  }
}
/*
const getListArea = (show) => {
  if (show) {
    return (
      <SearchInfo>
        <SearchInfoTitle>
          热门搜索
          <SearchInfoSwitch>换一批</SearchInfoSwitch>
        </SearchInfoTitle>
        <searchInfoList>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
        </searchInfoList>
      </SearchInfo>
    )
  } else {
    return null
  }
}
*/

/*
// 将组件中的数据移出了，拿到redux这个公共存储框架中去存储。 => 这样Header子组件就变成了无状态组件。=> 而无状态组件 可直接写为函数。无状态组件的性能更高。
const Header = (props) => { 
  return (
    <HeaderWrapper>
      <Logo />
      <Nav>
        <NavItem className="left active">首页</NavItem>
        <NavItem className="left">下载App</NavItem>
        <NavItem className="right">登录</NavItem>
        <NavItem className="right">
          <span className="iconfont iconAa">&#xe636;</span>
        </NavItem>
        <SearchWrapper>
          <CSSTransition
            in={props.focused}
            timeout={200}
            className={props.focused ? "focused slide" : "slide"}
          >
            <NavSearch
              // className={props.focused ? "focused" : ""}
              onFocus={props.handleInputFocus}
              onBlur={props.handleInputBlur}
            ></NavSearch>
          </CSSTransition>
          <i 
            className={props.focused ? "focused iconfont iconfangdajing" : "iconfont iconfangdajing"}
          >&#xe637;</i>
          {getListArea(props.focused)}
        </SearchWrapper>
      </Nav>
      <Addition>
        <Button className="writting">
          <span className="iconfont iconicon-checkin">&#xe615;</span>
          写文章
        </Button>
        <Button className="reg">注册</Button>
      </Addition>
    </HeaderWrapper>
  );
}
*/

// Header组件与store做连接时，store中的数据如何映射到Props上；state即指store中的数据；
const mapStateToProps = (state) => {
  return {
    // 这样就将store仓库中的数据映射到Props中
    // focused: state.focused    // 由于使用了combineReducers数据结构多了一层header，见下：
    
    // focused: state.header.focused  
    // state.header已经是immutable数据；
    // focused: state.header.get('focused')
    // state已经是immutable数据
    // focused: state.get('header').get('focused')
    // 等价于：
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login', 'login'])
  }
}
// 组件与store做连接时，组件要改变store中的内容 就要调用dispatch方法；
const mapDispathToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      // 第一次点击时 list.size为0，第二次有值 => 可用list.size是否有值来决定是否发送ajax请求；
      // console.log(list)
      (list.size === 0) && dispatch(actionCreators.getList())
      // 等同于：
      // if (list.size === 0) {
      //   // 创建一个获取异步数据的action
      //   dispatch(actionCreators.getList());
      // }
      
      // const action = {
      //   type: 'search_focus'
      // };
      // dispatch(action);  // 将action派发出去；store需结合这个action与之前state数据--> reducer;
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      // const action = {
      //   type: 'search_blur'
      // };
      // dispatch(action);
     dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter()) // action
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
    handleChangePage(page, totalPage, spin) {
      // 获取到spin对应的dom; 原生js获取css样式--写在style.js中的样式 通过dom是获取不了的。 
      // spin.style.transform  = 'rotate(360deg)'
      // console.log(spin.style.transform)

      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
      if (originAngle) {
        originAngle = parseInt(originAngle, 10) // 将字符串转为数字
      } else { // 初次进入时没有originAngle的值，默认为0
        originAngle = 0;
      }
      spin.style.transform  = 'rotate(' + (originAngle + 360) + 'deg)'

      // console.log(page, totalPage)
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page+1))
      } else {
        dispatch(actionCreators.changePage(1))
      }
    },
    logout() {   // 需改变的是login中的数据
      dispatch(loginActionCreators.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);