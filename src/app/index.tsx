import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home';

import 'tailwindcss/tailwind.css';

const NODE_APP = document.getElementById('killerparty');

render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/play" />} />
        <Route path="/play" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  NODE_APP,
);
