import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { UserAuthContext } from '../auth/user-auth.context';
import { Action, Props } from '../types';
import { CHAT_ERROR, NEW_MESSAGE } from './chat-action-types.constant';
import { sendUserMessage } from './chat.service';
import { ChatData, ChatDataProps, Message, ChatReducer, MessageData } from './interfaces';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  isLoadingChat: true,
  messages: [],
} as unknown as ChatDataProps;

// eslint-disable-next-line default-param-last
const reducer = (state = {} as ChatData, { type, payload }: Action) => {
  switch (type) {
    case NEW_MESSAGE: {
      return { ...state, messages: [...state.messages, payload] };
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
  const { chatError, messages } = state;
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

  useEffect(() => {
    if (source.readyState === undefined && userId) {
      const src = new EventSource(`${baseUrl}/users/${userId}/messages?messageId=0`);
      src.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        pushMessage(msg);
      };

      // eslint-disable-next-line no-unused-vars
      src.onerror = (err) => {
        source.close();
      };

      src.onopen = () => {
      };
      setSource(src);
    }
  }, [userId]);

  const value = useMemo(
    () => ({ chatError, messages, sendMessage }),
    [chatError, messages],
  );
  return <UserChatContext.Provider value={value}>{children}</UserChatContext.Provider>;
};
