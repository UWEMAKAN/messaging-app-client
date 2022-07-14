import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { ChatData, ChatDataProps, ChatReducer, Message, MessageData } from './interfaces';
import { Action, Props } from '../types';
import {
  CHAT_ERROR,
  LOADING_CONTENT,
  NEW_MESSAGE,
  USER_DETAILS,
} from './chat-action-types.constant';
import { AgentAuthContext } from '../auth/agent-auth.context';
import { closeChat, getUserDetails, sendAgentMessage } from './chat.service';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  isLoadingChat: false,
  messages: [],
  conversations: [],
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
      return { ...state, messages: [payload, ...messages], conversations };
    }
    case LOADING_CONTENT: {
      return { ...state, isLoadingChat: true };
    }
    case USER_DETAILS: {
      const conversations = state.conversations || [];
      return { ...state, conversations: [...conversations, payload], isLoadingChat: false };
    }
    case CHAT_ERROR: {
      return { ...state, chatError: payload, isLoadingChat: false };
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
  const { chatError, isLoadingChat, messages, conversations } = state;
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

  useEffect(() => {
    if (source.readyState === undefined && agentId) {
      const src = new EventSource(`${baseUrl}/agents/${agentId}/messages?messageId=0`);
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

  const value = useMemo(
    () => ({
      chatError,
      messages,
      conversations,
      isLoadingChat,
      sendMessage,
      openConversation,
      closeConversation,
    }),
    [chatError, messages, conversations, isLoadingChat],
  );

  return <AgentChatContext.Provider value={value}>{children}</AgentChatContext.Provider>;
};
