import jwtDecode from 'jwt-decode';
// import axios from 'src/utils/axios';
import { Auth } from 'aws-amplify';
import { createSlice } from '@reduxjs/toolkit';
import * as AWS from 'aws-sdk';
import { COGNITO, AWS_CONF } from '../../config';
// ----------------------------------------------------------------------

const axios = require('axios').create({
  baseURL: 'https://3ukekc3e00.execute-api.eu-central-1.amazonaws.com/prod'
});

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {}
};

const slice = createSlice({
  name: 'authJwt',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export function login({ email, password }) {
  return async (dispatch) => {
    try {
      const response = await Auth.signIn(email, password);
      const accessToken = response.signInUserSession.idToken.jwtToken;
      const user = response.signInUserSession.idToken.payload;
      setSession(accessToken);
      console.log(response);
      dispatch(slice.actions.loginSuccess({ user }));
      return true;
    } catch (error) {
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function register({
  email,
  password,
  firstName,
  lastName,
  phone,
  dateOfBirth,
  residentLocation
}) {
  return async (dispatch) => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email,
          name: firstName + ' ' + lastName,
          phone_number: phone,
          birthdate: dateOfBirth,
          address: residentLocation
        }
      });

      //dispatch(slice.actions.registerSuccess());
      return true;
    } catch (error) {
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function labRegister({
  email,
  password,
  name,
  phone_number,
  birthdate,
  address,
  given_name,
  nickname,
  license_number,
  date_incorporation,
  location
}) {
  return async (dispatch) => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email,
          name: name,
          phone_number: phone_number,
          birthdate: birthdate,
          address: address,
          given_name: given_name,
          nickname: nickname,
          'custom:license_number': license_number,
          'custom:date_incorporation': date_incorporation
        }
      }).then(async (result) => {
        console.log("RESULT: ", result);
        const userSub = result.userSub; //key of the cognito user
        const userConfirmed = result.userConfirmed; //false if user not confirmed yet
        console.log(userSub)
        console.log("location:~~~~~~~", location);

        try{
          await axios.post('/labs',
            JSON.stringify({
              'usersub': userSub,
              'user_confirmed': userConfirmed,
              'lat': location.lat,
              'lon': location.lng,
              'labname': given_name,
              'test_type': nickname,
              'city': address
            }),
            )
          } catch (err) {
            throw err;
          }
      });


      /*
      integrate api request here
      {
      "body": "{\"type\":\"test\",\"name\":\"STD\",\"sample_type\":\"sample\",\"result_type\":\"result\",\"duration\":\"10s\"}"
      }
      #change get request to post request
      I configured axios baseURL.
      await axios.post('/labs', data);
      GET, POST working now https://3f8jc4q715.execute-api.eu-central-1.amazonaws.com/prod/labs
      */

      // dispatch(slice.actions.registerSuccess());
      return true;
    } catch (error) {
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function resendCode(email) {
  return async (dispatch) => {
    try {
      await Auth.resendSignUp(email);
      return true;
    } catch (error) {
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function confirmCode({ email, code, group }) {
  return async (dispatch) => {
    try {
      await Auth.confirmSignUp(email, code);
      AWS.config.region = COGNITO.REGION;
      AWS.config.apiVersion = AWS_CONF.API_VERSION;
      AWS.config.credentials = {
        accessKeyId: AWS_CONF.ACCESS_KEY_ID,
        secretAccessKey: AWS_CONF.SECRET_ACCESS_KEY
      };
      const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      const params = {
        GroupName: group,
        UserPoolId: COGNITO.USER_POOL_ID,
        Username: email
      };

      cognitoidentityserviceprovider.adminAddUserToGroup(
        params,
        function (error, data) {
          throw error;
        }
      );

      return true;
    } catch (error) {
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function forgotPassword(email) {
  return async (dispatch) => {
    try {
      await Auth.forgotPassword(email);
      return true;
    } catch (error) {
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function forgotPasswordSubmit({ email, code, password }) {
  return async (dispatch) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      return true;
    } catch (error) {
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function logout() {
  return async (dispatch) => {
    try {
      await Auth.signOut();
      return true;
    } catch (error) {
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get('/api/account/my-account');
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: true,
            user: response.data.user
          })
        );
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null
          })
        );
      }
    } catch (error) {
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
