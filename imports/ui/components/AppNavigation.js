import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router";
import PublicNavigation from "./PublicNavigation.js";
import AuthenticatedNavigation from "./AuthenticatedNavigation.js";
import ReactSVG from 'react-svg'



const renderNavigation = hasUser =>
  hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />;

const AppNavigation = ({ hasUser }) => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
          <ReactSVG
            src="/healthfitness.svg"
            evalScripts="always"
            onInjected={svg => {
              //console.log('onInjected', svg)
            }}
            renumerateIRIElements={false}
            svgClassName="svg-class-name"
            svgStyle={{ width: 200 }}
            className="wrapper-class-name hidden-xs hidden-sm hidden-md hidden-lg"
            onClick={() => {
              //console.log('wrapper onClick')
            }}
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>{renderNavigation(hasUser)}</Navbar.Collapse>
  </Navbar>
);

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object
};

export default AppNavigation;
