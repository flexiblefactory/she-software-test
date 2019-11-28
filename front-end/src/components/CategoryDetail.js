import { Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { observer } from "mobx-react";
import React from 'react';
import CategoryForm from './CategoryForm';
import EditDeletePanel from './EditDeletePanel';
import Incident from './Incident';
import IncidentForm from './IncidentForm';
import ModalForm from './ModalForm';
import { useStyles } from '../styles';

const CategoryDetail = observer(({ appState }) => {
  const classes = useStyles();
  const { items, cats } = appState;
  return (
    <React.Fragment>
      {
        appState.selectedCategory &&
        <Grid className={classes.flexGrow} item>
          <Paper className={[classes.paper, classes.category].join(' ')}>
            {appState.cats.all.length ?
              <ModalForm
                save={appState.saveNewIncident}
                button={openModal => (
                  <Button
                    className={[classes.item, classes.newItemButton].join(' ')}
                    variant="outlined"
                    color="primary"
                    onClick={(e) => {
                      openModal()
                      appState.clearNewIncident()
                    }
                    }>
                    New incident
                  </Button>
                )}
                title="Report an incident"
                description="Please enter details of the incident.">
                <IncidentForm getIncident={() => appState.newIncident} cats={cats} />
              </ModalForm> : null
            }
            <Typography variant="h5" gutterBottom>
              {appState.selectedCategory.label}
            </Typography>
            {appState.itemsInSelectedCategory.length} item{appState.itemsInSelectedCategory.length === 1 ? '' : 's'}
            {
              appState.itemsInSelectedCategory.map(item => (
                <Incident
                  item={item}
                  cats={cats}
                  key={`item${item.id}`}
                  appState={appState}
                >
                </Incident>
              ))
            }
            {appState.selectedCategoryId ?
              <EditDeletePanel
                editTitle="Edit incident type"
                deleteTitle="Delete incident type"
                handleClick={appState.editSelectedCategory}
                onEdit={appState.saveEditedCategory}
                onDelete={appState.removeSelectedCategory}>
                <CategoryForm getCat={() => appState.editCategory} cats={appState.allowedParentsForSelectedCategory} />
              </EditDeletePanel> : null
            }
          </Paper>
        </Grid >
      }
    </React.Fragment >
  );
}
);
export default CategoryDetail;