// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from '../pages/product';
import Login from '../pages/login';
import Signup from '../pages/signup';
import PageNotFound from '../pages/pagenotfound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route index element={<HomePage />} /> */}
          <Route index element={<Product />} />
          <Route path="/product" element={<Product />} />
          {/* <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;