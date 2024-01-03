import './App.css'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Return from './components/stripe/Return.tsx';
import LoginPage from './components/loginPage/LoginPage';
import ProfilePage from './components/profilePage/ProfilePage';
import LogoutPage from './components/logoutPage/LogoutPage.tsx';
import CheckoutForm from './components/stripe/CheckoutForm.tsx';
import { AuthProvider } from './components/authContext/AuthContext.tsx';
import SubscriptionsPage from './components/subscriptionsPage/SubscriptionsPage.tsx';

function App() {


  useEffect(() => {
    themeChange(false)   // 👆 false parameter is required for react project
  }, [])

  return (
    <>
      <div >
        <AuthProvider>
          <Router>
            <>
              <Header />
              <div className=" ">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<LoginPage />} />
                  <Route path="/user/:userId" element={<ProfilePage />} />
                  <Route path="/user/:userId/subscriptions" element={<SubscriptionsPage />} />
                  <Route path="/user/:userId/logout" element={<LogoutPage />} />
                  <Route path="/checkout" element={<CheckoutForm />} />
                  <Route path="/return" element={<Return />} />

                  {/* <Route path="/cart" element={<Cart />} /> */}
                  {/* <Route path="/checkout" element={<Checkout />} /> */}

                  {/* <Route path="/auth/github" /> */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </>
          </Router>
        </AuthProvider>
      </div>
    </>
  )
}

export default App

function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}