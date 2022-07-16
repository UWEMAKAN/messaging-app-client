import { Action } from '../types';
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
import { AgentChatData } from './interfaces';

// eslint-disable-next-line default-param-last
export const reducer = (state = {} as AgentChatData, { type, payload }: Action) => {
  switch (type) {
    case NEW_MESSAGE: {
      const conversations = state.conversations.map((v) => {
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
      let index = -1;
      if (payload.priority > 1) {
        index = messages.findIndex((v) => v.priority && v.priority > 1);
      }
      return {
        ...state,
        messages:
          payload.priority === 1 || index < 0
            ? [payload, ...messages]
            : [...messages.slice(0, index), payload, ...messages.slice(index)],
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
    case GET_STOCK_MESSAGES: {
      return { ...state, stockMessages: payload.map((v: any) => v.text) };
    }
    case GET_TICKETS: {
      return { ...state, tickets: [...payload] };
    }
    case NEW_TICKET: {
      const { userId, assigned, agentId } = payload;
      let tickets = [...state.tickets];
      const found = state.tickets.find((v) => v.userId === userId);
      if (assigned && !found) {
        tickets.push({ agentId, userId });
      } else if (!assigned && found) {
        tickets = state.tickets.filter((v) => v.userId !== userId);
      }
      return { ...state, tickets };
    }
    default: {
      return state;
    }
  }
};
