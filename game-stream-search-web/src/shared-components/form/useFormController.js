import _isEmpty from 'lodash/isEmpty';
import useReducers from '../hooks/useReducers';

const createReducers = state => ({
  formChanged: (formValues, errors) => {
    if (state.submitted) {
      return { ...state, formValues, errors,}
    }
    return { ...state, formValues, }
  },
  setSaving: () => ({ ...state, submitted: true, isSaving : true, }),
  setSaveFailed: errors => ({ ...state, errors, isSaving: false }),
  setSaveSuccess: () => ({ ...state, errors: {}, isSaving: false  })
})

const initialState = {
  isSaving: false,
  submitted: false,
}

const useFormController = (onValidateForm, onSaveForm, onSaveSuccess, onSaveFailed) => {
  const [ state, formChanged, setSaving, setSaveFailed, setSaveSuccess ] = useReducers(createReducers, initialState);

  const handleSaveFailed = (formValues, errors) => {
    setSaveFailed(errors);
    onSaveFailed(formValues, errors);
  }

  const onSave = async (formValues) => {
    setSaving();

    const errors = onValidateForm(formValues);

    if (!_isEmpty(errors)) {
      handleSaveFailed(formValues, errors);
      return;
    }

    const result = await onSaveForm(formValues);
    
    if (!result.success) {
      handleSaveFailed(formValues, result.errors)
      return;
    }

    onSaveSuccess(result, formValues);

    setSaveSuccess();
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