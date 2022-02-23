import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  login,
  register,
  labRegister,
  logout,
  resendCode,
  confirmCode,
  forgotPassword,
  forgotPasswordSubmit
} from '../redux/slices/authJwt';
// ----------------------------------------------------------------------

useAuth.propTypes = {
  method: PropTypes.oneOf(['cognito'])
};

export default function useAuth(method = 'cognito') {
  //Cognito Auth
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.authJwt
  );

  if (method === 'cognito') {
    return {
      method: 'cognito',
      user: user,
      isLoading: isLoading,
      isAuthenticated: isAuthenticated,

      login: ({ email, password }) =>
        dispatch(
          login({
            email: email,
            password: password
          })
        ),

      register: ({
        email,
        password,
        firstName,
        lastName,
        phone,
        dateOfBirth,
        residentLocation
      }) =>
        dispatch(
          register({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            dateOfBirth: dateOfBirth,
            residentLocation: residentLocation
          })
        ),
      labRegister: ({
        labName,
        registeredName,
        licenceNumber,
        dateOfIncorporation,
        labLocation,
        email,
        password,
        firstName,
        lastName,
        phone,
        dateOfBirth,
        location
      }) =>
        dispatch(
          labRegister({
            email: email,
            password: password,
            name: firstName + ' ' + lastName,
            phone_number: phone,
            birthdate: dateOfBirth,
            address: labLocation,
            given_name: labName,
            nickname: registeredName,
            license_number: licenceNumber + '',
            date_incorporation: dateOfIncorporation,
            location: location
          })
        ),
      logout: () => dispatch(logout()),

      resendCode: (email) => dispatch(resendCode(email)),

      confirmCode: ({ email, code, group }) =>
        dispatch(
          confirmCode({
            email: email,
            code: code,
            group: group
          })
        ),

      forgotPassword: (email) => dispatch(forgotPassword(email)),

      forgotPasswordSubmit: ({ email, code, password }) =>
        dispatch(
          forgotPasswordSubmit({
            email: email,
            code: code,
            password: password
          })
        ),

      updateProfile: () => {}
    };
  }
}
