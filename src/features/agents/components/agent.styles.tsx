/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';

export const ChatList = styled.div`
  flex: 1;
  padding: 0 0 24px 0;
  overflow-y: scroll;
`;

export const FilterArea = styled.div`
  flex-basis: 0;
  padding: 24px 20px 8px 20px;
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

export const ChipWrapper = styled.div`
  margin-right: 8px;
  margin-top: 8px;
`;

export const EndSessionButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;
