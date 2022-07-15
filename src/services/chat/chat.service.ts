import axios from 'axios';
import { MessageData } from './interfaces';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const sendUserMessage = async (body: MessageData) => {
  const url = `${baseUrl}/users/messages`;
  try {
    const { data } = await axios.post(url, body);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const sendAgentMessage = async (body: MessageData) => {
  const url = `${baseUrl}/agents/messages`;
  try {
    const { data } = await axios.post(url, body);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const getUserDetails = async (userId: number) => {
  const url = `${baseUrl}/users/${userId}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const closeChat = async (userId: number, agentId: number) => {
  const url = `${baseUrl}/agents/close-conversation`;
  try {
    const { data } = await axios.post(url, { userId, agentId });
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const getUserMessages = async (userId: number) => {
  const url = `${baseUrl}/users/${userId}/messages`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const getAgentMessages = async (agentId: number, duration: string) => {
  const url = `${baseUrl}/agents/messages?duration=${duration}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};
