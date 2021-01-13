import React from 'react';
import { func, object } from'prop-types';
import _omit from 'lodash/omit';
import pickProps from '../../../../prop-utils/pickProps';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import SideBarPanel from '../SideBarPanel';
import ChannelList from '../ChannelList';
import AddChannelForm from './AddChannelFormView';

const FeaturedChannelsView = ({ anchorElement, onOpen, onClose, ...props }) => {
  const addButtonClick = event => onOpen(event.currentTarget);
  const open = Boolean(anchorElement);

  return (
    <SideBarPanel
        title='Featured channels'
        action={(
          <Tooltip title='Add a new channel to the list'>
            <IconButton color='primary' size='small' onClick={addButtonClick}>
              <Add />
            </IconButton>
          </Tooltip>
        )}
      >
        <Popover
          open={open}
          anchorEl={anchorElement}
          onClose={onClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <AddChannelForm {...pickProps(props, AddChannelForm.propTypes)} onCancel={onClose} />
        </Popover>
        <ChannelList {...pickProps(props, ChannelList.propTypes)} />
    </SideBarPanel>
  )
}

FeaturedChannelsView.propTypes = {
  ...ChannelList.propTypes,
  ..._omit(AddChannelForm.propTypes, ['onCancel']),
  anchorElement: object,
  onOpen: func.isRequired,
  onClose: func.isRequired,
};

FeaturedChannelsView.defaultProps = {
  ...ChannelList.defaultProps,
  ...AddChannelForm.defaultProps,
  anchorElement: null,
};

export default FeaturedChannelsView;