import axios from 'axios';
export const signupUser = async (values) => {
  try {
    const { data } = await axios.post(
      `http://localhost:8000/api/v1/signup`,
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
      `http://localhost:8000/api/v1/signin`,
      values
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
