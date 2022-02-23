import React from 'react';
import * as Yup from 'yup';
import Section from './Section';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import RegisterForm from './RegisterForm';
import { PATH_PAGE } from 'src/routes/paths';
import closeFill from '@iconify-icons/eva/close-fill';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Hidden, Container, Typography } from '@material-ui/core';
import { MIconButton } from 'src/theme';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  header: {
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7)
    }
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  }
}));

// ----------------------------------------------------------------------

function RegisterView() {
  const classes = useStyles();
  const history = useHistory();
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    phone: Yup.string()
      //.matches(new RegExp('[0-9]'))
      //.typeError("That doesn't look like a phone number")
      .min(11, 'Too Short!')
      .max(16, 'Too Long!')
      .required('Phone Number is required'),
    password: Yup.string().required('Password is required'),
    dateOfBirth: Yup.string()
      .typeError('Date of Birth must be a valid date')
      .required('Date of Birth is required'),
    residentLocation: Yup.string().required('Location is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      dateOfBirth: '',
      residentLocation: ''
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          dateOfBirth: values.dateOfBirth,
          residentLocation: values.residentLocation
        });

        enqueueSnackbar('Register Success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        history.push('/auth/verify', { email: values.email, group: 'Users' });
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'fail',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    }
  });

  return (
    <Page title="Register | Seylabs Public" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Hidden smDown>
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Already have an account? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to={PATH_PAGE.auth.login}
            >
              Login
            </Link>
          </Typography>
        </Hidden>
      </header>

      <Hidden mdDown>
        <Section />
      </Hidden>

      <Container>
        <div className={classes.content}>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Get started for free.
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Take control of your testing future.
              </Typography>
            </Box>
            {/* <Box
              component="img"
              src={`/static/icons/${
                method === 'firebase' ? 'ic_firebase' : 'ic_jwt'
              }.png`}
              sx={{ width: 32, height: 32 }}
            /> */}
          </Box>

          {/* {method === 'firebase' && <SocialLogin />} */}

          <RegisterForm formik={formik} />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'text.secondary', mt: 3 }}
          >
            By registering, I agree to Seylab's&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Privacy Policy
            </Link>
            .
          </Typography>

          <Hidden smUp>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link
                variant="subtitle2"
                to={PATH_PAGE.auth.login}
                component={RouterLink}
              >
                Login
              </Link>
            </Box>
          </Hidden>
        </div>
      </Container>
    </Page>
  );
}

export default RegisterView;
