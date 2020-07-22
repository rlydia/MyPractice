import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { GlobalStyle } from './style';
import { IconfontStyle } from './statics/iconfont/iconfont.js'
import Header from './common/header';
import Home from './pages/home';
// import Detail from './pages/detail';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <IconfontStyle/>

        <BrowserRouter>
          <div>
            <Header />
            {/* exact 等路径完全与path相等时 */}
            <Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
            <Route path='/detail/:id' exact component={Detail}></Route>
          </div>
        </BrowserRouter>

      </Provider>
    )
  }
}

export default App;
