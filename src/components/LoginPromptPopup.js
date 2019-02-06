import React from 'react'
import { connect } from 'react-redux'
import { Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { routes } from '../constants'

class LoginPromptPopup extends React.Component {

  render() {
    if (this.props.isUserLoggedIn) {
      return this.props.trigger
    } else {
      return (
        <Popup
          trigger={ this.props.trigger }
          content={
            <Link to={ routes.login }>Kirjaudu sisään? <Icon name='sign in' /></Link>
          }
          on='click'
          hoverable
          position='top right'
        />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.user.isUserLoggedIn
  }
}

export default connect(mapStateToProps)(LoginPromptPopup)
