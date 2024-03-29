import client from '../client';

export const updateProfilePhoto = async (image, token) => {
  try {
    const { data } = await client.post(
      `/upload-profile-photo`,
      { image },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getUserInfoHandler = async (userId, token) => {
  try {
    const { data } = await client.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
