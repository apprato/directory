import React from "react";
import Select from 'react-select';
import { browserHistory } from "react-router";
import { Alert, Row, Col, Panel, FormControl, Image } from "react-bootstrap";
import ReactPaginate from "react-paginate";




const handleNavigation = _id => {
  browserHistory.push(`/directory/${_id}`);
};

const handleNavigationPager = (selected) => {
  browserHistory.push("/directory/page/" + selected);
};




class TrainersList extends React.Component {
  constructor(props) {
    super(props);

    // Category dropdowns, @TODO retreive dynamically with personal and business areas
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

    // State drop down values @todo retreive dynamically
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

    // Set state to use in Component
    this.state = {
      searchTerm: '',
      // Dropdowns
      isClearable: false,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: false,
      // Dropdowns
      categorySelectValues: categorySelectValues,
      stateSelectValues: stateSelectValues,
      suburbSelectValues: []
    };

    // Bind events 
    this.handleSearchEnter = this.handleSearchEnter.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handlPageClick = this.handlePageClick.bind(this);
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


  handleCategoryChange(element) {
    if (
      element === null ||
      element.value === undefined ||
      element.value === false
    ) {
      this.props.categoryQuery.set('');
    }
    else {
      this.props.stateQuery.set(null);
      this.props.suburbQuery.set(null);
      this.props.categoryQuery.set(element.value);
    }
  }


  handleStateChange(element) {
    if (
      element === null ||
      element.value === undefined ||
      element.value === false
    ) {
      //browserHistory.push("/directory");
      this.props.stateQuery.set('');
      this.setState({ suburbSelectValues: '' });
    }
    else {
      // Load Suburb base on State selection
      this.props.suburbQuery.set(null);
      this.props.stateQuery.set(element.value)
      this.setSuburbsDropdown(null, this.props.categoryQuery.get(), this.props.stateQuery.get());
    }
  }

  handleSuburbChange(element) {
    if (
      element === null ||
      element.value === undefined ||
      element.value === false
    ) {
      this.props.suburbQuery.set('');
      this.setState({ suburbSelectValues: '' });
    }
    else {
      this.props.suburbQuery.set(element.value);
    }
  }


  setSuburbsDropdown(search, category, state) {
    var suburbSelectOptionsArray = [];
    var suburbSelectOptionsMap;

    const callWithPromise = (search, category, state) => {
      return new Promise((resolve, reject) => {
        Meteor.apply('getTrainersSuburbOptions', [null, category, state], true, function (error, result) {
          if (error) reject('Could not retreive Suburbs');
          resolve(result);
        });
      });
    }

    async function getSuburbSelectOptions() {
      const suburbSelectionOptions = await callWithPromise(search, category, state);
      return suburbSelectionOptions;
    }

    getSuburbSelectOptions().then((result) => {
      suburbSelectOptionsMap = result;
      suburbSelectOptionsMap.map(
        ({ suburb }) =>
          (
            suburbSelectOptionsArray.push({ value: suburb, label: suburb })
          )
      );
      this.setState({ suburbSelectValues: suburbSelectOptionsArray });
    });
  }







  /* This is where you load your data initially - ie dropdowns etc. as required, do it with a .fetch for node.js or Meteor.call or Meteor.apply */
  componentDidMount() {

  }




  render() {
    window.scrollTo(0, 0);
    const { trainers } = this.props;
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
      suburbSelectValues
    } = this.state;

    var hrefBuilder =
      "/directory/page/" + this.props.currentPage;

    return (
      <div className="Trainers">
        <div className="TrainerSearch">
          <Row>
            <Col xs={12} sm={12} className="hidden-xs hidden-sm hidden-md hidden-lg">
              <i className="fa fa-search" />
              <FormControl
                type="search"
                onKeyPress={this.handleSearchChange.bind(this)}
                placeholder="Search business name"
                className="Search"
              />
              <br />
            </Col>
            <Col xs={12} sm={4}>
              <div>
                <Select
                  className="select"
                  name="Select Category"
                  placeholder="1. Select Category"
                  value={this.state.categorySelectValues.filter(({ value }) => value === this.props.categoryQuery.get())}
                  options={this.state.categorySelectValues}
                  onChange={this.handleCategoryChange.bind(this)}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable} />
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div>
                <Select
                  className="select"
                  name="Select State"
                  placeholder="2. Select State"
                  value={this.state.stateSelectValues.filter(({ value }) => value === this.props.stateQuery.get())}
                  options={this.state.stateSelectValues}
                  onChange={this.handleStateChange.bind(this)}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable} />
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div>
                <Select
                  className="select"
                  name="Select Suburb"
                  placeholder="3. Select Suburb"
                  value={this.state.suburbSelectValues.filter(({ value }) => value === this.props.suburbQuery.get())}
                  options={this.state.suburbSelectValues}
                  onChange={this.handleSuburbChange.bind(this)}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable} />
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
                  <Panel key={_id} >
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
              forcePage={this.props.currentPage - 1}
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