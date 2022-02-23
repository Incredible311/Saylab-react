import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  isEmpty,
  isLoaded,
  useFirebase,
  useFirestore
} from 'react-redux-firebase';

// ----------------------------------------------------------------------

useAuth.propTypes = {
  method: PropTypes.oneOf(['firebase', 'jwt'])
};

export default function useAuth(method = 'firebase') {
  // Firebase Auth
  const firebase = useFirebase();
  const firestore = useFirestore();
  const { auth, profile } = useSelector((state) => state.firebase);

  // JWT Auth
  // const dispatch = useDispatch();
  // const { user, isLoading, isAuthenticated } = useSelector(
  //   (state) => state.authJwt
  // );

  // JWT Auth
  // if (method === 'jwt') {
  //   return {
  //     method: 'jwt',
  //     user: user,
  //     isLoading: isLoading,
  //     isAuthenticated: isAuthenticated,

  //     login: ({ email, password }) =>
  //       dispatch(
  //         login({
  //           email: email,
  //           password: password
  //         })
  //       ),

  //     register: ({
  //       email,
  //       password,
  //       firstName,
  //       lastName,
  //       phone,
  //       dateOfBirth,
  //       residentLocation
  //     }) =>
  //       dispatch(
  //         register({
  //           email: email,
  //           password: password,
  //           firstName: firstName,
  //           lastName: lastName,
  //           phone: phone,
  //           dateOfBirth: dateOfBirth,
  //           residentLocation: residentLocation
  //         })
  //       ),

  //     logout: () => dispatch(logout()),

  //     resetPassword: () => {},

  //     updateProfile: () => {}
  //   };
  // }

  // Firebase Auth
  return {
    method: 'firebase',
    user: {
      displayName: auth.displayName || profile.displayName || '',
      email: auth.email || '',
      photoURL: auth.photoURL || profile.photoURL || '',
      phoneNumber: auth.phoneNumber || profile.phoneNumber || '',
      country: profile.country || '',
      address: profile.address || '',
      state: profile.state || '',
      city: profile.city || '',
      about: profile.about || '',
      role: profile.role || '',
      isPublic: profile.isPublic || false
    },
    // isLoading: !isLoaded(auth),
    isAuthenticated: !isEmpty(auth),

    login: ({ email, password }) =>
      firebase.login({
        email: email,
        password: password
      }),
    // loginWithGoogle: () =>
    //   firebase.login({ provider: 'google', type: 'popup' }),

    // loginWithFaceBook: () =>
    //   firebase.login({ provider: 'facebook', type: 'popup' }),

    // loginWithTwitter: () =>
    //   firebase.login({ provider: 'twitter', type: 'popup' }),

    register: ({
      labName,
      lab,
      registeredName,
      licenceNumber,
      dateOfIncorporation,
      labLocation,
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth
    }) =>
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          firestore.collection('labs').doc(res.user.uid).set({
            uid: res.user.uid,
            role: lab,
            name: registeredName,
            licence: licenceNumber,
            doi: dateOfIncorporation,
            email: email,
            displayName: labName,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            dob: dateOfBirth,
            location: labLocation
          });
        }),

    logout: () => firebase.logout(),

    resetPassword: (email) => firebase.resetPassword(email),

    updateProfile: ({
      labName,
      photoURL,
      phoneNumber,
      firstName,
      lastName,
      labLocation,
      country,
      state,
      city,
      address,
      about,
      isPublic
    }) =>
      firebase.updateProfile({}).then((res) => {
        firestore.collection('labs').doc(res.id).set(
          {
            displayName: labName,
            photoURL: photoURL,
            phoneNumber: phoneNumber,
            location: labLocation,
            firstName: firstName,
            lastName: lastName,
            country: country,
            state: state,
            city: city,
            address: address,
            about: about,
            isPublic: isPublic
          },
          { merge: true }
        );
      })
  };
}
