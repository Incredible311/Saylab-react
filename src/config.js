export const mapConfig = {
  apiGoogle: process.env.REACT_APP_MAP_GOOGLE,
  apiMapBox: process.env.REACT_APP_MAP_MAPBOX
};

// export const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APPID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

// export const firebaseConfig = {
//   apiKey: 'AIzaSyCtgl5HVOof2eYpypJXIwvUU3m81Va3L_M',
//   authDomain: 'seylabsapp.firebaseapp.com',
//   projectId: 'seylabsapp',
//   storageBucket: 'seylabsapp.appspot.com',
//   messagingSenderId: '457117357825',
//   appId: '1:457117357825:web:7891080ded3a753f552d00',
//   measurementId: 'G-Y79DH043D2'
// };

export const cloudinaryConfig = {
  cloudinaryKey: process.env.REACT_APP_CLOUDINARY_KEY,
  cloudinaryPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
  cloudinaryUrl: process.env.REACT_APP_CLOUDINARY_URL
};

export const COGNITO = {
  REGION: 'eu-central-1',
  USER_POOL_ID: 'eu-central-1_MEjg1vRT0',
  APP_CLIENT_ID: '3hc6l3i4e1s4okfv04clq87fei',
  IDENTITY_POOL_ID: 'eu-central-1:55aa4981-ec12-4bd0-b050-5123d1b3b32e'
};

export const AWS_CONF = {
  API_VERSION: '2016-04-18',
  ACCESS_KEY_ID: 'AKIA57DPGBLPMD5LY5UM',
  SECRET_ACCESS_KEY: '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'
};

export const googleMapApiKey = "AIzaSyCZtQFJtO5qzVlIpP-RAoJQgQGqAdEWo8Q";

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
