import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import './index.scss'
import * as serviceWorker from './serviceWorker'
import store from './store'

import App from './App'

import AjaxFunction from './network/ajax'

global.apiUrl = "http://localhost:3000/api/v1"
global.lang = 'ru'
global.sendRequest = AjaxFunction

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register()
