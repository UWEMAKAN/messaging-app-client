import { useContext, useEffect, useRef, useState } from 'react';
import {
  Container,
  TypingArea,
  TextArea,
  MessageComponent,
  Body,
  ErrorAlert,
  LogoutButton,
  MessageArea,
  ChatListArea,
  ChatMessages,
  HorizontalContainer,
  ProfileArea,
} from '../../components';
import { UserAuthContext, UserChatContext } from '../../services';

export const UserChatPage = () => {
  const { logout, userId } = useContext(UserAuthContext);
  const { messages, sendMessage, chatError } = useContext(UserChatContext);
  const [text, setText] = useState('');

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

  useEffect(() => {
    if (messages.length) {
      scrollToBottom();
    }
  }, [messages.length]);

  const chats = messages.map((m) => (
    <MessageComponent key={m.id} body={m.body} sender={m.sender} createdAt={m.createdAt} />
  ));

  return (
    <Body>
      <HorizontalContainer>
        <ChatListArea />
        <ErrorAlert errorMessage={chatError} />
        <LogoutButton path="/login" logout={logout} />
        <Container>
          <MessageArea>
            <ChatMessages>{chats}</ChatMessages>
            <p ref={messagesEndRef} />
          </MessageArea>
          <TypingArea>
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
        <ProfileArea />
      </HorizontalContainer>
    </Body>
  );
};
