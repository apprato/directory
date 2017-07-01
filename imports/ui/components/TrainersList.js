import React from 'react';
import {browserHistory} from 'react-router';
import {Alert, Row, Col, Panel, FormControl, Image} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';


const handleNavigation = (_id) => {
  browserHistory.push(`/directory/${_id}`);
}

class TrainersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: null};
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleNav = this.handleNav.bind(this);
  }

  handleSearch(event) {
    const searchTerm = event.target.value;
    this.setState({searchTerm});
    this.props.searchQuery.set(searchTerm);
  }

  render() {
    const {trainers} = this.props;
    return (<div className="Trainers">
      <div className="TrainerSearch">
        <i className="fa fa-search"/>
        <FormControl
          type="search"
          onKeyUp={ this.handleSearch }
          placeholder="Find Health & Fitness"
          className="Search"
        />
      </div>
      <div>
        <Row>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            pageNum={5}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Row>
      </div>
      <div className="Trainers-list">
        { trainers.length > 0 ? trainers.map(({_id, businessName, overview, category, state, suburb, image}) => (
          <Panel>
            <Row>
              <Col xs={ 12 } sm={ 12 }>
                <a href={ "/directory/" + _id } key={ _id } onClick={ () => handleNavigation(_id) }>
                  <h2>{businessName}</h2>
                </a>
              </Col>
              <Col xs={ 12 } sm={ 9 }>
                <p>{ category }</p>
                <p>{ overview }</p>
              </Col>
              <Col xs={ 12 } sm={ 3 }>
                <p>{ state } > { suburb }</p>
              </Col>
            </Row>
          </Panel>
        )) : <Alert>Sorry there are no listings found for '{ this.state.searchTerm }.'</Alert> }
      </div>
    </div>);
  }
}

TrainersList.propTypes = {
  trainers: React.PropTypes.array,
  searchQuery: React.PropTypes.object,
};

export default TrainersList;
