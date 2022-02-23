import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import maxLengthCheck from 'src/utils/maxLengthCheck';
import { makeStyles } from '@material-ui/core/styles';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
import { passwordError } from 'src/utils/helpError';
import {
  Box,
  OutlinedInput,
  FormHelperText,
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  input: {
    width: 36,
    height: 36,
    padding: 0,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 56,
      height: 56
    }
  }
}));

// ----------------------------------------------------------------------

function VerifyPasswordForm({ formik }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const {
    values,
    errors,
    isValid,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {Object.keys(values)
            .filter((key) => key !== 'password')
            .map((item) => (
              <Box key={item} sx={{ mx: 1 }}>
                <OutlinedInput
                  {...getFieldProps(item)}
                  type="number"
                  placeholder="-"
                  onInput={maxLengthCheck}
                  inputProps={{ maxLength: 1 }}
                  error={Boolean(touched[item] && errors[item])}
                  classes={{ input: classes.input }}
                />
              </Box>
            ))}
        </Box>

        <FormHelperText error={!isValid} style={{ textAlign: 'right' }}>
          {!isValid && 'Code is required'}
        </FormHelperText>

        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword} edge="end">
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

        <Box sx={{ mt: 3 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Reset Password
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default VerifyPasswordForm;
