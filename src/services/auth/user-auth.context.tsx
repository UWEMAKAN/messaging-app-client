/* eslint-disable no-console */
import { createContext, useReducer, useMemo } from 'react';
import { userLoginRequest, userRegistrationRequest, RegistrationDate } from './auth.service';
import { Action, UserAuthData, UserAuthProps, UserAuthReducer, Props } from './interfaces';
import {
  START_API_CALL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  API_CALL_FAILURE,
} from './auth-action-types';

const initialState = {
  isLoading: false,
  isError: false,
} as UserAuthData;

// eslint-disable-next-line default-param-last
const reducer = (state = {} as UserAuthData, { type, payload }: Action) => {
  switch (type) {
    case START_API_CALL: {
      return { ...state, isLoading: true, error: null, isError: false };
    }
    case LOGIN_SUCCESS: {
      return { ...state, userId: payload, error: null, isError: false, isLoading: false };
    }
    case REGISTER_SUCCESS: {
      return { ...state, userId: payload, error: null, isError: false, isLoading: false };
    }
    case API_CALL_FAILURE: {
      return { ...state, userId: null, error: payload, isError: true, isLoading: false };
    }
    case LOGOUT_SUCCESS: {
      return {};
    }
    default:
      return { ...state };
  }
};

export const UserAuthContext = createContext({} as UserAuthProps);

export const UserAuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer as UserAuthReducer, initialState);
  const { userId, isLoading, error, isError } = state;

  const register = async (data: RegistrationDate) => {
    dispatch({ type: START_API_CALL, payload: null });
    try {
      const id = await userRegistrationRequest(data);
      dispatch({ type: REGISTER_SUCCESS, payload: id });
    } catch (err: any) {
      console.error(`REGISTER_ERROR: ${JSON.stringify(err.message)}`);
      dispatch({ type: API_CALL_FAILURE, payload: err.message });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: START_API_CALL, payload: null });
    try {
      const id = await userLoginRequest(email, password);
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
      userId,
      error,
      isError,
      register,
      login,
      logout,
    }),
    [isError, isLoading, userId, error],
  );

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
};
