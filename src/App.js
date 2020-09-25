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
import Auth from './views/auth'

import mainRoutes from './routes/mainRoutes'

class App extends React.Component {
  render () {
    return (
        <div className="app">
          <Header />
          <Switch>
            {
              mainRoutes.map(({path, component}, i) => (
                <Route
                  exact
                  path={path}
                  component={component}
                  key={i}
                />
              ))
            }
          </Switch>
          <Footer />
          <Menu authView={Auth} />
          <Modals />
        </div>
    )
  }
};

export default connect(
  mapStateToProps('app'),
  mapDispatchToProps('app')
)(withRouter(App));