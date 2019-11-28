import React from 'react';
import { observer } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({ category: { color: 'hotpink' }});
  
const Cat = ({ cat, cats, onSelect }) => {

  const classes = useStyles();

  const childCats = cats.all.filter(c => {
    return c.parent === cat.id
  })

  const children = childCats.map(c => (
    <Cat onSelect={onSelect} cats={cats} key={'cat' + c.id} cat={c}></Cat>
  ))

  return (
    <TreeItem
      className={classes.category}
      onClick={() => onSelect(cat)}
      key={cat.id}
      nodeId={cat.id ? 'cat' + cat.id.toString() : 'root'}
      label={cat.label}>
      {children.length === 0 ? null : children}
    </TreeItem>
  );
}

export default observer(Cat)