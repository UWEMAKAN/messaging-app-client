import axios from 'axios';
import { UserMessageData } from './interfaces';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const sendUserMessage = async (body: UserMessageData) => {
  const url = `${baseUrl}/users/messages`;
  try {
    const { data } = await axios.post(url, body);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};
