import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import Page from 'src/components/Page';
import Minimal from './Minimal';
import HowItWorks from './HowItWorks';
import Labs from './Labs';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  content: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default
  }
}));

function LandingPageView() {
  const classes = useStyles();

  return (
    <Page
      title="Seylabs: Take a Test when you want"
      id="move_top"
      className={classes.root}
    >
      <Hero />
      {/* <Initial /> */}
      <div className={classes.content}>
        <Minimal />

        <HowItWorks />

        <Labs />

        <Footer />
      </div>
      {/* <div id="features" className={classes.content}>
        <Minimal />
      </div>
      <div id="howitworks" className={classes.content}>
        <HowItWorks />
      </div>
      <div id="labs" className={classes.content}>
        <Labs />
      </div>
      <div id="footer" className={classes.content}>
        <Footer />
      </div> */}
    </Page>
  );
}

export default LandingPageView;
