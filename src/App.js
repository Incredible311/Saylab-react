import React from 'react';
import { ThemeConfig } from './theme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { store, persistor } from './redux/store';
import routes, { renderRoutes } from 'src/routes';
import ScrollToTop from 'src/components/ScrollToTop';
import LoadingScreen from 'src/components/LoadingScreen';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import NotistackProvider from 'src/components/NotistackProvider';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Amplify from 'aws-amplify';
import { COGNITO } from './config';
// Using for Auth (Check doc https://minimals.cc/docs/authentication)
import JwtProvider from 'src/components/Auth/JwtProvider';
//import FirebaseProvider from 'src/components/Auth/FirebaseProvider';

const history = createBrowserHistory();

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
  aws_cognito_identity_pool_id: COGNITO.IDENTITY_POOL_ID
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeConfig>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <NotistackProvider>
              <Router history={history}>
                <JwtProvider>
                  <ScrollToTop />
                  <GoogleAnalytics />
                  {renderRoutes(routes)}
                </JwtProvider>
              </Router>
            </NotistackProvider>
          </LocalizationProvider>
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
