import React from 'react';
import {browserHistory, Router, Route} from 'react-router';
import {Alert, Row, Col, Panel, FormControl, Image} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';


const handleNavigation = (_id) => {
  browserHistory.push(`/directory/${_id}`);
}

const handleNavigationPager = (selected) => {
  window.location.href = '/directory/page/' + selected;
}

class TrainersList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchTerm: null};
    //this.initialpage = this.props.params._id;
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    const searchTerm = event.target.value;
    this.setState({searchTerm});
    this.props.searchQuery.set(searchTerm);
  }

  handlePageClick(data) {
    let selected = Number(data.selected + 1);
    handleNavigationPager(selected)
    /*
     let offset = Math.ceil(selected * this.props.perPage);

     this.setState({offset: offset}, () => {
     this.loadCommentsFromServer();
     });
     */
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
      <div className="Trainers-list">
        { trainers.length > 0 ? trainers.map(({_id, logo, businessName, overview, category, state, suburb, image}) => (
          <Panel>
            <Row>
              <Col xs={ 8 } sm={ 10 }>
                <a href={ "/directory/" + _id } key={ _id } onClick={ () => handleNavigation(_id) }>
                  <h2>{businessName}</h2>
                </a>
                <p>{ category }</p>
                <p>{ overview }</p>
              </Col>
              <Col xs={ 12 } sm={ 2 }>
                <p>{ state } > { suburb }</p>
                {logo ? <Image src={ '/' + 'logos' + '/' + logo } alt={ businessName } responsive /> : ''}
              </Col>
            </Row>
          </Panel>
        )) : <Alert>Sorry there are no listings found for '{ this.state.searchTerm }.'</Alert> }
        <Row>
          <ReactPaginate
            pageCount={this.props.pageCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={3}
            previousLabel={"<"}
            nextLabel={">"}
            pageNum={this.props.currentPage-1}
            initialPage={this.props.currentPage-1}
            hrefBuilder={(page) => '/directory/page/' + page }
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            disableInitialCallback="false"
          />
        </Row>
      </div>
    </div>);
  }
}

TrainersList.propTypes = {
  trainers: React.PropTypes.array,
  searchQuery: React.PropTypes.object,
};

export default TrainersList;
