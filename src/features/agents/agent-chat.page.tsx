/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { AttachFile, PowerSettingsNew } from '@mui/icons-material';
import { Button, Divider, IconButton, Link, TextField } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { Body, FileInput, MessageComponent, MessageListItem, TextArea } from '../../components';
import { SelectDuration } from './select-duration.component';
import { AgentAuthContext, AgentChatContext } from '../../services';
import { Durations, Message, UserDetails } from '../../services/chat/interfaces';
import {
  ChatList,
  ChatListArea,
  Container,
  FilterArea,
  HorizontalContainer,
  LogoutContainer,
  MessageArea,
  ProfileArea,
  Row,
  TypingArea,
} from './agent.styles';
import { Profile } from './profile.component';
import { ToggleMyTickets } from './toggle.component';

export const AgentChatPage = () => {
  const { logout } = useContext(AgentAuthContext);
  const { messages, conversations, duration, setDuration, openConversation, sendMessage } =
    useContext(AgentChatContext);
  const [selected, setSelected] = useState(0);
  const [details, setDetails] = useState({} as UserDetails);
  const messagesEndRef = useRef({} as any);
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([] as Message[]);

  const handleSubmitMessage = async (event: any) => {
    event?.preventDefault();
    if (event.code === 'Enter' && selected) {
      await sendMessage({ userId: selected, body: text, type: 'TEXT' });
      setText('');
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      const filtered = messages.filter(
        (v) =>
          v.body.toLowerCase().includes(lower) ||
          v.lastName?.toLowerCase().includes(lower) ||
          v.firstName?.toLowerCase().includes(lower),
      );
      setFilteredMessages(filtered);
    }
  }, [searchTerm]);

  const handleSetDuration = (d: string) => {
    if (setDuration) {
      setDuration(d);
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

  const handleToggle = () => {};

  useEffect(() => {
    scrollToBottom();
  }, [details.messages]);

  const chatList = filteredMessages.map((m) => (
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
          <FilterArea>
            <Row>
              <ToggleMyTickets handleToggle={handleToggle} />
              <SelectDuration
                duration={duration || Durations.ONE_DAY}
                setDuration={handleSetDuration}
              />
            </Row>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              margin="normal"
              fullWidth
              type="search"
              placeholder="Search..."
            />
          </FilterArea>
          <Divider />
          <ChatList>{chatList}</ChatList>
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
            <Profile
              firstName={details.firstName}
              lastName={details.lastName}
              email={details.email}
            />
          )}
        </ProfileArea>
      </HorizontalContainer>
    </Body>
  );
};
