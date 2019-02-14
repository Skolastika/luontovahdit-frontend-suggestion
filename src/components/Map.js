import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { routes } from '../constants'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { setNewCoordinates } from '../reducers/hotspotReducer'
import { addHotspot } from '../reducers/mapReducer'
import { Icon } from 'semantic-ui-react'

class Map extends React.Component {

  async componentDidMount() {

    mapboxgl.accessToken = process.env.REACT_APP_MAPTOKEN

    // restrict map to Finland
    // [west, south, east, north] 
    const bounds = [ 19.274990495527675, 59.64523662578557,
      31.618656929369678, 70.13546651354179]

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [24.7385109, 60.11021], // default to approximately Helsinki
      zoom: 10,
      maxBounds: bounds
    })

    const locateSuccess = (position) => {
      this.map = this.map.setCenter([position.coords.longitude, position.coords.latitude])
    }

    const locateFail = (error) => console.log(error)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locateSuccess, locateFail)
    }

    this.map.addControl(new MapboxLanguage({  defaultLanguage: 'mul' }))


    // Geocoder

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      language: 'FI',
      country: 'FI',
      bbox: bounds,
      placeholder: 'Etsi...'
    })

    geocoder.on('result', (e) => {
      console.log(e)
      console.log(e.result.geometry.coordinates)
    })

    this.map.addControl(geocoder)


    // Map events

    this.map.on('load', () => {
      this.map.addSource('hotspots', {
        "type": "geojson",
        "data": {
        "type": "FeatureCollection",
        "features": this.props.hotspots
        }
      })

      this.map.addLayer({
        "id": "hotspot",
        "source": "hotspots",
        "type": "symbol",
        "layout": {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true
        }
      })

    })

    this.map.on('click', 'hotspot', (e) => {
      e.originalEvent.cancelBubble = true
      this.props.history.push(routes.hotspots + '/' + e.features[0].properties.id)
    })

    this.map.on('click', (e) => {
      if (e.originalEvent.cancelBubble){
        return
      }
      console.log(e.lngLat.lng + ' ' + e.lngLat.lat)
      if (this.props.isUserLoggedIn) {
        this.props.setNewCoordinates([ e.lngLat.lng, e.lngLat.lat ])
        this.props.history.push(routes.addHotspot)
      } else {
        // TODO: add styles for .mapboxgl-popup
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`<a href="${ routes.login }">Kirjaudu sisään?</a>`)
          .addTo(this.map)
      }

    })
  }

  componentDidUpdate() {
    const source = this.map.getSource('hotspots')
    
    if (source) {
      this.map.getSource('hotspots').setData({
        "type": "FeatureCollection",
        "features": this.props.hotspots
      })
    }
  }

  render() {
    const mapStyle = {
      position: 'absolute',
      top:0,
      bottom:0,
      width:'100%',
      height:'100%',
      textAlign: 'left',
      marginTop: '43px',
      zIndex: 10
    }
    return (
      <div id='map' style={mapStyle} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hotspots: state.map.hotspots,
    isUserLoggedIn: state.user.isUserLoggedIn
  }
}

const mapDispatchToProps = {
  setNewCoordinates,
  addHotspot
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map))