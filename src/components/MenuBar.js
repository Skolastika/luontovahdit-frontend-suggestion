import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { routes, appName } from '../constants'
import { Menu, Dropdown, Icon, Container } from 'semantic-ui-react'
import { setUserLoggedIn } from '../reducers/userReducer'
import loginService from '../services/loginService'

class MenuBar extends React.Component {

  logout = async () => {
    await loginService.logout()
    this.props.setUserLoggedIn(false)
  }

  render() {

    const subMenu = () => {
      if (this.props.isUserLoggedIn) {
        return (
          <Dropdown item icon='bars' direction='left'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={ this.logout }>
                Kirjaudu ulos
                <Icon style={{ paddingLeft: '5px' }} name='log out' />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
      } else {
        return (
          <Menu.Item as={NavLink} exact to={ routes.login }>
            <Icon name='sign in' />
          </Menu.Item>
        )
        /*return (
          <Menu.Item onClick={ this.props.showLoginForm }>
            <Icon name='sign in' />
          </Menu.Item>
        )*/
      }
    }

    return (
      <Menu attached='top' tabular>
        <Container>
          <Menu.Item>{ appName }</Menu.Item>
          <Menu.Menu position='right'>
            { subMenu() }
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.user.isUserLoggedIn
  }
}

const mapDispatchToProps = {
  setUserLoggedIn
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuBar))