import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  className: PropTypes.string
};

function Logo({ className, ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src="/static/brand/logo_full.svg"
      height={50}
      className={className}
      {...other}
    />
  );
}

export default Logo;
