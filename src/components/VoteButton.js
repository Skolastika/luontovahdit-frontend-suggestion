import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'

const VoteButton = ({ id, vote, votes, color, icon, compact, ...rest }) => (
  <Button as='div' labelPosition='right' { ...rest }>
    <Button
      basic
      color={ color }
      type='button'
      onClick={ () => vote(id) }
      compact={ compact }
    >
      <Icon name={ icon } />
    </Button>
    <Label as='a' basic pointing='left'>
      { votes }
    </Label>
  </Button>
)

export default VoteButton
