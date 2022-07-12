/* eslint-disable jsx-a11y/label-has-associated-control */
import { IconButton, Button, Link } from '@mui/material';
import { AttachFile, PowerSettingsNew } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  Container,
  ChatArea,
  TypingArea,
  TextArea,
  FileInput,
  LogoutContainer,
  MessageComponent,
} from '../../components';
import { UserAuthContext, UserChatContext } from '../../services';

export const UserChatPage = () => {
  const { logout, userId } = useContext(UserAuthContext);
  const { messages, sendMessage } = useContext(UserChatContext);
  const [text, setText] = useState('');

  const messagesEndRef = useRef({} as any);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmitMessage = async (event: any) => {
    event?.preventDefault();
    if (event.code === 'Enter') {
      await sendMessage({ userId, body: text, type: 'TEXT' });
      setText('');
    }
  };

  const chats = messages.map((m) => (
    <MessageComponent key={m.id} body={m.body} sender={m.sender} createdAt={m.createdAt} />
  ));

  return (
    <Container>
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
    </Container>
  );
};
