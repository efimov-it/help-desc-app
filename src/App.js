import React from 'react';
import {connect} from 'react-redux'
import {
  withRouter,
  Switch,
  Route
} from 'react-router-dom'

import mapStateToProps from './store/mapStateToProps'
import mapDispatchToProps from './store/mapDispatchToProps'

import Header from './components/header'
import Footer from './components/footer'
import Menu from './components/menu'
import Modals from './components/modals'
import LoadingIndicator from './components/loadingIndicator'
import Auth from './views/auth'

import mainRoutes from './routes/mainRoutes'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isReady: false
    }
  }
  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.createModal({
        content: LoadingIndicator
      })
      global.sendRequest({
        url: '/profile/',
        headers: {
            token
        }
      })
      .then(resp=>{
        this.props.closeModal()
        localStorage.setItem('token', token)
        this.props.login(token)
        this.props.setUserData({
            fullName: resp.full_name,
            login: resp.login,
            mail: resp.mail,
            role: resp.user_type,
            post: resp.user_post
        })
        this.setState({
          isReady: true
        })
        switch (resp.user_type) {
            case 0 : return this.props.setAdminMenu()
            case 1 : return this.props.setModeratorMenu()
            case 2 : return this.props.setUserMenu()
            default : return this.props.setGuestMenu()
        }
      })
      .catch(err=>{
        this.props.closeModal()
        localStorage.removeItem('token')
        this.props.createResultModal(err, 'error')
        this.props.history.push('/')
        this.setState({
          isReady: true
        })
      });
    }
    else {
      this.setState({
        isReady: true
      })
    }
  }

  interfaceClick (e) {
    if (e.target.nodeName !== "TEXTAREA" && e.target.nodeName !== "INPUT") {
      e.preventDefault()
    }
  }

  render () {
    return (
        <div
          className="app"
          onContextMenu={e=>this.interfaceClick.apply(this, [e])}
        >
          {
            this.state.isReady ?
              (<>
                <Header />
                <Switch>
                  {
                    mainRoutes.map(({path, component}, i) => (
                      <Route
                        path={path}
                        component={component}
                        key={i}
                        exact={path === '/'}
                      />
                    ))
                  }
                </Switch>
                {
                  this.props.location.pathname === '/' ?
                  <Footer /> : ''
                }
                <Menu authView={Auth} />
                <Modals />
              </>)
            : <LoadingIndicator />
          }
        </div>
    )
  }
};

export default connect(
  mapStateToProps('app'),
  mapDispatchToProps('app')
)(withRouter(App))