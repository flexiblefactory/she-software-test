import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: { flexGrow: 1 },
  paper: { maxWidth: 600, flexGrow: 1, margin: 22, padding: 22 },
  item: { color: 'cornflowerblue' },
  category: { color: 'hotpink', width: 400 },
  buttonPanel: { textAlign: 'right' },
  newItemButton: { float: 'right' },
  card: {margin:'10px'},
  pos: {float:'left', margin:'16px'}
});