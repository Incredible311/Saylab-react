import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axios.defaults.baseURL = 'https://3ukekc3e00.execute-api.eu-central-1.amazonaws.com/prod';

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

export default axiosInstance;
