import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert, ButtonToolbar, Button, ButtonGroup  } from 'react-bootstrap';
import { removeTrainerEducation} from '../../api/trainers/methods.js';


const handleNav = (_id) => {
  //browserHistory.push(`/documents/${_id}`);
}

const handleEdit = (_id) => {
  browserHistory.push(`/documents/${_id}/edit`);
}

const removeTrainerEducaitonLineItem = (school) => {
  const schoolToDelete = school.school;
  if (confirm('Are you sure? This is permanent!')) {
    removeTrainerEducation.call({ schoolToDelete }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(schoolToDelete + 'deleted!', 'success');
      }
    });
  }
};

const TrainerEducationList = ({ doc }) => (
  doc ? <ListGroup className="TrainerEducationList">
    {doc.map(({ _id, trainer, dateFrom, dateTo, description, school, tertiaryEducation }) => (
      <ListGroupItem key={ school } onClick={ () => handleNav(_id) }>
        { dateFrom } - { dateTo }: { school } { tertiaryEducation }
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={ () => removeTrainerEducaitonLineItem( { school }) } className="text-danger">Delete</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">Education not listed yet, please add.</Alert>
);

TrainerEducationList.propTypes = {
  documents: React.PropTypes.array,
};

export default TrainerEducationList;
