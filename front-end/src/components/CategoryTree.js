
import { Button, Paper } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeView from '@material-ui/lab/TreeView';
import { observer } from "mobx-react";
import React from 'react';
import { useStyles } from '../styles';
import Category from './Category';
import CategoryForm from './CategoryForm';
import ModalForm from './ModalForm';
import Grid from '@material-ui/core/Grid';

export default observer(({ appState }) => {

  const classes = useStyles();
  const { cats } = appState;

  return (
    <Grid className={classes.flexGrow} item>
      <Paper className={classes.paper}>
        <ModalForm
          save={appState.saveNewCategory}
          button={handleClickOpen => (
            <Button className={classes.newItemButton} variant="outlined" color="secondary" onClick={handleClickOpen}>
              New Incident Type
          </Button>)}
          title="Create a new incident type"
          description="Incident types can have a parent incident type, allowing a hierachy.">
          <CategoryForm getCat={() => appState.newCategory} cats={appState.cats.all} />
        </ModalForm>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />} >
          <Category
            onSelect={appState.selectCategory}
            cats={cats}
            cat={appState.rootCat}
          />
        </TreeView>
      </Paper>
    </Grid>
  )
})

