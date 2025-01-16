import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Login } from './components/Login';
import { DiaryEntry } from './components/DiaryEntry';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/diary-entry" element={<DiaryEntry />} />
      </Routes>
    </Router>
  );
}

export default App;
