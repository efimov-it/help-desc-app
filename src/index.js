import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter} from 'react-router-dom'

import AjaxFunction from './network/ajax'

global.apiUrl = "http://localhost:3000/api/v1"
global.lang = 'ru'
global.sendRequest = AjaxFunction

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register()
