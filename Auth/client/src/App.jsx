import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import ProblemPage from './ProblemPage'; // ✅ Import the new component
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/problem/:id" element={<ProblemPage />} /> {/* ✅ Add this route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
