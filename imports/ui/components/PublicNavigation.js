import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="/clients">
      <NavItem eventKey={ 2 } href="/clients">Directory</NavItem>
    </LinkContainer>
    <LinkContainer to="getstarted">
      <NavItem eventKey={ 1 } href="/getstarted">Submit Business</NavItem>
    </LinkContainer>
    <LinkContainer to="login">
      <NavItem eventKey={ 2 } href="/login">Sign In</NavItem>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;