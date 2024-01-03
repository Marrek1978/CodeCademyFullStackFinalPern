
//just login on this page... logining in goes to login screen, then profile screen, purchase item, stripe, chekcout, then back to profile screen

import { useContext } from "react";
import { Link } from "react-router-dom"
import AuthContext from "./authContext/AuthContext";
import { logoutUserAxios } from "../axiosApi/axiosApi";

function Header() {

  const { isLoggedIn, setIsLoggedIn, userID } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const logoutData = await logoutUserAxios();
      if (logoutData.data?.authed === false) {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.log(err)
      //toast for error
    }
  }
 
  const links = isLoggedIn && (
    <>
      <li><Link to={`/user/${userID?.trim()}`} >Profile</Link></li>
      <li><Link to={`/user/${userID?.trim()}/subscriptions`}  >Subscriptions</Link></li>
    </>
  )


  const authButton = isLoggedIn
    ? (
      <button
        className="btn btn-primary "
        onClick={handleLogout}>
        Logout
      </button>
    )
    : (
      <Link to={'/auth?type=login'}>
        <button className="btn btn-primary">Login</button>
      </Link>
    )


  return (
    <>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold">
              {links}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost text-xl">QuantuMetrics</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {authButton}
        </div>
      </div>
    </>
  )
}

export default Header