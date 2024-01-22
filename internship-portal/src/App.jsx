import './App.css';
import React from 'react';
import Home from './pages/Home.jsx';
import Chart from './pages/Chart.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';


function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path='/chart' element={<Chart />}></Route>
            <Route path='/pricing' element={<Pricing />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='*' element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>

  );
}

export default App;

