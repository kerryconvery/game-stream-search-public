import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const ClientListSkeleton = () => (
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

const toClientRow = ({ title, firstName, lastName, phoneNumber }, key) => (
  <TableRow key={key}>
    <TableCell>{title}</TableCell>
    <TableCell>{firstName}</TableCell>
    <TableCell>{lastName}</TableCell>
    <TableCell>{phoneNumber}</TableCell>
  </TableRow>
);

const ClientList = (clients) => (
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
        {clients.map(toClientRow)}
      </TableBody>
    </Table>
  </TableContainer>
);

ClientList.propTypes = {
  clients: arrayOf(shape({
    title: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    phoneNumber: string.isRequired,
  }))
}

ClientList.defaultProps = {
  clients: undefined
}

export default ({ clients }) => clients ? ClientList(clients) : ClientListSkeleton();
