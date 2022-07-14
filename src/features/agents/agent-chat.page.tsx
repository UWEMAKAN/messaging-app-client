/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { AttachFile, PowerSettingsNew } from '@mui/icons-material';
import { Button, Divider, IconButton, Link, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { Body, FileInput, MessageComponent, MessageListItem, TextArea } from '../../components';
import { AgentAuthContext, AgentChatContext } from '../../services';
import { UserDetails } from '../../services/chat/interfaces';
import {
  BigAvatar,
  ChatListArea,
  Container,
  HorizontalContainer,
  Info,
  LogoutContainer,
  MessageArea,
  ProfileArea,
  ProfileInfo,
  TypingArea,
} from './agent.styles';

export const AgentChatPage = () => {
  const { logout } = useContext(AgentAuthContext);
  const { messages, conversations, openConversation, sendMessage } = useContext(AgentChatContext);
  const [selected, setSelected] = useState(0);
  const [details, setDetails] = useState({} as UserDetails);
  const messagesEndRef = useRef({} as any);
  const [text, setText] = useState('');

  const handleSubmitMessage = async (event: any) => {
    event?.preventDefault();
    if (event.code === 'Enter' && selected) {
      await sendMessage({ userId: selected, body: text, type: 'TEXT' });
      setText('');
    }
  };

  useEffect(() => {
    if (selected) {
      const temp = conversations?.find((v) => v.id === selected);
      if (temp) {
        setDetails(temp);
      } else if (openConversation) {
        openConversation(selected);
      }
    }
  }, [selected, conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [details.messages]);

  const list = messages.map((m) => (
    <MessageListItem
      selectChat={() => {
        setSelected(m.userId);
      }}
      key={m.id}
      body={m.body}
      firstName={m.firstName || ''}
      lastName={m.lastName || ''}
      createdAt={m.createdAt}
    />
  ));

  const chats =
    details.messages &&
    details.messages.map((m) => (
      <MessageComponent invert key={m.id} body={m.body} sender={m.sender} createdAt={m.createdAt} />
    ));
  return (
    <Body>
      <HorizontalContainer>
        <LogoutContainer>
          <Link href="/agents/login" underline="none">
            <Button
              onClick={() => {
                logout();
              }}
              startIcon={<PowerSettingsNew />}
              variant="text"
            >
              Logout
            </Button>
          </Link>
        </LogoutContainer>
        <ChatListArea>
          <Divider />
          {list}
        </ChatListArea>
        <Container>
          <MessageArea>
            {chats}
            <p ref={messagesEndRef} />
          </MessageArea>
          <TypingArea>
            <label htmlFor="icon-button-file">
              <FileInput accept="image/*" id="icon-button-file" type="file" />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <AttachFile />
              </IconButton>
            </label>
            <TextArea
              fullWidth
              size="small"
              variant="outlined"
              value={text}
              onChange={(event) => setText(event.target.value)}
              type="text"
              placeholder="Type message..."
              onKeyUp={handleSubmitMessage}
            />
          </TypingArea>
        </Container>
        <ProfileArea>
          {details.id && (
            <>
              <BigAvatar firstName={details.firstName} lastName={details.lastName} />
              <ProfileInfo>
                <Info>
                  <Typography variant="body1">Name</Typography>
                  <Typography variant="body1">{`${details.firstName} ${details.lastName}`}</Typography>
                </Info>
                <Info>
                  <Typography variant="body1">Email</Typography>
                  <Typography variant="body1">{details.email}</Typography>
                </Info>
                <Info>
                  <Typography variant="body1">Phone number</Typography>
                  <Typography variant="body1">+234 907 453 7825</Typography>
                </Info>
                <Info>
                  <Typography variant="body1">Location</Typography>
                  <Typography variant="body1">Lagos, Nigeria</Typography>
                </Info>
              </ProfileInfo>
            </>
          )}
        </ProfileArea>
      </HorizontalContainer>
    </Body>
  );
};
