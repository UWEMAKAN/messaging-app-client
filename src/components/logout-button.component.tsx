import { PowerSettingsNew } from '@mui/icons-material';
import { Button, Link } from '@mui/material';
import { LogoutContainer } from './component.styles';

interface Props {
  logout: Function;
  path: string;
}

export const LogoutButton = ({ logout, path }: Props) => (
  <LogoutContainer>
    <Link href={path} underline="none">
      <Button
        onClick={() => {
          logout();
        }}
        startIcon={<PowerSettingsNew />}
        variant="text"
      >
        Logout
      </Button>
    </Link>
  </LogoutContainer>
);
