import React from "react";
import { browserHistory, Router, Route, MenuItem } from "react-router";
import {
  Alert,
  Row,
  Col,
  Panel,
  FormControl,
  Image,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "react-select/dist/react-select.css";

const handleNavigation = _id => {
  browserHistory.push(`/directory/${_id}`);
};

const handleNavigationPager = (selected, filterSearch, filterCategory) => {
  if (filterCategory) {
    browserHistory.push(
      "/directory/category/" + filterCategory + "/page/" + selected
    );
  } else if (filterSearch) {
    browserHistory.push(
      "/directory/search/" + filterSearch + "/page/" + selected
    );
  } else {
    browserHistory.push("/directory/page/" + selected);
  }
};

class TrainersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryTerm: props.params.category,
      searchTerm: props.params.search,
      stateTerm: props.params.state
    };
    this.handleSearchEnter = this.handleSearchEnter.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryTerm: nextProps.params.category,
      searchTerm: nextProps.params.search,
      stateTerm: nextProps.params.state
    });
  }

  componentDidMount() {

  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target });
    this.props.searchQuery.set(event.target.value);
  }

  handleSearchEnter(event) {
    if (event.key === "Enter") {
      browserHistory.push("/directory/search/" + event.target.value);
    }
  }

  handlePageClick(event) {
    let selected = Number(event.selected + 1);
    handleNavigationPager(selected, this.filterSearch, this.filterCategory);
  }

  handleStateChange(element) {
    if (
      element === null ||
      element.value === undefined ||
      element.value === false
    ) {
      this.setState({ stateTerm: null });
    }
    else {
      console.log(element.value);
      //browserHistory.push("/directory/state/" + element.value);
      this.setState({ stateTerm: element.value });
      this.props.stateQuery.set(element.value);
    }
  }

  handleCategoryChange(element) {
    if (
      element === null ||
      element.value === undefined ||
      element.value === false
    ) {
      this.setState({ categoryTerm: null });
    }
    else {
      this.setState({ categoryTerm: element.value });
      this.props.categoryQuery.set(element.value);
    }
  }

  render() {
    window.scrollTo(0, 0);
    const { trainers } = this.props;
    // Listing based switch
    const area = this.props.area;
    const page = this.props.page;
    var category = this.props.category;
    var search = this.props.search;

    if (area) {
      var hrefBuilder =
        "/directory/area/" + area + "/page/" + this.props.skipCount;
    }

    var stateSelectValues = [
      {
        value: "ACT",
        label: "Australian Capital Territory",
        clearableValue: false
      },
      { value: "NSW", label: "New South Wales", clearableValue: false },
      { value: "NT", label: "Northern Territory", clearableValue: false },
      { value: "QLD", label: "Queensland", clearableValue: false },
      { value: "SA", label: "South Australia", clearableValue: false },
      { value: "TAS", label: "Tasmania", clearableValue: false },
      { value: "VIC", label: "Victoria", clearableValue: false },
      { value: "WA", label: "Western Australia", clearableValue: false }
    ];

    var categorySelectValues = [
      {
        value: "Health Fitness Centre",
        label: "Health Fitness Centre",
        clearableValue: false
      },
      {
        value: "Personal Training",
        label: "Personal Training",
        clearableValue: false
      },
      { value: "Martial Arts", label: "Martial Arts", clearableValue: false },
      {
        value: "Wellbeing Centre",
        label: "Wellbeing Centre",
        clearableValue: false
      },
      { value: "Yoga", label: "Yoga", clearableValue: false },
      {
        value: "Exercise Equipment",
        label: "Exercise Equipment",
        clearableValue: false
      },
      {
        value: "Massage Therapy",
        label: "Massage Therapy",
        clearableValue: false
      },
      {
        value: "Holistic Health",
        label: "Holistic Health",
        clearableValue: false
      },
      {
        value: "Corporate Health Fitness",
        label: "Corporate Health Fitness",
        clearableValue: false
      },
      { value: "Pilates", label: "Pilates", clearableValue: false },
      {
        value: "Nutritional Supplements",
        label: "Nutritional Supplements",
        clearableValue: false
      },
      { value: "Life Coaching", label: "Life Coaching", clearableValue: false },
      { value: "Weight Loss", label: "Weight Loss", clearableValue: false },
      {
        value: "Employment and Careers",
        label: "Employment and Careers",
        clearableValue: false
      },
      {
        value: "Group Health Fitness",
        label: "Group Health Fitness",
        clearableValue: false
      }
    ];

    var Select = require("react-select");

    return (
      <div className="Trainers">
        <div className="TrainerSearch">
          <Row>
            <Col xs={12} sm={12}>
              <i className="fa fa-search" />
              <FormControl
                type="search"
                onKeyPress={this.handleSearchChange.bind(this)}
                placeholder="Search business name"
                className="Search"
              />
              <br />
            </Col>

            <Col xs={12} sm={6}>
              <div>
                <Select
                  name="Select Category"
                  value={this.props.categoryQuery.get()}
                  options={categorySelectValues}
                  onChange={this.handleCategoryChange.bind(this)}
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div>
                <Select
                  name="Select State"
                  value={this.props.stateQuery.get()}
                  options={stateSelectValues}
                  onChange={this.handleStateChange.bind(this)}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="Trainers-list">
          {trainers.length > 0 ? (
            trainers.map(
              ({
                _id,
                logo,
                businessName,
                overview,
                category,
                state,
                suburb,
                image
              }) => (
                  <Panel>
                    <Row>
                      <Col xs={8} sm={10}>
                        <a
                          href={"/directory/" + _id}
                          key={_id}
                          onClick={() => handleNavigation(_id)}
                        >
                          <h2>{businessName}</h2>
                        </a>
                        <p>{category}</p>
                        <p>{overview}</p>
                      </Col>
                      <Col xs={12} sm={2}>
                        <p>
                          {state} > {suburb}
                        </p>
                        {logo ? (
                          <Image
                            src={"/" + "logos" + "/" + logo}
                            alt={businessName}
                            responsive
                          />
                        ) : (
                            ""
                          )}
                      </Col>
                    </Row>
                  </Panel>
                )
            )
          ) : (
              <Alert>
                Sorry there are no listings found for '{this.state.searchTerm}
                .'
            </Alert>
            )}
          <Row>
            <ReactPaginate
              pageCount={this.props.pageCount}
              pageRangeDisplayed={1}
              marginPagesDisplayed={2}
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={<a href="">...</a>}
              breakClassName={"break-me"}
              pageNum={this.props.currentPage - 1}
              initialPage={this.props.currentPage - 1}
              hrefBuilder={page => hrefBuilder + page}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              //disableInitialCallback="false"
              filterSearch={this.props.search}
              filterCategory={this.props.category}
              filterState={this.props.state}
            />
          </Row>
        </div>
      </div>
    );
  }
}
/*
// Validation
TrainersList.propTypes = {
  trainers: React.PropTypes.array,
  searchQuery: React.PropTypes.object
};
*/

export default TrainersList;
