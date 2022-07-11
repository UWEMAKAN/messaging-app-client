import { ReactNode, Reducer } from 'react';

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

export interface Props {
  children: ReactNode;
}

export interface Action {
  type: string;
  payload: any;
}

export type UserAuthReducer = Reducer<UserAuthData, Action>;
export type AgentAuthReducer = Reducer<AgentAuthData, Action>;
