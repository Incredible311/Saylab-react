import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import { PATH_PAGE } from 'src/routes/paths';
import VerifyPasswordForm from './VerifyPasswordForm';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Link, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    padding: theme.spacing(12, 0)
  },
  header: {
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5)
    }
  }
}));

// ----------------------------------------------------------------------

function VerifyPasswordView() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const email = location.state.email;

  const { error, resendCode, forgotPasswordSubmit } = useAuth();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required('Code is required'),
    code2: Yup.number().required('Code is required'),
    code3: Yup.number().required('Code is required'),
    code4: Yup.number().required('Code is required'),
    code5: Yup.number().required('Code is required'),
    code6: Yup.number().required('Code is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
      password: ''
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values) => {
      const code =
        values.code1 +
        '' +
        values.code2 +
        '' +
        values.code3 +
        '' +
        values.code4 +
        '' +
        values.code5 +
        '' +
        values.code6;
      const password = values.password;
      try {
        await forgotPasswordSubmit({ email, code, password });
        if (error) {
          enqueueSnackbar(error.message, { variant: 'fail' });
        } else {
          enqueueSnackbar('Reset Password Success', { variant: 'success' });
          history.push('/auth/login');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const onResend = async () => {
    try {
      await resendCode(email);
      if (error) {
        enqueueSnackbar(error.message, { variant: 'fail' });
      } else {
        enqueueSnackbar('Resend success', { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Verify | Minimal UI" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </header>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Button
            size="small"
            component={RouterLink}
            to={PATH_PAGE.auth.login}
            startIcon={<Icon icon={arrowIosBackFill} width={20} height={20} />}
            sx={{ mb: 3 }}
          >
            Back
          </Button>

          <Typography variant="h3" gutterBottom>
            Please check your email!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We have emailed a 6-digit confirmation code from admin@seylabs.com,
            if you checked your email, please reset your password.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyPasswordForm formik={formik} />
          </Box>

          <Typography variant="body2" align="center">
            Don’t have a code? &nbsp;
            <Link variant="subtitle2" underline="none" onClick={onResend}>
              Resend code
            </Link>
          </Typography>
        </Box>
      </Container>
    </Page>
  );
}

export default VerifyPasswordView;
