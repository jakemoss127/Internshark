import './App.css';
import React from 'react';
import Home from './pages/Home.jsx';
import Chart from './pages/Chart.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path='/chart' element={<Chart />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>

  );
}

export default App;

