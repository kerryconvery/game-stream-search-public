import React from 'react';
import { arrayOf, shape, string, bool } from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const GameStreamListSkeleton = () => (
  <Grid container spacing={3}>
    <Grid item xs={3}><Skeleton variant='text' animation={false} /></Grid>
    <Grid item xs={3}><Skeleton variant='text' animation={false} /></Grid>
    <Grid item xs={3}><Skeleton variant='text' animation={false} /></Grid>
    <Grid item xs={3}><Skeleton variant='text' animation={false} /></Grid>
    <Grid item xs={12}>
      <Skeleton variant='text' animation={false} />
      <Skeleton variant='text' animation={false} />
      <Skeleton variant='text' animation={false} />
      <Skeleton variant='text' animation={false} />
      <Skeleton variant='text' animation={false} />
    </Grid>
  </Grid>
)

const toClientRow = ({ gameName, islive, platformName, viewerCount }, key) => (
  <TableRow key={key}>
    <TableCell>{gameName}</TableCell>
    <TableCell>{islive}</TableCell>
    <TableCell>{platformName}</TableCell>
    <TableCell>{viewerCount}</TableCell>
  </TableRow>
);

const GameStreamList = (streams) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>First name</TableCell>
          <TableCell>Last name</TableCell>
          <TableCell>Phone number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {streams.map(toClientRow)}
      </TableBody>
    </Table>
  </TableContainer>
);

GameStreamList.propTypes = {
  gameStreams: arrayOf(shape({
    title: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    phoneNumber: string.isRequired,
  }))
}

GameStreamList.defaultProps = {
  gameStreams: null
}

export default ({ gameStreams }) => gameStreams ? GameStreamList(gameStreams) : GameStreamListSkeleton();
