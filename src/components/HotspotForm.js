import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Modal, Form, TextArea } from 'semantic-ui-react'
import { addHotspot } from '../reducers/hotspotReducer'
import { addHotspot as addHotspotToMap } from '../reducers/mapReducer'
import { appName } from '../constants'

class HotspotForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: props.open
    }

    document.title = appName + '- Lisää kohde'
  }

  close = () => {
    this.setState({ open: false })
    this.props.history.push('/')
  }

  addHotspot = async (event) => {
    event.preventDefault()

    if (event.target.title.value.length > 0 &&
        event.target.description.value.length > 0) {

      const hotspotObject = {
        title: event.target.title.value,
        description: event.target.description.value,
        location: {
          type: 'Point',
          coordinates: this.props.coordinates
        }
      }

      event.target.title.value = ''
      event.target.description.value = ''

      await this.props.addHotspot(hotspotObject)

      if (this.props.error) {
        console.log('Error adding hotspot...')
        console.log(this.props.error)
      } else {
        console.log('Added hotspot!')
        console.log(this.props.newHotspot)
        this.props.addHotspotToMap(this.props.newHotspot)
        this.close()
      }
    }
  }

  render() {
    console.log('open ' + this.state.open)
    return (
      <div>
        <Modal
          open={this.state.open}
          closeOnDimmerClick={false}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header>Lisää kohde</Modal.Header>
          <Modal.Content>
            <Form onSubmit={ this.addHotspot }>
              <div>
                Kohteen nimi:
                <Form.Input
                  type="text"
                  name="title"
                />
              </div>
              <div>
                Havainto:
                <TextArea
                  name="description"
                  style={{ minHeight: 100 }} />
              </div>
              <Button type="submit">
                Lisää
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newHotspot: state.hotspot.newHotspot,
    error: state.hotspot.error
  }
}

const mapDispatchToProps = {
  addHotspot,
  addHotspotToMap
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotspotForm))