import React from 'react';
import { TermsOfServiceModalBody, TermsOfServiceModalFooter } from '../ui/components/modals/TermsOfService';
import AddTrainerEducationModalForm from '../ui/components/modals/AddTrainerEducation';
import AddTrainerEmploymentModalForm from '../ui/components/modals/AddTrainerEmployment';

export default {
  acceptTerms(props, modal) {
    return {
      modalClasses: 'TermsOfServiceModal',
      modalTitle: 'Accept Terms of Service',
      modalBody: <TermsOfServiceModalBody { ...props } modal={ modal } />,
      modalFooter: <TermsOfServiceModalFooter { ...props } modal={ modal } />,
    };
  },
  AddTrainerEducationModal(props, modal) {
    return {
      modalClasses: 'AddDocumentModal',
      modalTitle: 'Add Educational Details',
      modalForm: <AddTrainerEducationModalForm { ...props } modal={ modal } />,
    };
  },
  AddTrainerEmploymentModal(props, modal) {
    return {
      modalClasses: 'AddDocumentModal',
      modalTitle: 'Add Employment Details',
      modalForm: <AddTrainerEmploymentModalForm { ...props } modal={ modal } />,
    };
  }

};
