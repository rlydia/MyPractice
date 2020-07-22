// 将header>index.js中所需要的reducer存放到 header>store>reducer.js中去进行管理
/*  
const defaultState = {
  focused: false
};
// 导出一个纯函数：给定一个固定的输入 就会有一个固定的输出；
export default (state = defaultState, action) => {
  if (action.type === 'search_focus') {
    return {
      focused: true
    }
  }
  if (action.type === 'search_blur') {
    return {
      focused: false
    }
  }
  return state;
}
*/

import { combineReducers } from 'redux-immutable';

// import { combineReducers } from 'redux';
// import headerReducer from '../common/header/store/reducer';
// 让src>pages>home>store>index.js 为整个store目录下的出口文件;这样 from的路径与方式 都改变了。
import {reducer as headerReducer} from '../common/header/store'
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store'
import { reducer as loginReducer } from '../pages/login/store'

// export defult combineReducers({
//   header: headerReducer
// });


const reducer =  combineReducers({
  header: headerReducer,
  home: homeReducer,
  detail: detailReducer,
  login: loginReducer,
});

export default reducer;