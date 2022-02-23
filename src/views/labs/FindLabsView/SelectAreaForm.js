import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Autocomplete, Button } from '@material-ui/core';
import { Form, FormikProvider } from 'formik';
import { PATH_PAGE } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import GoogleAutoComplete from '../../../components/GoogleAutoComplete';
import FetchAutoComplete from '../../../components/FetchAutoComplete';
// ----------------------------------------------------------------------

SelectAreaForm.propTypes = {
  formik: PropTypes.object.isRequired
};

function SelectAreaForm({ formik }) {
  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={6}>
            <GoogleAutoComplete/>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
          <FetchAutoComplete/>
          </Grid>
        </Grid>

        <Button
          size="large"
          variant="contained"
          type="submit"
          pending={isSubmitting}
          component={RouterLink}
          to={PATH_PAGE.findLabsMap}
          sx={{ float: 'right', marginTop: '20px', width: '100px' }}
        >
          Find
        </Button>
      </Form>
    </FormikProvider>
  );
}

const citiList = [
  { title: 'Lagos' },
  { title: 'Cano' },
  { title: 'Ibadan' },
  { title: 'Oyo' }
];

const testList = [
  { title: 'HIV' },
  { title: 'HLV' },
  { title: 'SHU' },
  { title: 'ABC' },
  { title: 'DEF' }
];

export default SelectAreaForm;
