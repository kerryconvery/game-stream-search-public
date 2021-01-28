import React, { useState } from 'react';
import { node, func } from'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import SideBarPanel from '../../../../shared-components/SideBarPanel';

const FeaturedChannelsSideBarView = ({ addChannelForm, channelList }) => {
  const [ anchorElement, setAnchorElement ] = useState(null);

  const onOpenForm = event => setAnchorElement(event.currentTarget);
  const onCloseForm = () => setAnchorElement(null);

  const open = Boolean(anchorElement);

  return (
    <SideBarPanel
      title='Featured channels'
      action={(
        <Tooltip title='Add a new channel to the list'>
          <IconButton color='primary' size='small' onClick={onOpenForm}>
            <Add />
          </IconButton>
        </Tooltip>
      )}
      mainContent={
        <>
          <Popover
            open={open}
            anchorEl={anchorElement}
            onClose={onCloseForm}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {addChannelForm({ onCloseForm })}
          </Popover>
          {channelList}
        </>
      }
    />
  )
}

FeaturedChannelsSideBarView.propTypes = {
  addChannelForm: func.isRequired,
  channelList: node.isRequired,
};

export default FeaturedChannelsSideBarView;