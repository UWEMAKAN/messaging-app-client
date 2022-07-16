/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';

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
  display: flex;
  flex-direction: column;
`;

export const ChatList = styled.div`
  flex: 1;
  padding: 0 0 24px 0;
  overflow-y: scroll;
`;

export const FilterArea = styled.div`
  flex-basis: 0;
  padding: 24px 20px 8px 20px;
`;

export const MessageArea = styled.div`
  background-color: #f1f1f1;
  display: flex;
  padding: 24px 96px 0 96px;
  flex-direction: column;
  flex: auto;
  overflow-y: scroll;
`;

export const ProfileArea = styled.div`
  position: relative;
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
  z-index: 2;
  position: fixed;
  bottom: 20px;
  right: 156px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const QuickResponses = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 1;
`;

export const ChatMessages = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;

export const ChipWrapper = styled.div`
  margin-right: 8px;
  margin-top: 8px;
`;

export const EndSessionButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;
