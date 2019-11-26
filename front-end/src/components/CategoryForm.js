import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { observer } from "mobx-react"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: 'block'
  },
  textField: {
    margin: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));
export default observer(({ getCat, cats }) => {
  const classes = useStyles();
  const cat = getCat()
  const handleChange = name => event => {
    cat[name] = event.target.value || null
  }
  return (
    <React.Fragment>
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={cat.label}
        onChange={handleChange('label')}
        margin="normal"
      />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="cat-parent">
          Parent type
            </InputLabel>
        <Select
          native
          value={cat.parent || ''}
          onChange={handleChange('parent')}
          inputProps={{
            name: 'parent',
            id: 'cat-parent',
          }}>
          {
            cats.map(c => <option key={c.id} value={c.id}>{c.label}</option>)
          }
        </Select>
      </FormControl>
    </React.Fragment>)
})
