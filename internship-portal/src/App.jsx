import './App.css';
import React from 'react';
import Home from './pages/Home.jsx';
import Chart from './pages/Chart.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path='/chart' element={<Chart />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

