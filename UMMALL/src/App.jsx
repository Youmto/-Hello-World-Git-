import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './components/common/Toast';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Client from './pages/admin/Client';
import Partner from './pages/admin/Partner';
import Sale from './pages/admin/Sale';
import Product from './pages/admin/Product';
import Setting from './pages/admin/Setting';
import Profile from './pages/admin/Profile';
import Admin from './pages/admin/Admin';


// Admin Layout
import { MainLayout } from './components/admin/Layout';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <ToastProvider>
            <Router>
              {/* <div className="flex flex-col min-h-screen bg-background text-text-dark">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/profile/*" element={<ProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />


                  </Routes>
                </main>
                <Footer />
              </div> */}
                <Routes > 
                  {/* Admin Routes */}
                  <Route element={<MainLayout />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/clients" element={<Client />} />
                    <Route path="/admin/partners" element={<Partner />} />
                    <Route path="/admin/sales" element={<Sale />} />
                    <Route path="/admin/products" element={<Product />} />
                    <Route path="/admin/settings" element={<Setting />} />
                    <Route path="/admin/profile" element={<Profile />} />
                    <Route path="/admin/admin" element={<Admin />} />
                  </Route>
                  
                </Routes>
            </Router>
          </ToastProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;