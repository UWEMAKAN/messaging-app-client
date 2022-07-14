/* eslint-disable no-unused-vars */
import { Reducer } from 'react';
import { Action } from '../types';

export interface MessageData {
  userId: number;
  body: string;
  type: string;
  agentId?: number;
}

export interface Message {
  id: number;
  userId: number;
  body: string;
  sender: string;
  createdAt: string;
  type: string;
  priority?: number;
  firstName?: string;
  lastName?: string;
}

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  messages: Message[];
  createdAt: string;
}

export interface ChatData {
  messages: Message[];
  isLoadingChat?: boolean;
  chatError: string;
  conversations?: UserDetails[];
}

export interface ChatDataProps extends ChatData {
  sendMessage: (data: MessageData) => Promise<void>;
  openConversation?: (userId: number) => Promise<void>;
  closeConversation?: (userId: number) => Promise<void>;
}

export type ChatReducer = Reducer<ChatData, Action>;
