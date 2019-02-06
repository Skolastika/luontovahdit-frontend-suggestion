import React from 'react'
import { connect } from 'react-redux'
import { Segment, Button, Icon, Divider } from 'semantic-ui-react'
import { dateFormat } from '../constants'
import { upVoteComment, downVoteComment } from '../reducers/hotspotReducer'
import VoteButton from './VoteButton'
import LoginPromptPopup from './LoginPromptPopup'

class Comments extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
        { this.props.comments.map(comment =>
          <div key={ comment.id }>
            <Segment>
              { new Date(comment.createdAt).toLocaleDateString('fi-FI', dateFormat) } lisännyt { comment.addedBy.displayname }
              <Divider hidden />
              <p>{ comment.content }</p>
              <Divider hidden />
              <LoginPromptPopup trigger = {
                <VoteButton
                  id={ comment.id }
                  vote={ this.props.upVoteComment }
                  votes={ comment.upVotes }
                  color='green'
                  icon='thumbs up'
                  compact={ true }
                />
              } />
              <LoginPromptPopup trigger = {
                <VoteButton
                  id={ comment.id }
                  vote={ this.props.downVoteComment }
                  votes={ comment.downVotes }
                  color='orange'
                  icon='thumbs down'
                  compact={ true }
                />
              } />
              <Button compact basic color='red'>
                  <Icon name='flag' />
              </Button>
            </Segment>
            <Divider hidden />
          </div>
        ) }
      </div>
    )
  }
}

const mapDispatchToProps = {
  upVoteComment,
  downVoteComment
}

export default connect(null, mapDispatchToProps)(Comments)