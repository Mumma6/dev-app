import React from 'react';
import { Counter } from './features/counter/Counter';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Landing from './pages/Landing';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
    <Router>
    <Header />
    <Container>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      </Container>
    </Router>
    </>
  );
}

export default App;
