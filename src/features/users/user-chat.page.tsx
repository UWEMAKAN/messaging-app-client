/* eslint-disable jsx-a11y/label-has-associated-control */
import { IconButton, Button, Link, CircularProgress, Alert, AlertTitle } from '@mui/material';
import { AttachFile, PowerSettingsNew } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Container,
  ChatArea,
  TypingArea,
  TextArea,
  FileInput,
  LogoutContainer,
  MessageComponent,
  Body,
  AppAlert,
} from '../../components';
import { UserAuthContext, UserChatContext } from '../../services';

export const UserChatPage = () => {
  const { logout, userId } = useContext(UserAuthContext);
  const { messages, sendMessage, isLoadingChat, chatError } = useContext(UserChatContext);
  const [text, setText] = useState('');
  const [error, setError] = useState(chatError);

  const messagesEndRef = useRef({} as any);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitMessage = async (event: any) => {
    event?.preventDefault();
    if (event.code === 'Enter') {
      await sendMessage({ userId, body: text, type: 'TEXT' });
      setText('');
    }
  };

  const handleClose = () => {
    setError('');
  };

  useEffect(() => {
    setError(chatError);
  }, [chatError]);

  useEffect(() => {
    if (messages.length) {
      scrollToBottom();
    }
  }, [messages]);

  const chats = messages.map((m) => (
    <MessageComponent key={m.id} body={m.body} sender={m.sender} createdAt={m.createdAt} />
  ));

  return (
    <Body>
      <Container>
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
        {isLoadingChat ? (
          <CircularProgress />
        ) : (
          <>
            <LogoutContainer>
              <Link href="/login" underline="none">
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
            <ChatArea>
              {chats}
              <p ref={messagesEndRef} />
            </ChatArea>
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
          </>
        )}
      </Container>
    </Body>
  );
};
