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

import mainRoutes from './routes/mainRoutes'

class App extends React.Component {
  render () {
    return (
        <div className="app">
          <Header />
          <Switch>
            {
              mainRoutes.map((route, i) => (
                <Route
                  path={route.path}
                  component={route.component}
                  key={i}
                />
              ))
            }
          </Switch>
          <Footer />
          <Menu />
          <Modals />
        </div>
    )
  }
};

export default connect(
  mapStateToProps('app'),
  mapDispatchToProps('app')
)(withRouter(App));