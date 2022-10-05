import axios from 'axios';
export const signupUser = async (values) => {
  try {
    const { data } = await axios.post(
      `http://192.168.103.123:8000/api/v1/register`,
      values
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const signinUser = async (values) => {
  try {
    const { data } = await axios.post(
      `http://192.168.103.123:8000/api/v1/login`,
      values
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
