import styled from '@emotion/styled';
import { TextField, Typography, Snackbar } from '@mui/material';

export const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  padding: 25px 150px;
  flex-direction: column;
  max-height: 93%;
  height: 93%;
  width: 50%;
  overflow-y: scroll;
`;

export const TypingArea = styled.div`
  display: flex;
  align-items: center;
  height: 7%;
  padding: 0 50%;
  width: 50%;
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

export const MessageText = styled.div``;

export const MessageDateTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MessageTime = styled(Typography)`
  align-self: flex-end;
  margin-left: 20px;
`;

export const MessageDate = styled(Typography)`
  align-self: flex-start;
  margin-right: 20px;
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

export const LogoutContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 90px;
`;
