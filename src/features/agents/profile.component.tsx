import { Typography } from '@mui/material';
import { Info, ProfileInfo } from './agent.styles';
import { BigAvatar } from './avatar.component';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
}

export const Profile = ({ firstName, lastName, email }: Props) => (
  <>
    <BigAvatar firstName={firstName} lastName={lastName} />
    <ProfileInfo>
      <Info>
        <Typography variant="body1">Name</Typography>
        <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
      </Info>
      <Info>
        <Typography variant="body1">Email</Typography>
        <Typography variant="body1">{email}</Typography>
      </Info>
      <Info>
        <Typography variant="body1">Phone number</Typography>
        <Typography variant="body1">+234 907 453 7825</Typography>
      </Info>
      <Info>
        <Typography variant="body1">Location</Typography>
        <Typography variant="body1">Lagos, Nigeria</Typography>
      </Info>
    </ProfileInfo>
  </>
);
