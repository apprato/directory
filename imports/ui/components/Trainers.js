import React from 'react';
import { browserHistory } from 'react-router';
import { Alert, Row, Col, Panel, FormControl, Image, ListGroupItem } from 'react-bootstrap';

const handleNavigation = (_id) => {
  browserHistory.push(`/clients/${_id}`);
}

class Trainers extends React.Component {
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
    const { trainers } = this.props;
    return (<div className="Trainers">
      <div className="TrainerSearch">
        <i className="fa fa-search" />
        <FormControl
          type="search"
          onKeyUp={ this.handleSearch }
          placeholder="Find Health & Fitness"
          className="Search"
        />
      </div>
      <div className="Trainers-list">
        { trainers.length > 0 ? trainers.map(({ _id, title, description, height, weight, sex, image }) => (
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
        )) : <Alert>Sorry there are no trainers found for '{ this.state.searchTerm }.'</Alert> }
      </div>
    </div>);
  }
}

Trainers.propTypes = {
  trainers: React.PropTypes.array,
  searchQuery: React.PropTypes.object,
};

export default Trainers;
