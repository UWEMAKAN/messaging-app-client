/* eslint-disable react/function-component-definition */
import { Routes, Route } from 'react-router-dom';
import { UserLoginPage } from './features';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLoginPage />} />
      <Route path="/login" element={<UserLoginPage />} />
    </Routes>
  );
}
