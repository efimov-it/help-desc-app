import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Header from './components/header'
import Menu from './components/menu'

import MainPage from './views/main-page'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      menuIsShown: false
    }

    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  openMenu () {
    this.setState({
      menuIsShown: true
    })
  }

  closeMenu () {
    this.setState({
      menuIsShown: false
    })
  }

  render () {
    let menuItems = [
      {
        text: 'Подать заявку',
        icon: 'edit',
        event: () => {
          alert(1)
        }
      },
      {
        text: 'Проверить заявку',
        icon: 'assignment_turned_in',
        event: () => {
          alert(2)
        }
      }
    ]
    return (
      <Router>
        <div className="app">
          <Header menuClick={this.openMenu} />

          <Switch>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
          
          { this.state.menuIsShown ? <Menu menuItems={menuItems}
                                           closeMenu={this.closeMenu} /> : '' }

          <footer className="footer" >
            <a className="footer_link link link__white"
               href="https://stankin.ru/"
               target="_blank"
               rel="noopener noreferrer">
                 МГТУ "Станкин" © {new Date().getFullYear()}
            </a>
            <Link className="footer_link link link__white"
                  to="/license/">
                 Лицензионное соглашение
            </Link>
            <a className="footer_link link link__white"
               href="https://github.com/efimov-it/"
               target="_blank"
               rel="noopener noreferrer">
                 Разработка
            </a>
          </footer>
        </div>
      </Router>
    )
  }
};
