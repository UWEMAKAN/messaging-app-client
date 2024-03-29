import axios from 'axios';
import { RegistrationData } from './interfaces';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const userRegistrationRequest = async (body: RegistrationData): Promise<number> => {
  const url = `${baseUrl}/users`;
  try {
    const { data } = await axios.post(url, body);
    return data.userId;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const userLoginRequest = async (email: string, password: string): Promise<number> => {
  const url = `${baseUrl}/auth/login/users`;
  try {
    const { data } = await axios.post(url, { email, password });
    return data.userId;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const agentRegistrationRequest = async (body: RegistrationData): Promise<number> => {
  const url = `${baseUrl}/agents`;
  try {
    const { data } = await axios.post(url, body);
    return data.agentId;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const agentLoginRequest = async (email: string, password: string): Promise<number> => {
  const url = `${baseUrl}/auth/login/agents`;
  try {
    const { data } = await axios.post(url, { email, password });
    return data.agentId;
  } catch (err: any) {
    throw err.response.data;
  }
};
