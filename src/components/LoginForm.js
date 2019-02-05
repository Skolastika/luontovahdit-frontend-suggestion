import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { routes, appName } from '../constants'
import { Button, Modal, Form, Icon } from 'semantic-ui-react'
import { setUserLoggedIn } from '../reducers/userReducer'
import loginService from '../services/loginService'

class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: props.open
    }
    document.title = appName + '- Kirjaudu'
  }

  close = () => {
    this.setState({ open: false })
    this.props.history.push('/')
  }

  login = async (event) => {
    event.preventDefault()

    if (event.target.username.value.length > 0 &&
        event.target.password.value.length > 0) {
      try {
        await loginService.login({
          username: event.target.username.value,
          password: event.target.password.value
        })
        this.props.setUserLoggedIn(true)
        this.close()
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {

    return (
      <div>
        <Modal
          open={this.state.open}
          closeOnDimmerClick={false}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header>Tervetuloa!</Modal.Header>
          <Modal.Content>
            <Form onSubmit={ this.login }>
              <div>
                Käyttäjätunnus:
                <Form.Input
                  type="text"
                  name="username"
                />
              </div>
              <div>
                Salasana:
                <Form.Input
                  type="password"
                  name="password"
                />
              </div>
              <Button type="submit" icon labelPosition='right'>
                Kirjaudu sisään
                <Icon name='sign in' />
              </Button>
              <Link to={{
                  pathname: routes.register,
                  state: { open: true }
                }}
              >Rekisteröidy?</Link>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setUserLoggedIn
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))