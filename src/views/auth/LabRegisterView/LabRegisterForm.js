import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Form, FormikProvider } from 'formik';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
import { emailError, passwordError } from 'src/utils/helpError';
import {
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Button
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { LoadingButton } from '@material-ui/lab';
import { googleMapApiKey } from '../../../config';
import MapPicker from 'react-google-map-picker';
import { makeStyles } from '@material-ui/core/styles'
import Geocode from "react-geocode";

// ----------------------------------------------------------------------

Geocode.setApiKey(googleMapApiKey);

Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const DefaultLocation = { lat: 39.633109748416814, lng: -103.22358763604262 };
const DefaultZoom = 10;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    border: 'none',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: '20px 15px',
    width: '70%',
    minWidth: '300px'
  },
}));
// --

LabRegisterForm.propTypes = {
  formik: PropTypes.object.isRequired
};

function LabRegisterForm({ formik }) {
  const [showPassword, setShowPassword] = useState(false);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  const onConfirmLocation = () => {
    formik.setFieldValue('location',  {lat: location.lat, lng: location.lng})
    Geocode.fromLatLng(location.lat, location.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(address);
        formik.setFieldValue('labLocation',  address)
      },
      (error) => {
        console.error(error);
      }
    );
    setOpen(false);
  } 

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="labName"
          type="text"
          label="Laboratory Name"
          {...getFieldProps('labName')}
          error={Boolean(touched.labName && errors.registeredName)}
          helperText={touched.email && errors.registeredName}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="registeredName"
          type="text"
          label="Registered Name"
          {...getFieldProps('registeredName')}
          error={Boolean(touched.registeredName && errors.labName)}
          helperText={touched.labName && errors.registeredName}
        />
        <Box sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Licence Number"
              {...getFieldProps('licenceNumber')}
              error={Boolean(touched.licenceNumber && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="date"
              type="date"
              defaultValue="2000-01-01"
              InputLabelProps={{
                shrink: true
              }}
              label="Date of Incorporation"
              {...getFieldProps('dateOfIncorporation')}
              error={Boolean(
                touched.licenceNumber && errors.dateOfIncorporation
              )}
              helperText={touched.licenceNumber && errors.dateOfIncorporation}
            />
          </Grid>
        </Grid>
        <Box sx={{ mb: 3 }} />
        <Button
          underline="none"
          variant="contained"
          onClick={handleOpen}
          style={{ marginBottom: '10px', float: 'right' }}
        >
          Pick Location
        </Button>
        <TextField
          fullWidth
          name="labLocation"
          type="labLocation"
          label="Test Lab Location"
          {...getFieldProps('labLocation')}
          error={Boolean(touched.labLocation && errors.labLocation)}
          helperText={touched.labLocation && errors.labLocation}
          disabled
        />
        <Box sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="email"
          type="email"
          label="Email Address"
          {...getFieldProps('email')}
          error={
            Boolean(touched.email && errors.email) ||
            emailError(errors.afterSubmit).error
          }
          helperText={
            (touched.email && errors.email) ||
            emailError(errors.afterSubmit).helperText
          }
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="phone"
          type="phone"
          label="Phone Number"
          {...getFieldProps('phone')}
          error={
            Boolean(touched.phone && errors.phone) ||
            emailError(errors.afterSubmit).error
          }
          helperText={
            (touched.phone && errors.phone) ||
            emailError(errors.afterSubmit).helperText
          }
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={
            Boolean(touched.password && errors.password) ||
            passwordError(errors.afterSubmit).error
          }
          helperText={
            (touched.password && errors.password) ||
            passwordError(errors.afterSubmit).helperText
          }
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="dateOfBirth"
          id="date"
          type="date"
          label="Date of Birth"
          defaultValue="2006-01-01"
          InputLabelProps={{
            shrink: true
          }}
          {...getFieldProps('dateOfBirth')}
          error={
            Boolean(touched.dateOfBirth && errors.dateOfBirth) ||
            emailError(errors.afterSubmit).error
          }
          helperText={
            (touched.dateOfBirth && errors.dateOfBirth) ||
            emailError(errors.afterSubmit).helperText
          }
        />
        <Box sx={{ mt: 3 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Register
          </LoadingButton>
        </Box>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div>
                {/* <div><label>Latitute:</label><input type='text' value={location.lat} disabled /></div>
                <div><label>Longitute:</label><input type='text' value={location.lng} disabled /></div> */}
                {/* <label>Zoom:</label><input type='text' value={zoom} disabled /> */}
                <Button
                  underline="none"
                  variant="contained"
                  style={{ marginBottom: '15px', float: 'right' }}
                  onClick={onConfirmLocation}
                  >Confirm</Button>
                <Button
                  underline="none"
                  style={{ marginBottom: '15px', float: 'right', marginRight: '10px', border: '1px solid' }}
                  onClick={handleResetLocation}>Reset Location</Button>
                
              </div>
              <MapPicker
                defaultLocation={location}
                zoom={zoom}
                style={{ height: '700px' }}
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey={googleMapApiKey} />
            </div>
          </Fade>
        </Modal>
      </Form>
    </FormikProvider>
  );
}

export default LabRegisterForm;
