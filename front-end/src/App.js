import Grid from '@material-ui/core/Grid';
import { observer } from "mobx-react";
import { useSnackbar } from 'notistack';
import React from 'react';
import './App.css';
import AppState from './AppState';
import CategoryDetail from './components/CategoryDetail';
import AppMenuBar from './components/AppMenuBar';
import CategoryTree from './components/CategoryTree';
import { useStyles } from './styles';

const appState = new AppState()

const App = observer(
  () => {

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();
    appState.items.onMessage = (message) => enqueueSnackbar(`Incident ${message}`)
    appState.cats.onMessage = (message) => enqueueSnackbar(`Incident type ${message}`)

    return (
      <React.Fragment>
        <AppMenuBar />
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <CategoryTree appState={appState} />
              <CategoryDetail appState={appState} />
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);
export default App;