/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { stringToColor } from '../../components';

export const TypingArea = styled.div`
  flex-basis: 1;
  display: flex;
  padding: 10px 5%;
  background-color: #dedede;
`;

export const Container = styled.div`
  width: 55%;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
`;

export const HorizontalContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

export const ChatListArea = styled.div`
  width: 25%;
  flex-grow: 0;
  padding: 48px 0;
  overflow-y: scroll;
`;

export const MessageArea = styled.div`
  background-color: #f1f1f1;
  display: flex;
  padding: 25px 100px;
  flex-direction: column;
  flex: auto;
  overflow-y: scroll;
`;

export const ProfileArea = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  padding: 50px 0;
`;

export const ProfileInfo = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
`;

export const Info = styled.div`
  display: flex;
  padding: 10px 32px;
  justify-content: space-between;
  align-items: center;
`;

export const LogoutContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 156px;
`;

interface Props {
  firstName: string;
  lastName: string;
}

export const BigAvatar = ({ firstName, lastName }: Props) => {
  const color = stringToColor(firstName + lastName);
  const Avatar = styled.div`
  height: 96px;
  width: 96px;
  border-radius: 100%;
  display: flex;
  background-color: ${color};
  justify-content: center;
  align-items: center;
  align-self: center;
`;
  const f = firstName[0].toUpperCase();
  const l = lastName[0].toUpperCase();
  return (
    <Avatar>
      <Typography color="white" variant="h4">
        {f}
        {l}
      </Typography>
    </Avatar>
  );
};
