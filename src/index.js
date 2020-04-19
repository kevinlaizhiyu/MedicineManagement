import React from 'react';
import ReactDOM from 'react-dom';

// import 'antd/dist/antd.css'  //引入antd的所有样式文件
import './common.css'  //清除默认样式


import App from './App';
import * as serviceWorker from './serviceWorker';


import store from  '../src/store/store'
import {Provider} from 'react-redux'


ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
