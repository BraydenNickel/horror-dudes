import './App.css';
import React, {useState} from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';


//pages
import Login from './pages/login';
import Home from './pages/home';

//components
import NavbarBootstrap from './components/navbar';


function App() {
  return (
    <BrowserRouter>
      <NavbarBootstrap/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
