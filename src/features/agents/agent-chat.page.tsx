/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { AttachFile, PowerSettingsNew } from '@mui/icons-material';
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Alert,
  AlertTitle,
  Link,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  AppAlert,
  Body,
  FileInput,
  MessageComponent,
  MessageListItem,
  TextArea,
} from '../../components';
import { SelectDuration } from './select-duration.component';
import { AgentAuthContext, AgentChatContext } from '../../services';
import { Durations, Message, UserDetails } from '../../services/chat/interfaces';
import {
  ChatList,
  ChatListArea,
  ChatMessages,
  ChipWrapper,
  Container,
  FilterArea,
  HorizontalContainer,
  LogoutContainer,
  MessageArea,
  ProfileArea,
  QuickResponses,
  Row,
  TypingArea,
} from './agent.styles';
import { Profile } from './profile.component';
import { ToggleMyTickets } from './toggle.component';

export const AgentChatPage = () => {
  const { logout, agentId } = useContext(AgentAuthContext);
  const {
    messages,
    conversations,
    duration,
    tickets,
    stockMessages,
    chatError,
    setDuration,
    openConversation,
    sendMessage,
    closeConversation,
  } = useContext(AgentChatContext);
  const [selected, setSelected] = useState(0);
  const [details, setDetails] = useState({ messages: [] } as unknown as UserDetails);
  const messagesEndRef = useRef({} as any);
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([] as Message[]);
  const [myTickets, setMytickets] = useState(false);
  const [error, setError] = useState(chatError);

  const handleClose = () => {
    setError('');
  };

  const handleSubmitMessage = async (event: any) => {
    event?.preventDefault();
    if (event.code === 'Enter' && selected) {
      await sendMessage({ userId: selected, body: text, type: 'TEXT' });
      setText('');
    }
  };

  const endSession = () => {
    if (details.id) {
      closeConversation(details.id);
    }
  };

  useEffect(() => {
    setError(chatError);
  }, [chatError]);

  useEffect(() => {
    let filtered = [...messages];
    if (myTickets) {
      filtered = [];
      const mine = tickets.filter((v) => v.agentId === agentId);
      mine.forEach((t) => {
        const found = messages.find((m) => t.userId === m.userId);
        if (found) {
          filtered.push(found);
        }
      });
    }
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.body.toLowerCase().includes(lower) ||
          v.lastName?.toLowerCase().includes(lower) ||
          v.firstName?.toLowerCase().includes(lower),
      );
    }
    setFilteredMessages(filtered);
  }, [searchTerm, messages, myTickets]);

  const handleSetDuration = (d: string) => {
    setDuration(d);
  };

  useEffect(() => {
    if (selected) {
      const temp = conversations.find((v) => v.id === selected);
      if (temp) {
        setDetails(temp);
      } else {
        openConversation(selected);
      }
    }
  }, [selected, conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggle = () => {
    setMytickets(!myTickets);
  };

  useEffect(() => {
    if (details.messages) {
      scrollToBottom();
    }
  }, [details.messages.length]);

  const chatList = filteredMessages.map((m) => {
    const assigned = tickets.find((v) => v.userId === m.userId);
    return (
      <MessageListItem
        assigned={!!assigned}
        selectChat={() => {
          setSelected(m.userId);
        }}
        key={m.id}
        body={m.body}
        firstName={m.firstName || ''}
        lastName={m.lastName || ''}
        createdAt={m.createdAt}
      />
    );
  });

  const chats =
    details.messages &&
    details.messages.map((m) => (
      <MessageComponent invert key={m.id} body={m.body} sender={m.sender} createdAt={m.createdAt} />
    ));

  const ticket = tickets.find((v) => v.userId === details.id);

  const quickResponses = stockMessages.map((v) => (
    <ChipWrapper key={v}>
      <Chip onClick={(e: any) => setText(e.target.textContent)} label={v} variant="outlined" />
    </ChipWrapper>
  ));
  return (
    <Body>
      <HorizontalContainer>
        <AppAlert
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!error}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          {error ? (
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => handleClose()}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>{chatError}</AlertTitle>
            </Alert>
          ) : (
            <div />
          )}
        </AppAlert>
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
            <ChatMessages>{chats}</ChatMessages>
            {((!ticket && details.id) || (ticket && ticket.agentId === agentId)) && (
              <QuickResponses>{quickResponses}</QuickResponses>
            )}
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
              disabled={!!tickets.find((v) => v.userId === details.id && v.agentId !== agentId)}
            />
          </TypingArea>
        </Container>
        <ProfileArea>
          {details.id && (
            <Profile
              showButton={!!tickets.find((v) => v.userId === details.id && v.agentId === agentId)}
              closeSession={endSession}
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
