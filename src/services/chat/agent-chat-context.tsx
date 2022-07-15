import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import {
  ChatData,
  ChatDataProps,
  ChatReducer,
  Durations,
  Message,
  MessageData,
} from './interfaces';
import { Action, Props } from '../types';
import {
  CHAT_ERROR,
  GET_MESSAGES,
  LOADING_CONTENT,
  NEW_MESSAGE,
  SET_DURATION,
  USER_DETAILS,
} from './chat-action-types.constant';
import { AgentAuthContext } from '../auth/agent-auth.context';
import { closeChat, getAgentMessages, getUserDetails, sendAgentMessage } from './chat.service';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  isLoadingChat: false,
  messages: [],
  conversations: [],
  duration: Durations.ONE_DAY,
} as unknown as ChatDataProps;

// eslint-disable-next-line default-param-last
const reducer = (state = {} as ChatData, { type, payload }: Action) => {
  switch (type) {
    case NEW_MESSAGE: {
      const conversations = state.conversations?.map((v) => {
        if (v.id === payload.userId) {
          const found = v.messages.find((m) => m.id === payload.id);
          if (!found) {
            v.messages.push({
              id: payload.id,
              userId: payload.userId,
              body: payload.body,
              sender: payload.sender,
              createdAt: payload.createdAt,
              type: payload.type,
              priority: payload.priority,
            });
          }
        }
        return v;
      });
      const messages = state.messages.filter((v) => v.userId !== payload.userId);
      return {
        ...state,
        messages: [payload, ...messages],
        conversations,
        chatError: '',
        isLoadingChat: false,
      };
    }
    case LOADING_CONTENT: {
      return { ...state, isLoadingChat: true, chatError: '' };
    }
    case GET_MESSAGES: {
      return { ...state, messages: [...payload], chatError: '', isLoadingChat: false };
    }
    case USER_DETAILS: {
      const conversations = state.conversations || [];
      return {
        ...state,
        conversations: [...conversations, payload],
        isLoadingChat: false,
        chatError: '',
      };
    }
    case CHAT_ERROR: {
      return { ...state, chatError: payload, isLoadingChat: false };
    }
    case SET_DURATION: {
      return { ...state, duration: payload };
    }
    default: {
      return state;
    }
  }
};

export const AgentChatContext = createContext({} as ChatDataProps);

export const AgentChatProvider = ({ children }: Props) => {
  const { agentId } = useContext(AgentAuthContext);
  const [state, dispatch] = useReducer(reducer as ChatReducer, initialState);
  const { chatError, isLoadingChat, messages, conversations, duration } = state;
  const [source, setSource] = useState({} as EventSource);

  const sendMessage = async (data: MessageData) => {
    try {
      const response = await sendAgentMessage({ ...data, agentId });
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

  const openConversation = async (userId: number) => {
    dispatch({ type: LOADING_CONTENT, payload: true });
    try {
      const response = await getUserDetails(userId);
      dispatch({ type: USER_DETAILS, payload: response });
    } catch (err: any) {
      const { statusCode, message } = err;
      const error = statusCode < 500 ? message : 'Server error';
      dispatch({ type: CHAT_ERROR, payload: error });
    }
  };

  const closeConversation = async (userId: number) => {
    try {
      await closeChat(userId, agentId);
    } catch (err: any) {
      const { statusCode, message } = err;
      const error = statusCode < 500 ? message : 'Server error';
      dispatch({ type: CHAT_ERROR, payload: error });
    }
  };

  const getMessages = () => {
    if (duration && agentId) {
      getAgentMessages(agentId, duration)
        .then((data) => dispatch({ type: GET_MESSAGES, payload: data }))
        .catch((err: any) => {
          const { statusCode, message } = err;
          const error = statusCode < 500 ? message : 'Server error';
          dispatch({ type: CHAT_ERROR, payload: error });
        });
    }
  };

  const setDuration = (payload: string) => {
    dispatch({ type: SET_DURATION, payload });
  };

  useEffect(() => {
    if (source.readyState === undefined && agentId) {
      const src = new EventSource(`${baseUrl}/agents/${agentId}/subscribe`);
      src.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        pushMessage(msg);
      };

      // eslint-disable-next-line no-unused-vars
      src.onerror = (err) => {
        source.close();
      };

      src.onopen = () => {};
      setSource(src);
    }
  }, [agentId]);

  useEffect(() => {
    getMessages();
  }, [agentId, duration]);

  const value = useMemo(
    () => ({
      chatError,
      messages,
      conversations,
      isLoadingChat,
      duration,
      sendMessage,
      openConversation,
      closeConversation,
      setDuration,
    }),
    [chatError, messages, conversations, isLoadingChat, duration],
  );

  return <AgentChatContext.Provider value={value}>{children}</AgentChatContext.Provider>;
};
