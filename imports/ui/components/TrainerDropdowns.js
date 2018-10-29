import React from 'react';
import { browserHistory, Router, Route, MenuItem } from "react-router";
import {
    Row,
    Col,
} from "react-bootstrap";
import "react-select/dist/react-select.css";
var Select = require("react-select");





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
        browserHistory.push("/directory");
        this.props.categoryQuery.set(element.value);
    }
}



const TrainerDropdowns = () => (
    <div className="TrainerSearch">
        <Row>
            <Col xs={12} sm={4}>
                <div>
                    <Select
                        name="Select Category"
                        placeholder="1. Select Category"
                        //value={this.props.categoryQuery.get()}
                        options={categorySelectValues}
                        //onChange={this.handleCategoryChange.bind(this)}
                        isSearchable={false}
                    />
                </div>
            </Col>
            <Col xs={12} sm={4}>
                <div>
                    <Select
                        name="Select State"
                        placeholder="2. Select State"
                        //value={this.props.stateQuery.get()}
                        options={stateSelectValues}
                        isSearchable={false}
                    //onChange={this.handleStateChange.bind(this)}
                    />
                </div>
            </Col>
        </Row>
    </div>
);

/*
AppModal.propTypes = {
    show: React.PropTypes.bool,
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    form: React.PropTypes.node,
    body: React.PropTypes.node,
    footer: React.PropTypes.node,
    onHide: React.PropTypes.func,
};
*/

export default TrainerDropdowns;
