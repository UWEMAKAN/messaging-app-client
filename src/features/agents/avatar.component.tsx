import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { stringToColor } from '../../components';

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
