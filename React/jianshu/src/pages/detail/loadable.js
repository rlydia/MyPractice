import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./'), // 异步加载当前目录下index.js组件
  loading() {   // 返回一个临时加载组件
    return <div>正在加载</div>
  },
});

// 直接返回一个无状态组件
export default () => <LoadableComponent/>

// export default class App extends React.Component {
//   render() {
//     return <LoadableComponent/>
//   }
// }