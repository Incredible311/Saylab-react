import 'lazysizes';
import 'src/_api_';
import 'src/utils/i18n';
import 'src/utils/highlight';
import 'simplebar/src/simplebar.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'slick-carousel/slick/slick.css';
import 'react-image-lightbox/style.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick-theme.css';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as functions from 'firebase-function';
// import * as admin from 'firebase-admin';

// ----------------------------------------------------------------------

// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });

// exports.addAdmin = functions.https.onCall((data, context) => {
//   if (context.auth.token.lab !== true) {
//     return {
//       error: "Request not authorized. User must be a laboratory to make request."
//     };
//   }
//   if (context.auth.token.customer !== true) {
//     return {
//       error: "Request not authorized. User must be a customer to make request."
//     };
//   }
//   if (context.auth.token.admin !== true) {
//     return {
//       error: "Request not authorized. User must be a admin to make request."
//     };
//   }
//   const email = data.email;
//   return grantLabRole(email).then(() => {
//     return {
//       result: `Request fulfilled! ${email} is a laboratory. `
//     };
//   });
//   return grantCustomerRole(email).then(() => {
//     return {
//       result: `Request fulfilled! ${email} is a Customer. `
//     };
//   });
//   return grantAdminRole(email).then(() => {
//     return {
//       result: `Request fulfilled! ${email} is admin. `
//     };
//   });
// });

// async function grantLabRole(email: string): Promise<void> {
//   const user = await admin.auth().getUserByEmail(email);
//   if (user.customClaims && (user.customClaims as Any).lab === true) {
//     return;
//   }
//   if (user.customClaims && (user.customClaims as Any).customer === true) {
//     return;
//   }
//   if (user.customClaims && (user.customClaims as Any).admin === true) {
//     return;
//   }
//   return admin.auth().setCustomUserClaims(user.uid, {
//     lab: true,
//     customer: true,
//     admin: true,
//   })
// };

// firebase.auth().currentUser.getIdTokenResult()
// .then((getIdTokenResult) => {
//   // confirm the user is an Admin.
//   if (getIdTokenResult.claims.admin) {
//     showAdminDashboard();
//   } else {
//     if (getIdTokenResult.claims.lab) {
//       showLabDashboard();
//     } else {
//       showCustomerDashboard();
//     }
//   }
// })
// .catch((error) => {
//   console.log(error);
// });

// ----------------------------------------------------------------------

ReactDOM.render(<App />, document.getElementById('root'));
