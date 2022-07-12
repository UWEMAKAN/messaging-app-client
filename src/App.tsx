/* eslint-disable react/function-component-definition */
import { Routes, Route } from 'react-router-dom';
import { UserChatPage, UserLoginPage, UserRegistrationPage } from './features';
import { UserAuthProvider, UserChatProvider } from './services';

export default function App() {
  return (
    <UserAuthProvider>
      <UserChatProvider>
        <Routes>
          <Route path="/" element={<UserLoginPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/register" element={<UserRegistrationPage />} />
          <Route path="/chat" element={<UserChatPage />} />
        </Routes>
      </UserChatProvider>
    </UserAuthProvider>
  );
}
