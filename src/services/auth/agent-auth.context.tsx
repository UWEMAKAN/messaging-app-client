/* eslint-disable no-console */
import { createContext, useReducer, useMemo } from 'react';
import { agentLoginRequest, agentRegistrationRequest } from './auth.service';
import { AgentAuthData, AgentAuthProps, AgentAuthReducer, RegistrationData } from './interfaces';
import {
  START_API_CALL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  API_CALL_FAILURE,
} from './auth-action-types';
import { Action, Props } from '../types';

const initialState = {
  isLoading: false,
  isError: false,
} as AgentAuthData;

// eslint-disable-next-line default-param-last
const reducer = (state = {} as AgentAuthData, { type, payload }: Action) => {
  switch (type) {
    case START_API_CALL: {
      return { ...state, isLoading: true, error: null, isError: false };
    }
    case LOGIN_SUCCESS: {
      return { ...state, agentId: payload, error: null, isError: false, isLoading: false };
    }
    case REGISTER_SUCCESS: {
      return { ...state, agentId: payload, error: null, isError: false, isLoading: false };
    }
    case API_CALL_FAILURE: {
      return { ...state, agentId: null, error: payload, isError: true, isLoading: false };
    }
    case LOGOUT_SUCCESS: {
      return {};
    }
    default:
      return { ...state };
  }
};

export const AgentAuthContext = createContext({} as AgentAuthProps);

export const AgentAuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer as AgentAuthReducer, initialState);
  const { agentId, isLoading, error, isError } = state;

  const register = async (data: RegistrationData) => {
    dispatch({ type: START_API_CALL, payload: null });
    try {
      const id = await agentRegistrationRequest(data);
      dispatch({ type: REGISTER_SUCCESS, payload: id });
    } catch (err: any) {
      console.error(`REGISTER_ERROR: ${JSON.stringify(err.message)}`);
      dispatch({ type: API_CALL_FAILURE, payload: err.message });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: START_API_CALL, payload: null });
    try {
      const id = await agentLoginRequest(email, password);
      dispatch({ type: LOGIN_SUCCESS, payload: id });
    } catch (err: any) {
      console.error(`LOGIN_ERROR: ${err.message}`);
      dispatch({ type: API_CALL_FAILURE, payload: err.message });
    }
  };

  const logout = () => {
    console.log('Logging out');
    dispatch({ type: LOGIN_SUCCESS, payload: null });
  };

  const value = useMemo(
    () => ({
      isLoading,
      agentId,
      error,
      isError,
      register,
      login,
      logout,
    }),
    [isError, isLoading, agentId, error],
  );

  return <AgentAuthContext.Provider value={value}>{children}</AgentAuthContext.Provider>;
};
