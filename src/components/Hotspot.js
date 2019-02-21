import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Modal, Icon, Divider, Popup } from 'semantic-ui-react'
import { upVoteHotspot, downVoteHotspot } from '../reducers/hotspotReducer'
import Comments from './Comments'
import Togglable from './Togglable'
import CommentForm from './CommentForm'
import VoteButton from './VoteButton'
import LoginPromptPopup from './LoginPromptPopup'
import { appName } from '../constants'

class Hotspot extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: props.open
    }

    if (props.hotspot) {
      document.title = appName + '- ' + props.hotspot.title
    }
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
              <LoginPromptPopup trigger={
                <VoteButton
                  id={ hs.id }
                  vote={ this.props.upVoteHotspot }
                  votes={ hs.upVotes }
                  color='green'
                  icon='thumbs up'
                />
              } />
              <LoginPromptPopup trigger={
                <VoteButton
                  id={ hs.id }
                  vote={ this.props.downVoteHotspot }
                  votes={ hs.downVotes }
                  color='orange'
                  icon='thumbs down'
                />
               } />
              <Button basic color='red'>
                    <Icon name='flag' />
              </Button>
              <span style={ { paddingLeft: '5px' } }>lisännyt { hs.addedBy.name }</span>
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