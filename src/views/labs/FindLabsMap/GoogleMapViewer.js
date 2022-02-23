import ControlStyle from '../../uikit/extra-components/MapView/GoogleMaps//styles';
import { mapConfig } from 'src/config';
import Page from 'src/components/Page';
import React, { Suspense, lazy } from 'react';
import { LoadScript } from '@react-google-maps/api';
import {
  DarkTheme,
  RetroTheme,
  NightTheme,
  SilverTheme,
  FlatPaleTheme,
  StandardTheme,
  AubergineTheme
} from '../../uikit/extra-components/MapView/GoogleMaps/themes';
import { makeStyles } from '@material-ui/core/styles';
import {
  Skeleton,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const MAP_THEMES = {
  standard: StandardTheme,
  dark: DarkTheme,
  night: NightTheme,
  retro: RetroTheme,
  silver: SilverTheme,
  flatpale: FlatPaleTheme,
  aubergine: AubergineTheme
};

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  },
  map: {
    zIndex: 0,
    height: 560,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius
  }
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2, mb: 5 }}
    />
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2 }}
    />
  </>
);

const baseSettings = {
  id: 'script-loader',
  googleMapsApiKey: mapConfig.googleMapsApiKey,//'tA1dlDEbtGNgWZyJOqE-q3vnufWcu_pjfRDU510cw6o',
  loadingElement: SkeletonLoad,
  language: 'en',
  region: 'EN',
  version: 'weekly',
  libraries: ['drawing', 'visualization', 'places']
};

const GoogleMapMarker = lazy(() => import('./GoogleMapMarker'));

function GoogleMapViewer() {
  const classes = useStyles();

  return (
    <Page title="Google Map-Components | Minimal-UI" className={classes.root}>
        <Suspense fallback={SkeletonLoad}>
          <ControlStyle />
          <LoadScript {...baseSettings}>

            <GoogleMapMarker
              themes={MAP_THEMES}
              className={classes.map}
            />
          </LoadScript>
        </Suspense>
    </Page>
  );
}

export default GoogleMapViewer;
