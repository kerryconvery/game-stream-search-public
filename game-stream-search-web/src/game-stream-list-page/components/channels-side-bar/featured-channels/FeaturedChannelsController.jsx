import React, { useState } from 'react';
import { func } from 'prop-types';
import AddChannelFormController from './AddChannelFormController';
import { useGameStreamApi } from '../../../../api/gameStreamApi';
import useChannelsLoader from '../../../hooks/useChannelsLoader';

const FeaturedChannelsController = ({ children }) => {
  const [ anchorElement, setAnchorElement ] = useState(null);
  const { getChannels } = useGameStreamApi();
  const { channels, isLoading, updateChannels } = useChannelsLoader(getChannels, () => {});

  const handleCloseForm = () => setAnchorElement(null);

  const handleChannelsUpdated = async () => {
    const channels = await getChannels();

    updateChannels(channels);

    handleCloseForm();
  }

  return (
    <AddChannelFormController onSaveSuccess={handleChannelsUpdated}> 
      {props => children({
        ...props,
        channels,
        isLoading,
        anchorElement,
        onOpen: setAnchorElement,
        onClose: handleCloseForm,
      })}
    </AddChannelFormController>
  )
}

FeaturedChannelsController.propTypes = {
  children: func.isRequired,
}

export default FeaturedChannelsController;