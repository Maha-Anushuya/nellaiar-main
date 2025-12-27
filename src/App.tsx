import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Map from './pages/map';
import ARView from './pages/arview';
import POI from './pages/poi';
import Admin from './pages/admin';

export default function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/ar" element={<ARView />} />
        <Route path="/poi/:id" element={<POI />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
