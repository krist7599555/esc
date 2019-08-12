import axios from 'axios';

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    const data = error.response.data;
    if (typeof data == 'string') {
      error.message = data;
    } else if ('message' in data) {
      error.message = data.message;
    }
    return Promise.reject(error);
  }
);
