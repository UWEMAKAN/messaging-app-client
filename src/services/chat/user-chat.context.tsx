import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { UserAuthContext } from '../auth/user-auth.context';
import { Action, Props } from '../types';
import {
  CHAT_ERROR,
  GET_MESSAGES,
  LOADING_CONTENT,
  NEW_MESSAGE,
} from './chat-action-types.constant';
import { getUserMessages, sendUserMessage } from './chat.service';
import { ChatData, ChatDataProps, Message, ChatReducer, MessageData } from './interfaces';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  chatError: '',
  isLoadingChat: false,
  messages: [],
} as unknown as ChatDataProps;

// eslint-disable-next-line default-param-last
const reducer = (state = {} as ChatData, { type, payload }: Action) => {
  switch (type) {
    case NEW_MESSAGE: {
      return { ...state, messages: [...state.messages, payload] };
    }
    case GET_MESSAGES: {
      return { ...state, messages: [...payload], isLoadingChat: false, chatError: '' };
    }
    case LOADING_CONTENT: {
      return { ...state, isLoadingChat: true, chatError: '' };
    }
    case CHAT_ERROR: {
      return { ...state, isLoadingChat: false, chatError: payload };
    }
    default: {
      return state;
    }
  }
};

export const UserChatContext = createContext({} as ChatDataProps);

export const UserChatProvider = ({ children }: Props) => {
  const { userId } = useContext(UserAuthContext);
  const [state, dispatch] = useReducer(reducer as ChatReducer, initialState);
  const { chatError, messages, isLoadingChat } = state;
  const [source, setSource] = useState({} as EventSource);

  const sendMessage = async (data: MessageData) => {
    try {
      const response = await sendUserMessage({ ...data, userId });
      dispatch({ type: NEW_MESSAGE, payload: response });
    } catch (err: any) {
      const { statusCode, message } = err;
      const error = statusCode < 500 ? message : 'Server error';
      dispatch({ type: CHAT_ERROR, payload: error });
    }
  };

  const pushMessage = (message: Message) => {
    dispatch({ type: NEW_MESSAGE, payload: message });
  };

  const getMessages = () => {
    dispatch({ type: LOADING_CONTENT, payload: null });
    getUserMessages(userId)
      .then((value) => {
        dispatch({ type: GET_MESSAGES, payload: value });
      })
      .catch((err: any) => dispatch({ type: CHAT_ERROR, payload: err.message }));
  };

  useEffect(() => {
    if (source.readyState === undefined && userId) {
      const src = new EventSource(`${baseUrl}/users/${userId}/subscribe`);
      src.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        pushMessage(msg);
      };

      // eslint-disable-next-line no-unused-vars
      src.onerror = (err) => {
        src.close();
      };

      src.onopen = () => {};
      setSource(src);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getMessages();
    }
  }, [userId]);

  const value = useMemo(
    () => ({ chatError, messages, isLoadingChat, sendMessage }),
    [chatError, messages, isLoadingChat],
  );
  return <UserChatContext.Provider value={value}>{children}</UserChatContext.Provider>;
};
