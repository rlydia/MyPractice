// index.js引入了store文件夹下的所有内容，同时将这些内容都导出；这样在store文件夹外的其他文件，就可以直接自引用store/index.js文件中的函数；
// 其他文件导入import {...} from './store'，就默认引用的是store/index.js文件;
import reducer from './reducer';
import * as actionCreators from './actionCreators';
import * as constants from './constants'

export { reducer, actionCreators, constants };