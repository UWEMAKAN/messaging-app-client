import styled from '@emotion/styled';
import { TextField, Typography, Snackbar } from '@mui/material';

export const Body = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Container = styled.div`
  width: 55%;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const HorizontalContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

export const ProfileArea = styled.div`
  position: relative;
  width: 25%;
  display: flex;
  flex-direction: column;
  padding: 50px 0;
`;

export const ChatMessages = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;

export const ChatListArea = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`;

export const MessageArea = styled.div`
  background-color: #f1f1f1;
  display: flex;
  padding: 24px 96px 0 96px;
  flex-direction: column;
  flex: auto;
  overflow-y: scroll;
`;

export const LogoutContainer = styled.div`
  z-index: 2;
  position: fixed;
  bottom: 20px;
  right: 156px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  background-color: #f1f1f1;
  padding: 50px;
`;

export const TextInput = styled(TextField)`
  margin-bottom: 8px;
`;

export const ButtonContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

export const ChatArea = styled.div`
  background-color: #f1f1f1;
  display: flex;
  flex: auto;
  padding: 25px 150px;
  flex-direction: column;
  overflow-y: scroll;
`;

export const TypingArea = styled.div`
  flex-basis: 1;
  display: flex;
  padding: 10px 5%;
  background-color: #dedede;
`;

export const UserMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background-color: #5282bd;
  align-self: flex-end;
  margin-bottom: 20px;
  max-width: 50%;
`;

export const AgentMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background-color: #c6daf7;
  align-self: flex-start;
  margin-bottom: 20px;
  max-width: 50%;
`;

export const MessageText = styled.div`
  width: 250px;
`;

export const MessageRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MessageTime = styled(Typography)`
  margin-left: 20px;
`;

export const MessageDate = styled(Typography)`
`;

export const TextArea = styled(TextField)`
  margin-left: 8px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const AppAlert = styled(Snackbar)`
  position: absolute;
`;

export const MessageItem = styled.div`
  position: relative;
  padding: 4px 24px;
  display: flex;
  align-items: center;
`;

export const MessageColumn = styled.div`
  margin-top: 8px;
  flex: auto;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

export const CheckIconWrapper = styled.div`
  position: absolute;
  right: 15%;
  bottom: 6%;
`;
