import React from 'react';
import TrainerExperienceEditor from '../components/TrainerExperienceEditor.js';

const EditTrainerExperience = ({ doc }) => (
  <div className="EditTrainerExperience">
    <h1 className="page-header">Welcome to Findatrainer…</h1>
    <TrainerExperienceEditor doc={ doc }  />
  </div>
);

EditTrainerExperience.propTypes = {
  doc: React.PropTypes.object,
};

export default EditTrainerExperience;

