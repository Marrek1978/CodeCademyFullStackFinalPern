import AuthContext from '../authContext/AuthContext';
import { useContext, useEffect, useState } from 'react'

function RedirectToLogin() {
  const { isLoggedIn, userID } = useContext(AuthContext);
  console.log("🚀 ~ file: RedirectToLogin.tsx:6 ~ RedirectToLogin ~ userID:", userID)
  console.log("🚀 ~ file: RedirectToLogin.tsx:6 ~ RedirectToLogin ~ isLoggedIn:", isLoggedIn)
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>();


  useEffect(() => {
    if (!isLoggedIn || !userID) return setRedirectToLogin(true);
  }, [isLoggedIn, userID])

  return redirectToLogin
}

export default RedirectToLogin