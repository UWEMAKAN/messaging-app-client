/* eslint-disable react/function-component-definition */
import { RootNavigator } from './root.navigation';
import { UserAuthProvider, UserChatProvider } from './services';

export default function App() {
  return (
    <UserAuthProvider>
      <UserChatProvider>
        <RootNavigator />
      </UserChatProvider>
    </UserAuthProvider>
  );
}
