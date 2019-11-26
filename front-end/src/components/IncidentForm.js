import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { observer } from "mobx-react"
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '@date-io/date-fns';
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
    width: '100%'
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default observer(({ cats, getIncident }) => {
  const classes = useStyles()
  const incident = getIncident()
  const handleChange = name => event => {
    incident[name] =  event.target.value 
  }
  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            autoOk
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date of incident"
            value={incident.datetime ? new Date(incident.datetime) : new Date()}
            onChange={d => {
              //allow for invalid dates from keyboard input
              const [date, _] = (d && d.toJSON() || new Date().toJSON()).split('T')
              const [__, time] = incident.datetime.split('T')
              incident.datetime = [date, time].join('T') 
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time of incident"
            value={incident.datetime ? new Date(incident.datetime) : new Date()}
            onChange={d => {
              //allow for invalid dates from keyboard input
              const [_, time] = (d && d.toJSON() || new Date().toJSON()).split('T')
              const [date, __] = incident.datetime.split('T')
              incident.datetime = [date, time].join('T') 
            }}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="item-cat">
          Type of incident
        </InputLabel>
        <Select
          native
          value={incident.category || ''}
          onChange={handleChange('category')}
          inputProps={{
            name: 'category',
            id: 'item-cat',
          }}>
          {cats.all.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </Select>
      </FormControl>
      <TextField
        id="standard-person"
        label="Person"
        className={classes.textField}
        value={incident.person || ''}
        onChange={handleChange('person')}
        margin="normal"
      /><br />
      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows="4"
        placeholder="A short description of the incident"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={incident.description || ''}
        onChange={handleChange('description')}
      />
      <br />
    </React.Fragment>)
})