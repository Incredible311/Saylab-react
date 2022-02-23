import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: theme.spacing(2, 0, 2, 2)
  }
}));

// ----------------------------------------------------------------------

function Section({ className }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Typography variant="h4" sx={{ px: 2, mt: -24, mb: 2 }}>
        Join us, let's build the future together.
      </Typography>
      <img
        alt="labregister"
        src="/static/illustrations/illustration_partnership.svg"
      />
    </Card>
  );
}

export default Section;
