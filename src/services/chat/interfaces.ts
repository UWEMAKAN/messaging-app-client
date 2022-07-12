/* eslint-disable no-unused-vars */
import { Reducer } from 'react';
import { Action } from '../types';

export interface UserMessageData {
  userId: number;
  body: string;
  type: string;
}

export interface Message {
  id: number;
  userId: number;
  body: string;
  sender: string;
  createdAt: string;
  type: string;
}

export interface ChatData {
  messages: Message[];
  isLoadingChat: boolean;
  chatError: string;
}

export interface ChatDataProps extends ChatData {
  sendMessage: (data: UserMessageData) => Promise<void>;
  pushMessage: (msg: Message) => void;
}

export type UserChatReducer = Reducer<ChatData, Action>;
