import client from '../client';

export const createLink = async (values, token) => {
  try {
    const { data } = await client.post(`/create-link`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getLinks = async () => {
  try {
    const { data } = await client.get(`/links`);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
