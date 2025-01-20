import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Login } from './components/Login';
import { DiaryEntry } from './components/DiaryEntry';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
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
