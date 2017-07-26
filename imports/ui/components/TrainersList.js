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
    console.log(this.props.area);
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
    // Listing based switch
    const area = this.props.area;
    const page = this.props.page
    console.log('areaaaaa: ' + area);
    var category = this.props.category;
    var search = this.props.search;

    if (area) {
      var hrefBuilder = '/directory/area/' + area + '/page/' + this.props.skipCount;
    }


    return (<div className="Trainers">
      <div className="TrainerSearch">
        <Row>
          <Col xs={ 12 } sm={ 8 }>
          <i className="fa fa-search"/>
          <FormControl
            type="search"
            onKeyUp={ this.handleSearch }
            placeholder="Find Health & Fitness"
            className="Search"
          />
          </Col>
          <Col xs={ 12 } sm={ 4 }>
            <FormControl
              componentClass="select"
              placeholder="select"
              ref="state"
              name="state"
            >
              <option value="">State</option>
              <option value="ACT" title="Australian Capital Territory">Australian Capital Territory</option>
              <option value="NSW" title="New South Wales">New South Wales</option>
              <option value="VIC" title="Northern Territory">Northern Territory</option>
              <option value="QLD" title="Queensland">Queensland</option>
              <option value="SA" title="South Australia">South Australia</option>
              <option value="TAS" title="Tasmania">Tasmania</option>
              <option value="VICc" title="Victoria">Victoria</option>
              <option value="WA" title="Western Australia">Western Australia</option>
            </FormControl>

          </Col>
        </Row>
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
            hrefBuilder={(page) => hrefBuilder + page }
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
