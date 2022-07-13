import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserChatPage, UserLoginPage, UserRegistrationPage } from './features';
import { AgentAuthContext, UserAuthContext } from './services';

export const RootNavigator = () => {
  const { userId } = useContext(UserAuthContext);
  const { agentId } = useContext(AgentAuthContext);

  return (
    <Routes>
      <Route path="/" element={<UserLoginPage />} />
      <Route path="/login" element={<UserLoginPage />} />
      <Route path="/register" element={<UserRegistrationPage />} />
      <Route path="/chat" element={userId ? <UserChatPage /> : <Navigate to="/login" />} />
    </Routes>
  );
};
