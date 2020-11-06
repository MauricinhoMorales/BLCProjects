import axios from 'axios';

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`/api/auth/login`, {
      email,
      password,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async ({ email }) => {
  try {
    let res = await axios.get(`/api/auth/me`, {
      email,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.get(`/api/auth/logout`);
  } catch (error) {
    console.log(error);
  }
};
