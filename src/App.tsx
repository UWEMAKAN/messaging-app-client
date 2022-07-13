/* eslint-disable react/function-component-definition */
import { RootNavigator } from './root.navigation';
import { AgentAuthProvider, UserAuthProvider, UserChatProvider } from './services';

export default function App() {
  return (
    <UserAuthProvider>
      <AgentAuthProvider>
        <UserChatProvider>
          <RootNavigator />
        </UserChatProvider>
      </AgentAuthProvider>
    </UserAuthProvider>
  );
}
