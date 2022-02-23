import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import LazySize from 'src/components/LazySize';
import { BASE_IMG } from 'src/utils/getImages';
import flashFill from '@iconify-icons/eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
import useBreakpoints from 'src/hooks/useBreakpoints';
import { PATH_APP, PATH_HOME } from 'src/routes/paths';
import {
  varFadeIn,
  varWrapEnter,
  MotionInView,
  varFadeInUp,
  varFadeInRight
} from 'src/components/Animate';
import {
  Button,
  Box,
  Link,
  Container,
  Typography,
  Grid,
  TextField
} from '@material-ui/core';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------
//const isRTL = theme.direction === 'rtl';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: '#F2F3F5',
    [theme.breakpoints.up('md')]: {
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      position: 'fixed',
      alignItems: 'center'
    }
  },
  content: {
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left'
    }
  },
  img: {
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    width: '100%',
    margin: 'auto',
    position: 'fixed',
    [theme.breakpoints.up('lg')]: {
      right: '15%',
      width: 'auto',
      height: '72vh'
    }
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
    color: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    }
  },
  listIcon: {
    display: 'flex',
    marginTop: theme.spacing(5),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    },
    '& > :not(:last-of-type)': {
      marginRight: theme.spacing(1.5)
    }
  },
  screen: {
    bottom: 0,
    maxWidth: 460,
    position: 'absolute'
  },
  screenLeft: { zIndex: 3 },
  screenRight: { zIndex: 1 },
  screenCenter: {
    position: 'relative',
    zIndex: 2,
    bottom: 20
    //transform: isRTL ? 'translateX(-24%)' : 'translateX(24%)',
    // [theme.breakpoints.up('sm')]: {
    //   bottom: 40,
    //   transform: isRTL ? 'translateX(-32%)' : 'translateX(32%)'
    // }
  }
}));

const variantScreenLeftMoblie = {
  initial: { x: '22%', y: -10, opacity: 0 },
  animate: { x: 0, y: 0, opacity: 1 }
};
const variantScreenRightMobile = {
  initial: { x: '26%', y: -30, opacity: 0 },
  animate: { x: '48%', y: -40, opacity: 1 }
};
const variantScreenLeft = {
  initial: { x: '30%', y: -30, opacity: 0 },
  animate: { x: 0, y: 0, opacity: 1 }
};
const variantScreenCenter = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};
const variantScreenRight = {
  initial: { x: '34%', y: -50, opacity: 0 },
  animate: { x: '64%', y: -80, opacity: 1 }
};
const transition = { duration: 0.5, ease: 'easeOut' };

// ----------------------------------------------------------------------

Initial.propTypes = {
  className: PropTypes.string
};

function Initial({ className }) {
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useBreakpoints('up', 'sm');
  const upMd = useBreakpoints('up', 'md');
  const textAnimate = upMd ? varFadeInRight : varFadeInUp;
  const screenLeftAnimate = upSm ? variantScreenLeft : variantScreenLeftMoblie;
  const screenCenterAnimate = variantScreenCenter;
  const screenRightAnimate = upSm
    ? variantScreenRight
    : variantScreenRightMobile;

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4} lg={5}>
            <Container maxWidth="lg">
              <div className={classes.content}>
                <motion.div variants={varFadeInRight}>
                  <Typography variant="h2" sx={{ color: 'common.grey' }}>
                    Find reputable
                    <br />
                    test labs <br />
                    where you are <br />
                  </Typography>
                </motion.div>

                <motion.div variants={varFadeInRight}>
                  <Box component="p" sx={{ color: 'common.black', py: 5 }}>
                    Looking for a medical laboratory to do a test? <br />
                    Use seylabs to Find labs, Book appointments, Receive and
                    Share your test Results, all in one place.
                  </Box>
                </motion.div>
                <motion.div variants={varFadeInRight}>
                  <Button
                    size="large"
                    variant="contained"
                    component={RouterLink}
                    to={PATH_APP.general.dashboard}
                    startIcon={<Icon icon={flashFill} width={20} height={20} />}
                  >
                    Find Labs
                  </Button>
                </motion.div>
              </div>
            </Container>
          </Grid>

          <Grid
            dir="ltr"
            item
            xs={12}
            md={8}
            lg={7}
            sx={{
              position: 'relative',
              pl: { sm: '16% !important', md: '0 !important' }
            }}
          >
            {[...Array(3)].map((screen, index) => (
              <MotionInView
                key={index}
                variants={
                  (index === 0 && screenLeftAnimate) ||
                  (index === 1 && screenCenterAnimate) ||
                  screenRightAnimate
                }
                transition={transition}
                className={clsx(classes.screen, {
                  [classes.screenLeft]: index === 0,
                  [classes.screenCenter]: index === 1,
                  [classes.screenRight]: index === 2
                })}
              >
                <Box
                  component="img"
                  //alt={`screen ${index + 1}`}
                  alt="Seylabs_Image"
                  //src={getImg(720, index)}
                  src="/static/icons/Directions.svg"
                  variants={varFadeInUp}
                  className="lazyload"
                  sx={{ width: { xs: '80%', sm: '100%' } }}
                />
              </MotionInView>
            ))}
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ height: { md: '100vh' } }} />
    </div>
  );
}

export default Initial;
