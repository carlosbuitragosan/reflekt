import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { DiaryEntry } from './components/DiaryEntry';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';
import { RegisterForm } from './components/RegisterForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/diary-entry"
          element={
            <ProtectedRoute>
              <DiaryEntry />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
