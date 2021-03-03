import React from 'react';
import { string, func, shape, bool } from 'prop-types';
import _trim from 'lodash/trim';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormTemplate, { SubmitButton } from '../../../../../shared-components/form/FormTemplate';

const YouTube = 'YouTube';

const AddChannelFormView = ({ formValues, errors, isSaving, onChange, onCancel, onSave }) => {
  const onFormChange = field => (event) => {
    const values = {
      ...formValues,
      [field]: event.target.value,
    };

    onChange(values);
  }

  return (
    <FormTemplate
      title='Add Channel'
      formContent={
        <FormGroup>
          <FormControl margin='dense' error={!_isNil(_get(errors, 'streamPlatform'))}>
            <Select
              data-test-id='stream-platform'
              autoFocus
              value={_get(formValues, 'streamPlatform')}
              onChange={onFormChange('streamPlatform')}
            >
              <MenuItem value='Twitch'>Twitch</MenuItem>
              <MenuItem value='YouTube'>{YouTube}</MenuItem>
              <MenuItem value='DLive'>DLive</MenuItem>
            </Select>
            {!_isNil(_get(errors, 'streamPlatform')) &&
              <FormHelperText>
                {_get(errors, 'streamPlatform')}
              </FormHelperText>
            }
          </FormControl>
          <FormControl margin='dense'>
            <TextField
              id='channel-name'
              label={ _get(formValues, 'streamPlatform', '') === YouTube ? 'Channel id' : 'Channel name'}
              defaultValue={_get(formValues, 'channelName')}
              onChange={onFormChange('channelName')}
              helperText={_get(errors, 'channelName')}
              error={!_isNil(_get(errors, 'channelName'))}
            />
          </FormControl>
        </FormGroup>
      }
      formActions={
        <>
          <SubmitButton submitting={isSaving} onClick={() => onSave(formValues)}>Save</SubmitButton>
          <Button onClick={onCancel}>Cancel</Button>
        </>
      }
    />
  )
}

AddChannelFormView.propTypes = {
  formValues: shape({
    channelName: string,
    streamPlatform: string,
  }),
  errors: shape({
    channelName: string,
  }),
  isSaving: bool.isRequired,
  onChange: func.isRequired,
  onSave: func.isRequired,
  onCancel: func.isRequired,
}

AddChannelFormView.defaultProps = {
  formValues: {
    streamPlatform: 'Twitch',
  },
  errors: {},
}

export const validateForm = ({ streamPlatform, channelName }) => {
  const errors = {};

  if (_trim(channelName) === '')
  {
    errors['channelName'] = streamPlatform === YouTube ?
      'Please enter a channel id' : 'Please enter a channel name';
  }

  return errors;
}

export const mapApiErrorsToFields = (apiErrors) => {
  const fieldErrors = {};

  apiErrors.forEach(error => {
    if (error.errorCode === 'ChannelNotFoundOnPlatform') {
      fieldErrors['channelName'] = error.errorMessage
    }

    if (error.errorCode === 'PlatformServiceIsNotAvailable') {
      fieldErrors['streamPlatform'] = error.errorMessage
    } 
  })

  return fieldErrors;
}

export default AddChannelFormView;