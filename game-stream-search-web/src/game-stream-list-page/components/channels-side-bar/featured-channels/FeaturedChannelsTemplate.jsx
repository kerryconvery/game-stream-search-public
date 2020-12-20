import React, { useState } from 'react';
import { node, func } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import SideBarPanel from '../SideBarPanel';

const FeaturedChannelsTemplate = ({ children, addFeaturedChannelForm }) => {
  const [ anchorEl, setAnchorEl ] = useState(null);

  const addButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {addFeaturedChannelForm(handleClose)}
        </Popover>
        {children}
    </SideBarPanel>
  )
}

FeaturedChannelsTemplate.propTypes = {
  addFeaturedChannelForm: func.isRequired,
  children: node.isRequired,
}

export default FeaturedChannelsTemplate;