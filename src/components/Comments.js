import React from 'react'
import { connect } from 'react-redux'
import { Segment, Button, Icon, Divider, Header, Dropdown } from 'semantic-ui-react'
import { dateFormat } from '../constants'
import { upVoteComment, downVoteComment } from '../reducers/hotspotReducer'
import VoteButton from './VoteButton'
import LoginPromptPopup from './LoginPromptPopup'

class Comments extends React.Component {

  constructor(props) {
    super(props)

    this.sortOrder = () => {}
    this.state = {
      selectedSort: 'vanhin'
    }
  }

  sortComments = (event, data) => {
    event.preventDefault()
    this.setState({ selectedSort: data.value })
    this.sortOrder = data.value === 'vanhin'
    ? (a, b) => {
        if (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) {
          return 1
        } else {
          return -1
        }
      }
    : (a, b) => {
        if (new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()) {
          return 1
        }
        else {
          return -1
        }
      }
      console.log(this.sortOrder)
  }

  render() {

    return (
      <div>
        <div style={{ paddingBottom: '20px' }}>
        <Header as='h3' floated='left'>Kommentit</Header>
        <Dropdown basic selection
          options={[
            {
              text: 'Vanhimmat ensin',
              value: 'vanhin'
            },
            {
              text: 'Uusimmat ensin',
              value: 'uusin'
            }
          ]}
          defaultValue='vanhin'
          onChange={ this.sortComments }
          compact
          style={{ float: 'right', marginTop: '-5px' }}
        />
        </div>
        <Divider hidden />
        { [].concat(this.props.comments).sort(this.sortOrder).map(comment =>
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