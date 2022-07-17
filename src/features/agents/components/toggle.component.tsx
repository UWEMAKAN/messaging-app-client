/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { InputLabel, Switch } from '@mui/material';

const Row = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  handleToggle: Function;
}

export const ToggleMyTickets = ({ handleToggle }: Props) => (
  <Row>
    <InputLabel style={{ color: 'black', marginRight: 10 }}>
      My tickets
    </InputLabel>
    <Switch onChange={() => handleToggle()} color="primary" />
  </Row>
);
