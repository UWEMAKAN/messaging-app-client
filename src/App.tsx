/* eslint-disable react/function-component-definition */
import { Routes, Route } from 'react-router-dom';
import { UserChatPage, UserLoginPage, UserRegistrationPage } from './features';
import { UserAuthProvider } from './services';

export default function App() {
  return (
    <UserAuthProvider>
      <Routes>
        <Route path="/" element={<UserLoginPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route path="/chat" element={<UserChatPage />} />
      </Routes>
    </UserAuthProvider>
  );
}
