import client from '../client';

export const signupUser = async (values) => {
  try {
    const { data } = await client.post(`/register`, values);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const signinUser = async (values) => {
  try {
    const { data } = await client.post(`/login`, values);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await client.get(`/logout`);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
