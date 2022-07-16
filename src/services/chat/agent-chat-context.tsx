import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import {
  AgentChatDataProps,
  AgentChatReducer,
  Durations,
  Message,
  MessageData,
  TicketEvent,
} from './interfaces';
import { Props } from '../types';
import {
  CHAT_ERROR,
  GET_MESSAGES,
  GET_STOCK_MESSAGES,
  GET_TICKETS,
  LOADING_CONTENT,
  NEW_MESSAGE,
  NEW_TICKET,
  SET_DURATION,
  USER_DETAILS,
} from './chat-action-types.constant';
import { AgentAuthContext } from '../auth/agent-auth.context';
import {
  closeChat,
  getAgentMessages,
  getStockMessages,
  getTickets,
  getUserDetails,
  sendAgentMessage,
} from './chat.service';
import { reducer } from './agent-reducer';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  myTickets: false,
  isLoadingChat: false,
  messages: [],
  conversations: [],
  duration: Durations.ONE_DAY,
  tickets: [],
  stockMessages: [],
} as unknown as AgentChatDataProps;

export const AgentChatContext = createContext({} as AgentChatDataProps);

export const AgentChatProvider = ({ children }: Props) => {
  const { agentId } = useContext(AgentAuthContext);
  const [state, dispatch] = useReducer(reducer as AgentChatReducer, initialState);
  const {
    chatError,
    isLoadingChat,
    messages,
    conversations,
    duration,
    tickets,
    stockMessages,
  } = state;
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
      getAgentMessages(duration)
        .then((data) => {
          dispatch({ type: GET_MESSAGES, payload: data });
        })
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

  const updateTicket = (event: TicketEvent) => {
    dispatch({ type: NEW_TICKET, payload: event });
  };

  useEffect(() => {
    getTickets()
      .then((data) => dispatch({ type: GET_TICKETS, payload: data }))
      .catch((err: any) => {
        const { statusCode, message } = err;
        const error = statusCode < 500 ? message : 'Server error';
        dispatch({ type: CHAT_ERROR, payload: error });
      });
    getStockMessages()
      .then((data) => dispatch({ type: GET_STOCK_MESSAGES, payload: data }))
      .catch((err: any) => {
        const { statusCode, message } = err;
        const error = statusCode < 500 ? message : 'Server error';
        dispatch({ type: CHAT_ERROR, payload: error });
      });
  }, []);

  useEffect(() => {
    getMessages();
  }, [agentId, duration]);

  useEffect(() => {
    if (source.readyState === undefined && agentId) {
      const src = new EventSource(`${baseUrl}/agents/${agentId}/subscribe`);
      src.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        pushMessage(msg);
      };

      src.addEventListener('assignment', (e) => {
        const data = JSON.parse(e.data);
        updateTicket(data);
      });

      src.addEventListener('stock-message', (e) => {
        const data = JSON.parse(e.data);
        dispatch({ type: GET_STOCK_MESSAGES, payload: data });
      });

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
      duration,
      tickets,
      stockMessages,
      sendMessage,
      openConversation,
      closeConversation,
      setDuration,
    }),
    [chatError, messages, conversations, isLoadingChat, duration, tickets, stockMessages],
  );

  return <AgentChatContext.Provider value={value}>{children}</AgentChatContext.Provider>;
};
