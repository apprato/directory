import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const onNavItemClick = () => {
  $(".navbar-collapse").collapse('hide');
};

const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="/directory" onClick={ onNavItemClick }>
      <NavItem eventKey={ 2 } href="/directory" >Directory</NavItem>
    </LinkContainer>
    <LinkContainer to="getstarted" onClick={ onNavItemClick }>
      <NavItem eventKey={ 1 } href="/getstarted">Submit Business</NavItem>
    </LinkContainer>
    <LinkContainer to="login" onClick={ onNavItemClick }>
      <NavItem eventKey={ 2 } href="/login">Sign In</NavItem>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;
