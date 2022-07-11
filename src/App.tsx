/* eslint-disable react/function-component-definition */
import { Routes, Route } from 'react-router-dom';
import { UserLoginPage } from './features';
import { UserAuthProvider } from './services';

export default function App() {
  return (
    <UserAuthProvider>
      <Routes>
        <Route path="/" element={<UserLoginPage />} />
        <Route path="/login" element={<UserLoginPage />} />
      </Routes>
    </UserAuthProvider>
  );
}
