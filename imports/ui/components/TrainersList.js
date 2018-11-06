import React from "react";
import Select from 'react-select';
import { browserHistory, Router, Route, MenuItem } from "react-router";
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
    this.state = {
      searchTerm: '',
      // Dropdowns
      isClearable: false,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: false,
      // Suburb dropdown
      suburbSelectValues: [
      ]
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
      this.props.stateQuery.set(element.value)
      this.getSuburbs(null, element.value, null);

      /*
      console.log(suburbSelectOptionsMap)
      suburbSelectOptionsMap.map(
        ({ category, suburb }) =>
          (
            suburbSelectOptionsArray.push({ value: suburb, label: suburb })
          )
      );
      this.setState({ suburbSelectValues: suburbSelectOptionsArray });
      */

      /*
            let suburbSelectOptionsMap = this.props.suburbSelectOptions.get();

            console.log('suburbSelectOptionsArray');
            console.log(suburbSelectOptionsArray);
            this.setState({ suburbSelectValues: suburbSelectOptionsArray });
            this.setState({ state: this.state });
      */


      /*
      let suburbSelectOptionsMap = this.props.suburbSelectOptions.get().then\
        suburbSelectOptionsMap.map(
          ({ category, suburb }) =>
            (
              suburbSelectOptionsArray.push({ value: suburb, label: suburb })
            )
        );
      console.log('suburbSelectOptionsArray');
      console.log(suburbSelectOptionsArray);
      this.setState({ suburbSelectValues: suburbSelectOptionsArray });
      this.setState({ state: this.state });
      */



    }
  }


  getSuburbs(search, category, state, callback) {
    var suburbSelectOptionsArray = [];
    var suburbSelectOptionsMap;

    const callWithPromise = (method, state) => {
      return new Promise((resolve, reject) => {
        console.log('state' + state);
        Meteor.apply('getTrainersSuburbOptions', [null, null, state], true, function (error, result) {
          if (error) reject('Something went wrong');
          resolve(result);
        });
      });
    }

    async function getSuburbSelectOptions() {
      const suburbSelectionOptions = await callWithPromise('suburbMethod', state);
      return suburbSelectionOptions;
    }
    async function getCitySelectOptions() {
      const getCitySelectOptions = await callWithPromise('cityMethod', city);
      return getCitySelectOptions;
    }

    // I want getUserImage: function(toUserId) to return the ID.
    getSuburbSelectOptions().then((result) => {
      suburbSelectOptionsMap = result;
      console.log(suburbSelectOptionsMap);
      suburbSelectOptionsMap.map(
        ({ category, suburb }) =>
          (
            suburbSelectOptionsArray.push({ value: suburb, label: suburb })
          )
      );
      this.setState({ suburbSelectValues: suburbSelectOptionsArray });
      // You could return a callback like here, but it works: https://forums.meteor.com/t/execute-code-once-the-meteor-callback-has-run/25905/8
    });
  }


  handleCategoryChange(element) {
    if (
      element === null ||
      element.value === undefined ||
      element.value === false
    ) {
      browserHistory.push("/directory");
      this.props.categoryQuery.set('');
    }
    else {
      browserHistory.push("/directory");
      this.props.categoryQuery.set(element.value);
    }
  }

  // This is where you load your data
  componentDidMount() {

    /*
    const suburbSelectOptionsMap = this.props.suburbSelectOptions.get();

    suburbSelectOptionsMap.map(
      ({ category, suburb }) =>
        (
          suburbSelectOptionsArray.push({ value: suburb, label: suburb })
        )
    );
    console.log(suburbSelectOptionsArray);
    this.setState({ suburbSelectValues: suburbSelectOptionsArray });
    this.forceUpdate;

    console.log('Parent did mount.');
    console.log(this.props);
    */
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
                  value={categorySelectValues.filter(({ value }) => value === this.props.categoryQuery.get())}
                  options={categorySelectValues}
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
                  value={stateSelectValues.filter(({ value }) => value === this.props.stateQuery.get())}
                  options={stateSelectValues}
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
                  //value={stateSelectValues.filter(({ value }) => value === this.props.stateQuery.get())}
                  options={this.state.suburbSelectValues}
                  //onChange={this.handleStateChange.bind(this)}
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