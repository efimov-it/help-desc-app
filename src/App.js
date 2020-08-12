import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Axios from 'axios'

import Header from './components/header'
import Menu from './components/menu'
import Modal from './components/modal'

import Auth from './views/auth'
import AddApplication from './views/add-application'
import ApplicationStatus from './views/application-status'

import MainPage from './views/main-page'
import License from './views/license'
import ControlPanel from './views/control-panel'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      menuIsShown: false,
      modals: [],
      menuItems: [
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
    }

    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.createModal = this.createModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.showAuth = this.showAuth.bind(this)
    this.modalError = this.modalError.bind(this)
    this.modalSubmit = this.modalSubmit.bind(this)
    this.applicationStatus = this.applicationStatus.bind(this)
    this.createApplication = this.createApplication.bind(this)
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



  showAuth () {
    this.createModal(Auth, 'Авторизация')
  }

  createModal (content, header, data) {
    const modals = this.state.modals;
    modals.push({
      header,
      content,
      data,
      isShown: true
    })
    this.setState({
      modals
    })
  }
  closeModal (id) {
    const modals = this.state.modals
    modals.splice(id, 1)
    this.setState({
      modals
    })
  }
  modalError (message) {
    function Content () {
      return <p>{message}</p>
    }
    this.createModal(Content, 'Ошибка');
  }
  modalSubmit (id, config) {
    switch (config.func) {
      case 'auth' :
        this.closeModal(id)
        this.closeMenu()
        this.refs.routerRef.history.push('/control-panel');
        let userMenu = [
          {
            text: 'Панель управления',
            icon: 'dashboard',
            event: () => {
              this.refs.routerRef.history.push('/control-panel');
            }
          },
          {
            text: 'Профиль',
            icon: 'person',
            event: () => {
              alert('Профиль')
            }
          }
        ];

        userMenu.push({
          text: 'Мои заявки',
          icon: 'assignment',
          event: () => {
            alert('Мои заявки')
          }
        })

        this.setState({
          menuItems: userMenu
        })
      break;

      default:
        this.closeModal(id)
      break;
    }
  }

  applicationStatus (value) {
    if (value) {
      Axios({
        method: 'GET',
        url: global.apiUrl + '/applications/status/?key=' + value
      }).then((response)=>{
        const data = response.data

        if (data.status === 'success') {
          this.createModal(ApplicationStatus, 'Статус заявки', {
            ...data.data
          })
        }
        else {
          switch (data.message) {

            default:
              this.modalError('Произошла сетевая ошибка. Перезапустите страницу и попробуйте снова.')
            break;
          }
        }
      }).catch(()=>{
        this.modalError('Произошла сетевая ошибка. Перезапустите страницу и попробуйте снова.')
      })
    }
    else {
      this.modalError('Вы не указали номер заявки.')
    }
  }

  createApplication () {
    this.createModal(AddApplication, 'Новая заявка');
  }

  render () {
    return (
      <Router ref="routerRef">
        <div className="app">
          <Header menuClick={this.openMenu} />

          <Switch>
            <Route path="/license">
              <License />
            </Route>
            
            <Route path="/control-panel">
              <ControlPanel />
            </Route>
            
            <Route path="/">
              <MainPage applicationStatus={(value)=>{this.applicationStatus(value)}}
                        createApplication={this.createApplication}/>
            </Route>
          </Switch>

          <footer className="footer" >
            <a className="footer_link link link__white"
               href="https://stankin.ru/"
               target="_blank"
               rel="noopener noreferrer">
                 МГТУ "Станкин" © {new Date().getFullYear()}
            </a>
            <Link className="footer_link link link__white"
                  to="/license">
                 Лицензионное соглашение
            </Link>
            <a className="footer_link link link__white"
               href="https://github.com/efimov-it/"
               target="_blank"
               rel="noopener noreferrer">
                 Разработка
            </a>
          </footer>
          
          
          { this.state.menuIsShown ? <Menu menuItems={this.state.menuItems}
                                           closeMenu={this.closeMenu}
                                           auth={this.showAuth} /> : '' }

          { this.state.modals ?
            this.state.modals.map((modal, id)=>{
              return (
                <Modal header={modal.header}
                       close={()=>{this.closeModal(id)}}
                       key={id}>
                  <modal.content modalId={id}
                                 modalData={modal.data}
                                 modalError={this.modalError}
                                 modalSubmit={this.modalSubmit}/>
                </Modal>
              )
            }) 
          : ''}
        </div>
      </Router>
    )
  }
};
