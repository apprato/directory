import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';


const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const onNavItemClick = () => {
  $(".navbar-collapse").collapse('hide');
};

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));


const AuthenticatedNavigation = () => (
  <div>
    <Nav pullRight>
      <LinkContainer to="/directory">
        <NavItem eventKey={ 2 } href="/directory" onClick={ onNavItemClick } data-toggle="dropdown" >Directory</NavItem>
      </LinkContainer>
      <LinkContainer to="getstarted">
        <NavItem eventKey={ 1 } href="/getstarted" onClick={ onNavItemClick }>Submit Business</NavItem>
      </LinkContainer>
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 3.1 } href="/trainer/edit/experience" onClick={ onNavItemClick }>Edit Profile Categorisation</MenuItem>
        <MenuItem eventKey={ 3.1 } href="/trainer/edit/profile" onClick={ onNavItemClick }>Edit Profile</MenuItem>
        <MenuItem eventKey={ 3.1 } onClick={ handleLogout } >Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

export default AuthenticatedNavigation;
