import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { observer } from "mobx-react";
import React from 'react';
import ModalForm from './ModalForm';
import { useStyles } from '../styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

const EditDeletePanel = observer(
  ({ onEdit, onDelete, editTitle, deleteTitle, children, handleClick }) => {
    const classes = useStyles();
    return (
      <div className={classes.buttonPanel}>
        <ModalForm
          save={onEdit}
          button={openModal => (
            <Tooltip
              title={editTitle}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 900 }} >
              <IconButton
                onClick={() => {
                  openModal()
                  handleClick()
                }}
                aria-label="edit"
                color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
          )} title={editTitle} description="">
          {children}
        </ModalForm>
        <ModalForm
          title={deleteTitle}
          save={onDelete}
          button={openModal => (
            <Tooltip
              title={deleteTitle}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 900 }} >
              <IconButton
                onClick={openModal}
                aria-label="delete"
                color="primary">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          description="Are you sure?">
        </ModalForm>
      </div>
    )
  }
);
export default EditDeletePanel;