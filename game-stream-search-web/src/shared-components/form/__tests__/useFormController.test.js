import { renderHook, act } from '@testing-library/react-hooks'
import useFormController from '../useFormController';

describe('useFormController', () => {
  const validateForm = jest.fn();
  const saveFormValues = jest.fn();
  const handleSaveSuccess = jest.fn();
  const handleSaveFailed = jest.fn();

  beforeEach(() => {
    validateForm.mockClear();
    saveFormValues.mockClear();
    handleSaveSuccess.mockClear();
    handleSaveFailed.mockClear();
  })

  it('should have an initial state', () => {
    const { result } = renderHook(() =>
      useFormController(validateForm, saveFormValues, handleSaveSuccess, handleSaveFailed)
    )

    expect(result.current.formValues).toBeUndefined();
    expect(result.current.isSaving).toBeFalsy();
  });

  it('should return latest form values after form changed', () => {
    const formValues = { testValue: 'test value' }

    const { result } = renderHook(() =>
      useFormController(validateForm, saveFormValues, handleSaveSuccess, handleSaveFailed)
    )

    act(() => result.current.onChange(formValues));

    expect(result.current.formValues).toEqual(formValues);
  });

  it('should call onSaveSuccess if there were no errors saving the form data', async () => {
    const saveFormValues = jest.fn().mockResolvedValue({ success: true })

    const formValues = { testValue: 'test value' }

    const { result } = renderHook(() =>
      useFormController(validateForm, saveFormValues, handleSaveSuccess, handleSaveFailed)
    )

    await act(() => result.current.onSave(formValues));

    expect(handleSaveSuccess).toHaveBeenCalled();
    expect(result.current.isSaving).toBeFalsy();
  });

  it('should call onSaveFailed if there were validation errors when saving the form data', async () => {
    const validateForm = jest.fn().mockReturnValue({ code: 'SomeError', message: 'Some error' });

    const formValues = { testValue: 'test value' }

    const { result } = renderHook(() =>
      useFormController(validateForm, saveFormValues, handleSaveSuccess, handleSaveFailed)
    )

    await act(() => result.current.onSave(formValues));

    expect(handleSaveFailed).toHaveBeenCalled();
    expect(result.current.isSaving).toBeFalsy();
  });

  it('should call onSaveFailed if there were errors when saving the form data', async () => {
    const saveFormValues = jest.fn().mockResolvedValue({ success: false })

    const formValues = { testValue: 'test value' }

    const { result } = renderHook(() =>
      useFormController(validateForm, saveFormValues, handleSaveSuccess, handleSaveFailed)
    )

    await act(() => result.current.onSave(formValues));

    expect(handleSaveFailed).toHaveBeenCalled();
    expect(result.current.isSaving).toBeFalsy();
  });
})