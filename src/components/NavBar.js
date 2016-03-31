import React from 'react'
import { IndexLink, Link } from 'react-router'
import config from '../config'
import {
  Fixed,
  NavItem,
  Space,
  Toolbar } from 'rebass'

const NavBar = ({ user }) => (
  <Fixed top left right zIndex={1} className="shadow" >
    <Toolbar>
      <NavItem Component={IndexLink} to="/" children={config.app.title} />
      <Space auto />
      {user && <NavItem Component={Link} to="/chat" eventKey={1} children="Chat" />}
      <NavItem Component={Link} to="/gallery" eventKey={7} children="Gallery" />
      <Space />
      {!user && <NavItem Component={Link} to="/login" eventKey={5} children="Login" />}
      {user && <NavItem Component={Link} to="/logout" eventKey={6} className="logout-link" onClick={this.handleLogout} children="Logout" />}
      {user && <p>Logged in as <strong>{user.name}</strong>.</p>}
    </Toolbar>
  </Fixed>
)

export default NavBar
