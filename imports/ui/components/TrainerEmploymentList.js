import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert, ButtonToolbar, Button, ButtonGroup } from 'react-bootstrap';
import { removeTrainerEmployment } from '../../api/trainers/methods.js';


const handleNav = (_id) => {
  //browserHistory.push(`/documents/${_id}`);
}

const handleEdit = (_id) => {
  browserHistory.push(`/documents/${_id}/edit`);
}

const removeTrainerEmploymentLineItem = (company) => {
  const companyToDelete = company.company;
  console.log(companyToDelete);
  if (confirm('Are you sure? This is permanent!')) {
    removeTrainerEmployment.call({ companyToDelete }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(companyToDelete + 'deleted!', 'success');
        //browserHistory.push('/documents');
      }
    });
  }
};

const TrainerEmploymentList = ({ doc }) => (
  doc ? <ListGroup className="TrainerEmploymentList">
    {doc.map(({ _id, company, location, title, fromMonth, fromYear, toMonth, toYear  }) => (
      <ListGroupItem key={ company } onClick={ () => handleNav(_id) }>
        { fromMonth } / { fromYear } - { toMonth } / { toYear }: { company } { location }
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={ () => removeTrainerEmploymentLineItem( { company } ) } className="text-danger">Delete</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </ListGroupItem>
    ))}
  </ListGroup> :
    <Alert bsStyle="warning">Employment not listed yet, please add.</Alert>
);

TrainerEmploymentList.propTypes = {
  document: React.PropTypes.array,
};

export default TrainerEmploymentList;
