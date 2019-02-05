import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { routes, appName } from '../constants'
import { Button, Modal, Form, Segment } from 'semantic-ui-react'
import loginService from '../services/loginService'

class RegisterForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: props.open,
      username: '',
      password: '',
      passwordConf: '',
      displayname: '',
      email: '',
      usernameError: false,
      passwordError: false,
      displaynameError: false,
      emailError: false,
      errorMessages: []
    }

    document.title = appName + '- Rekisteröidy'
  }

  close = () => {
    this.setState({
      open: false,
      username: '',
      password: '',
      passwordConf: '',
      displayname: '',
      email: '',
      usernameError: false,
      passwordError: false,
      displaynameError: false,
      emailError: false,
      errorMessages: []
    })
    this.props.history.push(routes.login)
  }

  register = async (event) => {
    event.preventDefault()

    this.setState({
      usernameError: false,
      passwordError: false,
      displaynameError: false,
      emailError: false
    })

    if (this.state.username.length < 6) {
      await this.setState({
        usernameError: true,
        errorMessages: this.state.errorMessages.concat('Käyttäjätunnuksen täytyy olla vähintään 6 merkkiä pitkä.')
      })
    }
    if (this.state.password.length < 8 ||
        this.state.password !== this.state.passwordConf) {
      await this.setState({
        passwordError: true,
        errorMessages: this.state.errorMessages.concat('Salasanan täytyy olla vähintään 8 merkkiä pitkä.')
      })
    }
    if (this.state.displayname.length < 6) {
      await this.setState({
        displaynameError: true,
        errorMessages: this.state.errorMessages.concat('Käyttäjänimen täytyy olla vähintään 6 merkkiä pitkä.')
      })
    }
    if (this.state.email.length < 6) {
      await this.setState({
        emailError: true,
        errorMessages: this.state.errorMessages.concat('Anna toimiva sähköpostiosoite.')
      })
    }

    if (this.state.usernameError ||
        this.state.passwordError ||
        this.state.displaynameError ||
        this.state.emailError) {

      return

    } else {
      const userObject = {
        username: this.state.username,
        password: this.state.password,
        displayname: this.state.displayname,
        email: this.state.email
      }

      try {
        await loginService.register(userObject)
        this.close()

      } catch (error) {
        console.log('Virhe rekisteröinnissä...')
        console.log(error)
        if (error.response.status === 409) {
          if (error.response.data.message === 'username or email address already in use ') {
            this.setState({
              errorMessages: ['Annettua sähköpostiosoitetta on jo käytetty rekisteröitymiseen.']
            })
          } else {
            this.setState({
              errorMessages: ['Käyttäjätunnusta ei voitu rekisteröidä. Tarkista tiedot.']
            })
          }
        }
      }
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const showWhenError = { display: this.state.errorMessages.length > 0 ? '' : 'none' }

    console.log('open ' + this.state.open)
    return (
      <div>
        <Modal
          open={this.state.open}
          closeOnDimmerClick={false}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header>Rekisteröidy käyttäjäksi</Modal.Header>
          <Modal.Content>
            <Segment style={ showWhenError } color='red' inverted secondary>
              Huomioithan seuraavat:
              <ul>
                { this.state.errorMessages.map(error => {
                  return (<li key={error}>{error}</li>)
                })
                }
              </ul>
            </Segment>
            <Form onSubmit={ this.register }>
              <Form.Field>
                Käyttäjätunnus:
                <Form.Input
                  type="text"
                  name="username"
                  error={ this.state.usernameError }
                  onChange={ this.handleChange }
                  attached='top'
                />                
              </Form.Field>
              <div>
                Salasana:
                <Form.Input
                  type="password"
                  name="password"
                  error={ this.state.passwordError }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                Salasana uudelleen:
                <Form.Input
                  type="password"
                  name="passwordConf"
                  error={ this.state.passwordError }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                Nimimerkki:
                <Form.Input
                  type="text"
                  name="displayname"
                  error={ this.state.displaynameError }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                Sähköpostiosoite:
                <Form.Input
                  type="text"
                  name="email"
                  error={ this.state.emailError }
                  onChange={ this.handleChange }
                />
              </div>
              <Button type="submit">
                Rekisteröidy
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default withRouter(RegisterForm)