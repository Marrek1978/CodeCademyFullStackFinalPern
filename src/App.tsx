import './App.css'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/loginPage/LoginPage';


function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
    <>
      <div className=" " >
        <Router>
          {/* <AuthProvider> */}
          <Header />
          <div className=" ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<LoginPage />} />


              {/* <Route path="/profile" element={<Profile />} /> */}
              {/* <Route path="/cart" element={<Cart />} /> */}
              {/* <Route path="/checkout" element={<Checkout />} /> */}

              <Route path="/auth/github" />
            </Routes>
          </div>
          <Footer />
          {/* </AuthProvider> */}
        </Router>
      </div>
    </>
  )
}

export default App
