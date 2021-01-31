import _isEmpty from 'lodash/isEmpty';
import useReducers from '../hooks/useReducers';

const reducers = state => ({
  formChanged: (formValues, errors) => {
    if (state.submitted) {
      return { ...state, formValues, errors,}
    }
    return { ...state, formValues, }
  },
  saving: () => ({ ...state, submitted: true, isSaving : true, }),
  saveFailed: errors => ({ ...state, errors, isSaving: false }),
  saveSuccess: () => ({ ...state, errors: {}, isSaving: false  })
})

const initialState = {
  isSaving: false,
  submitted: false,
}

const useFormController = (onValidateForm, onSaveForm, onSaveSuccess) => {
  const { state, formChanged, saving, saveSuccess, saveFailed } = useReducers(reducers, initialState);

  const onSave = async (formValues) => {
    saving();

    const errors = onValidateForm(formValues);

    if (!_isEmpty(errors)) {
      return saveFailed(errors);
    }

    const result = await onSaveForm(formValues);
    
    if (!result.success) {
      return saveFailed(result.errors);
    }

    onSaveSuccess(result, formValues);

    saveSuccess();
  };

  const onChange = (formValues) => {
    formChanged(formValues, onValidateForm(formValues));
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