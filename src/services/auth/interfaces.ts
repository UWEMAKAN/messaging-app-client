import { Reducer } from 'react';
import { Action } from '../types';

export interface RegistrationDate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthData {
  isLoading: boolean;
  error: string;
  isError: boolean;
}

export interface AuthMethods {
  login: Function;
  logout: Function;
  register: Function;
}

export interface UserAuthData extends AuthData {
  userId: number;
}

export interface AgentAuthData extends AuthData {
  agentId: number;
}

export interface AgentAuthProps extends AuthMethods, AgentAuthData {}

export interface UserAuthProps extends AuthMethods, UserAuthData {}

export type UserAuthReducer = Reducer<UserAuthData, Action>;
export type AgentAuthReducer = Reducer<AgentAuthData, Action>;
