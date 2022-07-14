/* eslint-disable react/function-component-definition */
import { RootNavigator } from './root.navigation';
import {
  AgentAuthProvider,
  AgentChatProvider,
  UserAuthProvider,
  UserChatProvider,
} from './services';

export default function App() {
  return (
    <UserAuthProvider>
      <AgentAuthProvider>
        <UserChatProvider>
          <AgentChatProvider>
            <RootNavigator />
          </AgentChatProvider>
        </UserChatProvider>
      </AgentAuthProvider>
    </UserAuthProvider>
  );
}
