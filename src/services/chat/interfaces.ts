/* eslint-disable no-unused-vars */
import { Duration } from '@mui/material';
import { Reducer } from 'react';
import { Action } from '../types';

// eslint-disable-next-line no-shadow
export enum Durations {
  ONE_DAY = 'ONE_DAY',
  TWO_DAYS = 'TWO_DAYS',
  ONE_WEEK = 'ONE_WEEK',
  ONE_MONTH = 'ONE_MONTH',
  THREE_MONTHS = 'THREE_MONTHS',
  ONE_YEAR = 'ONE_YEAR',
}

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
  isLoadingChat: boolean;
  chatError: string;
  conversations?: UserDetails[];
  duration?: string;
}

export interface ChatDataProps extends ChatData {
  sendMessage: (data: MessageData) => Promise<void>;
  openConversation?: (userId: number) => Promise<void>;
  closeConversation?: (userId: number) => Promise<void>;
  setDuration?: (payload: string) => void;
}

export type ChatReducer = Reducer<ChatData, Action>;
