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

export const getLinks = async (token, pageNumber) => {
  try {
    const { data } = await client.get(`/links?pageNumber=${pageNumber}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const increaseLinkViewCount = async (linkId, token) => {
  try {
    const { data } = await client.put(
      `/view-count/${linkId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const manageLikeLink = async (linkId, token) => {
  try {
    const { data } = await client.put(
      `/links/like/${linkId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const manageUnLikeLink = async (linkId, token) => {
  try {
    const { data } = await client.put(
      `/links/unlike/${linkId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getMyLinks = async (token) => {
  try {
    const { data } = await client.get(`/links/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const updateMyLink = async (linkId, token) => {
  try {
    const { data } = await client.put(`/links/${linkId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const deleteMyLink = async (linkId, token) => {
  try {
    const { data } = await client.delete(`/links/${linkId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getTrendingAndLatestLinks = async (token) => {
  try {
    const { data } = await client.get(`/links/trending-latest`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getLinksCount = async (token) => {
  try {
    const { data } = await client.get(`/links/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
