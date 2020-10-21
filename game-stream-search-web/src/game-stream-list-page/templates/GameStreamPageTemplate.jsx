import React from 'react';
import { node, bool, number } from 'prop-types';
import StandardPageTemplate from '../../templates/StandardPageTemplate';

const GameStreamPageTemplate = ({ children, searchBar, notFoundNotice, numberOfStreams, isLoadingStreams }) => {
  const hasStreams = numberOfStreams > 0 || isLoadingStreams;

  return (
    <StandardPageTemplate toolBar={searchBar} >
      {!hasStreams && notFoundNotice}
      {hasStreams && children}
    </StandardPageTemplate>
  )
}

GameStreamPageTemplate.propTypes = {
  children: node.isRequired,
  searchBar: node.isRequired,
  notFoundNotice: node.isRequired,
  numberOfStreams: number.isRequired,
  isLoadingStreams: bool.isRequired,
}

export default GameStreamPageTemplate;