import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Modal, Icon, Label, Divider } from 'semantic-ui-react'
import { upVoteHotspot, downVoteHotspot } from '../reducers/hotspotReducer'
import Comments from './Comments'
import Togglable from './Togglable'
import CommentForm from './CommentForm'
import { appName } from '../constants'

class Hotspot extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: props.open
    }

    document.title = appName + '- ' + props.hotspot.title
  }

  close = () => {
    this.setState({ open: false })
    this.props.history.push('/')
  }

  render() {

    if (this.props.hotspot) {
      const hs = this.props.hotspot

      const showCommentButton = () => {
        if (this.props.isUserLoggedIn) {
          return (
            <Togglable buttonLabel="Kommentoi">
              <CommentForm hotspotId={ hs.id } />
            </Togglable>
          )
        } else {
          return null
        }
      }

      return (
        <div>
          <Modal
            open={ this.state.open }
            closeOnDimmerClick={ false }
            onClose={ this.close }
            closeIcon
          >
            <Modal.Header>{ hs.title }</Modal.Header>
            <Modal.Content>
              <Button as='div' labelPosition='right'>
                <Button
                  basic
                  color='green'
                  type='button'
                  onClick={ () => this.props.upVoteHotspot(hs.id) }
                >
                  <Icon name='thumbs up' />
                </Button>
                <Label as='a' basic pointing='left'>
                  { hs.upVotes }
                </Label>
              </Button>
              <Button as='div' labelPosition='right'>
                <Button
                  basic
                  color='orange'
                  type='button'
                  onClick={ () => this.props.downVoteHotspot(hs.id) }
                >
                  <Icon name='thumbs down' />
                </Button>
                <Label as='a' basic pointing='left'>
                  { hs.downVotes }
                </Label>
              </Button>
              <Button basic color='red'>
                  <Icon name='flag' />
              </Button>
              lisännyt { hs.addedBy.name }
              <Divider hidden />
              { hs.description }
              <Divider hidden />
              { showCommentButton() }
              <Comments comments={ hs.comments } />
            </Modal.Content>
          </Modal>
        </div>
      )
    } else {
      return (
        <div>
          <Modal
            open={this.state.open}
            closeOnDimmerClick={false}
            onClose={this.close}
            closeIcon
          >
            <Modal.Header>Kohdetta ei löytynyt!</Modal.Header>
            <Modal.Content>
              <p>Jotain meni pieleen.</p>
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.user.isUserLoggedIn
  }
}

const mapDispatchToProps = {
  upVoteHotspot,
  downVoteHotspot
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hotspot))