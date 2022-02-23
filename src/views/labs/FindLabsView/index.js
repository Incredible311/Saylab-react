import React from 'react';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import SelectAreaForm from './SelectAreaForm';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
  },
  header: {
    top: 0,
    left: 0,
    lineHeight: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 0)
    }
  }
}));

// ----------------------------------------------------------------------

function FindLabsView() {
  const classes = useStyles();

  const LabSchema = Yup.object().shape({
    city: Yup.string().required('City is required'),
    test: Yup.string().required('Test is required')
  });

  const formik = useFormik({
    initialValues: {
      city: '',
      test: ''
    },
    validationSchema: LabSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(false);
    }
  });

  return (
    <Page title="Find Labs" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </header>
      <Box 
        sx={{ 
          backgroundImage: `url(/static/images/Land_IMG.png)`, 
          backgroundSize: '165vh', 
          backgroundPosition: 'right', 
          backgroundRepeat: 'no-repeat', 
          width: '100%',
          padding: '0 10%',
          minHeight: '80vh' }}>
        <Box sx={{ maxWidth: 480, marginTop: '8vh', textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Enjoy your finding labs at cities
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Please select city and tests.
          </Typography>

          <Box
            component="img"
            alt="500"
            src="/static/illustrations/illustration_seo.svg"
            sx={{ width: '100%', maxHeight: 240, my: { xs: 2.5, sm: 5 } }}
          />

          <SelectAreaForm formik={formik} />
        </Box>
      </Box>
    </Page>
  );
}

export default FindLabsView;
