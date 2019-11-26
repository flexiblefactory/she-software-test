import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { observer } from "mobx-react";
import React from 'react';
import { useStyles } from '../styles';

const AppMenuBar = observer(
  () => {
    const classes = useStyles();

    return (
      <AppBar position="static">
      <Toolbar>

        <Button aria-controls="simple-menu" aria-haspopup="true" >
          <MenuIcon />
        </Button>

        <Typography variant="h6" className={classes.title}>
          Incident Book
        </Typography>
       
      </Toolbar>
    </AppBar>
    );
  }
);
export default AppMenuBar;