import { Typography, Chip } from '@mui/material';
import { EndSessionButtonWrapper, Info, ProfileInfo } from './agent.styles';
import { BigAvatar } from './avatar.component';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  showButton: boolean;
  closeSession: Function;
}

export const Profile = ({ firstName, lastName, email, closeSession, showButton }: Props) => (
  <>
    <EndSessionButtonWrapper>
      {showButton && <Chip onClick={() => closeSession()} label="End session" variant="filled" />}
    </EndSessionButtonWrapper>
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
