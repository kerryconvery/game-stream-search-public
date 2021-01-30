import { useReducer } from 'react';
import _isEmpty from 'lodash/isEmpty';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FIELD_CHANGED': {
      if (state.submitted) {
        return { ...state, formValues: action.formValues, errors: action.errors }
      }
      return { ...state, formValues: action.formValues }
    }
    case 'SAVING': return { ...state, submitted: true, isSaving: true }
    case 'SAVE_FAILED': return { ...state, errors: action.errors, isSaving: false }
    case 'SAVE_SUCCESS': return { ...state, errors: action.errors, isSaving: false }
  }
}

const initialState = {
  isSaving: false,
  submitted: false,
}

const useFormController = (onValidateForm, onSaveForm, onSaveSuccess) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  const onSave = async (formValues) => {
    dispatch({ type: 'SAVING' });

    const errors = onValidateForm(formValues);

    if (!_isEmpty(errors)) {
      return dispatch({ type: 'SAVE_FAILED', errors });
    }

    const result = await onSaveForm(formValues);
    
    if (!result.success) {
      return dispatch({ type: 'SAVE_FAILED', errors: result.errors });
    }

    onSaveSuccess(result, formValues);

    dispatch({ type: 'SAVE_SUCCESS' });
  };

  const onChange = (formValues) => {
    dispatch({ type: 'FIELD_CHANGED', formValues, errors: onValidateForm(formValues) });
  }

  return {
    formValues: state.formValues,
    errors: state.errors,
    isSaving: state.isSaving,
    onChange,
    onSave,
  };
}

export default useFormController;