import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'

const StyledButton = styled(Button)`
  color:  #F5F3FC;
  background-color: #494949; 
`

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledButton variant="contained" color="primary" onClick={props.onClickBtn}>
        {props.text}
      </StyledButton>
    </div>
  );
}