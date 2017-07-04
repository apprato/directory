import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = () => (
  <div>
    <Nav pullRight>
      <LinkContainer to="/directory">
        <NavItem eventKey={ 2 } href="/directory">Directory</NavItem>
      </LinkContainer>
      <LinkContainer to="getstarted">
        <NavItem eventKey={ 1 } href="/getstarted">Submit Business</NavItem>
      </LinkContainer>
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 3.1 } href="/trainer/edit/experience">Edit Experience</MenuItem>
        <MenuItem eventKey={ 3.1 } href="/trainer/edit/profile">Edit Profile</MenuItem>
        <MenuItem eventKey={ 3.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

export default AuthenticatedNavigation;
