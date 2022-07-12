import { Typography } from '@mui/material';
import {
  UserMessageContainer,
  MessageDateTime,
  MessageDate,
  MessageTime,
  AgentMessageContainer,
} from './component.styles';

interface MessageProps {
  body: string;
  createdAt: string;
  sender: string;
}

export const MessageComponent = (props: MessageProps) => {
  const { body, createdAt, sender } = props;
  const dateTime = new Date(createdAt);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toTimeString().substring(0, 5);
  return sender === 'USER' ? (
    <UserMessageContainer>
      <Typography mb={2}>{body}</Typography>
      <MessageDateTime>
        <MessageDate variant="caption">{date}</MessageDate>
        <MessageTime variant="caption">{time}</MessageTime>
      </MessageDateTime>
    </UserMessageContainer>
  ) : (
    <AgentMessageContainer>
      <Typography mb={2}>{body}</Typography>
      <MessageDateTime>
        <MessageDate variant="caption">{date}</MessageDate>
        <MessageTime variant="caption">{time}</MessageTime>
      </MessageDateTime>
    </AgentMessageContainer>
  );
};
