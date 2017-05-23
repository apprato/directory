import React from 'react';
import { browserHistory } from 'react-router';
import { Alert, Row, Col, Panel, FormControl, Image, ListGroupItem } from 'react-bootstrap';

const handleNavigation = (_id) => {
  browserHistory.push(`/clients/${_id}`);
}

class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: null };
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleNav = this.handleNav.bind(this);
  }

  handleSearch(event) {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
    this.props.searchQuery.set(searchTerm);
  }

  render() {
    const { clients } = this.props;
    return (<div className="Clients">
      <div className="ClientSearch">
        <i className="fa fa-search" />
        <FormControl
          type="search"
          onKeyUp={ this.handleSearch }
          placeholder="Find your client to work with?"
          className="Search"
        />
      </div>
      <div className="Clients-list">
        { clients.length > 0 ? clients.map(({ _id, title, description, height, weight, sex, image }) => (
          <Panel header={`${title} - ${sex}`}>
            <Row>
              <Col xs={ 12 } sm={ 3 }>
                <Image src={ image } alt={ title } responsive />
              </Col>
              <Col xs={ 12 } sm={ 9 }>
                <p><strong>Description:</strong> { description }</p>
                <p>{ height }</p>
                <p>{ weight }</p>
                <p>{ sex }</p>
                <a key={ _id } onClick={ () => handleNavigation (_id) }>
                  View Profile
                </a>
              </Col>
            </Row>
          </Panel>
        )) : <Alert>Sorry there are no clients found for '{ this.state.searchTerm }.'</Alert> }
      </div>
    </div>);
  }
}

Clients.propTypes = {
  clients: React.PropTypes.array,
  searchQuery: React.PropTypes.object,
};

export default Clients;
