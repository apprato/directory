import React from 'react';
import TrainerProfileEditor from '../components/TrainerProfileEditor.js';

const EditTrainerProfile = ({ doc }) => (
  <div className="EditTrainerExperience">
    <h1 className="page-header">Welcome to Findatrainer…</h1>
    <TrainerProfileEditor doc={ doc }  />
  </div>
);

EditTrainerProfile.propTypes = {
  doc: React.PropTypes.object,
};

export default EditTrainerProfile;

