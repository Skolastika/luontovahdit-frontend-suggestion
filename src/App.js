import React from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import Map from './components/Map'
import MenuBar from './components/MenuBar'
import HotspotForm from './components/HotspotForm'
import Hotspot from './components/Hotspot'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { initialiseHotspots } from './reducers/hotspotReducer'
import { setHotspotsOnMap } from './reducers/mapReducer'
import { routes, appName } from './constants'
import { checkUserSession } from './reducers/userReducer'



class App extends React.Component {

  async componentDidMount() {
    await this.props.initialiseHotspots()
    if (this.props.hotspots) {
      console.log(this.props.hotspots)
      this.props.setHotspotsOnMap(this.props.hotspots)
    }
    this.props.checkUserSession()
  }

  render() {
    const hotspotById = (id) => {
      const hotspot = this.props.hotspots.find(hotspot => hotspot.id === id)
      return hotspot
    }

    document.title = appName
    return (
      <div>
        <div>
          <MenuBar />
        </div>
        <div>
          <Map />
        </div>
        <Route exact
          path={ `${routes.hotspots}/:id` }
          render={ ({ match }) =>
            <Hotspot
              open={ true }
              hotspot={ hotspotById(match.params.id) }
            />
          }
        />
        <Route exact path={ routes.addHotspot } render={ ({ match }) =>
          <HotspotForm
            open={ true }
            coordinates={ this.props.coordinates }
          /> }
        />
        <Route exact path={ routes.login } render={ ({ match }) =>
          <LoginForm open={ true } /> }
        />
        <Route exact path={ routes.register } render={ ({ match }) =>
          <RegisterForm open={ true } /> }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hotspots: state.hotspot.hotspots,
    coordinates: state.hotspot.newCoordinates
  }
}

const mapDispatchToProps = {
  initialiseHotspots,
  setHotspotsOnMap,
  checkUserSession
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
