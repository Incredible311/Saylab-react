import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import LazySize from 'src/components/LazySize';
import searchFill from '@iconify-icons/eva/search-fill';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_PAGE } from 'src/routes/paths';
import {
  varWrapEnter,
  varFadeInUp,
  varFadeInRight
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

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
  heroOverlay: {
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  },
  heroImg: {
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    width: '100%',
    margin: 'auto',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      right: '8%',
      width: 'auto',
      height: '75vh'
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
  }
}));

// ----------------------------------------------------------------------

// const getImg = (width) =>
// `${BASE_IMG}w_${width}/v1611472901/upload_minimal/home/hero.png`;

Hero.propTypes = {
  className: PropTypes.string
};

function Hero({ className }) {
  const classes = useStyles();

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={varWrapEnter}
        className={clsx(classes.root, className)}
      >
        {/* <motion.img
          alt="overlay"
          src="/static/images/overlay.svg"
          variants={varFadeIn}
          className={classes.heroOverlay}
        /> */}

        <LazySize
          component={motion.img}
          noBlur
          noPlaceholder
          alt="Seylabs_Image"
          // src={getImg(600)}
          src="/static/icons/Directions.svg"
          //size={`${getImg(600)} 600w, ${getImg(1200)} 960w`}
          //size={`600w, 960w`}
          variants={varFadeInUp}
          className={classes.heroImg}
          display={{ xs: 'none', sm: 'block' }}
          //sx={{ width: { xs: '80%', sm: '100%' } }}
        />

        <Container maxWidth="lg">
          <div className={classes.content}>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h2" sx={{ color: 'common.grey' }}>
                Find reputable
                <br />
                test labs <br />
                where you are <br />
                {/* <Typography
                  component="span"
                  variant="h2"
                  sx={{ color: 'primary.main' }}
                >
                  &nbsp;Near You
                </Typography> */}
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Box component="p" sx={{ color: 'common.black', py: 5 }}>
                Looking for a medical laboratory to do a test? <br />
                Use seylabs to Find labs, Book appointments, Receive and Share
                your test Results, all in one place.
              </Box>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.findLabsMap}
                startIcon={<Icon icon={searchFill} width={20} height={20} />}
              >
                Find Labs
              </Button>
            </motion.div>
          </div>
        </Container>
      </motion.div>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

export default Hero;
