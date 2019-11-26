import { Typography } from '@material-ui/core';
import { observer } from "mobx-react";
import React from 'react';
import { useStyles } from '../styles';
import EditDeletePanel from './EditDeletePanel';
import IncidentForm from './IncidentForm';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const formatDate = (date) => {
  const d = new Date(date);
  return [
    d.toLocaleDateString([]),
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  ].join(', ')
}

export default observer(({ item, appState, cats }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card + ' ' + classes.item}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {item.person}
        </Typography>
        <Typography variant="body2" component="p">
          {item.description}
        </Typography>
      </CardContent>
      <div className={classes.buttonPanel}>
        <Typography className={classes.pos} color="textSecondary">
          {formatDate(item.datetime)}
        </Typography>
        <EditDeletePanel
          deleteTitle="Delete incident"
          editTitle="Edit incident"
          handleClick={() => appState.setEditIncident(item)}
          onEdit={() => appState.saveEditedIncident(item)}
          onDelete={() => appState.removeIncident(item)}>
          <IncidentForm getIncident={() => appState.editIncident} cats={cats} />
        </EditDeletePanel>
      </div>
    </Card>
  )
})