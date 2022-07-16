/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
import { Avatar, Divider, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  UserMessageContainer,
  MessageRow,
  MessageDate,
  MessageTime,
  AgentMessageContainer,
  MessageItem,
  MessageColumn,
  CheckIconWrapper,
  MessageText,
} from './component.styles';

interface MessageProps {
  body: string;
  createdAt: string;
  sender: string;
  invert?: boolean;
}

export const MessageComponent = (props: MessageProps) => {
  const { body, createdAt, sender, invert } = props;
  const dateTime = new Date(createdAt);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toTimeString().substring(0, 5);

  return (sender === 'USER' && !invert) || (sender === 'AGENT' && invert) ? (
    <UserMessageContainer>
      <Typography mb={2}>{body}</Typography>
      <MessageRow>
        <MessageDate variant="caption">{date}</MessageDate>
        <MessageTime variant="caption">{time}</MessageTime>
      </MessageRow>
    </UserMessageContainer>
  ) : (
    <AgentMessageContainer>
      <Typography mb={2}>{body}</Typography>
      <MessageRow>
        <MessageDate variant="caption">{date}</MessageDate>
        <MessageTime variant="caption">{time}</MessageTime>
      </MessageRow>
    </AgentMessageContainer>
  );
};

MessageComponent.defaultProps = {
  invert: false,
};
interface Props {
  assigned: boolean;
  body: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  selectChat: () => void;
}

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (firstName: string, lastName: string) => ({
  sx: {
    bgcolor: stringToColor(firstName + lastName),
  },
  children: `${firstName.toUpperCase()[0]}${lastName.toUpperCase()[0]}`,
});

export const MessageListItem = (props: Props) => {
  const { body, createdAt, selectChat, firstName, lastName, assigned } = props;
  const dateTime = new Date(createdAt);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toTimeString().substring(0, 5);
  return (
    <>
      <MessageItem onClick={selectChat}>
        {assigned && (
          <CheckIconWrapper>
            <TaskAltIcon color="success" />
          </CheckIconWrapper>
        )}
        <Avatar {...stringAvatar(firstName, lastName)} />
        <MessageColumn>
          <MessageRow>
            <MessageText>
              <Typography mb={1} noWrap>
                {firstName} {lastName}
              </Typography>
            </MessageText>
            <MessageDate variant="caption">{date}</MessageDate>
          </MessageRow>
          <MessageRow>
            <MessageText>
              <Typography mb={1} noWrap>
                {body}
              </Typography>
            </MessageText>
            <MessageTime variant="caption">{time}</MessageTime>
          </MessageRow>
        </MessageColumn>
      </MessageItem>
      <Divider />
    </>
  );
};
